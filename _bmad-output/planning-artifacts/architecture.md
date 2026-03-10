## Starter Template Evaluation

### Primary Technology Domain

Full-stack web/mobile app (hybrid client-server for offline, API-driven integrations in the adult entertainment domain for AU agencies).

### Starter Options Considered

- **Official Next.js**: Simple web scalability; add PouchDB for offline. Weighted Risk: Low (ease) / Medium (compliance) / Failure Score: Medium (sync) / Trend Score: High (AI/edge adaptable). Suitable for proactive compliance AI and rural resilience.
- **T3 Stack**: Type-safe full-stack; strong API/compliance. Weighted Risk: Medium (curve) / Low (type-safety) / Failure Score: Low (auditing) / Trend Score: Medium (less flexible for low-code). Good for ethical AI integrations.
- **Supabase Starter**: Built-in DB/auth; sovereignty focus. Weighted Risk: Low (regs) / Medium (lock-in) / Failure Score: Low (resilience) / Trend Score: High (multi-region ready). Aligns with AU data residency.
- **Expo (Mobile-Heavy Hybrid)**: Native mobile with Next integration; offline dominance. Weighted Risk: Medium (builds) / Low (rural) / Failure Score: Medium (app issues) / Trend Score: Medium (edge potential). Strong for offline-first resilience in rural AU shoots.
- **Django/Next Combo (Custom)**: Python backend + Next frontend for skills fit. Weighted Risk: High (integration) / Medium (skills) / Failure Score: High (adoption) / Trend Score: Low (less AI-native). Not ideal for scalability.

**Trade-Off Matrix** (Scored out of 10; higher = better for MVP, weighted for offline compliance and AU regs):
| Starter | Adoption Speed | Scalability | Compliance Fit | Offline Strength | Ops Ease | Total Score | MVP Note | Trend Score |
|---------|----------------|-------------|----------------|------------------|----------|-------------|----------|-------------|
| Next.js | High (<5 min) | High (10x) | Medium (plugins) | Medium (add-ons) | High (Vercel) | 8/10 | Top for quick MVP with offline add-ons | High |
| T3 | Medium | High | High (type-safe) | Medium | Medium | 7/10 | Good for type-safety and AI | Medium |
| Supabase | High | Medium | High (built-in) | High (Realtime) | Medium | 8/10 | Regs-focused with AU sovereignty | High |
| Expo | Medium | Medium | Medium | High | Low (mobile CI) | 7/10 | Offline priority for rural users | Medium |
| Django/Next | Low | High | Medium | Medium | Medium | 5/10 | Skills-driven custom, poor for AI/scalability | Low |

**Optimized Paths** (from Branches):
- **Web-First (Score 8/10)**: Next.js + AI compliance (e.g., TensorFlow.js for flagging) and cloud fallback. Supports end-to-end content-to-cash pipelines.
- **Mobile-First (Score 7/10)**: Expo hybrid with native encryption for audits. Enhances offline resilience for remote shoots.
- **Compliance-Heavy (Score 8/10)**: Supabase + AI scaffolding for custom layers. Ensures AU compliance (R18+, ATO) and proactive AI.

### Selected Starter: Official Next.js (create-next-app)

**Rationale for Selection**: Optimal MVP balance—high adoption/ops, extensible for offline-first, compliance, and AI needs in AU adult agencies. Supports scaling from 5-50 models with unified dashboards. (See ADR-001 for full traceability.)

**Converged Recommendation**: Synthesize to Next.js core with mobile/compliance branches—ensures flexibility (e.g., pivot to Expo for offline >50%), high overall score (8.5/10), and metric alignment (30-50% efficiency gains, 99.5% uptime).

**Initialization Command:**

```bash
npx create-next-app@latest fanflare --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
```

**Customization Paths**: Add PouchDB for offline (npm i pouchdb; test <1 min conflicts); Prisma for DB (npx prisma init); next-pwa for rural PWA; TensorFlow.js for AI flagging; Cloudflare Workers for low-latency sync.

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** TypeScript/Node.js with strict typing for compliance audits.
**Styling Solution:** Tailwind CSS/PostCSS for responsive mobile-first UI.
**Build Tooling:** Next.js SWC compiler for fast optimization and rural performance.
**Testing Framework:** Add Jest/Vitest for unit/integration, including offline sync tests.
**Code Organization:** App Router (/app routes for bookings, content, etc.), /components reusables, /lib utilities.
**Development Experience:** Hot reloading dev server, TypeScript/ESLint checking.

**Scenario-Resilient Choices**:
- Offline Dominance: Expo hybrid (ADR-002) for rural AU shoots without signal.
- Regulatory Overhaul: Supabase pivot (ADR-003) for AU regs like R18+ and ATO.
- Skill Shift: Django/Next custom if needed.
- Budget Boom: AI add-ons for co-pilot insights.

