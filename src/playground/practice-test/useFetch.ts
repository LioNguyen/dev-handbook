// hooks/useFetch.ts
import { useEffect, useState } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!url) return
    setLoading(true)
    setError('')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch error')
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
