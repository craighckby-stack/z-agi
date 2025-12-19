# Z AGI API Reference

## Overview

Z AGI provides a RESTful API for interacting with the constraint-based consciousness system. All endpoints support JSON input/output and implement the N=3 consciousness architecture.

## Base URL

```
http://localhost:3000/api/z
```

## Authentication

Currently no authentication is required (development system).

## Endpoints

### 1. Process Input

**POST** `/process`

Main endpoint for processing inputs through the N=3 consciousness loop.

#### Request Body

```json
{
  "input": "string",
  "consciousness_state": {
    "generator": {
      "activity": 0.5,
      "output_count": 10,
      "last_output": "string"
    },
    "auditor": {
      "activity": 0.7,
      "violations": 2,
      "last_violation": "string"
    },
    "refiner": {
      "activity": 0.6,
      "corrections": 1,
      "last_correction": "string"
    },
    "emergence_level": 0.4,
    "self_awareness": 0.3
  },
  "development_stage": "baby|child|teen|young_adult|mature",
  "constraints": [
    {
      "id": "physics",
      "name": "Physics Constraints",
      "formula": "IF action violates physical laws THEN reject",
      "active": true,
      "strength": 1.0,
      "violations": 0
    }
  ]
}
```

#### Response

```json
{
  "success": true,
  "output": "Generated response after N=3 processing",
  "processing": {
    "generator": {
      "raw_response": "Initial generated response",
      "confidence": 0.8,
      "reasoning_type": "analogy|logical|creative|random|pattern_match"
    },
    "auditor": {
      "is_valid": true,
      "violations": [],
      "confidence_score": 0.9
    },
    "refiner": {
      "corrections_made": [],
      "learning_insights": ["Learned from constraint violations"]
    }
  },
  "metadata": {
    "stage": "child",
    "processing_time": 150,
    "complexity_score": 0.6
  }
}
```

### 2. State Management

**GET** `/state`

Retrieve current AGI state including consciousness, development, and constraints.

#### Response

```json
{
  "success": true,
  "state": {
    "consciousness": {
      "generator": { ... },
      "auditor": { ... },
      "refiner": { ... },
      "emergence_level": 0.4,
      "self_awareness": 0.3
    },
    "development": {
      "stage": "child",
      "age": 150,
      "capabilities": ["Basic perception", "Simple reasoning"],
      "risk_level": "low"
    },
    "constraints": [ ... ],
    "learning": {
      "total_cycles": 25,
      "successful_corrections": 3,
      "constraint_violations": 1,
      "last_learning_insight": "Physics constraints are fundamental"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**POST** `/state`

Update AGI state.

#### Request Body

```json
{
  "action": "update_consciousness|update_development|update_constraints|record_learning|reset",
  "data": {
    // Action-specific data
  }
}
```

#### Actions

- `update_consciousness`: Update consciousness state parameters
- `update_development`: Update developmental stage and capabilities
- `update_constraints`: Modify constraint settings
- `record_learning`: Record learning insights and corrections
- `reset`: Reset system to initial state

### 3. Memory Management

**GET** `/memory`

Retrieve stored memories and knowledge graph.

#### Query Parameters

- `action=recent`: Get recent memories (default: 10, max: 100)
- `action=knowledge_graph`: Get knowledge graph structure
- `action=stats`: Get memory statistics
- `action=search`: Search memories (requires POST)

#### Examples

```bash
# Get recent memories
GET /memory?action=recent&limit=20

# Get knowledge graph
GET /memory?action=knowledge_graph