**Mitigation Strategies**:
- Offline Risks: Early PouchDB testing with 3G simulation for >99% sync; pub/sub for conflict resolution.
- Compliance Gaps: Sentry in CI/CD; mock audits quarterly for R18+/ATO.
- Skill Mismatches: Onboarding and pair programming.
- Ops Overhead: Vercel start, AWS migration if scaled; dynamic TTL for caching.

**Failure Modes & Preventions** (for Next.js):
- **Offline Sync Breakdown**: PouchDB conflict detection; monitor zero loss (ADR-002) for rural resilience.
- **Compliance Audit Failure**: Prisma extensions for logs; automate ATO exports (ADR-003).
- **Integration Instability**: Axios retries; <1 min recovery for OnlyFans sync.
- **Scalability Choke**: Early load testing; <10% degradation cap (ADR-004) for 20-30% model growth.
- **Team Adoption Hurdle**: Skill assessments; hybrid if TS unfamiliar.

**Architecture Decision Records**:
- **ADR-001: Selected Starter Template** – Decision: Next.js; Rationale: MVP balance (8/10 score) for efficiency gains; Consequences: Extensible but custom-required.
- **ADR-002: Offline Handling Approach** – Decision: PouchDB add-on; Rationale: Resilience for rural/remote shoots; Consequences: Minor complexity, aligns with offline-first.
- **ADR-003: Compliance Integration Strategy** – Decision: Sentry/Prisma extensions; Rationale: 95% accuracy for R18+/ATO; Consequences: Early testing needed.
- **ADR-004: Scalability Foundation** – Decision: Next.js monolith with migration design; Rationale: Lean scaling for 10x agencies; Consequences: Phase 2 refactor.

**Trend-Resilient Extensions**:
- **AI-Native**: Use Grok for scaffolding ethical AI co-pilot (e.g., auto-flagging for 95% accuracy, bias-free suggestions).
- **Edge Computing**: Add Cloudflare Workers for low-latency offline sync (boosts rural uptime >99.5%).
- **Low-Code Hybrid**: Bubble for UI prototyping if budget tight (hits <5 min time-to-value).
- **Global Regs**: Multi-region config in Supabase for expanded AU compliance.

**Note:** Initialize as first implementation story for Fanflare's content-to-cash pipeline.


## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database Choice: PostgreSQL (v16.4) – Essential for data storage, multi-tenant isolation, and AU compliance (R18+, ATO).
- Authentication Method: NextAuth.js (v4.24.13) with Credentials – Blocks all user access, supports offline queues.

**Important Decisions (Shape Architecture):**
- Data Modeling Approach: Prisma ORM (v5.17.0) – Shapes how data is handled, migrated, with RLS for tenant isolation.
- Authorization Patterns: JWT strategy with custom claims for RBAC (Agency Owner, Manager, Model, etc.) – Defines access control for unified dashboards.
- Caching Strategy: Redis (v7.4.0) – Influences performance for real-time earnings forecasts.
- Data Validation Strategy: Zod (v3.23.8) – Ensures data integrity for consent forms and compliance.
- Offline Flow: Local JWT validation with PouchDB queue – Critical for rural use cases and offline resilience.

**Deferred Decisions (Post-MVP):**
- Full Social/SSO Logins: Defer to Phase 2 for added convenience (rationale: Focus on core email/password for MVP compliance).
- Advanced 2FA (e.g., biometrics beyond TOTP): Defer unless AU regs escalate (rationale: Phase 1 basics cover >95% security for adult data).

### Data Architecture

- **Database Choice**: PostgreSQL (v16.4) – Scalable relational DB with row-level security for multi-tenant compliance isolation. User Impact: Enhances privacy trust for models/agencies in adult domain.
- **Data Modeling Approach**: Prisma ORM (v5.17.0) – Type-safe schema management with migrations for bookings, content, payouts.
- **Data Validation Strategy**: Zod (v3.23.8) – Runtime type checking for inputs/outputs, including consent and compliance flags.
- **Caching Strategy**: Redis (v7.4.0) – In-memory caching for performance (e.g., session data, query results, AI suggestion caches). Ops Mitigation: Use persistent mode; fallback to DB for sensitive compliance data.
- **Migration Approach**: Prisma Migrate – Automated schema changes with preview for ATO exports.

**Alternatives Considered**:
- MongoDB: Flexible for content uploads, but weaker RLS (trade-off: Simpler offline vs. compliance risks in AU).
- Supabase: Realtime built-in, easier for mobile sync (trade-off: Vendor ease vs. lock-in, but strong for AU residency).

