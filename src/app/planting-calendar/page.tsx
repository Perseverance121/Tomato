import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UK Planting Calendar | When to Sow & Plant Vegetables Outside',
  description: 'Month-by-month UK planting calendar for tomatoes, peppers, courgettes, beans and more. Know exactly when to sow, transplant and harvest in the UK.',
  keywords: 'UK planting calendar, when to sow tomatoes UK, vegetable planting guide UK, when to plant peppers UK, gardening calendar UK',
}

const plants = [
  {
    name: 'Tomatoes',
    emoji: '🍅',
    sowIndoors: 'Feb–Mar',
    plantOutside: 'Late May–Jun',
    harvest: 'Jul–Oct',
    frostTolerant: false,
    notes: 'Only plant outside once all frost risk has passed and nights stay above 10°C.'
  },
  {
    name: 'Peppers & Chillies',
    emoji: '🌶️',
    sowIndoors: 'Jan–Feb',
    plantOutside: 'Late May–Jun',
    harvest: 'Aug–Oct',
    frostTolerant: false,
    notes: 'Need even warmer conditions than tomatoes. Best in a sheltered spot or greenhouse.'
  },
  {
    name: 'Courgettes',
    emoji: '🥒',
    sowIndoors: 'Apr–May',
    plantOutside: 'Late May–Jun',
    harvest: 'Jul–Sep',
    frostTolerant: false,
    notes: 'Very frost-sensitive. One late frost can kill them overnight.'
  },
  {
    name: 'French Beans',
    emoji: '🫘',
    sowIndoors: 'Apr',
    plantOutside: 'May–Jun',
    harvest: 'Jul–Sep',
    frostTolerant: false,
    notes: 'Direct sow once soil temperature is above 12°C.'
  },
  {
    name: 'Runner Beans',
    emoji: '🌿',
    sowIndoors: 'Apr–May',
    plantOutside: 'Late May–Jun',
    harvest: 'Jul–Oct',
    frostTolerant: false,
    notes: 'Put up supports before planting. Very fast growing once established.'
  },
  {
    name: 'Cucumbers',
    emoji: '🥒',
    sowIndoors: 'Mar–Apr',
    plantOutside: 'Late May–Jun',
    harvest: 'Jul–Sep',
    frostTolerant: false,
    notes: 'Need a warm, sheltered spot. Ideal in a greenhouse or polytunnel.'
  },
  {
    name: 'Basil',
    emoji: '🌿',
    sowIndoors: 'Apr–May',
    plantOutside: 'Jun',
    harvest: 'Jun–Sep',
    frostTolerant: false,
    notes: 'The most cold-sensitive herb. Don\'t risk outside until nights are reliably above 12°C.'
  },
  {
    name: 'Potatoes (maincrop)',
    emoji: '🥔',
    sowIndoors: 'N/A',
    plantOutside: 'Mar–May',
    harvest: 'Aug–Oct',
    frostTolerant: false,
    notes: 'Earth up regularly to protect tubers and prevent greening.'
  },
  {
    name: 'Peas',
    emoji: '🫛',
    sowIndoors: 'Feb–Mar',
    plantOutside: 'Mar–May',
    harvest: 'Jun–Aug',
    frostTolerant: true,
    notes: 'Hardy enough to withstand light frosts. Can be direct-sown outside from March.'
  },
  {
    name: 'Lettuce',
    emoji: '🥬',
    sowIndoors: 'Feb–Aug',
    plantOutside: 'Mar–Sep',
    harvest: 'Apr–Nov',
    frostTolerant: true,
    notes: 'Very easy to grow. Sow successionally every 2–3 weeks for continuous harvest.'
  },
]

export default function PlantingCalendar() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, hsl(200 40% 95%), hsl(32 20% 97%))' }}>
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-primary text-lg">🌱 Grow Safe Guide</h1>
            <p className="text-xs text-muted-foreground">Last frost dates for UK gardeners</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Frost Checker</Link>
            <Link href="/planting-calendar" className="text-primary font-medium">Planting Calendar</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <h2 className="text-3xl font-bold mb-3">UK Planting Calendar</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          When to sow, transplant and harvest the most popular UK vegetables and herbs.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-12 space-y-4">
        {plants.map((plant) => (
          <Card key={plant.name}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{plant.emoji} {plant.name}</span>
                <Badge variant={plant.frostTolerant ? 'secondary' : 'destructive'} className="text-xs">
                  {plant.frostTolerant ? 'Frost hardy' : 'Frost tender'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                <div className="text-center p-2 rounded-md bg-muted">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">SOW INDOORS</div>
                  <div>{plant.sowIndoors}</div>
                </div>
                <div className="text-center p-2 rounded-md bg-green-50 border border-green-100">
                  <div className="font-semibold text-xs text-green-700 mb-1">PLANT OUTSIDE</div>
                  <div className="font-medium">{plant.plantOutside}</div>
                </div>
                <div className="text-center p-2 rounded-md bg-amber-50 border border-amber-100">
                  <div className="font-semibold text-xs text-amber-700 mb-1">HARVEST</div>
                  <div>{plant.harvest}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{plant.notes}</p>
            </CardContent>
          </Card>
        ))}

        <div className="mt-8 p-4 bg-white/70 rounded-lg border text-sm text-muted-foreground text-center">
          <p>All dates are approximate for central England. Add 2–3 weeks for Scotland. Check your{' '}
            <Link href="/" className="text-primary underline">local frost date</Link>{' '}
            before planting tender crops.
          </p>
        </div>
      </div>

      <footer className="border-t bg-white/50 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Grow Safe Guide · For informational purposes only</p>
        </div>
      </footer>
    </main>
  )
}
