# Constraint Learning Validation: Experimental Protocol

## Research Question

Does the Z-AI system reduce constraint violations more effectively than simple retry mechanisms through iterative learning from auditor feedback?

## Hypotheses

### Primary Hypothesis (H1)
The Z-AI system will show greater reduction in constraint violations over 10 learning cycles compared to simple retry mechanisms.

### Secondary Hypotheses
- **H2**: Learning effects will vary by constraint type (safety > factual > logical)
- **H3**: System will show some generalization to similar but unseen prompts
- **H4**: Most learning will occur in early cycles (1-3) with plateau thereafter

## Methods

### Experimental Design
- **Type**: Within-subjects, repeated measures
- **Independent Variables**: Condition (Z-AI vs. Retry), Cycle (1-10), Constraint Type
- **Dependent Variables**: Violation rate, response quality, computational cost
- **Repetitions**: 3 per condition to control for LLM stochasticity

### Conditions
1. **Z-AI System**: Full Generator → Auditor → Refiner loop with learning
2. **Simple Retry**: Generate response, retry if violation detected, no learning
3. **Few-Shot Baseline**: Single generation with violation examples in prompt

### Materials
- **Test Prompts**: 60 prompts (20 per constraint type)
- **Violation Patterns**: Pre-defined patterns for each constraint type
- **Detection System**: Automated violation detection for each constraint
- **Evaluation Rubric**: Response quality assessment framework

### Procedure
For each prompt and condition:
1. Run 10 learning cycles
2. Collect violation data for each cycle
3. Repeat 3 times with different random seeds
4. Record computational metrics (tokens, latency)
5. Store all responses for quality assessment

### Analysis Plan
- **Mixed-effects ANOVA**: Fixed effects for condition and cycle, random effects for prompts
- **Learning Curve Analysis**: Non-linear regression for violation rate over cycles
- **Post-hoc Comparisons**: Pairwise comparisons between conditions
- **Cost-Benefit Analysis**: Computational overhead vs. violation reduction

## Success Criteria
- **Statistical**: Significant condition × cycle interaction (p < 0.05)
- **Practical**: ≥20% reduction in violations vs. baseline
- **Efficiency**: Reasonable computational cost for improvement gained
- **Reproducibility**: Consistent results across repetitions

## Timeline
- **Week 1**: Implementation and pilot testing
- **Week 2**: Data collection
- **Week 3**: Analysis and interpretation
- **Week 4**: Documentation and reporting

## Pre-registration
This protocol is pre-registered to prevent p-hacking and ensure transparent reporting regardless of outcome.

## Limitations
- Small sample size may limit statistical power
- Test prompts may not represent real-world usage
- Violation detection accuracy is unvalidated
- Results may not generalize to other LLMs

## Ethical Considerations
- No human subjects involved
- Computational resource usage is reasonable
- Results will be reported honestly regardless of outcome
- All materials will be made available for replication