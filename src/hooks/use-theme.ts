import { useContext } from 'react'

import { ThemeContext } from '../lib/theme'

export const useTheme = () => useContext(ThemeContext)
