import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {

        // Pegando as info da Sessão
        const session = await getSession({ req })
        
        // Criando um usuário/customer para o Stripe a partir do Usuário logado
        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            // metadata
        })

        // Criando uma Checkout Session do Stripe
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,    // usuário cadastrado no Stripe
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1JkcbaFzugJ4FwnFngkPiDJ7', quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })

    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}