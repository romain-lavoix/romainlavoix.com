import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Layout from '../components/Layout'
import Home from './index'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Setup: NextPageWithLayout = () => {
  return <>SETUP</>
}

export default Setup

Setup.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
