import { useEffect, useState } from 'react'

export function useViewport() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    width,
    isMobile: width < 900,
    isTablet: width >= 900 && width < 1280,
    isDesktop: width >= 1280,
  }
}
