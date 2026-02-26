import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPlantBySlug, getAllPlantSlugs, plants } from '@/lib/plants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  params: { plant: string }
}

export async function generateStaticParams() {
  return getAllPlantSlugs().map(slug => ({ plant: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plant = getPlantBySlug(params.plant)
  if (!plant) return {}

  return {
    title: `When to Plant ${plant.name} Outside UK | Sowing & Planting Guide`,
    description: `Find out when to plant ${plant.name.toLowerCase()} outside in the UK. Sow ${plant.sowIndoors}, plant outside ${plant.plantOutside}. Minimum night temperature: ${plant.minNightTemp}°C. Full UK growing guide.`,
    keywords: `when to plant ${plant.name.toLowerCase()} outside UK, when to sow ${plant.name.toLowerCase()} UK, ${plant.name.toLowerCase()} planting guide UK, ${plant.name.toLowerCase()} frost temperature`,
  }
}

export default function PlantPage({ params }: Props) {
  const plant = getPlantBySlug(params.plant)
  if (!plant) notFound()

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
            <Link href="/planting-calendar" className="text-primary font-medium">Planting Calendar</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/planting-calendar" className="hover:text-primary">Planting Calendar</Link>
          {' / '}
          <span className="text-foreground">{plant.name}</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="text-5xl mb-3">{plant.emoji}</div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily:'Georgia,serif' }}>
            When to Plant {plant.name} Outside in the UK
          </h1>
          {plant.latinName && <p className="text-muted-foreground italic">{plant.latinName}</p>}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Sow Indoors', value: plant.sowIndoors, color: 'bg-blue-50 border-blue-200' },
            { label: 'Plant Outside', value: plant.plantOutside, color: 'bg-green-50 border-green-200' },
            { label: 'Harvest', value: plant.harvest, color: 'bg-amber-50 border-amber-200' },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-xl border text-center ${s.color}`}>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{s.label}</div>
              <div className="font-bold text-sm leading-tight">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Temperature requirement */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌡️</span>
              <div>
                <div className="font-semibold">Minimum night temperature: {plant.minNightTemp}°C</div>
                <div className="text-sm text-muted-foreground">
                  Ideal: {plant.idealNightTemp}°C overnight. Do not plant outside if night temperatures will drop below {plant.minNightTemp}°C.
                  <Link href="/" className="ml-1 text-primary hover:underline">Check your local forecast →</Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="mb-6">
          <CardHeader><CardTitle>About Growing {plant.name} in the UK</CardTitle></CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>{plant.description}</p>
          </CardContent>
        </Card>

        {/* Three-stage guide */}
        <div className="space-y-4 mb-8">
          {[
            { title: `🌱 Sowing ${plant.name}`, content: plant.sowingGuide, bg: 'bg-blue-50', border: 'border-blue-200' },
            { title: `🌿 Planting ${plant.name} Outside`, content: plant.plantingGuide, bg: 'bg-green-50', border: 'border-green-200' },
            { title: `🧺 Harvesting ${plant.name}`, content: plant.harvestGuide, bg: 'bg-amber-50', border: 'border-amber-200' },
          ].map(section => (
            <Card key={section.title} className={`border ${section.border} ${section.bg}`}>
              <CardHeader className="pb-2"><CardTitle className="text-base">{section.title}</CardTitle></CardHeader>
              <CardContent className="text-sm leading-relaxed"><p>{section.content}</p></CardContent>
            </Card>
          ))}
        </div>

        {/* Common mistakes */}
        <Card className="mb-6">
          <CardHeader><CardTitle>⚠️ Common Mistakes</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plant.commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="text-red-500 font-bold flex-shrink-0">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Varieties */}
        <Card className="mb-6">
          <CardHeader><CardTitle>🏆 Recommended UK Varieties</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {plant.ukVarieties.map(v => (
                <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Companion plants */}
        <Card className="mb-6">
          <CardHeader><CardTitle>🌼 Companion Plants</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {plant.companions.map(c => (
                <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader><CardTitle>❓ Frequently Asked Questions</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            {plant.faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-4 last:border-0">
                <div className="font-semibold mb-1">{faq.q}</div>
                <div className="text-muted-foreground">{faq.a}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other plants */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily:'Georgia,serif' }}>Other planting guides</h2>
          <div className="flex flex-wrap gap-2">
            {plants.filter(p => p.slug !== plant.slug).map(p => (
              <Link
                key={p.slug}
                href={`/when-to-plant/${p.slug}`}
                className="inline-block bg-white border border-border rounded-lg px-3 py-2 text-sm hover:border-primary hover:text-primary transition-colors no-underline"
              >
                {p.emoji} {p.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-5 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-semibold mb-1">Check your local frost date</div>
              <div className="text-sm text-muted-foreground">Get live weather and frost predictions for your exact location.</div>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap hover:bg-primary/90 transition-colors no-underline">
              📍 Check My Frost Risk
            </Link>
          </CardContent>
        </Card>
      </div>

      <footer className="border-t bg-white/50 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Grow Safe Guide · Planting dates are guidelines. Always check current weather forecasts.
        </div>
      </footer>
    </main>
  )
}
