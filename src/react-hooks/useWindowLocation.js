import React from 'react'

export default function useWindowLocation() {
  const isClient = typeof window === 'object'
  
  function getLocation() {
    return isClient ? window.location : undefined
  }

  const [location, setLocation] = React.useState(getLocation)

  React.useEffect(() => {
    if (!isClient) { return false }

    setLocation(window.location)
  }, [])

  return location
}