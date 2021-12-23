import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'

import { getPrismicClient } from '../../services/prismic'

import styles from './posts.module.scss'

export default function Posts(){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={ styles.container }>
                <div className={ styles.posts }> 
                    <a href='#'>
                        <time>05 de março de 2020</time>
                        <strong>Titulo</strong>
                        <p>
                            Vercel criou o React Hook SWR para entregar uma melhor experiência ao usuário (UX), o segredo está em como a ferramenta lida com os dados que foram buscados independente da implementação do back end (Java, Node.js  PHP) e da API que a realiza a busca no Front End, por exemplo fetch API do JavaScript e Axios amplamente utilizados para essa finalidade.
                        </p>
                    </a>

                    <a href='#'>
                        <time>05 de março de 2020</time>
                        <strong>Titulo</strong>
                        <p>
                            Vercel criou o React Hook SWR para entregar uma melhor experiência ao usuário (UX), o segredo está em como a ferramenta lida com os dados que foram buscados independente da implementação do back end (Java, Node.js  PHP) e da API que a realiza a busca no Front End, por exemplo fetch API do JavaScript e Axios amplamente utilizados para essa finalidade.
                        </p>
                    </a>

                    <a href='#'>
                        <time>05 de março de 2020</time>
                        <strong>Titulo</strong>
                        <p>
                            Vercel criou o React Hook SWR para entregar uma melhor experiência ao usuário (UX), o segredo está em como a ferramenta lida com os dados que foram buscados independente da implementação do back end (Java, Node.js  PHP) e da API que a realiza a busca no Front End, por exemplo fetch API do JavaScript e Axios amplamente utilizados para essa finalidade.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ],{
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props: {}
    }
}