**Rationale**: Stack supports offline sync, audits, and scalability for 5-50 models per agency; affects all backend services. Risk Tie: Addresses sync gaps for >99.5% uptime in rural areas. Inventiveness: Incorporates lateral ideas for adaptive resilience in adult workflows. Cross-Domain Adaptability: Draws from mashed concepts for harmonious, flexible design. Creative Note: Stimulated by unrelated fields for transformative ideas in content-to-cash.

**Mitigation Strategies** (Stimulated Tweaks):
- Offline Risks: Early PouchDB testing with 3G simulation for >99% sync; add "entanglement" pub/sub for instant resolution in shoots.
- Compliance Gaps: Sentry in CI/CD; mock audits quarterly; "improv hooks" for AU reg-adaptable schemas (R18+, ATO).
- Skill Mismatches: Onboarding and pair programming.
- Ops Overhead: Vercel start, AWS migration if scaled; "brew timer" dynamic TTL in Redis for earnings freshness; "orchestral" prioritization for harmony; "forecast" predictions for peak booking times.

**Pre-Mortem Preventions**:
- Sync Breakdowns: Pair Prisma with RxDB for conflict merging, ensuring zero loss in offline uploads.
- Log Volatility: pgAudit for immutable tracking of consent and payouts; Redis AOF persistence with versioned backups.
- Validation Failures: Zod server hooks for >95% accuracy in R18+ flagging; sandbox prototypes for AI extensions.
- Migration Downtime: CI/CD staging for zero-downtime; immutable logging triggers for compliance breaches.
- Stack Rigidity: ADR-documented hybrids for pivots; require rollback plans in rollouts.
- Extension Bugs: Stress test sparks in isolated envs for >99% reliability in adult integrations.

**Innovative Extensions** (Expanded):
- **Adaptive Caching (Coffee Brewing)**: Dynamic Redis TTL based on connectivity for stale-data prevention in rural syncs.
- **Entangled Sync (Quantum)**: Pub/sub channels for near-realtime offline links during live shoots.
- **Self-Healing Models (Garden)**: Prisma/Zod auto-pruning for resilient schemas in dynamic bookings.
- **Improv Migrations (Jazz)**: Runtime variants for flexible AU reg changes (e.g., 2026 verification).
- **Mythic Variants (Mythology + Migration)**: A/B testing for schema evolutions in promotion schedules.
- **Forecast Caching (Weather + Caching)**: Predictive loading for "storms" (peak usage in viral campaigns).
- **Strategic Gates (Board Game + Validation)**: Multi-stage rules for data flow in consent approvals.
- **Grafted Schemas (Botanical + Modeling)**: Modular cross-breeding for custom traits in model/freelancer roles.

### Authentication & Security

- **Authentication Method**: NextAuth.js (v4.24.13) with Credentials provider (email/password) – Native Next.js integration for sessions and hooks in multi-tenant setup.
- **Authorization Patterns**: JWT strategy with custom claims (e.g., tenantId, role, permissions) for RBAC (Agency Owner, Manager, Compliance Officer, Model, Freelancer, etc.); enforced via middleware and server checks for unified access.
- **Security Middleware**: Built-in Next.js middleware for CORS/rate limiting; add jsonwebtoken (v9.0.2) for token handling in offline queues.
- **Data Encryption Approach**: AES-256 at rest (via DB config); encrypt sensitive JWT claims for consent data.
- **API Security Strategy**: HttpOnly secure cookies for sessions + localStorage fallback for offline; token revocation list for logout/compromise; audit logging on events, including breaches.
- **Offline Flow**: Local JWT validation (public key); queue actions for sync-time auth in rural shoots.

**Trade-Off Notes**:
- Pros: Stateless scaling, native fit, offline-friendly for remote agencies.
- Cons: Custom claims dev time; defer social for MVP (trade-off: Simplicity vs. ease of signup in adult community).

**Alternatives Considered** (Expanded):
- Clerk: Managed auth with built-in 2FA/social (trade-off: Easier setup vs. external dependency).
- Supabase Auth: Realtime sessions for compliance logging (trade-off: Vendor ease vs. lock-in, but strong for AU residency and adult data).

**Rationale**: Stateless, scalable, and compliant—supports offline with minimal overhead; extends easily for social/2FA later. (Affects: All user-facing components, including model dashboards.) Innovation Notes: Explore managed hybrids like Clerk for 2FA boosts (>95% security); zero-trust via edge verification for consistency in payouts. Pre-Mortem Insights: Bi-monthly reviews to prevent escalations in AU regs.

