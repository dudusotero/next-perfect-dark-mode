import { Switch } from '@headlessui/react'

import { useTheme } from '../../hooks'

export function ThemeToggle() {
  const { selectedTheme, setTheme } = useTheme()

  function handleChange(value: boolean) {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="sr-only">Dark mode</Switch.Label>
        <Switch
          checked={selectedTheme === 'dark'}
          onChange={handleChange}
          className={`${
            selectedTheme === 'dark' ? 'bg-blue-400' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-600`}
        >
          <span
            className={`${
              selectedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
