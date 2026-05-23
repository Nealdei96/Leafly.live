import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { homeOutline, personOutline, listOutline } from 'ionicons/icons'
import { Home } from '@/pages/Home'
import { Auth } from '@/pages/Auth'
import { useAuth } from '@/hooks/useAuth'

function AppContent() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // Handle Capacitor initialization if running on mobile
    const initCapacitor = async () => {
      try {
        const { StatusBar } = await import('@capacitor/status-bar')
        const { App } = await import('@capacitor/app')
        
        // Set status bar style
        await StatusBar.setStyle({ style: 'DARK' })
        
        // Handle app quit
        App.addListener('appStateChange', ({ isActive }) => {
          if (!isActive) {
            // App went to background
          } else {
            // App came to foreground
          }
        })
      } catch (error) {
        console.log('Capacitor not available or error initializing')
      }
    }

    initCapacitor()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile Navigation Tab Bar */}
      <nav className="border-t bg-white fixed bottom-0 left-0 right-0 flex justify-around">
        <button className="flex-1 py-3 text-center border-r flex flex-col items-center gap-1">
          <span className="text-green-600">🏠</span>
          <span className="text-xs text-gray-600">Home</span>
        </button>
        <button className="flex-1 py-3 text-center border-r flex flex-col items-center gap-1">
          <span>📝</span>
          <span className="text-xs text-gray-600">Bookings</span>
        </button>
        <button className="flex-1 py-3 text-center flex flex-col items-center gap-1">
          <span>👤</span>
          <span className="text-xs text-gray-600">Profile</span>
        </button>
      </nav>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
