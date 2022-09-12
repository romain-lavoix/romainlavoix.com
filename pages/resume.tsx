import { ReactElement, ReactNode } from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { gql, GraphQLClient } from 'graphql-request'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Resume: NextPageWithLayout = () => {
  const title = 'Romain Lavoix - Software Engineer - Resume'

  const description = `Full Stack Software Engineer with 10 years of experience in shipping web applications and enterprise systems.`

  return (
    <>
      <Head>
        <title>{'Romain Lavoix - Software Engineer - Resume'}</title>
        <link rel="canonical" href="https://romainlavoix.com/resume" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={
            'Full Stack Software Engineer with 10 years of experience in shipping web applications and enterprise systems.'
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://romainlavoix.com/resume" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <iframe
        src="resume.pdf#toolbar=1&view=Fit"
        className="h-screen w-full"
      ></iframe>
    </>
  )
}

export async function getStaticProps() {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API || '', {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
  })

  const { posts } = await graphcms.request(gql`
    {
      posts {
        date
        slug
        title
      }
    }
  `)

  return {
    props: { posts },
  }
}

Resume.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout posts={page.props.posts} fullscreen={true}>
      {page}
    </Layout>
  )
}

export default Resume
