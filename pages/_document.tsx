import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full, overflow-auto">
        <Head>
          <title>Romain Lavoix</title>
          <meta
            property="og:image"
            content={'https://romainlavoix.com/ogimage.png'}
          />
          <meta property="og:image:width" content="1012" />
          <meta property="og:image:height" content="506" />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap"
            rel="stylesheet"
          />
          {/*  UI */}
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
            rel="stylesheet"
          />
          {/*  Headlines */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <meta name="Accept-Encoding" content="br" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
