import { NextRequest, NextResponse } from 'next/server';
import { getMemory, getKnowledgeGraph, storeMemory, clearMemory } from '../shared/memory';

interface MemoryEntry {
  id: string;
  timestamp: number;
  input: string;
  output: string;
  stage: string;
  consciousness_level: number;
  constraints_active: string[];
  violations: Array<{
    constraint_id: string;
    severity: string;
    description: string;
  }>;
  learning_insights: string[];
  success_rating: number;
}

interface KnowledgeGraph {
  nodes: Array<{
    id: string;
    type: 'concept' | 'experience' | 'constraint' | 'correction';
    label: string;
    weight: number;
    connections: string[];
  }>;
  edges: Array<{
    from: string;
    to: string;
    type: 'association' | 'causal' | 'correction' | 'violation';
    strength: number;
  }>;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'recent':
      const limit = parseInt(searchParams.get('limit') || '10');
      const memory = getMemory();
      const recent = memory
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
      
      return NextResponse.json({
        success: true,
        memories: recent,
        total: memory.length
      });

    case 'knowledge_graph':
      const graph = getKnowledgeGraph();
      return NextResponse.json({
        success: true,
        graph
      });

    case 'stats':
      const allMemory = getMemory();
      const stats = {
        total_memories: allMemory.length,
        avg_success_rating: allMemory.length > 0 
          ? allMemory.reduce((sum, m) => sum + m.success_rating, 0) / allMemory.length 
          : 0,
        total_violations: allMemory.reduce((sum, m) => sum + m.violations.length, 0),
        stage_distribution: allMemory.reduce((acc, m) => {
          acc[m.stage] = (acc[m.stage] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        knowledge_nodes: graph.nodes.length,
        knowledge_edges: graph.edges.length
      };

      return NextResponse.json({
        success: true,
        stats
      });

    default:
      const defaultMemory = getMemory();
      return NextResponse.json({
        success: true,
        memories: defaultMemory.slice(-50), // Last 50 entries
        total: defaultMemory.length
      });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'store': {
        const memoryEntry = storeMemory(data);

        return NextResponse.json({
          success: true,
          memory_id: memoryEntry.id,
          total_memories: getMemory().length
        });
      }

      case 'update_graph': {
        const graph = getKnowledgeGraph();
        const { nodes, edges } = data;
        if (nodes) graph.nodes = [...graph.nodes, ...nodes];
        if (edges) graph.edges = [...graph.edges, ...edges];

        return NextResponse.json({
          success: true,
          graph
        });
      }

      case 'search': {
        const memory = getMemory();
        const query = data.query?.toLowerCase() || '';
        const results = memory.filter(m => 
          m.input.toLowerCase().includes(query) ||
          m.output.toLowerCase().includes(query) ||
          m.learning_insights.some(insight => insight.toLowerCase().includes(query))
        );

        return NextResponse.json({
          success: true,
          results,
          query,
          count: results.length
        });
      }

      case 'clear': {
        clearMemory();
        
        return NextResponse.json({
          success: true,
          message: 'Memory cleared'
        });
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown action'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Memory management error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process memory request'
    }, { status: 500 });
  }
}