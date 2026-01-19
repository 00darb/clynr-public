# Event Schema

All significant system actions emit events with the following fields:

- event_id
- tenant_id
- actor_type (user | system | ai)
- actor_id
- event_type
- entity_type
- entity_id
- timestamp
- metadata (json)

## Required Event Types

- JOB_CREATED
- VISIT_STARTED
- VISIT_COMPLETED
- AI_SUGGESTION_APPLIED
- AI_SUGGESTION_REJECTED
- INVOICE_SENT
- ERROR_FATAL
