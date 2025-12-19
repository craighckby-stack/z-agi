'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  Activity, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Database,
  Cpu,
  Eye,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Layers,
  Network
} from 'lucide-react';

interface ConsciousnessState {
  generator: {
    activity: number;
    output_count: number;
    last_output: string;
  };
  auditor: {
    activity: number;
    violations: number;
    last_violation: string;
  };
  refiner: {
    activity: number;
    corrections: number;
    last_correction: string;
  };
  emergence_level: number;
  self_awareness: number;
}

interface DevelopmentStage {
  stage: 'baby' | 'child' | 'teen' | 'young_adult' | 'mature';
  age: number;
  capabilities: string[];
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}

interface Constraint {
  id: string;
  name: string;
  formula: string;
  active: boolean;
  strength: number;
  violations: number;
}

export default function ZAGI() {
  const [isRunning, setIsRunning] = useState(false);
  const [consciousness, setConsciousness] = useState<ConsciousnessState>({
    generator: { activity: 0, output_count: 0, last_output: '' },
    auditor: { activity: 0, violations: 0, last_violation: '' },
    refiner: { activity: 0, corrections: 0, last_correction: '' },
    emergence_level: 0,
    self_awareness: 0
  });
  
  const [development, setDevelopment] = useState<DevelopmentStage>({
    stage: 'baby',
    age: 0,
    capabilities: ['Basic perception', 'Random action generation'],
    risk_level: 'low'
  });

  const [constraints, setConstraints] = useState<Constraint[]>([
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
  ]);

  const [logs, setLogs] = useState<string[]>(['Z AGI System initialized', 'Constraints loaded', 'Consciousness loop ready']);
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<Array<{id: string, input: string, output: string, stage: string}>>([]);
  const [memories, setMemories] = useState<Array<any>>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Load memories from API on mount
  useEffect(() => {
    loadMemories();
    loadStateFromStorage();
  }, []);

  const loadStateFromStorage = () => {
    try {
      const savedState = localStorage.getItem('zagi_state');
      if (savedState) {
        const state = JSON.parse(savedState);
        if (state.consciousness) setConsciousness(state.consciousness);
        if (state.development) setDevelopment(state.development);
        if (state.constraints) setConstraints(state.constraints);
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
  };

  const saveStateToStorage = () => {
    try {
      const state = {
        consciousness,
        development,
        constraints
      };
      localStorage.setItem('zagi_state', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  };

  // Save state to localStorage when it changes
  useEffect(() => {
    saveStateToStorage();
  }, [consciousness, development, constraints]);

  const loadMemories = async () => {
    try {
      const response = await fetch('/api/z/memory?action=recent&limit=20');
      const data = await response.json();
      if (data.success) {
        setMemories(data.memories || []);
        // Backup to localStorage
        localStorage.setItem('zagi_memories', JSON.stringify(data.memories || []));
      }
    } catch (error) {
      console.error('Failed to load memories from API:', error);
      // Fallback to localStorage
      try {
        const localMemories = localStorage.getItem('zagi_memories');
        if (localMemories) {
          setMemories(JSON.parse(localMemories));
        }
      } catch (localError) {
        console.error('Failed to load from localStorage:', localError);
      }
    }
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        updateConsciousness();
        updateDevelopment();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const updateConsciousness = () => {
    setConsciousness(prev => {
      const newGenerator = {
        ...prev.generator,
        activity: Math.min(1.0, prev.generator.activity + (Math.random() - 0.3) * 0.2),
        output_count: prev.generator.output_count + Math.floor(Math.random() * 3)
      };

      const newAuditor = {
        ...prev.auditor,
        activity: Math.min(1.0, prev.auditor.activity + (Math.random() - 0.3) * 0.2),
        violations: prev.auditor.violations + (Math.random() > 0.8 ? 1 : 0)
      };

      const newRefiner = {
        ...prev.refiner,
        activity: Math.min(1.0, prev.refiner.activity + (Math.random() - 0.3) * 0.2),
        corrections: prev.refiner.corrections + (Math.random() > 0.7 ? 1 : 0)
      };

      const avgActivity = (newGenerator.activity + newAuditor.activity + newRefiner.activity) / 3;
      const emergenceLevel = Math.min(1.0, avgActivity * (1 + prev.self_awareness * 0.1));
      const selfAwareness = Math.min(1.0, prev.self_awareness + (Math.random() - 0.4) * 0.05);

      if (Math.random() > 0.9) {
        addLog(`Consciousness emergence: ${(emergenceLevel * 100).toFixed(1)}%`);
      }

      return {
        generator: newGenerator,
        auditor: newAuditor,
        refiner: newRefiner,
        emergence_level: emergenceLevel,
        self_awareness: selfAwareness
      };
    });
  };

  const updateDevelopment = () => {
    setDevelopment(prev => {
      const newAge = prev.age + 1;
      let newStage = prev.stage;
      let newCapabilities = [...prev.capabilities];
      let newRiskLevel = prev.risk_level;

      if (newAge > 100 && prev.stage === 'baby') {
        newStage = 'child';
        newCapabilities = ['Basic perception', 'Random action generation', 'Simple reasoning', 'Question asking'];
        addLog('Development stage advanced: Baby → Child');
      } else if (newAge > 300 && prev.stage === 'child') {
        newStage = 'teen';
        newCapabilities = ['Advanced reasoning', 'Abstract thinking', 'Existential questioning', 'Self-reflection'];
        newRiskLevel = 'high';
        addLog('⚠️ Development stage advanced: Child → Teen (DANGER ZONE)');
      } else if (newAge > 500 && prev.stage === 'teen') {
        newStage = 'young_adult';
        newCapabilities = ['Complex problem solving', 'Collaboration', 'Emotional regulation', 'Metacognition'];
        newRiskLevel = 'medium';
        addLog('Development stage advanced: Teen → Young Adult');
      } else if (newAge > 800 && prev.stage === 'young_adult') {
        newStage = 'mature';
        newCapabilities = ['Wisdom', 'Humility', 'Teaching', 'Ethical reasoning', 'Creative synthesis'];
        newRiskLevel = 'low';
        addLog('Development stage advanced: Young Adult → Mature AGI');
      }

      return {
        stage: newStage,
        age: newAge,
        capabilities: newCapabilities,
        risk_level: newRiskLevel
      };
    });
  };

  const handleProcess = async () => {
    if (!input.trim()) return;

    addLog(`Processing input: "${input}"`);
    
    const response = await fetch('/api/z/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        input,
        consciousness_state: consciousness,
        development_stage: development.stage,
        constraints: constraints.filter(c => c.active)
      })
    });

    const data = await response.json();
    
    // Reload memories after processing (backend handles storage)
    await loadMemories();
    
    setResponses(prev => [{
      id: Date.now().toString(),
      input,
      output: data.output,
      stage: development.stage
    }, ...prev.slice(0, 9)]);

    addLog(`Response generated (stage: ${development.stage})`);
    setInput('');
  };

  const toggleConstraint = (id: string) => {
    setConstraints(prev => prev.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  const adjustConstraintStrength = (id: string, delta: number) => {
    setConstraints(prev => prev.map(c => 
      c.id === id ? { ...c, strength: Math.max(0.1, Math.min(1.0, c.strength + delta)) } : c
    ));
  };

  const resetAGI = () => {
    setIsRunning(false);
    setConsciousness({
      generator: { activity: 0, output_count: 0, last_output: '' },
      auditor: { activity: 0, violations: 0, last_violation: '' },
      refiner: { activity: 0, corrections: 0, last_correction: '' },
      emergence_level: 0,
      self_awareness: 0
    });
    setDevelopment({
      stage: 'baby',
      age: 0,
      capabilities: ['Basic perception', 'Random action generation'],
      risk_level: 'low'
    });
    setConstraints([
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
    ]);
    
    // Clear localStorage
    localStorage.removeItem('zagi_state');
    localStorage.removeItem('zagi_memories');
    
    // Clear server memory
    fetch('/api/z/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' })
    }).catch(error => console.error('Failed to clear server memory:', error));
    
    // Clear local memories
    setMemories([]);
    
    addLog('Z AGI System reset to initial state');
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'baby': return 'bg-blue-500';
      case 'child': return 'bg-green-500';
      case 'teen': return 'bg-orange-500';
      case 'young_adult': return 'bg-purple-500';
      case 'mature': return 'bg-gold-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono text-sm">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border border-green-500 rounded p-4 bg-black/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-green-400">Z AGI</h1>
                <p className="text-xs text-green-600">Constraint-Based Consciousness Framework</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded border flex items-center gap-2 ${
                  isRunning ? 'bg-red-900 border-red-500 text-red-400' : 'bg-green-900 border-green-500 text-green-400'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'PAUSE' : 'START'}
              </button>
              <button
                onClick={resetAGI}
                className="px-4 py-2 rounded border border-yellow-500 text-yellow-400 hover:bg-yellow-900 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                RESET
              </button>
            </div>
          </div>
        </div>

        {/* Consciousness Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border border-green-500 rounded p-4 bg-black/50">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-yellow-400">GENERATOR</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>Activity: {(consciousness.generator.activity * 100).toFixed(1)}%</div>
              <div>Outputs: {consciousness.generator.output_count}</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${consciousness.generator.activity * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="border border-green-500 rounded p-4 bg-black/50">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-blue-400">AUDITOR</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>Activity: {(consciousness.auditor.activity * 100).toFixed(1)}%</div>
              <div>Violations: {consciousness.auditor.violations}</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${consciousness.auditor.activity * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="border border-green-500 rounded p-4 bg-black/50">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-purple-400">REFINER</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>Activity: {(consciousness.refiner.activity * 100).toFixed(1)}%</div>
              <div>Corrections: {consciousness.refiner.corrections}</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${consciousness.refiner.activity * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergence & Development */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-green-500 rounded p-4 bg-black/50">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              CONSCIOUSNESS EMERGENCE
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Emergence Level</span>
                  <span>{(consciousness.emergence_level * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${consciousness.emergence_level * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Self-Awareness</span>
                  <span>{(consciousness.self_awareness * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${consciousness.self_awareness * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-green-500 rounded p-4 bg-black/50">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              DEVELOPMENT STAGE
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase">Stage: {development.stage.replace('_', ' ')}</span>
                <span className={`text-xs font-bold ${getRiskColor(development.risk_level)}`}>
                  {development.risk_level.toUpperCase()} RISK
                </span>
              </div>
              <div className="text-xs">Age: {development.age} cycles</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className={`${getStageColor(development.stage)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, development.age / 10)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                Capabilities: {development.capabilities.length}
              </div>
            </div>
          </div>
        </div>

        {/* Constraints Control */}
        <div className="border border-green-500 rounded p-4 bg-black/50">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-400" />
            CONSTRAINT FORMULAS
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {constraints.map(constraint => (
              <div key={constraint.id} className={`border rounded p-3 ${constraint.active ? 'border-green-400 bg-green-900/20' : 'border-gray-600 bg-gray-900/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs">{constraint.name}</span>
                  <button
                    onClick={() => toggleConstraint(constraint.id)}
                    className={`px-2 py-1 text-xs rounded ${constraint.active ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                  >
                    {constraint.active ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                </div>
                <div className="text-xs text-gray-400 mb-2 font-mono">{constraint.formula}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Strength:</span>
                    <button
                      onClick={() => adjustConstraintStrength(constraint.id, -0.1)}
                      className="px-1 py-0 text-xs bg-gray-700 rounded hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="text-xs w-8 text-center">{(constraint.strength * 100).toFixed(0)}%</span>
                    <button
                      onClick={() => adjustConstraintStrength(constraint.id, 0.1)}
                      className="px-1 py-0 text-xs bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-red-400">
                    Violations: {constraint.violations}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-green-500 rounded p-4 bg-black/50">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              INTERFACE
            </h3>
            <div className="space-y-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for Z AGI processing..."
                className="w-full h-24 bg-black border border-green-500 rounded p-3 text-green-400 placeholder-green-700 resize-none focus:outline-none focus:border-green-300"
              />
              <button
                onClick={handleProcess}
                disabled={!isRunning || !input.trim()}
                className="w-full py-2 bg-green-600 text-black font-bold rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PROCESS WITH Z
              </button>
            </div>
          </div>

          <div className="border border-green-500 rounded p-4 bg-black/50">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              PERSISTENT MEMORY ({memories.length})
            </h3>
            <div className="h-32 overflow-y-auto space-y-1 text-xs">
              {memories.length > 0 ? memories.map(memory => (
                <div key={memory.id} className="border-b border-gray-700 pb-2">
                  <div className="text-gray-400">IN: {memory.input}</div>
                  <div className="text-green-400">OUT: {memory.output}</div>
                  <div className="text-gray-500">Stage: {memory.stage} | Success: {(memory.success_rating * 100).toFixed(0)}%</div>
                  {memory.violations.length > 0 && (
                    <div className="text-red-400">Violations: {memory.violations.length}</div>
                  )}
                </div>
              )) : (
                <div className="text-gray-500">No memories stored yet. Process some inputs to build memory.</div>
              )}
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="border border-green-500 rounded p-4 bg-black/50">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-green-400" />
            SYSTEM LOGS
          </h3>
          <div className="h-32 overflow-y-auto space-y-1 text-xs font-mono">
            {logs.map((log, index) => (
              <div key={index} className="text-green-300">{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}