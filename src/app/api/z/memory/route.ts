import { NextRequest, NextResponse } from 'next/server';

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

// In-memory storage (in production, use database)
let memory: MemoryEntry[] = [];
let knowledgeGraph: KnowledgeGraph = {
  nodes: [],
  edges: []
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'recent':
      const limit = parseInt(searchParams.get('limit') || '10');
      const recent = memory
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
      
      return NextResponse.json({
        success: true,
        memories: recent,
        total: memory.length
      });

    case 'knowledge_graph':
      return NextResponse.json({
        success: true,
        graph: knowledgeGraph
      });

    case 'stats':
      const stats = {
        total_memories: memory.length,
        avg_success_rating: memory.length > 0 
          ? memory.reduce((sum, m) => sum + m.success_rating, 0) / memory.length 
          : 0,
        total_violations: memory.reduce((sum, m) => sum + m.violations.length, 0),
        stage_distribution: memory.reduce((acc, m) => {
          acc[m.stage] = (acc[m.stage] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        knowledge_nodes: knowledgeGraph.nodes.length,
        knowledge_edges: knowledgeGraph.edges.length
      };

      return NextResponse.json({
        success: true,
        stats
      });

    default:
      return NextResponse.json({
        success: true,
        memories: memory.slice(-50), // Last 50 entries
        total: memory.length
      });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'store': {
        const memoryEntry: MemoryEntry = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          input: data.input,
          output: data.output,
          stage: data.stage,
          consciousness_level: data.consciousness_level,
          constraints_active: data.constraints_active || [],
          violations: data.violations || [],
          learning_insights: data.learning_insights || [],
          success_rating: data.success_rating || 0.5
        };

        memory.push(memoryEntry);

        // Update knowledge graph
        updateKnowledgeGraph(memoryEntry);

        // Keep only last 1000 entries in memory
        if (memory.length > 1000) {
          memory = memory.slice(-1000);
        }

        return NextResponse.json({
          success: true,
          memory_id: memoryEntry.id,
          total_memories: memory.length
        });
      }

      case 'update_graph': {
        const { nodes, edges } = data;
        if (nodes) knowledgeGraph.nodes = [...knowledgeGraph.nodes, ...nodes];
        if (edges) knowledgeGraph.edges = [...knowledgeGraph.edges, ...edges];

        return NextResponse.json({
          success: true,
          graph: knowledgeGraph
        });
      }

      case 'search': {
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
        memory = [];
        knowledgeGraph = { nodes: [], edges: [] };
        
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

function updateKnowledgeGraph(entry: MemoryEntry) {
  // Extract concepts from input and output
  const inputWords = entry.input.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const outputWords = entry.output.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const allWords = [...new Set([...inputWords, ...outputWords])];

  // Create or update nodes
  allWords.forEach(word => {
    const existingNode = knowledgeGraph.nodes.find(n => n.id === word);
    if (!existingNode) {
      knowledgeGraph.nodes.push({
        id: word,
        type: 'concept',
        label: word,
        weight: 1,
        connections: []
      });
    } else {
      existingNode.weight += 0.1;
    }
  });

  // Create associations between words
  for (let i = 0; i < allWords.length; i++) {
    for (let j = i + 1; j < allWords.length; j++) {
      const word1 = allWords[i];
      const word2 = allWords[j];
      
      const existingEdge = knowledgeGraph.edges.find(
        e => (e.from === word1 && e.to === word2) || (e.from === word2 && e.to === word1)
      );
      
      if (existingEdge) {
        existingEdge.strength += 0.1;
      } else {
        knowledgeGraph.edges.push({
          from: word1,
          to: word2,
          type: 'association',
          strength: 0.1
        });
      }
    }
  }

  // Add constraint violation nodes if any
  entry.violations.forEach(violation => {
    const violationId = `violation_${violation.constraint_id}`;
    const existingNode = knowledgeGraph.nodes.find(n => n.id === violationId);
    
    if (!existingNode) {
      knowledgeGraph.nodes.push({
        id: violationId,
        type: 'constraint',
        label: `${violation.constraint_id} violation`,
        weight: 1,
        connections: []
      });
    }

    // Connect violation to concepts involved
    allWords.forEach(word => {
      knowledgeGraph.edges.push({
        from: word,
        to: violationId,
        type: 'violation',
        strength: violation.severity === 'critical' ? 1.0 : 0.5
      });
    });
  });

  // Add learning insight nodes
  entry.learning_insights.forEach(insight => {
    const insightId = `insight_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const insightWords = insight.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    knowledgeGraph.nodes.push({
      id: insightId,
      type: 'experience',
      label: insight.substring(0, 50) + '...',
      weight: entry.success_rating,
      connections: []
    });

    // Connect insight to relevant concepts
    insightWords.forEach(word => {
      if (allWords.includes(word)) {
        knowledgeGraph.edges.push({
          from: word,
          to: insightId,
          type: 'correction',
          strength: 0.8
        });
      }
    });
  });

  // Keep graph size manageable
  if (knowledgeGraph.nodes.length > 500) {
    const nodesToKeep = knowledgeGraph.nodes
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 500);
    
    const nodeIdsToKeep = new Set(nodesToKeep.map(n => n.id));
    
    knowledgeGraph.nodes = nodesToKeep;
    knowledgeGraph.edges = knowledgeGraph.edges.filter(
      e => nodeIdsToKeep.has(e.from) && nodeIdsToKeep.has(e.to)
    );
  }
}