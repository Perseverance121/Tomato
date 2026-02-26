export interface WeatherData {
  temperature: number
  conditions: string
  forecast: Array<{
    date: string
    minTemp: number
    maxTemp: number
  }>
}

export interface FrostData {
  safeToPlantDate: string
  nextColdNight: string | null
  isSafeToPlant: boolean
  daysUntilSafe: number
  confidence: 'high' | 'medium' | 'low'
  lastFrostEstimate: string
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=14`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch weather data')

  const data = await res.json()

  const wmoToCondition = (code: number): string => {
    if (code === 0) return 'Clear sky'
    if (code <= 3) return 'Partly cloudy'
    if (code <= 49) return 'Foggy'
    if (code <= 67) return 'Rainy'
    if (code <= 77) return 'Snowy'
    if (code <= 82) return 'Showers'
    return 'Thunderstorm'
  }

  const forecast = data.daily.time.map((date: string, i: number) => ({
    date: new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
    minTemp: Math.round(data.daily.temperature_2m_min[i]),
    maxTemp: Math.round(data.daily.temperature_2m_max[i]),
  }))

  return {
    temperature: Math.round(data.current.temperature_2m),
    conditions: wmoToCondition(data.current.weathercode),
    forecast,
  }
}

export async function fetchHistoricalTemperatures(lat: number, lon: number) {
  // Get last 90 days of actual historical data
  const endDate = new Date()
  endDate.setDate(endDate.getDate() - 1) // yesterday (today not complete)
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 91)

  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${fmt(startDate)}&end_date=${fmt(endDate)}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch historical data')

  const data = await res.json()

  return data.daily.time.map((date: string, i: number) => ({
    date: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
    high: Math.round(data.daily.temperature_2m_max[i]),
    low: Math.round(data.daily.temperature_2m_min[i]),
    avg: Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2),
  }))
}

export function calculateFrostData(lat: number, weather: WeatherData): FrostData {
  const now = new Date()

  // Estimate last frost date based on latitude
  // UK latitudes roughly 50-59°N
  let safeMonth = 4 // May default (month index)
  let safeDay = 15
  if (lat >= 57) { safeMonth = 5; safeDay = 1 }       // Scotland/N. Scotland: June
  else if (lat >= 54) { safeMonth = 4; safeDay = 20 }  // N. England: late May
  else if (lat >= 51) { safeMonth = 4; safeDay = 7 }   // Midlands/London: early May
  else { safeMonth = 3; safeDay = 20 }                  // SW England: late April

  const safeDate = new Date(now.getFullYear(), safeMonth, safeDay)
  // If we've passed this year's date, it's safe
  const daysUntilSafe = Math.max(0, Math.ceil((safeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

  const nextColdNight = weather.forecast.find(day => day.minTemp < 4) // frost risk below 4°C

  return {
    safeToPlantDate: safeDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    lastFrostEstimate: safeDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    nextColdNight: nextColdNight?.date ?? null,
    isSafeToPlant: daysUntilSafe === 0 && !nextColdNight,
    daysUntilSafe,
    confidence: daysUntilSafe < 7 ? 'high' : daysUntilSafe < 21 ? 'medium' : 'low',
  }
}
