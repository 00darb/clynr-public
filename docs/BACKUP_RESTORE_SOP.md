# Clynr Backup & Restore Standard Operating Procedure

## Overview

This document outlines the backup and disaster recovery procedures for the Clynr application. The system is designed to meet the following recovery objectives:

- **RPO (Recovery Point Objective)**: ≤ 15 minutes
- **RTO (Recovery Time Objective)**: ≤ 2 hours

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BACKUP ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐ │
│  │ PostgreSQL  │────▶│ Backup       │────▶│ AWS S3 Bucket    │ │
│  │ (Neon)      │     │ Scripts      │     │ (Versioned)      │ │
│  └─────────────┘     └──────────────┘     └──────────────────┘ │
│                            │                                    │
│  ┌─────────────┐           │              ┌──────────────────┐ │
│  │ File        │───────────┼─────────────▶│ S3 /files/       │ │
│  │ Uploads     │           │              │ (Versioned)      │ │
│  └─────────────┘           │              └──────────────────┘ │
│                            │                                    │
│  ┌─────────────┐           │              ┌──────────────────┐ │
│  │ JSON        │───────────┘              │ S3 /exports/     │ │
│  │ Exports     │─────────────────────────▶│ (Logical Data)   │ │
│  └─────────────┘                          └──────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## S3 Bucket Structure

```
s3://clynr-backups/
├── database/
│   └── full/           # Compressed pg_dump files (every 15 minutes)
├── exports/
│   ├── full/           # Complete data exports
│   ├── clients/        # Individual entity exports
│   ├── jobs/
│   ├── users/
│   ├── invoices/
│   └── visits/
├── files/              # Application file uploads
│   ├── forms/
│   └── attachments/
└── restore-tests/      # Verification artifacts
```

## Required Environment Variables

| Variable | Description |
|----------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key (backup-specific account) |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_BACKUP_BUCKET` | S3 bucket name (e.g., `clynr-backups`) |
| `AWS_REGION` | AWS region (e.g., `ap-southeast-2`) |
| `SENDGRID_API_KEY` | For email alerts |
| `SENDGRID_FROM_EMAIL` | Alert sender email |

## Backup Schedules

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Database (pg_dump) | Every 15 minutes | 90 days |
| Business Data Export | Daily (2 AM) | 90 days |
| Backup Verification | Weekly | N/A |

---

## Procedures

### 1. Starting the Backup Scheduler

The backup scheduler automatically starts when the server starts if S3 is configured. To manually control it:

**Start scheduler:**
```bash
curl -X POST http://localhost:5000/api/backup/scheduler/start \
  -H "Content-Type: application/json" \
  -d '{
    "alertConfigs": [{
      "type": "email",
      "enabled": true,
      "recipients": ["admin@company.com", "ops@company.com"]
    }]
  }'
```

**Stop scheduler:**
```bash
curl -X POST http://localhost:5000/api/backup/scheduler/stop
```

**Check status:**
```bash
curl http://localhost:5000/api/backup/status
```

### 2. Manual Backup

**Database backup only:**
```bash
curl -X POST http://localhost:5000/api/backup/manual \
  -H "Content-Type: application/json" \
  -d '{"type": "database"}'
```

**Full backup (database + exports):**
```bash
curl -X POST http://localhost:5000/api/backup/manual \
  -H "Content-Type: application/json" \
  -d '{"type": "both"}'
```

### 3. Listing Available Restore Points

```bash
curl http://localhost:5000/api/backup/restore-points
```

Response:
```json
{
  "database": [
    {"key": "database/full/clynr-backup-2026-01-16T08-00-00.sql.gz", "date": "2026-01-16T08:00:00Z", "sizeBytes": 12345678}
  ],
  "exports": [
    {"entity": "clients", "key": "exports/clients/2026-01-16T02-00-00.json", "date": "2026-01-16T02:00:00Z"}
  ]
}
```

---

## Restore Procedures

### Full Database Restore

**⚠️ WARNING: This will overwrite all data in the target database.**

#### Step 1: Identify the restore point

```bash
curl http://localhost:5000/api/backup/restore-points | jq '.database[0]'
```

#### Step 2: Perform dry run (recommended)

```bash
curl -X POST http://localhost:5000/api/backup/restore/database \
  -H "Content-Type: application/json" \
  -d '{
    "s3Key": "database/full/clynr-backup-2026-01-16T08-00-00.sql.gz",
    "dryRun": true
  }'