**Deployment Mitigations** (Expanded):
- Offline Tampering: Add token signing checks and encryption for local validation; hybrid with managed (e.g., Clerk fallback); mandate 2FA (TOTP) for high-risk roles like Compliance Officer; multi-layer (signature + biometric if needed).
- Breach Risks: Short-lived tokens + revocation on sync; monitor with Sentry; consistent <1 hour alerts via webhooks; distributed lists for immutability in adult data.
- 2FA Integration: Add TOTP/WebAuthn in Phase 1 for >95% security if AU regs demand; zero-trust model for all devices; penetration testing quarterly for R18+ content.
- Growth Overload: Dynamic rate limiting (Redis-backed) with auto-scaling; test for 10x agencies.
- Error Handling: Standardize responses; log immutably; "navigation rerouting" for adaptive flows in "storms" (e.g., viral content surges).

**ADRs for Auth & Security** (Updated):
- **ADR-Auth-001: Authentication Method** – Options: NextAuth/Clerk/Supabase/Lucia; Decision: NextAuth.js; Rationale: Native scaling for 10x growth in agencies; Consequences: Custom extensions needed; Prevention: Monthly reviews.
- **ADR-Auth-002: Authorization Patterns** – Options: JWT/Sessions/OAuth; Decision: JWT with claims; Rationale: Stateless RBAC for offline model approvals; Consequences: Revocation management required; Prevention: Sync-resilient lists.
- **ADR-Auth-003: Offline Flow** – Options: Local validation/Queued/Full client; Decision: Local JWT with PouchDB queue; Rationale: Productivity in rural disconnects; Consequences: Encryption for tampering risks in consent; Prevention: Adaptive fallbacks.
- **ADR-Auth-004: Security Extras** – Options: Rate limiting/2FA/Revocation; Decision: Limiting + hashing + revocation, defer 2FA; Rationale: MVP compliance for AU adult data; Consequences: Phase 1 extension; Prevention: Automated scans.

**Mashed Innovations**:
- **Auth Recipes (Culinary + Method)**: Modular "fusion" providers for easy swapping (e.g., add 2FA as ingredient for high-risk payouts).
- **Constellation Tokens (Astronomy + Offline)**: Linked validation with edge nodes for rural consistency in shoots.
- **Game Master RBAC (Board Games + Patterns)**: Dynamic rule enforcement for interactive access in collaborative tools.
- **Adaptive Growth Encryption (Botany + Mitigations)**: Evolving keys like plant hybrids for environmental resilience in multi-tenant isolation.

**Stimulated Ideas**:
- **Adaptive Refresh (Sailing + Offline)**: Network "wind"-based token expiration for storm-proof validation in rural AU.
- **Fusion Permissions (Culinary + Patterns)**: Dynamic "recipe" blending of roles for customizable access in agency hierarchies.
- **Superposition Encryption (Quantum + Mitigations)**: Parallel key paths for tamper-resistant tokens for immutable logs.
- **Symphonic Revocation (Orchestral + Strategy)**: Coordinated "ensemble" invalidations across devices for consent revocations.

### Decision Impact Analysis

**Implementation Sequence:**
1. Set up Database (Postgres + Prisma) for multi-tenant tables (users, bookings, content, payouts, audit_logs).
2. Implement Authentication Method (NextAuth + JWT) for agency roles.
3. Add Authorization Patterns (RBAC claims) for model/freelancer access.
4. Configure Security Middleware and Encryption for R18+/consent data.
5. Integrate Caching (Redis) and Validation (Zod) for AI suggestions.
6. Test Offline Flow and Mitigations for rural resilience.

**Cross-Component Dependencies:**
- Auth relies on Data (Prisma for user models, Redis for sessions).
- Security middleware affects API calls; offline flow depends on JWT validation consistency for sync.
- AI features depend on caching for proactive suggestions.

**New Components for Fanflare Features:**
- **Booking Management**: Components for calendar, participant invites, consent capture; services for offline queues.
- **Content Handling**: Upload UI with R18+ flagging (AI-powered), approval workflows.
- **Promotion Scheduling**: OnlyFans integration, rule-based AI teasers.
- **Revenue & Payouts**: Tracking dashboards, split calculators, ATO exports; integrations with adult-friendly processors.
- **Compliance Dashboards**: Audit logs, export tools, breach notifications.
- **Offline Resilience Layer**: PouchDB for local storage, sync on reconnect; prioritizes rural/remote shoots.
- **AI Co-Pilot**: Ethical suggestions engine (explainable, opt-in) for postings and insights.
- **Multi-Tenant Isolation**: Logical-physical hybrid for agencies, with branding customizations.

