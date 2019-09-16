import React from 'react'

export default function useSiteHref() {
  const isClient = typeof window === 'object'
  const isServer = typeof process === 'object' //&& typeof process.env === 'object'
  
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

  const [href, setHref] = React.useState(getHref)

  React.useEffect(() => {
    const newHref = getHref()
    console.log('debug', newHref)
    console.log('debug', process.env)
    if (!newHref) { return false }

    setHref(newHref)
  }, [])

  console.log('debug', href)
  return href
}