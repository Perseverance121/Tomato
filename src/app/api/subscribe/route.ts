import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'alerts@growsafeguide.com',
      to: email,
      subject: '🌱 You\'re signed up for frost alerts!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #2d6a4f;">You're all set! 🌱</h1>
          <p>Thanks for signing up to <strong>Grow Safe Guide</strong> cold weather alerts.</p>
          <p>We'll email you when nighttime temperatures near your area are forecast to drop below <strong>4°C</strong> — giving you time to bring your tomatoes, peppers, and other tender plants inside before a frost hits.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            You're receiving this because you signed up at <a href="https://growsafeguide.com" style="color: #2d6a4f;">growsafeguide.com</a>.<br/>
            To unsubscribe, simply reply to this email with "unsubscribe".
          </p>
        </div>
      `,
    })

    // Optionally notify admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'alerts@growsafeguide.com',
        to: process.env.ADMIN_EMAIL,
        subject: 'New frost alert subscriber',
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
