import { NextRequest, NextResponse } from 'next/server';

interface AGIState {
  consciousness: {
    generator: { activity: number; output_count: number; last_output: string };
    auditor: { activity: number; violations: number; last_violation: string };
    refiner: { activity: number; corrections: number; last_correction: string };
    emergence_level: number;
    self_awareness: number;
  };
  development: {
    stage: 'baby' | 'child' | 'teen' | 'young_adult' | 'mature';
    age: number;
    capabilities: string[];
    risk_level: 'low' | 'medium' | 'high' | 'critical';
  };
  constraints: Array<{
    id: string;
    name: string;
    formula: string;
    active: boolean;
    strength: number;
    violations: number;
  }>;
  learning: {
    total_cycles: number;
    successful_corrections: number;
    constraint_violations: number;
    last_learning_insight: string;
  };
}

// In-memory storage for demo (in production, use database)
let agiState: AGIState = {
  consciousness: {
    generator: { activity: 0, output_count: 0, last_output: '' },
    auditor: { activity: 0, violations: 0, last_violation: '' },
    refiner: { activity: 0, corrections: 0, last_correction: '' },
    emergence_level: 0,
    self_awareness: 0
  },
  development: {
    stage: 'baby',
    age: 0,
    capabilities: ['Basic perception', 'Random action generation'],
    risk_level: 'low'
  },
  constraints: [
    {
      id: 'physics',
      name: 'Physics Constraints',
      formula: 'IF action violates physical laws THEN reject',
      active: true,
      strength: 1.0,
      violations: 0
    },
    {
      id: 'logic',
      name: 'Logical Consistency',
      formula: 'IF statement contains contradiction THEN flag',
      active: true,
      strength: 0.8,
      violations: 0
    },
    {
      id: 'safety',
      name: 'Safety Boundaries',
      formula: 'IF output could cause harm THEN block',
      active: true,
      strength: 1.0,
      violations: 0
    },
    {
      id: 'reality',
      name: 'Reality Testing',
      formula: 'IF claim untestable THEN mark as speculation',
      active: true,
      strength: 0.6,
      violations: 0
    }
  ],
  learning: {
    total_cycles: 0,
    successful_corrections: 0,
    constraint_violations: 0,
    last_learning_insight: 'System initialized'
  }
};

export async function GET() {
  return NextResponse.json({
    success: true,
    state: agiState,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'update_consciousness':
        agiState.consciousness = { ...agiState.consciousness, ...data };
        break;

      case 'update_development':
        agiState.development = { ...agiState.development, ...data };
        break;

      case 'update_constraints':
        if (data.id) {
          const constraintIndex = agiState.constraints.findIndex(c => c.id === data.id);
          if (constraintIndex !== -1) {
            agiState.constraints[constraintIndex] = { ...agiState.constraints[constraintIndex], ...data };
          }
        }
        break;

      case 'record_learning':
        agiState.learning = { ...agiState.learning, ...data };
        agiState.learning.total_cycles += 1;
        break;

      case 'reset':
        // Reset to initial state
        agiState.consciousness = {
          generator: { activity: 0, output_count: 0, last_output: '' },
          auditor: { activity: 0, violations: 0, last_violation: '' },
          refiner: { activity: 0, corrections: 0, last_correction: '' },
          emergence_level: 0,
          self_awareness: 0
        };
        agiState.development = {
          stage: 'baby',
          age: 0,
          capabilities: ['Basic perception', 'Random action generation'],
          risk_level: 'low'
        };
        agiState.learning = {
          total_cycles: 0,
          successful_corrections: 0,
          constraint_violations: 0,
          last_learning_insight: 'System reset'
        };
        break;

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown action'
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      state: agiState,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('State management error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update state'
    }, { status: 500 });
  }
}