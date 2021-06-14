import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html className="dark">
        <Head />
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
