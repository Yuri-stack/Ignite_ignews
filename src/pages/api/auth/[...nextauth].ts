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
        await fauna.query(  // Usando o Fauna, criamos uma query
          // A query criada, acessa as Collections users, e salva o email no campo data
          q.Create(q.Collection('users'), { data: { email } })
        )
        return true

      } catch (error) {
        console.log(error)

        return false
      }
    }
  }
})