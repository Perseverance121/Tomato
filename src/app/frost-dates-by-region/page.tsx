import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocationsByRegion } from '@/lib/locations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'UK Last Frost Dates by Region | Every Major City & Town',
  description: 'Last frost dates for every major UK city and town. Find your local frost date for London, Manchester, Edinburgh, Cardiff and 40+ more UK locations.',
  keywords: 'UK last frost dates, frost dates by region, last frost date UK cities, frost date map UK, when is last frost UK',
}

const regionOrder = [
  'London', 'South East', 'South West', 'East of England',
  'West Midlands', 'East Midlands', 'Yorkshire', 'North West',
  'North East', 'Wales', 'Scotland', 'Northern Ireland'
]

const regionEmoji: Record<string, string> = {
  'London': '🏙️',
  'South East': '🌊',
  'South West': '🌿',
  'East of England': '🌾',
  'West Midlands': '🏭',
  'East Midlands': '🌻',
  'Yorkshire': '🐑',
  'North West': '☁️',
  'North East': '⛵',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Northern Ireland': '☘️',
}

export default function FrostDatesByRegion() {
  const byRegion = getLocationsByRegion()

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, hsl(200 40% 95%), hsl(32 20% 97%))' }}>
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div style={{ width:34,height:34,background:'hsl(140 60% 35%)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17 }}>🌱</div>
            <div>
              <div style={{ fontFamily:'Georgia,serif', fontWeight:700, fontSize:16, color:'hsl(140 60% 35%)' }}>Grow Safe Guide</div>
              <div style={{ fontSize:11, color:'#7a8f76' }}>Last frost dates for UK gardeners</div>
            </div>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">Frost Checker</Link>
            <Link href="/planting-calendar" className="text-muted-foreground hover:text-primary">Planting Calendar</Link>
            <Link href="/frost-dates-by-region" className="text-primary font-medium">All Locations</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <span className="text-foreground">Frost Dates by Region</span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily:'Georgia,serif' }}>
            UK Last Frost Dates by Region
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Average last frost dates for 40+ UK cities and towns. Find your area and know exactly when you can safely plant tomatoes, peppers and other tender crops outside.
          </p>
        </div>

        {/* Key pattern callout */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-4 pb-4 text-sm">
            <div className="font-semibold mb-2">📊 UK Frost Date Pattern</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { region: 'Cornwall & Coast', date: 'Late March', color: 'bg-green-100' },
                { region: 'Southern England', date: 'Early April', color: 'bg-green-100' },
                { region: 'Midlands', date: 'Late April', color: 'bg-yellow-100' },
                { region: 'North & Scotland', date: 'May–June', color: 'bg-red-100' },
              ].map(r => (
                <div key={r.region} className={`p-2 rounded-lg ${r.color}`}>
                  <div className="font-medium text-xs">{r.region}</div>
                  <div className="font-bold text-sm mt-0.5">{r.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regions */}
        <div className="space-y-6">
          {regionOrder.map(region => {
            const locations = byRegion[region]
            if (!locations?.length) return null
            return (
              <Card key={region}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    {regionEmoji[region]} {region}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {locations.map(loc => (
                      <Link
                        key={loc.slug}
                        href={`/last-frost-date/${loc.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all no-underline group"
                      >
                        <div>
                          <div className="font-medium text-sm group-hover:text-primary">{loc.name}</div>
                          {loc.county && <div className="text-xs text-muted-foreground">{loc.county}</div>}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-primary">{loc.lastFrostDate}</div>
                          <div className="text-xs text-muted-foreground">{loc.frostFreeDays} frost-free days</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* When to plant links */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily:'Georgia,serif' }}>Crop-Specific Planting Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji:'🍅', name:'Tomatoes', slug:'tomatoes' },
              { emoji:'🌶️', name:'Peppers', slug:'peppers' },
              { emoji:'🥒', name:'Courgettes', slug:'courgettes' },
              { emoji:'🫘', name:'Beans', slug:'beans' },
              { emoji:'🌽', name:'Sweetcorn', slug:'sweetcorn' },
              { emoji:'🎃', name:'Squash', slug:'squash' },
              { emoji:'🌿', name:'Basil', slug:'basil' },
              { emoji:'🥒', name:'Cucumbers', slug:'cucumbers' },
            ].map(p => (
              <Link
                key={p.slug}
                href={`/when-to-plant/${p.slug}`}
                className="flex flex-col items-center gap-1 p-3 bg-white border border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all no-underline group text-sm"
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-medium group-hover:text-primary">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-10 border-primary/20 bg-primary/5">
          <CardContent className="pt-5 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-semibold mb-1">Get live frost data for your exact location</div>
              <div className="text-sm text-muted-foreground">The dates above are averages. Get real-time weather and 14-day forecast for your specific postcode area.</div>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap hover:bg-primary/90 transition-colors no-underline">
              📍 Check Live Forecast
            </Link>
          </CardContent>
        </Card>
      </div>

      <footer className="border-t bg-white/50 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Grow Safe Guide · Frost dates are historical averages. Always verify with a current weather forecast before planting.
        </div>
      </footer>
    </main>
  )
}
