import React from 'react'

export default function useSiteHref() {
  const isClient = typeof window === 'object'
  const isServer = typeof process === 'object' && typeof process.env === 'object'
  
  function getHref() {
    return (
      isClient ? window.location :
      isServer ? getHrefByEnv() :
      undefined
    )
  }

  function getHrefByEnv() {
    return process.env.PULL_REQUEST ? process.env.DEPLOY_URL : process.env.URL
  }

  const [location, setLocation] = React.useState(getHref)

  React.useEffect(() => {
    if (isClient) {
      setLocation(window.location)  
    } else if (isServer) {
      setLocation(getHrefByEnv())
    } else {
      return false
    }
  }, [])

  return location
}