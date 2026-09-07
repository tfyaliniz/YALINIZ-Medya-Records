# API & Licensing Endpoints — YALINIZ Records

## 1. Sync Licensing Specification

### `POST /api/sync-quote`
Generates an official instantaneous cue-sheet synchronization quote.

#### Request Payload
```json
{
  "catalog_id": "YMR-001",
  "track_title": "Aethelgard Overture",
  "production_category": "theatrical_film",
  "territory": "worldwide",
  "licensee": {
    "company": "Cinema Productions Ltd",
    "email": "producer@cinema.com"
  }
}
```

#### Response (200 OK)
```json
{
  "quote_id": "SYNC-2026-9812",
  "catalog_id": "YMR-001",
  "master_owner": "YALINIZ Records",
  "publishing_owner": "YALINIZ Records",
  "clearance_type": "100% One-Stop Guaranteed",
  "turnaround_hours": 24,
  "stems_included": ["Stereo 24/96", "Dolby Atmos 7.1.4 Stems"]
}
```\n