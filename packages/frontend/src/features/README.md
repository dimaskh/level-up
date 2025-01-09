## Feature-based Architecture

Each feature directory contains all related components, hooks, types, and utilities for that specific feature. The structure follows these principles:

- **Self-contained**: Each feature should be as independent as possible
- **Shared code**: Common utilities and components are kept in shared directories
- **Clear boundaries**: Features can import from shared, but not from other features
- **Co-location**: Related code stays together (components, hooks, types, tests)

### Directory Structure
```
features/
├── achievements/        # Achievement system feature
│   ├── components/     # Feature-specific components
│   ├── hooks/         # Custom hooks for this feature
│   ├── api/          # API integration
│   ├── types.ts      # Feature-specific types
│   └── index.ts      # Public API of the feature
├── dashboard/         # Dashboard feature
├── learning/         # Learning system feature
├── profile/          # User profile feature
├── settings/         # App settings feature
└── tasks/           # Tasks management feature
```
