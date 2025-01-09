## Backend Feature-based Architecture

Each feature module is organized following Domain-Driven Design (DDD) principles and clean architecture. The structure follows these principles:

- **Feature Independence**: Each feature is a self-contained module
- **Clean Architecture**: Follows a layered architecture with clear boundaries
- **Domain-Driven**: Business logic is centralized in the service layer
- **Type Safety**: Strong typing with DTOs and entities

### Directory Structure
```
features/
├── achievements/           # Achievement system feature
│   ├── controllers/      # HTTP request handlers
│   ├── services/        # Business logic
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Database entities
│   └── index.ts       # Feature module definition
├── dashboard/          # Dashboard feature
├── learning/          # Learning system feature
├── profile/           # User profile feature
├── settings/          # App settings feature
└── tasks/            # Tasks management feature

shared/                # Shared utilities and common code
├── decorators/       # Custom decorators
├── filters/         # Exception filters
├── guards/         # Authentication/Authorization guards
├── interfaces/    # Common interfaces
└── utils/        # Utility functions
```

### Module Organization
Each feature module follows this pattern:
1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Contain business logic and use cases
3. **DTOs**: Define data shapes for API requests/responses
4. **Entities**: Define database models
5. **Types**: Feature-specific type definitions
