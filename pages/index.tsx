import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HomeLink from '../components/HomeLink'
import HomeLinkTitle from '../components/HomeLinkTitle'
import Layout from '../components/Layout'
import { ReactElement, ReactNode, useContext } from 'react'
import { GraphQLClient, gql } from 'graphql-request'
const rom_grey = require('../public/rom_grey.jpg')
const map = require('../public/map.png')
import Link from 'next/link'
import { useRouter } from 'next/router'
import { globalContext } from '../store/store'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Home: NextPageWithLayout = () => {
  const { globalState, dispatch } = useContext(globalContext)
  const router = useRouter()

  const title =
    'Romain Lavoix - Software Engineer - Web Applications Specialist'
  const description = `I'm a Software Engineer with ten years of experience shipping web applications and enterprise systems. My current focus is Front-End Engineering.`
  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Romain Lavoix',
    url: 'https://romainlavoix.com',
    image:
      'https://romainlavoix.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2From_grey.fa0cdb6d.jpg&w=3840&q=75',
    sameAs: [
      'https://romainlavoix.com',
      'https://www.linkedin.com/in/romain-lavoix/',
      'https://github.com/romain-lavoix',
    ],
    jobTitle: 'Software Engineer',
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href="https://romainlavoix.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="romainlavoix.com" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className="grid grid-cols-12 pt-12">
        <div className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2">
          <div className="relative float-left mr-2 h-[120px] w-[120px] rounded border">
            <Image
              src={rom_grey}
              title="romain lavoix portrait"
              alt="picture of romain lavoix"
              layout="responsive"
              width={118}
              height={118}
              className="rounded"
              placeholder="blur"
              priority={true}
            ></Image>
          </div>
          <article className="prose prose-slate text-justify font-merriweather prose-a:text-blue-600">
            <p>
              Hi, I'm Romain. I'm a software engineer and product owner,
              experienced in working across the whole stack, and in shipping web
              applications as well as enterprise softwares.
            </p>
            <p>
              After graduating from{' '}
              <a
                className=" no-underline hover:underline"
                target="_blank"
                href="https://www.epita.fr/en/"
              >
                EPITA
              </a>{' '}
              in Paris, I built, maintained and supported a hugely complex risk
              analysis software at{' '}
              <Link href="/posts/my-experience-as-a-financial-software-engineer-in-san-francisco">
                <a className=" no-underline hover:underline">
                  Calypso Technology
                </a>
              </Link>
              , San Francisco. We had clients like Goldman Sachs, Morgan Stanly
              or Natixis.
            </p>
            <p>
              However, I was extremly interested by the rise of web applications
              and decided to teach myself web technologies, which sent me on a
              path of consulting, freelancing, and product creation, which I
              wasn't aware of yet.
            </p>
            <p>
              After coming back to New Caledonia, and a short stint in Sydney
              working as a Software Engineer for clients like Qantas via{' '}
              <a
                className=" no-underline hover:underline"
                target="_blank"
                href="https://www.octo.com/en"
              >
                OCTO Technology
              </a>
              , I wanted to find a way to contribute to the digital life of my
              country.
            </p>
            <p>
              Amongst other things, I released a local{' '}
              <Link href="/posts/how-i-created-a-search-engine-for-new-caledonia">
                <a
                  className=" no-underline hover:underline"
                  onClick={(e) => {
                    const route =
                      '/posts/how-i-created-a-search-engine-for-new-caledonia'
                    e.preventDefault()
                    dispatch({ type: 'SELECT_ROUTE', payload: route })
                    router.push(route)
                  }}
                >
                  search engine
                </a>
              </Link>{' '}
              indexing 1M pages and hosting 30k visitors and 150k searchs a
              month, advised and invested in a ride hailing app, teached
              children robotics, released an{' '}
              <a
                className=" no-underline hover:underline"
                target="_blank"
                href="https://rendezvous.nc"
              >
                appointment booking service
              </a>
              , and was an associate at a local development firm specialized in
              start-ups, with a blockchain powered crowd-testing web app as a
              first released product.
            </p>
            <p>
              You will find my resume{' '}
              <Link href="/resume">
                <a className=" no-underline hover:underline">here</a>
              </Link>
              .
            </p>
          </article>
          <button
            type="button"
            className="mt-6 mb-16 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 font-lato text-xs font-bold text-gray-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <a target="_blank" href="https://poly.work/romainlavoix">
              View changelog
            </a>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 pb-16 font-lato">
        <HomeLinkTitle title={'Work'} />
        <HomeLink
          title={'TealForge'}
          link={new URL('https://tealforge.com/')}
          subtitle={'Associate'}
          subtitle2={'2019-2020'}
        />
        <HomeLink
          title={'ClacTaCom'}
          link={
            new URL(
              'https://romainlavoix.com/posts/how-i-created-a-search-engine-for-new-caledonia'
            )
          }
          subtitle={'CTO'}
          subtitle2={'2017-2019'}
        />
        <HomeLink
          title={'Octo Technology Aus'}
          link={new URL('https://www.octo.com/en/')}
          subtitle={'Software Engineer'}
          subtitle2={'2016'}
        />
        <HomeLink
          title={'CAFAT'}
          link={new URL('https://www.cafat.nc/')}
          subtitle={'Technical Architect'}
          subtitle2={'2015'}
        />
        <HomeLink
          title={'Calypso Technology'}
          link={new URL('https://calypso.com/')}
          subtitle={'Software Engineer'}
          subtitle2={'2010-2014'}
        />
        <HomeLink
          title={'Siemens Bangalore'}
          link={new URL('https://siemens.com/')}
          subtitle={'Software Eng Intern'}
          subtitle2={'2007'}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 pb-16 font-lato">
        <HomeLinkTitle title={'Where'} />
        <div className="col-span-12 items-center gap-4 lg:col-span-10 lg:col-start-2">
          <div className="relative mb-2 h-[300px] w-full">
            <Image
              title="new caledonia map"
              alt={'new caledonia map'}
              src={map}
              className="rounded-3xl"
              layout="responsive"
              width={652}
              height={300}
              placeholder="blur"
              loading={'lazy'}
            />
          </div>
          <div className="grid justify-items-end">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p className="text-gray-400">Noumea, New Caledonia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 pb-16 font-lato ">
        <HomeLinkTitle title={'Online'} />
        <HomeLink
          title={'Twitter'}
          link={new URL('https://twitter.com/romain_lavoix')}
          subtitle={'Subscribe'}
        />
        <HomeLink
          title={'Polywork'}
          link={new URL('https://www.polywork.com/romainlavoix')}
          subtitle={'Follow'}
        />
        <HomeLink
          title={'Github'}
          link={new URL('https://github.com/romain-lavoix')}
          subtitle={'View'}
        />
        <HomeLink
          title={'Overflow'}
          link={
            new URL('https://stackoverflow.com/users/2617419/romain-lavoix')
          }
          subtitle={'View'}
        />
        <HomeLink
          title={'LinkedIn'}
          link={new URL('https://www.linkedin.com/in/romain-lavoix/')}
          subtitle={'View'}
        />
      </div>
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

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout posts={page.props.posts} fullscreen={false}>
      {page}
    </Layout>
  )
}

export default Home
