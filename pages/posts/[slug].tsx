import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Layout from '../../components/Layout'
import Home from '../index'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { gql, GraphQLClient } from 'graphql-request'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Post: NextPageWithLayout = (post) => {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Romain Lavoix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={post.title} key="title" />
        <meta name="description" content={post.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="romainlavoix.com" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-12 pb-16">
        <div className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2">
          <article className="prose prose-gray text-justify prose-a:text-blue-600"></article>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API || '', {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
  })

  const { posts } = await graphcms.request(gql`
    {
      posts {
        id
        slug
      }
    }
  `)
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API || '', {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
  })

  const { posts } = await graphcms.request(gql`
    {
      posts {
        id
        title
        slug
        description
        date
        content {
          html
        }
      }
    }
  `)

  return {
    props: { posts, slug: params.slug },
  }
}

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout posts={page.props.posts ?? []} slug={page.props.slug ?? ''}>
      {page}
    </Layout>
  )
}

export default Post
