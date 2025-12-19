# Z-AI: Constraint-Based Self-Correction Framework

<div align="center">

![Research Status](https://img.shields.io/badge/Status-Early%20Research-yellow)
![Experiments](https://img.shields.io/badge/Experiments-In%20Progress-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**A research platform exploring whether constraint-based architectures can improve AI system reliability through iterative self-correction and learning from violations.**

[Live Demo](http://localhost:3000) • [Research Status](./docs/RESEARCH_STATUS.md) • [Experiments](./experiments/) • [API](./docs/API.md)

</div>

## 🎯 Research Questions

1. **Does constraint learning reduce violation rates over time?**
2. **Can the system generalize from specific violations to similar cases?**
3. **What are the computational costs vs. benefits of this approach?**
4. **How does this compare to few-shot prompting baselines?**

## 🏗️ What This Project Actually Does

- **Three-tier processing loop** (Generator/Auditor/Refiner) for constraint checking
- **Real-time violation detection** across multiple constraint types
- **Persistent learning** from constraint violations
- **Staged development approach** from conservative to capable
- **Empirical validation** through controlled experiments

## ❌ What This Project Does NOT Claim

- **Not artificial general intelligence (AGI)**
- **Not conscious or sentient**
- **Not a revolutionary breakthrough**
- **Not self-modifying code without safety constraints**

## 📊 Current Status: Early Research Phase

We are currently validating core claims through controlled experiments. See [Research Status](./docs/RESEARCH_STATUS.md) for detailed progress.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/craighckby-stack/z-agi.git
cd z-agi
npm install

# Start development server
npm run dev

# View live monitoring dashboard
open http://localhost:3000
```

## 🔬 Experiments

See our [experiments directory](./experiments/) for:
- [Constraint Learning Validation](./experiments/constraint-learning/)
- [Experimental Protocol](./experiments/constraint-learning/design/protocol.md)
- [Pre-registered Hypotheses](./experiments/constraint-learning/design/preregistration.md)

## 📚 Documentation

- [Research Status](./docs/RESEARCH_STATUS.md) - Current validation progress
- [Honest Limitations](./docs/HONEST_LIMITATIONS.md) - What we don't know yet
- [API Reference](./docs/API.md) - Complete API documentation
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design details

## 🤝 Contributing

We welcome contributions that prioritize:
- **Empirical validation** over theoretical claims
- **Honest reporting** of results (positive and negative)
- **Scientific rigor** in experimental design
- **Transparent limitations** in system capabilities

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Note**: This is early-stage research. Claims are currently being empirically validated. See [experiments](./experiments/) for our validation methodology.