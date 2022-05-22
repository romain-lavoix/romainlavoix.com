import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Layout from '../../components/Layout'
import Home from '../index'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { gql, GraphQLClient } from 'graphql-request'

type NextPageWithLayout = NextPage & {
  posts: any[]
  slug: string
}

type PostParams = {
  posts: any[]
  slug: string
}

const Post: ({ posts, slug }: PostParams) => JSX.Element = ({
  posts,
  slug,
}: PostParams) => {
  const router = useRouter()
  const post = posts
    ? posts.filter((p: { slug: any }) => p.slug === slug)[0]
    : null

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return post ? (
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
          <article
            className="prose prose-gray text-justify prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content?.html }}
          ></article>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}

export async function getStaticPaths() {
  const graphcms = new GraphQLClient(
    'https://api-ap-southeast-2.graphcms.com/v2/cl2if6btg541u01xr4rrn492a/master',
    {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
      },
    }
  )

  const { posts } = await graphcms.request(gql`
    {
      posts {
        slug
      }
    }
  `)
  return {
    paths: posts.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}

// @ts-ignore
export async function getStaticProps({ params }) {
  const graphcms = new GraphQLClient(
    'https://api-ap-southeast-2.graphcms.com/v2/cl2if6btg541u01xr4rrn492a/master',
    {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
      },
    }
  )

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

// @ts-ignore
Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout posts={page.props.posts ?? []} slug={page.props.slug ?? ''}>
      {page}
    </Layout>
  )
}

export default Post