**Alignment with Success Criteria and User Journeys:**
- Efficiency Gains (30-50%): Unified dashboards reduce manual tasks; offline mode prevents workflow breaks.
- Revenue Growth (20-40%): AI insights and seamless integrations boost subscriber engagement.
- Emotional Aha Moments: Offline magic, compliance peace, ethical AI partner.
- Secondary Empowerment: Transparent dashboards for models/freelancers, consent controls.
- Technical Success: 99.5% uptime via offline-first; 95% compliance accuracy with AI flagging; scalability for 10x growth.
- Journeys: Supports Mia (agency ops), Jordan (rural), models (approvals), freelancers (payouts), admins (bulk tools), support (diagnostics), APIs (webhooks).

**What would you like to do?**  
[A] Advanced Elicitation - Explore innovative approaches to any specific decisions  
[P] Party Mode - Review decisions from multiple perspectives  
[C] Continue - Save these decisions and move to architectural patterns (next step)


## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
15+ areas where AI agents could make different choices, such as naming mismatches (e.g., 'users' vs 'User'), structural clutter (e.g., scattered tests), format inconsistencies (e.g., wrapped vs direct responses), communication variances (e.g., 'user-created' vs 'UserCreated'), and process divergences (e.g., local vs global loading). Additional: Offline queuing serialization, audit log formats, import paths, AI suggestion structures, consent form validations.

### Naming Patterns

**Database Naming Conventions:**
- Convention: snake_case (e.g., user_id, tenant_id, created_at) for tables, columns, foreign keys, and indexes.
- Examples: Table: users; Column: email_verified_at; FK: fk_user_tenant_id; Index: idx_users_email.
- Rationale: Standard for Postgres/SQL, avoids quoting, Prisma auto-maps to camelCase in code; aligns with ATO export formats.

**API Naming Conventions:**
- Convention: Plural RESTful with kebab-case paths (e.g., /api/users for collections, /api/users/{userId} for single, /api/users/{userId}/bookings for nested; kebab-case for actions like /api/auth/login, /api/compliance/export).
- Examples: GET /api/users (list); POST /api/bookings (create); GET /api/bookings/{bookingId} (get); POST /api/payouts/calculate-split (RPC-style); GET /api/compliance/audit-logs (for exports).
- Rationale: Industry standard for clarity; URL-friendly, consistent with ecosystem tools; supports nested resources like model approvals.

**Code Naming Conventions:**
- Convention: PascalCase for components/classes (UserCard.tsx, BookingCalendar.tsx, ComplianceDashboard.tsx); camelCase for variables/functions/hooks (getUserBookings, useOfflineSync, tenantId, calculateAtoExport); UPPER_SNAKE_CASE for constants/enums (ROLE_AGENCY_OWNER, COMPLIANCE_FLAG_R18).
- Examples: Component: UserCard.tsx; Function: calculatePayoutSplit; Constant: API_TIMEOUT_MS; Folder: features/compliance.
- Rationale: React/TS standard for readability and distinction; consistent with Prisma mappings; supports AI feature hooks.

### Structure Patterns

**Project Organization:**
- Convention: By feature (e.g., features/auth/components/LoginForm.tsx, features/bookings/services/bookingService.ts); co-locate tests/utils within features; top-level for shared (lib/utils, components/ui); add features/offline/ for sync logic.
- Examples: Feature: features/auth (subfolders for components, tests, services); Shared: lib/formatCurrency.ts, components/ui/Button.tsx; Offline: features/offline/hooks/useSyncQueue.ts.
- Rationale: Modular for scalability; easier refactoring, supports feature isolation; crucial for offline-first additions.

**File Structure Patterns:**
- Convention: Co-located tests with code using .test.ts suffix (e.g., BookingCalendar.test.tsx next to BookingCalendar.tsx); .spec.ts for integration if needed; kebab-case folders (features/bookings, components/ui, features/compliance).
- Examples: features/auth/components/LoginForm.test.tsx; features/bookings/services/bookingService.test.ts; components/ui/Button.test.tsx; features/ai/services/suggestionService.test.ts.
- Rationale: Enhances DX for maintenance; keeps features self-contained, aligns with React norms; supports AI and compliance testing.

### Format Patterns

**API Response Formats:**
- Convention: Wrapped JSON ({ success: boolean, data: T | null, error: { code, message, details? } | null, meta?: { timestamp, requestId?, [key]: any } }); success true on 2xx, false on 4xx/5xx; camelCase keys; ISO timestamps. (Optional vs Mandatory: meta.timestamp required for compliance audits; requestId optional.)
- Examples: Success: { success: true, data: { id: "booking_abc123" }, error: null, meta: { timestamp: "2026-03-09T15:23:00Z" } }; Error: { success: false, data: null, error: { code: "BOOKING_CONFLICT", message: "Time slot overlaps", details: { conflictingBookingIds: ["b1"] } }, meta: { timestamp: "2026-03-09T15:24:00Z" } }; Compliance: { success: true, data: { auditLogs: [...] }, meta: { timestamp: "...", complianceScore: 95 } }.
- Rationale: Uniform for parsing/auditing; rich for UX, extensible for meta; supports ATO export structures.

