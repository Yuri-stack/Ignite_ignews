import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe";

// Salvar as informações de Inscrição no Banco de dados 
export async function saveSubscription(subscriptionId: string, customerId: string){
    
    // Buscar o usuário no banco do FaunaDB com o ID
    const userRef = await fauna.query(
        // Seleciona a ref do User no Fauna, verificando se algum registro é idêntico ao parametro customerId
        q.Select("ref", q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
    )

    // Pego a Subscription/Inscrição gerada, verificando com o parametro
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    // Salvar os dados da Subscription/Inscrição no FaunaDB
    await fauna.query(
        q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    )
}