```

#### Step 3: Execute restore

```bash
curl -X POST http://localhost:5000/api/backup/restore/database \
  -H "Content-Type: application/json" \
  -d '{
    "s3Key": "database/full/clynr-backup-2026-01-16T08-00-00.sql.gz",
    "dryRun": false
  }'
```

### Partial Entity Restore

Use this to restore specific entities without affecting other data:

```bash
curl -X POST http://localhost:5000/api/backup/restore/entities \
  -H "Content-Type: application/json" \
  -d '{
    "entities": ["clients", "jobs"],
    "targetEnvironment": "staging",
    "dryRun": true
  }'
```

Supported entities:
- `clients`
- `jobs`
- `users`
- `invoices`
- `visits`

---

## Verification Procedures

### Quick Verification (File Integrity)

```bash
curl -X POST http://localhost:5000/api/backup/verify
```

### Full Verification (with Restore Test)

```bash
curl -X POST http://localhost:5000/api/backup/verify/full \
  -H "Content-Type: application/json" \
  -d '{
    "stagingDatabaseUrl": "postgres://user:pass@staging-host:5432/clynr_staging"
  }'
```

### Verification Report

```bash
curl http://localhost:5000/api/backup/verify/report
```

---

## Alert Configuration

### Email Alerts (Default)

```json
{
  "alertConfigs": [{
    "type": "email",
    "enabled": true,
    "recipients": ["admin@company.com", "ops@company.com"]
  }]
}
```

### Slack Alerts (Optional)

```json
{
  "alertConfigs": [{
    "type": "slack",
    "enabled": true,
    "recipients": [],
    "webhookUrl": "https://hooks.slack.com/services/xxx/yyy/zzz"
  }]
}
```

---

## Emergency Procedures

### Scenario 1: Production Database Corruption

1. **Stop** all application servers immediately
2. **Identify** the last known good backup:
   ```bash
   curl http://localhost:5000/api/backup/restore-points | jq '.database | .[0:5]'
   ```
3. **Verify** backup integrity:
   ```bash
   curl -X POST http://localhost:5000/api/backup/verify -d '{"s3Key": "..."}'
   ```
4. **Restore** to staging first:
   ```bash
   curl -X POST http://localhost:5000/api/backup/restore/database \
     -H "Content-Type: application/json" \
     -d '{"s3Key": "...", "targetDatabase": "staging_db_url"}'
   ```
5. **Validate** staging data
6. **Restore** to production using the same procedure
7. **Restart** application servers

### Scenario 2: Accidental Data Deletion

For partial data loss (e.g., accidentally deleted clients):

1. **Export** current state as backup
2. **Identify** the entity export before deletion
3. **Perform** partial restore:
   ```bash
   curl -X POST http://localhost:5000/api/backup/restore/entities \
     -d '{"entities": ["clients"]}'
   ```

---

## Maintenance Tasks

### Monthly

1. Run full verification test against staging database
2. Review backup sizes for anomalies
3. Verify alert delivery is working
4. Update S3 lifecycle rules if needed

### Quarterly

1. Full disaster recovery drill (restore to new environment)
2. Review and update this SOP
3. Verify IAM credentials are current
4. Review access logs for backup bucket

---

## Security Notes

1. Backup credentials are isolated from production credentials
2. All backups are encrypted at rest (AES-256)
3. S3 bucket versioning is enabled
4. Access to restore endpoints should be restricted to admin users only
5. Never store backup credentials in application code

---

## Contact

For issues with backup systems, contact:
- Primary: [Your DevOps/SRE team]
- Escalation: [Management contact]

---

*Last updated: January 2026*
