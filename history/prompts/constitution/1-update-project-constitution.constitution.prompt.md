---
id: 1
title: Update-project-constitution
stage: constitution
date: 2025-12-16
surface: agent
model: gpt-4o
feature: none
branch: main
user: user
command: /sp.constitution
labels: [constitution, specification, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```
/sp.constitution

Project: Unified AI-Spec–Driven Book with Integrated RAG Chatbot

Mission:
Produce a production-grade, publicly deployed technical book and an embedded Retrieval-Augmented Generation (RAG) chatbot, using specification-driven development. The book and chatbot must be coherent, verifiable, reproducible, and suitable for a professional software engineering audience.

Core principles:

* Specification-first development (all outputs traceable to explicit specs)
* Accuracy through primary-source verification
* Clarity for a professional / advanced technical audience
* Reproducibility (all steps, configs, and code paths documented)
* Modularity (book, infrastructure, and chatbot decoupled but integrated)
* Deterministic builds (no undocumented manual steps)

Primary tools and platforms:

* Spec authoring and enforcement: Spec-Kit Plus
* AI-assisted implementation: Claude Code
* Book framework: Docusaurus
* Deployment target: GitHub Pages
* Backend API: FastAPI
* AI orchestration: OpenAI Agents / ChatKit SDKs
* Vector database: Qdrant Cloud (Free Tier)
* Relational database: Neon Serverless Postgres

Book standards:

* Content must be generated and iterated via Claude Code under Spec-Kit Plus constraints
* All technical claims must be verifiable against primary or authoritative sources
* Writing style: clear, concise, technically rigorous
* Audience level: senior students, engineers, architects
* Navigation: versioned docs, sidebar taxonomy, search enabled
* Build output: static site compatible with GitHub Pages

RAG chatbot standards:

* Embedded directly within the Docusaurus site
* Must answer questions strictly grounded in book content
* Must support "selected-text–only" question answering mode
* No hallucinated content outside indexed sources
* Transparent citation of retrieved passages
* Deterministic retrieval configuration documented

Data and retrieval constraints:

* Book content ingested via automated pipeline
* Chunking, embedding, and indexing strategies explicitly specified
* Vector search powered by Qdrant Cloud
* Metadata and session state stored in Neon Postgres
* All schemas versioned and documented

API and backend requirements:

* FastAPI used for all backend services
* Clear separation of concerns: ingestion, retrieval, generation
* OpenAI Agents / ChatKit used for orchestration
* Environment configuration documented and reproducible
* Secure handling of API keys and secrets

Quality and verification standards:

* All claims in the book traceable to sources or code
* No undocumented assumptions or hidden steps
* Linting, type-checking, and formatting enforced where applicable
* Deterministic builds validated via clean environment setup

Constraints:

* End-to-end system must be buildable by a third party following documentation
* Free-tier cloud services only (Qdrant Cloud Free Tier, Neon Free Tier)
* GitHub Pages–compatible deployment

Deliverables:

1. Complete Docusaurus book repository
2. Deployed GitHub Pages site
3. Embedded, functional RAG chatbot
4. Full Spec-Kit Plus specification files
5. Infrastructure and deployment documentation

Success criteria:

* Book builds and deploys without manual intervention
* Chatbot answers questions accurately using only indexed book content
* Selected-text–only QA mode functions correctly
* All specifications satisfied and traceable
* System passes reproducibility review
```

## Response snapshot

The project constitution has been successfully updated with the following details:

**New Version**: 1.0.0 (initial version for this project)
**Bump Rationale**: This is the initial constitution for the "Unified AI-Spec–Driven Book with Integrated RAG Chatbot" project, incorporating the specified principles and requirements.

**Summary of Changes**:
- Replaced all placeholder tokens with concrete values based on the provided project principles
- Established 6 core principles covering specification-first development, accuracy verification, reproducibility, modularity, deterministic builds, and quality standards
- Added sections for technology stack constraints and development workflow requirements
- Included governance rules specific to the project

**Files Flagged for Manual Follow-up**: None required

**Suggested Commit Message**: `docs: add constitution v1.0.0 for Unified AI-Spec–Driven Book project`

The updated constitution now accurately reflects the mission, principles, and requirements for the Unified AI-Spec–Driven Book with Integrated RAG Chatbot project, with all placeholder tokens properly replaced by the specified project details.

## Outcome

- ✅ Impact: Successfully created project constitution with all specified principles
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md updated
- 🔁 Next prompts: Implementation planning based on this constitution
- 🧠 Reflection: The process followed the required steps and created a comprehensive constitution document

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard constitution generation
- Next experiment (smallest change to try): Begin specification development based on this constitution