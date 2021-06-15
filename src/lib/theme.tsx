import { createContext, ReactNode, useEffect, useState } from 'react'

type ThemeOptions = 'light' | 'dark'

function setHtmlThemeClass() {
  const root = document.documentElement
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem(
    `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY}-theme`
  )
  if (
    typeof persistedPreference === 'string' &&
    (persistedPreference === 'light' || persistedPreference === 'dark')
  ) {
    root.classList.add(persistedPreference)
  } else {
    localStorage.removeItem(
      `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY}-theme`
    )
    root.classList.add(prefersDarkFromMQ ? 'dark' : 'light')
  }
}

export function ThemeScriptTag() {
  const boundFn = String(setHtmlThemeClass)
  const calledFunction = `(${boundFn})()`

  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}

export const ThemeContext = createContext<{
  selectedTheme: ThemeOptions | undefined
  setTheme: (value: ThemeOptions) => void
}>({ selectedTheme: undefined, setTheme: () => null })

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, rawSetTheme] = useState<ThemeOptions | undefined>(
    undefined
  )

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = root.className

    rawSetTheme(initialTheme as ThemeOptions)
  }, [])

  function setTheme(value: ThemeOptions) {
    const root = window.document.documentElement
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY}-theme`,
      value
    )
    root.classList.remove(...['light', 'dark'])
    root.classList.add(value)
    rawSetTheme(value)
  }

  return (
    <ThemeContext.Provider value={{ selectedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
