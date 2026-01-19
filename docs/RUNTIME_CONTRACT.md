# Runtime Contract

This document defines the assumptions the application makes about its runtime.

## Node
- Node version: define explicitly
- Module system: ESM
- No dynamic native imports

## Environment Variables

Required:
- DATABASE_URL
- API_BASE_URL
- AI_PROVIDER_KEY

Optional:
- LOG_LEVEL

Application must fail to start if required variables are missing.

## File System
- Read-only filesystem
- Temp usage only via platform-provided temp directories

## Network
- Outbound HTTPS allowed
- No inbound connections except via platform router

## Startup Rules
- Verification scripts must pass
- Fatal verification failures must exit the process
