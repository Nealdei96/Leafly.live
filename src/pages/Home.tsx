import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useGeolocation } from '@/hooks/useGeolocation'
import { supabase } from '@/lib/supabase'
import type { ServiceProvider } from '@/types'

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { location, getCurrentLocation } = useGeolocation()
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(false)
  const [searchRadius] = useState(25) // kilometers

  useEffect(() => {
    if (user && location) {
      fetchNearbyProviders()
    }
  }, [user, location])

  const fetchNearbyProviders = async () => {
    if (!location) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .lte('service_area_radius', searchRadius)
        .order('rating', { ascending: false })

      if (error) throw error
      setProviders(data || [])
    } catch (error) {
      console.error('Error fetching providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetStarted = () => {
    if (!user) {
      navigate('/login')
    } else {
      getCurrentLocation()
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leafly Live</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find professional lawn care services in your area
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Find Services</h1>
          <p className="text-gray-600">Professional lawn care providers near you</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search providers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <Button
          onClick={getCurrentLocation}
          variant="outline"
          className="w-full"
        >
          <MapPin className="mr-2" size={18} />
          Use My Location
        </Button>
      </div>

      {/* Providers List */}
      <div className="max-w-md mx-auto px-4 space-y-3">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading providers...</div>
        ) : providers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No providers found nearby</div>
        ) : (
          providers.map((provider) => (
            <Card
              key={provider.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/provider/${provider.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {provider.business_name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {provider.description}
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-gray-500 ml-1">({provider.review_count})</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600 mt-2">
                      ${provider.hourly_rate}/hr
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
