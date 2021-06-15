import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import { ThemeProvider } from '../lib/dark-mode'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
