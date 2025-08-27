'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
      })
      posthog.capture('app_loaded')
    }
  }, [])

  return <>{children}</>
}
