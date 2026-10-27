# Inkwell SQA Plan — v1
## Standards
- All code changes follow the PR checklist (docs/reviews, .github/PULL_REQUEST_TEMPLATE.md)
- Architecture conformance per ADR-001 (docs/architecture/adr-001-modular.monolith.md)
- API contract conventions per docs/design/api-contract.md
## Reviews
- Every merged change is self-reviewed (author) then peer-reviewed before merge
- Review findings logged in docs/reviews/
## Testing (docs/quality/SQA-PLAN.md)
- Unit tests: Services and Repositories (Jest) — ACTIVE (Lecture 12)
- Integration tests: Routes → Services → Repositories, real test DB (Supertest) — ACTIVE (Lecture 13)
- Component tests: React components (RTL) — ACTIVE (Lecture 13)
- End-to-end tests: critical user flows, mobile + desktop viewports (Playwright) — ACTIVE (Lecture 14)
- Automated accessibility checks (axe-core) — ACTIVE (Lecture14)
- Documentation verification (README, Section 4.10) — ACTIVE (Lecture 14)
- Security testing — starting Lecture 15
- Performance/load testing — deferred; revisit at Lecture 19-20 (architecture scale-out)
## Defect Tracking
- All discovered defects (via review, testing, or manual use) recorded in docs/quality/DEFECT-LOG.md
- Each entry records: cause category, discovery stage, and remediation
## Metrics Tracked
- Defects per lecture/increment
- Defect cause category distribution
- Review turnaround (informal, tracked qualitatively at this project's scale)
## Ownership
- For this course project: the student/team implementing Inkwell owns SQA plan adherence.
## Metrics Snapshot
- **Commits:** [17]
- **Logged defects:** [1]
- **Backlog items marked "Requirements Defined" or later:** [4]