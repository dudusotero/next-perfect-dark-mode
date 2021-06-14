import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { DarkModeScriptTag } from '../lib/dark-mode'

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <DarkModeScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
