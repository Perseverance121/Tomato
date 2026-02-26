'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Thermometer, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { fetchWeather, calculateFrostData, type WeatherData, type FrostData } from '@/lib/weather'
import TemperatureHistory from '@/components/TemperatureHistory'
import EmailSubscription from '@/components/EmailSubscription'
import AdUnit from '@/components/AdUnit'

interface LocationData {
  latitude: number
  longitude: number
}

export default function FrostTracker() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [frost, setFrost] = useState<FrostData | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherLoading, setWeatherLoading] = useState(false)

  const getLocation = () => {
    setLoading(true)
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      () => {
        toast.error('Unable to get your location. Please enable location services.')
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (!location) return

    setWeatherLoading(true)
    fetchWeather(location.latitude, location.longitude)
      .then((data) => {
        setWeather(data)
        setFrost(calculateFrostData(location.latitude, data))
        toast.success('Live weather data loaded for your location.')
      })
      .catch(() => {
        toast.error('Unable to fetch weather data. Please try again.')
      })
      .finally(() => setWeatherLoading(false))
  }, [location])

  const getPlantingStatus = () => {
    if (!frost) return null
    if (frost.isSafeToPlant) {
      return { status: 'safe', message: 'Safe to plant tomatoes outside! 🍅', icon: CheckCircle, colorClass: 'bg-green-500 text-white', borderClass: 'border-green-400' }
    } else if (frost.daysUntilSafe === 0 && frost.nextColdNight) {
      return { status: 'warning', message: 'Cold nights expected — hold off for now', icon: AlertTriangle, colorClass: 'bg-amber-400 text-amber-900', borderClass: 'border-amber-400' }
    } else {
      return { status: 'wait', message: `Wait ${frost.daysUntilSafe} more days`, icon: AlertTriangle, colorClass: 'bg-red-500 text-white', borderClass: 'border-red-400' }
    }
  }

  const plantingStatus = getPlantingStatus()

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">

      {/* Location Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Your Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!location ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4 text-sm">
                We need your location to calculate your local last frost date and live weather conditions.
              </p>
              <Button onClick={getLocation} disabled={loading} size="lg">
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Getting Location...</>
                ) : (
                  <><MapPin className="h-4 w-4 mr-2" /> Check My Frost Risk</>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                📍 {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°
                {location.longitude > 0 ? 'E' : 'W'}
              </Badge>
              <Button variant="outline" size="sm" onClick={getLocation} disabled={weatherLoading}>
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading state */}
      {weatherLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3 text-muted-foreground py-6">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Fetching live weather data...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Status Card */}
      {plantingStatus && !weatherLoading && (
        <Card className={`border-2 ${plantingStatus.borderClass}`}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${plantingStatus.colorClass}`}>
                <plantingStatus.icon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{plantingStatus.message}</h2>
                {frost && (
                  <div className="mt-2 space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Estimated last frost date for your area: <strong>{frost.lastFrostEstimate}</strong>
                      <Badge variant="outline" className="ml-2 text-xs">{frost.confidence} confidence</Badge>
                    </p>
                    {frost.nextColdNight && (
                      <p className="text-sm text-amber-700 font-medium">
                        ⚠️ Next cold night forecast: {frost.nextColdNight}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad unit */}
      {location && <AdUnit adSlot="YOUR_AD_SLOT_ID" adFormat="horizontal" />}

      {/* Weather Info */}
      {weather && !weatherLoading && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Current Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold">{weather.temperature}°C</div>
                <div className="text-muted-foreground mt-1">{weather.conditions}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>14-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weather.forecast.slice(0, 7).map((day, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{day.date}</span>
                    <div className="flex items-center gap-2">
                      <span>{day.minTemp}° / {day.maxTemp}°</span>
                      {day.minTemp <= 0 && <Badge variant="destructive" className="text-xs">Frost</Badge>}
                      {day.minTemp > 0 && day.minTemp < 4 && <Badge className="text-xs bg-amber-400 text-amber-900 hover:bg-amber-400">Cold</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Alerts */}
      <EmailSubscription />

      {/* Temperature History - only shown once location is known */}
      {location && !weatherLoading && (
        <TemperatureHistory lat={location.latitude} lon={location.longitude} />
      )}

      {/* Gardening Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Planting Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>🍅 <strong>Tomatoes & peppers</strong> — only plant outside when nights consistently stay above 10°C and all frost risk has passed.</p>
            <p>🥒 <strong>Courgettes & cucumbers</strong> — very frost-sensitive. Wait until late May in most of England, June in Scotland.</p>
            <p>🌿 <strong>Basil</strong> — the most cold-sensitive of all. Don't risk it until overnight lows are reliably above 12°C.</p>
            <p>🛡️ <strong>Hardening off</strong> — always acclimatise indoor-grown seedlings by leaving them outside during the day for 1–2 weeks before planting out.</p>
            <p>📅 <strong>Check your forecast</strong> — last frost dates are averages. Always check the 14-day forecast before planting tender crops.</p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom ad */}
      <AdUnit adSlot="YOUR_AD_SLOT_ID_2" adFormat="rectangle" />

    </div>
  )
}
