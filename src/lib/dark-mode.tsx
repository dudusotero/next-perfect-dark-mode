import { createContext, useState, useEffect, ReactNode } from 'react'

export const ThemeContext = createContext<{
  colorMode: 'light' | 'dark' | undefined
  setColorMode: (value: 'light' | 'dark') => void
} | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState<'light' | 'dark' | undefined>(
    undefined
  )

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    )
    rawSetColorMode(initialColorValue === 'dark' ? 'dark' : 'light')
  }, [])

  function setColorMode(value: 'light' | 'dark') {
    const root = window.document.documentElement
    rawSetColorMode(value)
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY}-color-mode`,
      value
    )
    root.classList.remove(...['light', 'dark'])
    root.classList.add(value)
  }

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const DarkModeScriptTag = () => {
  const codeToRunOnClient = `
    (function() {
      function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem(
          '${process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY}-color-mode'
        )
        const hasPersistedPreference = typeof persistedColorPreference === 'string'
        if (hasPersistedPreference) {
          return persistedColorPreference
        }
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const hasMediaQueryPreference = typeof mql.matches === 'boolean'
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light'
        }
        return 'light'
      }
      const colorMode = getInitialColorMode() === 'dark' ? 'dark' : 'light'
      const root = document.documentElement
      root.classList.add(colorMode)
      root.style.setProperty('--initial-color-mode', colorMode)
    })()
  `
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}
