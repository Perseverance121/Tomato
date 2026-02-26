import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="text-6xl">🌱</div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">This page doesn't exist — but your garden does!</p>
        <Link href="/" className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
          Back to Frost Checker
        </Link>
      </div>
    </main>
  )
}
