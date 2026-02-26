import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocationBySlug, getAllLocationSlugs, getLocationsByRegion } from '@/lib/locations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  params: { location: string }
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map(slug => ({ location: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = getLocationBySlug(params.location)
  if (!loc) return {}

  return {
    title: `Last Frost Date ${loc.name} | When to Plant Tomatoes in ${loc.name}`,
    description: `Find the last frost date for ${loc.name}, ${loc.region}. Know exactly when it's safe to plant tomatoes, peppers and tender plants outside in ${loc.name}. Average last frost: ${loc.lastFrostDate}.`,
    keywords: `last frost date ${loc.name}, when to plant tomatoes ${loc.name}, frost date ${loc.county || loc.region}, plant outside ${loc.name}, gardening ${loc.name}`,
    openGraph: {
      title: `Last Frost Date ${loc.name} | Grow Safe Guide`,
      description: `Average last frost date in ${loc.name}: ${loc.lastFrostDate}. When to plant tomatoes, peppers and courgettes outside in ${loc.name}.`,
    }
  }
}

const regionOrder = ['London', 'South East', 'South West', 'East of England', 'West Midlands', 'East Midlands', 'Yorkshire', 'North West', 'North East', 'Wales', 'Scotland', 'Northern Ireland']

export default function LocationPage({ params }: Props) {
  const loc = getLocationBySlug(params.location)
  if (!loc) notFound()

  const byRegion = getLocationsByRegion()
  const safePlantDate = `${loc.lastFrostDay} ${new Date(2024, loc.lastFrostMonth, 1).toLocaleString('en-GB', { month: 'long' })}`

  // Days until last frost
  const today = new Date()
  const thisYearFrost = new Date(today.getFullYear(), loc.lastFrostMonth, loc.lastFrostDay)
  const daysUntil = Math.ceil((thisYearFrost.getTime() - today.getTime()) / 86400000)
  const frostPassed = daysUntil < 0

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
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Frost Checker</Link>
            <Link href="/planting-calendar" className="text-muted-foreground hover:text-primary transition-colors">Planting Calendar</Link>
            <Link href="/frost-dates-by-region" className="text-primary font-medium">All Locations</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/frost-dates-by-region" className="hover:text-primary">Frost Dates by Region</Link>
          {' / '}
          <span className="text-foreground">{loc.name}</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily:'Georgia,serif' }}>
            Last Frost Date in {loc.name}
          </h1>
          <p className="text-muted-foreground text-lg">{loc.county ? `${loc.county}, ` : ''}{loc.region}</p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Last Frost', value: loc.lastFrostDate, sub: 'average', color: 'bg-blue-50 border-blue-200' },
            { label: 'First Autumn Frost', value: loc.firstFrostDate, sub: 'average', color: 'bg-orange-50 border-orange-200' },
            { label: 'Frost-Free Days', value: `${loc.frostFreeDays}`, sub: 'per year', color: 'bg-green-50 border-green-200' },
            { label: 'Plant Tomatoes From', value: safePlantDate, sub: 'safe date', color: 'bg-red-50 border-red-200' },
          ].map(stat => (
            <div key={stat.label} className={`p-4 rounded-xl border text-center ${stat.color}`}>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{stat.label}</div>
              <div className="font-bold text-lg leading-tight">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Status banner */}
        <Card className={`mb-6 border-2 ${frostPassed ? 'border-green-400 bg-green-50' : 'border-amber-400 bg-amber-50'}`}>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{frostPassed ? '✅' : '⏳'}</span>
              <div>
                <div className="font-bold text-lg">
                  {frostPassed
                    ? `Frost season has passed in ${loc.name} this year`
                    : `${daysUntil} days until the average last frost in ${loc.name}`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {frostPassed
                    ? `Average last frost date (${loc.lastFrostDate}) has passed. Check the live forecast before planting.`
                    : `Average last frost is ${loc.lastFrostDate}. Always check the 14-day forecast before planting tender crops.`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live checker CTA */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="font-semibold mb-1">Get live weather for {loc.name}</div>
                <div className="text-sm text-muted-foreground">Check the actual 14-day forecast and real-time frost risk for your exact location.</div>
              </div>
              <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap hover:bg-primary/90 transition-colors no-underline">
                📍 Check Live Forecast
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* About this location */}
        <Card className="mb-6">
          <CardHeader><CardTitle>🌍 Climate in {loc.name}</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>{loc.description}</p>
            {loc.microclimate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
                <span className="font-semibold">Local note: </span>{loc.microclimate}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Planting advice */}
        <Card className="mb-6">
          <CardHeader><CardTitle>🍅 Planting Advice for {loc.name}</CardTitle></CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>{loc.plantingAdvice}</p>
          </CardContent>
        </Card>

        {/* Crop guide */}
        <Card className="mb-6">
          <CardHeader><CardTitle>📅 When to Plant in {loc.name}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { crop: '🍅 Tomatoes', safe: loc.lastFrostDate, note: 'After last frost, once nights above 7°C' },
                { crop: '🌶️ Peppers & Chillies', safe: loc.lastFrostDate, note: 'After last frost, once nights above 10°C' },
                { crop: '🥒 Courgettes', safe: loc.lastFrostDate, note: 'Very frost-sensitive — same timing as tomatoes' },
                { crop: '🫘 Beans (French & Runner)', safe: loc.lastFrostDate, note: 'Once soil temperature above 12°C' },
                { crop: '🌿 Basil', safe: `2 weeks after ${loc.lastFrostDate}`, note: 'Needs nights above 12°C — later than tomatoes' },
                { crop: '🫛 Peas', safe: '4–6 weeks before last frost', note: 'Hardy enough for early planting' },
                { crop: '🥬 Salad leaves', safe: '4–6 weeks before last frost', note: 'Tolerates light frost' },
              ].map(item => (
                <div key={item.crop} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-border last:border-0 gap-1">
                  <span className="font-medium text-sm">{item.crop}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">{item.safe}</Badge>
                    <span className="text-xs text-muted-foreground">{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader><CardTitle>❓ Frequently Asked Questions</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              {
                q: `What is the last frost date in ${loc.name}?`,
                a: `The average last frost date in ${loc.name} is ${loc.lastFrostDate}. This is a historical average — actual frost dates vary by year. Always check the 14-day forecast before planting tender crops.`
              },
              {
                q: `When can I plant tomatoes outside in ${loc.name}?`,
                a: `${loc.plantingAdvice.split('.')[0]}.`
              },
              {
                q: `When does the first autumn frost occur in ${loc.name}?`,
                a: `The average first autumn frost in ${loc.name} is around ${loc.firstFrostDate}. This gives a growing season of approximately ${loc.frostFreeDays} frost-free days per year.`
              },
              {
                q: `Is ${loc.name} good for growing vegetables?`,
                a: `${loc.description.split('.')[0]}. With ${loc.frostFreeDays} average frost-free days per year, ${loc.name} ${loc.frostFreeDays > 200 ? 'has an excellent growing season by UK standards' : loc.frostFreeDays > 160 ? 'has a reasonable growing season for most UK vegetables' : 'has a shorter growing season, but most UK vegetables can still be grown successfully with good timing'}.`
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border pb-4 last:border-0">
                <div className="font-semibold mb-1">{faq.q}</div>
                <div className="text-muted-foreground">{faq.a}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other locations in region */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily:'Georgia,serif' }}>Other locations in {loc.region}</h2>
          <div className="flex flex-wrap gap-2">
            {(byRegion[loc.region] || [])
              .filter(l => l.slug !== loc.slug)
              .map(l => (
                <Link
                  key={l.slug}
                  href={`/last-frost-date/${l.slug}`}
                  className="inline-block bg-white border border-border rounded-lg px-3 py-2 text-sm hover:border-primary hover:text-primary transition-colors no-underline"
                >
                  {l.name} — {l.lastFrostDate}
                </Link>
              ))}
          </div>
        </div>

        {/* All regions */}
        <div className="text-center">
          <Link href="/frost-dates-by-region" className="text-primary text-sm hover:underline">
            View all UK frost dates by region →
          </Link>
        </div>
      </div>

      <footer className="border-t bg-white/50 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Grow Safe Guide · Frost dates are historical averages. Always verify with a current weather forecast before planting.
        </div>
      </footer>
    </main>
  )
}
