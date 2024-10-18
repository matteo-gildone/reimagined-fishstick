# Reimagined fishstick

```mermaid
graph LR
  subgraph "Data Retrieval"
    A[Consumer]
    B[Data service]
  end

  subgraph "HTML Generation"
    C[Design system service]
    D[Design system]
  end

  A --> |"1 Fetch data"| B
  B --> |"2 Return data"| A
  A --> |"3 Send data/config"| C
  C --> |"4 Compile templates"| C
  C --> |"5 Return HTML"| A

  C --> |"Use"| D
```

```mermaid
graph LR
  subgraph Consumers
    A[Consumer 1]
    B[Consumer 2]
    C[...]
    D[Consumer n]
  end

  subgraph Services
    E[Design system service]
    F[Data service]
  end

  subgraph Design
    G[Design system]
  end

  A --> |"Fetch HTML"| E
  A --> |"Fetch data"| F
  B --> |"Fetch HTML"| E
  B --> |"Fetch data"| F
  D --> |"Fetch HTML"| E
  D --> |"Fetch data"| F

  E --> |"Use"| G
```

## How does it work?

```mermaid
sequenceDiagram
  participant C as Consumer
  participant DS as Data service
  participant DSS as Design system service

  C->>DS: Request data
  DS-->>C: Return data
  C->>DSS: Send data/configurations
  DSS->>DSS: Compile templates with data/configurations
  DSS-->>C: Return HTML
```

## TODO:

- scala missing handlebars so endpoint for teams that don't have feds
- version manager for transform changes or template changes
- manage multiple version of the template
