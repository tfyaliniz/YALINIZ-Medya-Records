# Architecture & Engineering Specifications — YALINIZ Records

## 1. System Topology

```mermaid
graph TD
    Client[Browser / Client] -->|HTTPS| Cloudflare[Cloudflare CDN / Edge WAF]
    Cloudflare -->|SSL Termination| Nginx[Nginx Reverse Proxy :80/:443]
    Nginx -->|Proxy Pass :3015| NextApp[Next.js 14 App Router]
    NextApp --> RecordingEngine[Multi-Track Live Studio Engine]
    NextApp --> TurntableSuite[Virtual Vinyl Turntable & Sync Generator]
    NextApp --> ARSubmission[A&R Master Recording Vault]
```

## 2. Technical Stack
- **Framework**: Next.js 14.2+ (App Router, Server & Client Components)
- **Language**: TypeScript 5.6+
- **Styling**: Tailwind CSS 3.4+ (Custom Golden Luxury & Darkroom Palette)
- **Icons**: Lucide React
- **Motion**: Framer Motion 11+
- **Font Stack**: Playfair Display (Serif Headings), Inter (Sans Body), JetBrains Mono (Telemetry)

## 3. Audio & Analog Emulation Design
- High-fidelity canvas/SVG procedural turntable rendering.
- Real-time audio reactive visualizer and multi-track channel fader telemetry.
- Form validation with zero external unverified third-party dependencies.\n