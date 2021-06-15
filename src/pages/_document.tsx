import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { ThemeScriptTag } from '../lib/theme'

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <ThemeScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