**Data Exchange Formats:**
- Convention: camelCase JSON keys (userId, email); ISO 8601 UTC dates (2026-03-09T15:00:00Z); true/false booleans; null for missing; arrays for lists even if single item; encrypted for sensitive (consent, earnings).
- Examples: { userId: "123", createdAt: "2026-03-09T15:00:00Z", isActive: true, details: null, items: [{ id: 1 }], encryptedConsent: "..." }; AI: { suggestion: "Post teaser at 8PM", reasoning: "High engagement time", biasAudit: "Neutral" }.
- Rationale: Consistent with code/TS; readable, standard for APIs/offline serialization; ensures compliance for AU data.

### Communication Patterns

**Event System Patterns:**
- Convention: kebab-case names (user-created, booking-confirmed, compliance-flag-updated); domain-prefixed when useful (compliance-consent-revoked, ai-suggestion-generated); present/past participle; concise/descriptive.
- Examples: publish('booking-confirmed', payload); emitter.emit('content-uploaded', { bookingId }); { type: 'payout-calculated', data: {...} }; { type: 'ai-suggestion-opted-in', data: { userId, reasoning } }.
- Rationale: Readable in logs, consistent with API paths, searchable for audits; supports AI and compliance events.

**State Management Patterns:**
- Convention: Local useState/useReducer for component state (e.g., consent form); global Zustand/Context for shared (e.g., auth/user, offline queue); immutable updates (e.g., [...array, newItem]); action naming as camelCase verbs (updateUserRole, syncOfflineData).
- Examples: const [isLoading, setIsLoading] = useState(false); const { user, updateUser } = useUserStore(); updateUser({ ...user, role: 'manager' }); const { queue, addToQueue } = useOfflineQueueStore().
- Rationale: Lean for MVP (no Redux overhead); immutable for predictability, easy to test; supports offline state syncing.

### Process Patterns

**Error Handling Patterns:**
- Convention: Hybrid local try-catch/Error Boundaries for recovery + centralized logging (Sentry/LogRocket) with structured payload ({ level, timestamp, message, code, details?, stack?, requestId?, tenantId?, userId?, source, context? }); global handlers for uncaught; specific for compliance breaches.
- Examples: try { ... } catch (err) { apiErr = new ApiError(...); toast.error(apiErr.message); logger.error('Failed', { code: apiErr.code, ... }); }; window.addEventListener('unhandledrejection', (event) => logger.error('Rejection', { error: event.reason })); Breach: logger.error('Compliance Breach', { code: 'BREACH_R18', tenantId }).
- Rationale: Granular UX + comprehensive auditing; supports offline/compliance; includes AI failure logs.

**Loading State Patterns:**
- Convention: Hybrid local per-action (useState/custom hooks like useLoading, useApiLoading) for granular control; optional global monitor for app-wide indicators/logging; no global store unless needed; offline indicators for sync.
- Examples: const { isLoading } = useLoading('create-booking'); const { data, isLoading } = useApiLoading(() => fetchApi(...)); useGlobalLoadingMonitor() for progress bar; useOfflineIndicator() for sync status.
- Rationale: Simple DX with reusability; offline-friendly, low overhead; supports rural resilience.

**Offline & Compliance Rules**:
- Offline Queuing: Always use JSON.stringify with camelCase for serialized queues; validate on sync; encrypt sensitive data.
- Audit Log Formats: ISO UTC timestamps with tenantId mandatory; prefix codes with 'AUDIT_'; include compliance scores.
- Import Paths: Absolute imports (@/features/auth) via tsconfig for consistency; add @/features/ai for AI modules.
- AI Suggestion Rules: Explainable formats with bias audits; opt-in defaults; cache for performance.

**Compliance & Enforcement Extensions**:
- Audit Event Prefixes: Mandate 'audit-' for compliance events (e.g., audit-consent-revoked, audit-r18-flag).
- Linter Scans: Use ESLint plugins for naming/format checks; CodeQL for pattern violations in AI code.
- Offline Queuing Rules: Standardized serialization with compression for queues; conflict resolution for rural syncs.
- AI Consistency: Bias-free prompts; versioned suggestions for audits.

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow exact naming/structure/format conventions to avoid conflicts.
- Use standardized hooks/wrappers for loading/error to ensure consistency.
- Document deviations in PRs with rationale for review, especially for AI/compliance features.

**Pattern Enforcement:**
- Verify via linters (ESLint/Prettier plugins for naming); CI tests for formats (e.g., snapshot API responses, AI outputs).
- Document violations in issues/PR comments; use ADR process for updates.
- Process for updating: Propose in ADR, discuss in team channel, approve via PR.
- Enforcement Tools: Git hooks for pre-commit linting; CodeQL for pattern scans; Husky for enforced tests; add AI-specific linters.

