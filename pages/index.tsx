import type { NextPage } from 'next'
import Head from 'next/head'
import { LoremIpsum } from 'lorem-ipsum'
import { HomeIcon, PencilIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import MenuLink from '../components/MenuLink'
import { Menu } from '@headlessui/react'

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
      <div className="h-screen w-full lg:flex">
        <nav
          className="flex:none hidden w-56 bg-gray-50 p-4 lg:block"
          aria-label="Sidebar"
        >
          <h1 className="pb-6 font-bold antialiased">Romain Lavoix</h1>
          <MenuLink title={'Home'} />
        </nav>
        <div className="flex:auto flex h-screen w-full w-full justify-center  pt-32 antialiased">
          <article className="prose prose-sm prose-slate p-4 lg:prose-base">
            <h2>Hello</h2>
            <p>{lorem.generateSentences(1)}</p>
            <p>{lorem.generateParagraphs(1)}</p>
            <p>{lorem.generateParagraphs(1)}</p>
          </article>
        </div>
      </div>
    </>
  )
}

export default Home
