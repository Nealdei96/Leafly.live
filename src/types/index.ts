export interface ServiceProvider {
  id: string
  user_id: string
  business_name: string
  description: string
  avatar_url?: string
  rating: number
  review_count: number
  latitude: number
  longitude: number
  service_area_radius: number
  hourly_rate: number
  availability: string[]
  created_at: string
}

export interface Service {
  id: string
  provider_id: string
  name: string
  description: string
  price: number
  duration_minutes: number
  category: string
  created_at: string
}

export interface Booking {
  id: string
  customer_id: string
  provider_id: string
  service_id: string
  scheduled_date: string
  scheduled_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  total_price: number
  notes?: string
  created_at: string
}

export interface Review {
  id: string
  booking_id: string
  provider_id: string
  customer_id: string
  rating: number
  comment: string
  created_at: string
}
