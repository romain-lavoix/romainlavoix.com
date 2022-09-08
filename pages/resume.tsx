import { ReactElement } from 'react'
import Layout from '../components/Layout'
import { gql, GraphQLClient } from 'graphql-request'

const Resume = () => {
  return (
    <iframe
      src="resume.pdf#toolbar=1&view=Fit"
      className="h-screen w-full"
    ></iframe>
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
