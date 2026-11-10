# Data Model

<!-- sdlc:auto:start entities -->
### note

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| title | text | False | — | True |
| body | text | False | — | False |
| tags | text[] (array of free-form tags) | False | — | False |
| created_at | timestamp | False | — | False |
| updated_at | timestamp | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
_No relationships recorded._
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  note {
    uuid id PK
    text title
    text body
    text____array_of_free_form_tags_ tags
    timestamp created_at
    timestamp updated_at
  }
```
<!-- sdlc:auto:end er-diagram -->
