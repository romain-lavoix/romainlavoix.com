// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API || '', {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
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

  const fields = posts.map((post: { meta: { slug: string } }) => {
    return {
      loc: `https://romainlavoix.com/posts/${post.meta.slug}`, // Absolute url
      lastmod: new Date().toISOString(),
    }
  })

  fields.unshift(`https://romainlavoix.com`)

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