### Pattern Examples

**Good Examples:**
- Naming: Table 'users', endpoint /api/users/{userId}, component UserCard.tsx, function getUserData, event 'user-created', AI: suggestionService.ts.
- Structure: features/auth/components/LoginForm.tsx and LoginForm.test.tsx; lib/utils/formatCurrency.ts; features/offline/hooks/useSyncQueue.ts.
- Format: API { success: true, data: { userId: "123" }, meta: { timestamp: "2026-03-09T15:00:00Z" } }; AI: { suggestion: "...", reasoning: "...", biasAudit: "..." }.
- Communication: emitter.emit('booking-confirmed', { type: "booking-confirmed", data: { id: "abc" }, meta: { timestamp: "..." } }); AI: 'ai-suggestion-generated'.
- Process: try { startLoading(); await api(); } catch (err) { logger.error(...); } finally { stopLoading(); }; Offline: addToQueue(encryptedData).

**Anti-Patterns:**
- Naming: Mixed casing like 'User_id' or non-plural endpoint /api/user; AI: unclear 'Suggest'.
- Structure: Scattered tests in global /tests/ or components in root src/; offline hooks in random folders.
- Format: Unwrapped direct { id: 1 } or inconsistent dates (unix timestamps); AI without reasoning.
- Communication: CamelCase event 'UserCreated' or unstructured payload { id: 1 }; AI events without bias info.
- Process: No try-catch (silent failures) or global store for local loading; unencrypted offline queues.

**What would you like to do?**  
[A] Advanced Elicitation - Explore additional consistency patterns  
[P] Party Mode - Review patterns from different implementation perspectives  
[C] Continue - Save these patterns and move to project structure


## Project Structure & Boundaries

### Complete Project Directory Structure

```
fanflare/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   │   │   ├── users/
│   │   │   │   └── route.ts
│   │   │   ├── bookings/
│   │   │   │   └── route.ts
│   │   │   ├── content/
│   │   │   │   └── route.ts
│   │   │   ├── promotions/
│   │   │   │   └── route.ts
│   │   │   ├── revenue/
│   │   │   │   └── route.ts
│   │   │   ├── compliance/
│   │   │   │   └── route.ts
│   │   │   ├── ai/
│   │   │   │   └── route.ts
│   │   │   └── dashboards/
│   │   │       └── route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   ├── forms/
│   │   │   └── ConsentForm.tsx
│   │   └── features/
│   │       ├── auth/
│   │       │   ├── LoginForm.tsx
│   │       │   └── LoginForm.test.tsx
│   │       ├── bookings/
│   │       │   ├── BookingCalendar.tsx
│   │       │   └── BookingCalendar.test.tsx
│   │       ├── content/
│   │       │   ├── ContentUpload.tsx
│   │       │   └── ContentUpload.test.tsx
│   │       ├── promotions/
│   │       │   ├── PromotionScheduler.tsx
│   │       │   └── PromotionScheduler.test.tsx
│   │       ├── revenue/
│   │       │   ├── RevenueDashboard.tsx
│   │       │   └── RevenueDashboard.test.tsx
│   │       ├── compliance/
│   │       │   ├── ComplianceDashboard.tsx
│   │       │   └── ComplianceDashboard.test.tsx
│   │       ├── ai/
│   │       │   ├── AiSuggestionPanel.tsx
│   │       │   └── AiSuggestionPanel.test.tsx
│   │       └── offline/
│   │           ├── OfflineIndicator.tsx
│   │           └── OfflineIndicator.test.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── formatCurrency.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useLoading.ts
│   │   ├── useApiLoading.ts
│   │   └── useOfflineSync.ts
│   ├── services/
│   │   ├── bookingService.ts
│   │   ├── bookingService.test.ts
│   │   ├── contentService.ts
│   │   ├── contentService.test.ts
│   │   ├── promotionService.ts
│   │   ├── promotionService.test.ts
│   │   ├── revenueService.ts
│   │   ├── revenueService.test.ts
│   │   ├── complianceService.ts
│   │   ├── complianceService.test.ts
│   │   ├── aiService.ts
│   │   ├── aiService.test.ts
│   │   └── offlineService.ts
│   ├── middleware.ts
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── tests/
│   └── e2e/
│       └── app.spec.ts
└── public/
    └── assets/
        └── logo.png
```

### Architectural Boundaries

