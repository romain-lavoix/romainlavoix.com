import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/*  article */}
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather&display=optional"
            rel="stylesheet"
          />
          {/*  UI */}
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=optional"
            rel="stylesheet"
          />
          {/*  Headlines */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=optional"
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
