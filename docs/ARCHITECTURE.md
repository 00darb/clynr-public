# System Architecture Overview

## System Context

Clynr is a multi-tenant operations platform with AI-assisted workflows.

The system is composed of:
- Client applications
- Backend API services
- AI services (advisory only)
- Data stores
- External integrations

AI is advisory by default and does not perform irreversible actions
without backend validation and enforcement.

---

## Core Components

### Client Applications
- Responsibility: user interaction only
- Trust level: untrusted
- No access to secrets
- All writes go through the API

### Backend API
- Responsibility: business logic, validation, enforcement
- Owns all writes to persistent storage
- Enforces tenant scoping and permissions

### AI Services
- Responsibility: suggestion, classification, summarisation
- No direct database writes
- No access to secrets
- Output must be validated before use

### Data Stores
- Owned by backend services
- All records are scoped by tenant_id
- No cross-tenant access allowed

---

## Trust Boundaries

| Boundary | Enforcement |
|--------|------------|
| Client → API | Auth + permission checks |
| API → AI | Input and output contracts |
| API → Data | Tenant scoping |
| AI → System | Read-only, advisory |

---

## Data Ownership

| Entity | Owner |
|------|------|
| Tenants | Backend |
| Users | Backend |
| Jobs / Visits | Backend |
| AI Outputs | Backend (after validation) |

---

## Failure Philosophy

- Fail closed by default
- AI uncertainty results in no action
- Validation failures are fatal
