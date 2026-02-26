import type { Metadata } from 'next'
import FrostTracker from '@/components/FrostTracker'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Last Frost Date Checker UK | When to Plant Tomatoes, Peppers & Tender Plants',
  description: 'Check your local last frost date and live weather forecast. Find out exactly when it\'s safe to plant tomatoes, peppers, courgettes and tender plants outside in the UK.',
  keywords: 'last frost date UK, when to plant tomatoes outside UK, frost date checker, when is last frost UK, plant tomatoes outside, frost risk UK',
}

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, hsl(200 40% 95%), hsl(32 20% 97%))' }}>
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-primary text-lg">🌱 Grow Safe Guide</h1>
            <p className="text-xs text-muted-foreground">Last frost dates for UK gardeners</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-primary font-medium">Frost Checker</Link>
            <Link href="/planting-calendar" className="text-muted-foreground hover:text-primary transition-colors">Planting Calendar</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Is it safe to plant outside yet?
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Get your local last frost date and live 14-day forecast. Know exactly when to move your tomatoes, peppers, and tender plants outdoors safely.
        </p>
      </section>

      {/* Main Tool */}
      <FrostTracker />

      {/* SEO content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <h2 className="text-foreground">When is the last frost date in the UK?</h2>
          <p>
            The last frost date in the UK varies significantly by region. In southern England, the last frost typically occurs in mid-to-late April. 
            In the Midlands and northern England, expect the last frost in early May. Scotland can see frosts as late as early June in higher elevations.
          </p>
          <p>
            These are averages — always check your local 14-day forecast before planting tender crops like tomatoes and peppers outside. 
            A single unexpected frost can destroy an entire season's worth of seedlings overnight.
          </p>
          <h2 className="text-foreground">When to plant tomatoes outside in the UK</h2>
          <p>
            Tomatoes should only be planted outside once nighttime temperatures consistently stay above 10°C and all risk of frost has passed. 
            In the UK, this is typically mid-May in the south and early June in the north. Always harden off your plants by leaving them outdoors during the day for 1–2 weeks before transplanting.
          </p>
        </div>
      </section>

      <footer className="border-t bg-white/50 py-6 mt-4">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Grow Safe Guide · Weather data from <a href="https://open-meteo.com" className="underline">Open-Meteo</a> · For informational purposes only</p>
        </div>
      </footer>
    </main>
  )
}