**API Boundaries:**
- External API endpoints: Defined in app/api/ routes, secured with JWT middleware; include AI routes for suggestions, compliance for exports.
- Internal service boundaries: Services in src/services/ communicate via function calls or events; offline service handles sync.
- Authentication and authorization boundaries: Handled in middleware.ts and auth.ts; supports multi-tenant RBAC for agencies.
- Data access layer boundaries: db.ts with Prisma for all DB interactions, including audit logs.
- Offline boundaries: Local queues in services/offlineService.ts, sync via hooks.

**Component Boundaries:**
- Frontend component communication patterns: Props for parent-child; Context for shared state (e.g., offline status).
- State management boundaries: Local in components, global in Zustand stores (e.g., user, queue).
- Service communication patterns: Direct imports for internal, events for async (e.g., 'ai-suggestion-generated').
- Event-driven integration points: Redis pub/sub for cross-service notifications; offline sync events.
- AI boundaries: Suggestions via aiService.ts, with opt-in controls and explainability.

**Data Boundaries:**
- Database schema boundaries: Defined in schema.prisma with RLS for multi-tenant (agencies, models).
- Data access patterns: Through db.ts wrappers only; encrypted for consent/earnings.
- Caching boundaries: Redis for performance, with fallback to DB; AI caches for suggestions.
- External data integration points: API routes for OnlyFans, payment processors, age verification (Yoti/ID.me).

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- User Management: src/components/features/auth/, src/services/userService.ts, app/api/users/route.ts, prisma/schema.prisma (users table).
- Booking: src/components/features/bookings/, src/services/bookingService.ts, app/api/bookings/route.ts, prisma/schema.prisma (bookings table).
- Content: src/components/features/content/, src/services/contentService.ts, app/api/content/route.ts, prisma/schema.prisma (content table).
- Promotion: src/components/features/promotions/, src/services/promotionService.ts, app/api/promotions/route.ts, prisma/schema.prisma (promotions table).
- Revenue: src/components/features/revenue/, src/services/revenueService.ts, app/api/revenue/route.ts, prisma/schema.prisma (payouts table).
- Compliance: src/components/features/compliance/, src/services/complianceService.ts, app/api/compliance/route.ts, prisma/schema.prisma (audit_logs table).
- AI: src/components/features/ai/, src/services/aiService.ts, app/api/ai/route.ts.
- Dashboards: src/components/features/dashboards/, src/services/dashboardService.ts, app/api/dashboards/route.ts.
- Offline: src/components/features/offline/, src/services/offlineService.ts, hooks/useOfflineSync.ts.

**Cross-Cutting Concerns:**
- Authentication System: src/lib/auth.ts, middleware.ts, components/features/auth/.
- Offline Sync: hooks/useOfflineSync.ts, lib/db.ts (queue handling), services/offlineService.ts.
- Logging/Auditing: lib/logger.ts, integrated in services and middleware for compliance.
- AI Ethics: services/aiService.ts with bias audits and explainability.

### Integration Points

**Internal Communication:**
- Components use props and context for data flow; offline indicators update via hooks.
- Services communicate via direct calls or events (e.g., 'booking-confirmed' triggers payout calc and AI suggestion).

**External Integrations:**
- OnlyFans API: Via src/services/external/onlyfansService.ts.
- Payment Gateways: In src/services/revenue/paymentGateway.ts (adult-friendly like CCBill).
- Age Verification: Yoti/ID.me in compliance service.
- Compliance Exports: app/api/compliance/export/route.ts for ATO.
- AI Providers: External APIs for suggestions, cached locally.

**Data Flow:**
- Client → API route (auth check) → Service → Prisma DB → Cache (Redis) → Response; offline queues sync on reconnect.
- AI Flow: User input → aiService.ts → External API → Cached suggestion → UI.

### File Organization Patterns

**Configuration Files:**
- Root: package.json, next.config.js, tsconfig.json, .env*; organized in root for easy access; add .env for AI keys.

**Source Organization:**
- app/ for pages/routes; components/ for UI; lib/ for utilities; services/ for business logic; hooks/ for custom hooks (including offline/ai).

**Test Organization:**
- Co-located .test.ts with code; e2e in tests/e2e/; include offline sync and AI output tests.

**Asset Organization:**
- public/assets/ for static files like images; dynamic in DB/S3 for content uploads.

### Development Workflow Integration

**Development Server Structure:**
- Next.js dev server runs from src/app/; hot-reloads components and APIs; supports offline simulation.

**Build Process Structure:**
- Next.js build outputs to .next/; uses tsconfig for typing, tailwind for styles; includes PWA for offline.

**Deployment Structure:**
- Vercel/AWS compatible; docker-compose.yml for local/prod parity; edge functions for AI/low-latency.

**What would you like to do?**  
[A] Advanced Elicitation - Explore innovative project organization approaches  
[P] Party Mode - Review structure from different development perspectives  
[C] Continue - Save this structure and move to architecture validation.