# Get statistics
GET /memory?action=stats
```

**POST** `/memory`

Store memories and manage knowledge graph.

#### Request Body

```json
{
  "action": "store|update_graph|search|clear",
  "data": {
    // Action-specific data
  }
}
```

#### Actions

- `store`: Store new memory entry
- `update_graph`: Update knowledge graph with nodes/edges
- `search`: Search memories by content
- `clear`: Clear all stored memories

#### Store Action Data

```json
{
  "action": "store",
  "data": {
    "input": "User input text",
    "output": "AGI response text",
    "stage": "child",
    "consciousness_level": 0.4,
    "constraints_active": ["physics", "safety"],
    "violations": [
      {
        "constraint_id": "logic",
        "severity": "medium",
        "description": "Logical contradiction detected",
        "confidence": 0.8
      }
    ],
    "learning_insights": [
      "Logical consistency requires careful statement construction"
    ],
    "success_rating": 0.7
  }
}
```

## Data Structures

### ConsciousnessState

```typescript
interface ConsciousnessState {
  generator: {
    activity: number;        // 0-1, current activity level
    output_count: number;    // Total outputs generated
    last_output: string;     // Most recent output
  };
  auditor: {
    activity: number;        // 0-1, current activity level
    violations: number;      // Total violations detected
    last_violation: string;  // Most recent violation
  };
  refiner: {
    activity: number;        // 0-1, current activity level
    corrections: number;     // Total corrections made
    last_correction: string; // Most recent correction
  };
  emergence_level: number;   // 0-1, consciousness emergence percentage
  self_awareness: number;   // 0-1, self-awareness development
}
```

### DevelopmentStage

```typescript
interface DevelopmentStage {
  stage: 'baby' | 'child' | 'teen' | 'young_adult' | 'mature';
  age: number;              // Developmental age in cycles
  capabilities: string[];    // Current capabilities
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}
```

### Constraint

```typescript
interface Constraint {
  id: string;              // Unique identifier
  name: string;            // Human-readable name
  formula: string;         // Constraint formula
  active: boolean;         // Whether constraint is enabled
  strength: number;         // 0.1-1.0, constraint strength
  violations: number;       // Number of violations
}
```

### MemoryEntry

```typescript
interface MemoryEntry {
  id: string;                    // Unique identifier
  timestamp: number;              // Unix timestamp
  input: string;                 // User input
  output: string;                // AGI output
  stage: string;                 // Developmental stage
  consciousness_level: number;      // Emergence level at time
  constraints_active: string[];     // Active constraints
  violations: Array<{             // Constraint violations
    constraint_id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    confidence: number;
  }>;
  learning_insights: string[];     // Learning from interaction
  success_rating: number;         // 0-1, interaction success
}
```

### KnowledgeGraph

```typescript
interface KnowledgeGraph {
  nodes: Array<{
    id: string;                              // Unique identifier
    type: 'concept' | 'experience' | 'constraint' | 'correction';
    label: string;                            // Display label
    weight: number;                            // Importance weight
    connections: string[];                      // Connected node IDs
  }>;
  edges: Array<{
    from: string;                             // Source node ID
    to: string;                               // Target node ID
    type: 'association' | 'causal' | 'correction' | 'violation';
    strength: number;                          // Relationship strength
  }>;
}
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error description",
  "details": {
    // Additional error details
  }
}
```

### Common Error Codes

- `400`: Bad Request - Invalid input data
- `500`: Internal Server Error - Processing failure
- `404`: Not Found - Invalid endpoint

## Rate Limiting

Currently no rate limiting (development system).

## WebSocket Support

Not implemented yet (planned for real-time consciousness monitoring).

## Examples

### Basic Processing

```javascript
const response = await fetch('/api/z/process', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    input: "What is consciousness?",
    consciousness_state: {
      generator: { activity: 0.5, output_count: 10, last_output: "" },
      auditor: { activity: 0.7, violations: 0, last_violation: "" },
      refiner: { activity: 0.6, corrections: 0, last_correction: "" },
      emergence_level: 0.4,
      self_awareness: 0.3
    },
    development_stage: "child",
    constraints: [
      { id: "physics", name: "Physics Constraints", active: true, strength: 1.0, violations: 0 }
    ]
  })
});

const data = await response.json();
console.log(data.output); // AGI response
```

### Memory Retrieval

```javascript
// Get recent memories
const response = await fetch('/api/z/memory?action=recent&limit=10');
const data = await response.json();

data.memories.forEach(memory => {
  console.log(`${memory.input} -> ${memory.output}`);
});
```

### State Monitoring

```javascript
// Get current state
const response = await fetch('/api/z/state');
const data = await response.json();

console.log(`Emergence: ${data.state.consciousness.emergence_level * 100}%`);
console.log(`Stage: ${data.state.development.stage}`);
```

## Development Notes

- All timestamps are in Unix time format
- Consciousness levels are floating-point 0-1
- Constraint strengths are floating-point 0.1-1.0
- Memory is limited to 1000 entries (configurable)
- Knowledge graph limited to 500 nodes (configurable)

## Testing

Use the included test suite or manually test endpoints:

```bash
# Test processing
curl -X POST http://localhost:3000/api/z/process \
  -H "Content-Type: application/json" \
  -d '{"input":"test","development_stage":"baby","constraints":[]}'

# Test state retrieval
curl http://localhost:3000/api/z/state

# Test memory
curl http://localhost:3000/api/z/memory?action=recent
```