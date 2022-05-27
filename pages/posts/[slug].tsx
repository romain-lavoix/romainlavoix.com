import { NextPage } from 'next'
import { ReactElement } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { gql, GraphQLClient } from 'graphql-request'
import Image from 'next/image'

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
    ? posts.filter(
        (post: { meta: { slug: any } }) => post.meta.slug === slug
      )[0]
    : null

  if (!router.isFallback && !post?.meta.slug) {
    return <ErrorPage statusCode={404} />
  }

  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

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
          <article className="prose prose-gray text-justify prose-a:text-blue-600">
            {post.blocks ? (
              post.blocks.map(
                (block: {
                  alt: string
                  title: string
                  id: string
                  content?: any
                  image?: any
                }) =>
                  block.content ? (
                    <div
                      key={block.id}
                      dangerouslySetInnerHTML={{ __html: block.content?.html }}
                    ></div>
                  ) : (
                    <Image
                      key={block.id}
                      src={block.image.url}
                      width={block.image.width}
                      height={block.image.height}
                      alt={block.alt}
                      title={block.title}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                    />
                  )
              )
            ) : (
              <></>
            )}
          </article>
        </div>
      </div>
    </>
  ) : (
    <></>
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
        meta {
          slug
        }
      }
    }
  `)

  const paths = posts.map((post: { meta: { slug: any } }) => {
    return {
      params: {
        slug: post.meta.slug,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

// @ts-ignore
export async function getStaticProps({ params }) {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API || '', {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
  })

  const { posts } = await graphcms.request(gql`
    {
      posts {
        date
        meta {
          title
          description
          slug
        }
        blocks {
          ... on Content {
            id
            content {
              html
            }
          }
          ... on Image {
            id
            alt
            title
            image {
              fileName
              url
              width
              height
            }
          }
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
