/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'

import { ThemeContext } from '../../lib/dark-mode'

export const ThemeToggle = () => {
  const { colorMode, setColorMode }: any = useContext(ThemeContext)

  if (!colorMode) {
    return null
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={colorMode === 'dark'}
        onChange={(ev) => {
          setColorMode(ev.target.checked ? 'dark' : 'light')
        }}
      />
      Dark
    </label>
  )
}
