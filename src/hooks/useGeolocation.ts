import { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'

interface Location {
  latitude: number
  longitude: number
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = async () => {
    try {
      setLoading(true)
      const coordinates = await Geolocation.getCurrentPosition()
      setLocation({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location')
      setLocation(null)
    } finally {
      setLoading(false)
    }
  }

  return { location, loading, error, getCurrentLocation }
}
