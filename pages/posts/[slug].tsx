import { ReactElement, useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { gql, GraphQLClient } from 'graphql-request'
import Image from 'next/image'
import { globalContext } from '../../store/store'

type PostParams = {
  post: any
  slug: string
}

const Post: ({ post, slug }: PostParams) => JSX.Element = ({
  post,
  slug,
}: PostParams) => {
  const router = useRouter()
  const { globalState, dispatch } = useContext(globalContext)

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  // useEffect(
  //   () => dispatch({ type: 'SELECT_ROUTE', payload: `/posts/${slug}` }),
  //   [router]
  // )

  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:Href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return post ? (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="canonical" href={`https://romainlavoix.com/posts/${slug}`} />
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
        <div className="col-span-12 col-start-1  lg:col-span-10 lg:col-start-2">
          <article className="prose-h5:font-roboto prose prose-slate mt-10 font-merriweather prose-h2:font-roboto prose-h3:font-roboto prose-a:text-blue-600 ">
            <h2>{post.title}</h2>
            <h5 className="opacity-50">
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
              }).format(new Date(post.date))}
            </h5>
            {post.blocks ? (
              post.blocks.map(
                (block: {
                  alt: string
                  title: string
                  id: string
                  content?: any
                  image?: any
                  video?: any
                }) =>
                  block.content ? (
                    <div
                      key={block.id}
                      dangerouslySetInnerHTML={{ __html: block.content?.html }}
                    ></div>
                  ) : (
                    <p key={block.id}>
                      {block.video ? (
                        <video
                          key={block.video.id}
                          autoPlay
                          muted
                          loop
                          playsInline
                          width={block.video.width}
                          height={block.video.height}
                        >
                          <source type="video/mp4" src={block.video.url} />
                        </video>
                      ) : (
                        <Image
                          key={block.image.id}
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
                      )}
                    </p>
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
      Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  })

  const { posts } = await graphcms.request(gql`
    {
      posts {
        slug
      }
    }
  `)
  const paths = posts.map((post: { slug: string }) => {
    return {
      params: {
        slug: post.slug,
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
      Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  })

  const { posts, post } = await graphcms.request(
    gql`
      query getPosts($slug: String!) {
        posts {
          date
          slug
          title
        }
        post(where: { slug: $slug }) {
          date
          slug
          title
          description
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
            ... on Video {
              title
              id
              video {
                url
                height
                width
              }
            }
          }
        }
      }
    `,
    {
      slug: params.slug,
    }
  )

  return {
    props: { posts, post, slug: params.slug },
  }
}

// @ts-ignore
Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      posts={page.props.posts ?? []}
      slug={page.props.slug ?? ''}
      fullscreen={false}
    >
      {page}
    </Layout>
  )
}

export default Post
