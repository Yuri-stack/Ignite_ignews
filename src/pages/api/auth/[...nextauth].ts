import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        await fauna.query(  // Usando o Fauna, criamos queries através do método query(q)

          // Query: Se não existe o email no BD que "bate"(Match) com o enviado pelo Github 
          q.If(q.Not(q.Exists
            (q.Match(q.Index('users_by_email'), // Index: "funções" prontas do BD para retornar dados
              q.Casefold(user.email)  // Query: ignorar o Case(maiusc. e minusc.) do email
            ))),

            // Query: Acessa as Collections(table) users, e salva o email no campo data
            q.Create(q.Collection('users'), { data: { email } }),

            // Query: Senão, busca o email que "bate"(Match) com o enviado pelo Github
            q.Get(q.Match(
              q.Index('users_by_email'), q.Casefold(user.email)
            ))
          )
        )
        return true

      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})