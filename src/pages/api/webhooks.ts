import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";

import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/managerSubscription";

// Função para pegar todas as info retornadas pouco a pouco, e transformar em um Objeto Buffer 
async function buffer(readable: Readable){
    const chunks = []

    for await(const chunk of readable){
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks)
}

/*Por padrão, o Next espera que as Req. sejam JSON e afins, como essa Req. é uma stream, 
desabilitamos o comportamento padrão através dessa config.*/
export const config = {
    api: {
        bodyParser: false
    }
}

// Eventos que queremos "ouvir"/atender do Stripe
const relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {

        // Pega os dados retornados pela aplicação Stripe
        const buf = await buffer(req)

        // Pega a chave secreta que o Stripe envia, validando que foi a aplicação Stripe que fez a requição
        const secret = req.headers['stripe-signature'] 

        let event: Stripe.Event

        try{
            // Verificando se os parametros (buf e secret) batem, e construindo o Objeto de evento
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)           
        } catch (err) {
            console.log(process.env.STRIPE_WEBHOOK_SECRET)
            console.log(err)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        // Pegando o tipo do event retornado pela Aplicação do Stripe ao validar uma compra
        const { type } = event

        // Verificando os eventos e adotando ações para cada um deles
        if(relevantEvents.has(type)){
            try {
                switch(type){                   
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':

                        const subscription = event.data.object as Stripe.Subscription

                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false
                        )

                        break
                    
                    case 'checkout.session.completed':
                        // Tipamos o evento para saber os dados dentro dela
                        const checkoutSession = event.data.object as Stripe.Checkout.Session

                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                        )
                        
                        break

                    default:
                        throw new Error("Unhandled event");
                }
            } catch (error) {
                return res.json({ error: 'Webhook handle failed' })
            }
        }

        res.json({ ok: true })

    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}