import type { NextPage } from 'next'
import Head from 'next/head'
import { LoremIpsum } from 'lorem-ipsum'
import MenuLink from '../components/MenuLink'
import Link from 'next/Link'
import Image from 'next/image'

const Home: NextPage = () => {
  const title = 'Romain Lavoix'
  const description =
    'Full Stack Engineer and Product Owner turned Front-End Engineer'
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  })
  return (
    <>
      <Head>
        <title>Romain Lavoix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="romainlavoix.com" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-32 h-screen w-full lg:flex">
        <nav
          className="flex:none hidden w-56 border-r-[1px] bg-gray-50 p-4 lg:block"
          aria-label="Sidebar"
        >
          <h1 className="pl-2 pb-6 text-sm font-bold antialiased">
            Romain Lavoix
          </h1>
          <MenuLink title={'Home'} />
        </nav>
        <div className="flex h-screen w-full justify-center p-4 pt-32 antialiased">
          <div>
            <div className="grid grid-cols-12 gap-4 pb-16">
              <div className="col-span-10 col-start-2">
                <div className="relative float-left mr-2 h-[120px] w-[120px] rounded border">
                  <Image
                    src="/rom_grey.jpg"
                    alt="picture of author"
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  ></Image>
                </div>
                <article className="prose prose-sm prose-slate lg:prose-base">
                  <p>
                    Hi, I'm Romain. I'm a software engineer and product owner,
                    experienced in working across the whole stack, and in
                    shipping web applications as well as enterprise softwares.
                  </p>
                  <p>
                    After graduating from EPITA in Paris, I built, maintained
                    and supported a hugely complex risk analysis software at
                    Calypso Technology, San Francisco. We had clients like
                    Goldman Sachs, Morgan Stanly or Natixis.
                  </p>
                  <p>
                    However, I was extremly interested by the rise of web
                    applications and decided to teach myself web technologies,
                    which sent me on a path of consulting, freelancing, and
                    product creation, which I wasn't aware of yet.
                  </p>
                  <p>
                    After coming back to New Caledonia, and a short stint in
                    Sydney working as a Software Engineer for clients like
                    Qantas via OCTO Technology, I wanted to find a way to
                    contribute to the digital life of my country.
                  </p>
                  <p>
                    Amongst other things, I released a local search engine
                    indexing 1M pages and hosting 30k visitors and 150k searchs
                    a month, advised and invested in a ride hailing app, teached
                    children robotics, released an appointment booking service,
                    and was an associate at a local development firm specialized
                    in start-ups, with a blockchain powered crowd-testing web
                    app as a first released product.
                  </p>
                </article>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <a href="https://poly.work/romain_lavoix">View changelog</a>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1">
                <p className="text-gray-400">Online</p>
              </div>
              <div className="col-span-10 flex items-center gap-4">
                <Link href={'/'}>
                  <a className="font-bold">Twitter</a>
                </Link>
                <div className="w-full border-t-[1px] border-dashed border-gray-300"></div>
                <p className="text-gray-500">Follow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
