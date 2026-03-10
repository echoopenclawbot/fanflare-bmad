---
stepsCompleted: []
inputDocuments: ["/home/loki/.openclaw/workspace-bmad/_bmad-output/planning-artifacts/prd.md", "/home/loki/.openclaw/workspace-bmad/_bmad-output/planning-artifacts/architecture.md", "/home/loki/.openclaw/workspace-bmad/_bmad-output/planning-artifacts/ux-design-specification.md"]
---

# Fanflare - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Fanflare, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Agency Owner creates new tenant during onboarding with basic customizations (e.g., branding, timezone). [Metric: <5 min time-to-value; Verifiable by: Successful setup]
FR2: Agency Owner invites users and assigns roles within tenant.
FR3: Invited User completes self-onboarding with profile setup and consent acknowledgment. [Metric: 90% completion rate; Verifiable by: Profile creation]
FR4: Agency Owner manages user permissions and roles (view, edit, deactivate).
FR5: System supports offline onboarding for profile and consent (sync on reconnect). [Metric: Rural resilience; Verifiable by: Offline completion/sync]
FR6: Agency Manager creates booking with date, location, participants, notes, shoot type.
FR7: Participant views and accepts/declines bookings via mobile/offline.
FR8: Agency Manager captures consent forms during setup (offline support, encryption).
FR9: User accesses/edits booking details offline, detects conflicts, syncs with alerts. [Metric: 99.5% uptime; Verifiable by: Conflict alert/sync success]
FR11: Agency Manager uploads content to booking/profile (offline queue).
FR12: Model reviews/approves/rejects content (version history visible).
FR13: System flags content for R18+ compliance (score/explanation). [Metric: 95% accuracy; Verifiable by: Flag generation]
FR14: Agency Manager overrides flags with justification (logged immutably).
FR15: Agency Manager schedules OnlyFans posts with content/preview.
FR16: System provides rule-based posting suggestions (cached, opt-in). [Metric: NPS >40; Verifiable by: Suggestion output]
FR17: User opts in/out of suggestions and views reasoning.
FR18: Agency Manager previews posts (including compliance status).
FR19: Agency Owner views revenue tracking and calculates splits (daily sync, alerts, configurable). [Metric: Churn <15%; Verifiable by: Calculation accuracy]
FR21: Agency Owner generates ATO export reports (per model/period, GST alerts).
FR22: Model views payout history/splits (with dispute initiation).
FR23: System generates immutable audit logs for actions.
FR24: Agency Owner exports compliance reports (one-click, formats like PDF).
FR25: System performs compliance scoring and handles data requests (readiness visible, APPs-compliant, residency enforced). [Metric: Zero fails; Verifiable by: Score/export success; Merged FR25/26]
FR32: System sends breach notifications for issues (e.g., low scoring alerts). [Metric: 30-day response; Verifiable by: Notification trigger]
FR27: Agency Manager accesses unified dashboard (bookings, queue, revenue, status). [Metric: Time savings >30%; Verifiable by: View loading]
FR28: Model accesses self-scoped dashboard (profiles, bookings, earnings, history).
FR29: Internal Admin queries audit trails (strict controls).
FR30: System provides basic analytics on dashboards (cached, key metrics only).
FR33: Agency Owner performs bulk actions (e.g., report exports). [Metric: Scalability; Verifiable by: Bulk success]
FR31: System handles error conditions with notifications/recovery. [Metric: 99.5% uptime; Verifiable by: Error resolution]

### NonFunctional Requirements

NFR1: Core user actions (e.g., dashboard load, booking create) must complete in <2 seconds under normal load (measured via New Relic or similar, under 100 concurrent users for MVP).
NFR2: Offline actions (e.g., consent capture, edits) must feel instantaneous (<500ms local response), with sync <5 seconds on reconnect (95% of cases).
NFR3: Bulk operations (e.g., multi-model reports) must handle up to 50 items in <5 seconds.
NFR4: Mobile-first actions (e.g., dashboard load, booking create) must achieve Lighthouse performance score >80 on mid-range devices (e.g., iPhone SE 2022 or equivalent) under 3G/4G rural conditions. (Verifiable by: Score reports)
NFR5: All sensitive data (content, consent, earnings) must be encrypted at rest (AES-256) and in transit (TLS 1.3).
NFR6: Access attempts must enforce RBAC/ABAC with audit logging (100% of sensitive actions logged immutably, queryable <1 minute by authorized users, with automated logging of alerts).
NFR7: Breach detection must alert admins within 1 hour (unusual patterns), with automated 30-day OAIC reporting workflow.
NFR8: System must support right-to-be-forgotten requests completed in <72 hours (verifiable deletion).
NFR9: All data must be processed only in AU jurisdictions to ensure sovereignty (verifiable by: Processing logs).
NFR10: System must support 10x user growth (from 10 to 100 concurrent agencies) with <10% performance degradation (auto-scaling via cloud, cloud-agnostic).
NFR11: Handle peak loads (e.g., 500 simultaneous uploads) without downtime (>99.5% availability, measured monthly via external uptime monitor like Pingdom).
NFR12: Database must scale to 10,000 models without query times exceeding 500ms (sharding if needed post-MVP).
NFR13: Integrations (e.g., OnlyFans API) must have >99% success rate with automatic retries (exponential backoff, <5 min resolution).
NFR14: Error handling must provide user-friendly messages and fallbacks (e.g., manual CSV import if sync fails, in clear non-technical language).
NFR15: Sync operations must complete in <10 seconds (95% of cases), with offline queuing for reliability.
NFR16: Integration failures must not block offline workflows (e.g., queued actions persist locally and retry automatically on reconnect).
NFR17: Overall system availability must be >99.5% (measured monthly, excluding planned maintenance <4 hours/month, announced 7 days in advance, with zero data loss).
NFR18: Offline features must maintain data integrity with zero loss on sync (verifiable by consistency checks).
NFR19: Recovery from failures (e.g., crash) must restore to last known state in <1 minute.
NFR20: System must provide real-time monitoring dashboards for uptime/errors (integrated for quick diagnostics, verifiable by dashboard access).

### Additional Requirements

- Use Next.js as the starter template for the project setup.
- Infrastructure and deployment requirements: Support offline-first resilience for remote/rural shoots and poor-signal locations.
- Integration requirements: OnlyFans API via third-party providers, no scraping; adult-friendly payment processors like CCBill, Segpay.
- Data migration or setup requirements: AU data residency, encrypted storage.
- Monitoring and logging requirements: Immutable audit logs, breach notifications within 30 days.
- API versioning or compatibility requirements: Webhooks-driven integrations with caching/redundancy.
- Security implementation requirements: End-to-end encryption, role-based access, compliance with APPs, AML/CTF.
- Responsive design requirements for mobile-first UI.
- Accessibility requirements: WCAG AA+, high contrast for compliance elements, screen reader support.
- Offline-first design with sync indicators, queueing, conflict resolution.
- User interaction patterns: Opt-in AI suggestions with explanations, digital consents, transparent dashboards.
- Animation or transition requirements: Subtle animations for sync success, reassuring tooltips.
- Error handling UX: User-friendly messages, fallbacks for offline.

### FR Coverage Map

FR1: Epic 1 - Agency Owner creates new tenant during onboarding
FR2: Epic 1 - Agency Owner invites users and assigns roles
FR3: Epic 1 - Invited User completes self-onboarding
FR4: Epic 1 - Agency Owner manages user permissions
FR5: Epic 1 - System supports offline onboarding
FR6: Epic 2 - Agency Manager creates booking
FR7: Epic 2 - Participant views and accepts/declines bookings
FR8: Epic 2 - Agency Manager captures consent forms
FR9: Epic 2 - User accesses/edits booking details offline
FR11: Epic 3 - Agency Manager uploads content
FR12: Epic 3 - Model reviews/approves/rejects content
FR13: Epic 3 - System flags content for R18+ compliance
FR14: Epic 3 - Agency Manager overrides flags
FR15: Epic 4 - Agency Manager schedules OnlyFans posts
FR16: Epic 4 - System provides rule-based posting suggestions
FR17: Epic 4 - User opts in/out of suggestions
FR18: Epic 4 - Agency Manager previews posts
FR19: Epic 5 - Agency Owner views revenue tracking and calculates splits
FR21: Epic 5 - Agency Owner generates ATO export reports
FR22: Epic 5 - Model views payout history/splits
FR23: Epic 6 - System generates immutable audit logs
FR24: Epic 6 - Agency Owner exports compliance reports
FR25: Epic 6 - System performs compliance scoring
FR32: Epic 6 - System sends breach notifications
FR27: Epic 7 - Agency Manager accesses unified dashboard
FR28: Epic 7 - Model accesses self-scoped dashboard
FR29: Epic 7 - Internal Admin queries audit trails
FR30: Epic 7 - System provides basic analytics
FR33: Epic 7 - Agency Owner performs bulk actions
FR31: Epic 7 - System handles error conditions

## Epic List

### Epic 1: User Onboarding & Management
Users can create agency accounts, invite team members, manage roles, and complete secure onboarding with offline support.
**FRs covered:** FR1, FR2, FR3, FR4, FR5.

### Epic 2: Booking & Scheduling
Users can create and manage shoot bookings, capture consents, and handle offline scheduling with conflict detection.
**FRs covered:** FR6, FR7, FR8, FR9.

### Epic 3: Content Creation & Management
Users can upload content, review and approve materials, and manage R18+ compliance flagging with overrides.
**FRs covered:** FR11, FR12, FR13, FR14.

### Epic 4: Promotion & Scheduling
Users can schedule posts on platforms like OnlyFans, receive AI-powered posting suggestions, and preview content with compliance status.
**FRs covered:** FR15, FR16, FR17, FR18.

### Epic 5: Revenue & Payouts
Users can track earnings, calculate splits, generate ATO reports, and view payout histories with dispute options.
**FRs covered:** FR19, FR21, FR22.

### Epic 6: Compliance & Security
Users can access audit logs, export compliance reports, perform scoring, and receive breach notifications.
**FRs covered:** FR23, FR24, FR25, FR32.

### Epic 7: Dashboards & Analytics
Users can access unified dashboards, view analytics, perform bulk actions, and handle error conditions across roles.
**FRs covered:** FR27, FR28, FR29, FR30, FR33, FR31.

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: User Onboarding & Management
Users can create agency accounts, invite team members, manage roles, and complete secure onboarding with offline support.

### Story 1.1: Set Up Next.js Starter Template
As a developer,
I want to initialize the Fanflare project with Next.js starter template,
So that the development environment is set up for building the application.

**Acceptance Criteria:**

**Given** a new project directory
**When** I run the Next.js create command with TypeScript, ESLint, and Tailwind
**Then** the project is initialized with the correct structure
**And** basic configuration files are created

### Story 1.2: Agency Owner Creates Tenant
As an agency owner,
I want to create a new tenant during onboarding with basic customizations,
So that I can set up my agency's account.

**Acceptance Criteria:**

**Given** I'm on the onboarding page
**When** I enter agency details and customizations
**Then** a new tenant is created
**And** I'm redirected to the tenant dashboard

### Story 1.3: Invite Users and Assign Roles
As an agency owner,
I want to invite users and assign roles within my tenant,
So that team members can access the system.

**Acceptance Criteria:**

**Given** I'm logged in as agency owner
**When** I invite a user with a role
**Then** an invitation is sent
**And** the user can accept and join with the assigned role

### Story 1.4: User Self-Onboarding
As an invited user,
I want to complete self-onboarding with profile setup and consent acknowledgment,
So that I can start using the system.

**Acceptance Criteria:**

**Given** I received an invitation
**When** I accept and set up my profile with consent
**Then** my account is activated
**And** I can access features based on my role

### Story 1.5: Manage User Permissions
As an agency owner,
I want to manage user permissions and roles,
So that I can control access and deactivate users if needed.

**Acceptance Criteria:**

**Given** I'm managing users
**When** I change a user's role or deactivate them
**Then** their permissions are updated immediately
**And** changes are logged for audit

### Story 1.6: Offline Onboarding Support
As a user,
I want to complete onboarding offline,
So that I can set up even in poor connectivity areas.

**Acceptance Criteria:**

**Given** I'm offline during onboarding
**When** I complete the steps
**Then** data is queued locally
**And** syncs when connection returns

## Epic 2: Booking & Scheduling
Users can create and manage shoot bookings, capture consents, and handle offline scheduling with conflict detection.

### Story 2.1: Create Booking
As an agency manager,
I want to create a booking with date, location, participants, notes, and shoot type,
So that I can schedule shoots.

**Acceptance Criteria:**

**Given** I'm in the booking section
**When** I fill in all booking details
**Then** the booking is saved
**And** participants are notified

### Story 2.2: View and Respond to Bookings
As a participant,
I want to view and accept or decline bookings via mobile/offline,
So that I can manage my schedule.

**Acceptance Criteria:**

**Given** I have a booking invitation
**When** I view it and respond
**Then** my response is recorded
**And** the organizer is notified

### Story 2.3: Capture Consent Forms
As an agency manager,
I want to capture consent forms during booking setup with offline support and encryption,
So that legal requirements are met.

**Acceptance Criteria:**

**Given** during booking creation
**When** I add consent forms
**Then** they are encrypted and stored
**And** accessible offline

### Story 2.4: Offline Booking Access and Edits
As a user,
I want to access and edit booking details offline with conflict detection,
So that I can work in rural areas.

**Acceptance Criteria:**

**Given** I'm offline
**When** I edit a booking
**Then** conflicts are detected locally
**And** changes sync with alerts on reconnect

## Epic 3: Content Creation & Management
Users can upload content, review and approve materials, and manage R18+ compliance flagging with overrides.

### Story 3.1: Upload Content
As an agency manager,
I want to upload content to bookings/profiles with offline queue,
So that I can manage media.

**Acceptance Criteria:**

**Given** I have content to upload
**When** I select and upload files
**Then** they are queued if offline
**And** uploaded when connected

### Story 3.2: Review and Approve Content
As a model,
I want to review, approve, or reject content with version history,
So that I control my media.

**Acceptance Criteria:**

**Given** content is uploaded
**When** I review it
**Then** I can approve/reject
**And** history is maintained

### Story 3.3: R18+ Compliance Flagging
As the system,
I want to flag content for R18+ compliance with score and explanation,
So that regulatory requirements are met.

**Acceptance Criteria:**

**Given** content is uploaded
**When** it's processed
**Then** a flag with score is generated
**And** explanation is provided

### Story 3.4: Override Flags
As an agency manager,
I want to override flags with justification,
So that I can handle edge cases.

**Acceptance Criteria:**

**Given** a flagged content
**When** I override with reason
**Then** the override is logged immutably
**And** content status updates

## Epic 4: Promotion & Scheduling
Users can schedule posts on platforms like OnlyFans, receive AI-powered posting suggestions, and preview content with compliance status.

### Story 4.1: Schedule Posts
As an agency manager,
I want to schedule OnlyFans posts with content and preview,
So that I can plan promotions.

**Acceptance Criteria:**

**Given** approved content
**When** I schedule a post
**Then** it's queued for the platform
**And** preview is available

### Story 4.2: AI Posting Suggestions
As the system,
I want to provide rule-based posting suggestions cached and opt-in,
So that users get helpful recommendations.

**Acceptance Criteria:**

**Given** content ready
**When** suggestions are requested
**Then** opt-in suggestions are shown
**And** cached for performance

### Story 4.3: Opt-in/Out of Suggestions
As a user,
I want to opt in or out of suggestions and view reasoning,
So that I control AI assistance.

**Acceptance Criteria:**

**Given** in settings
**When** I toggle opt-in
**Then** preferences are saved
**And** reasoning is shown when opted in

### Story 4.4: Preview Posts
As an agency manager,
I want to preview posts including compliance status,
So that I ensure quality.

**Acceptance Criteria:**

**Given** a scheduled post
**When** I preview it
**Then** content and compliance status are shown
**And** I can edit before publishing

## Epic 5: Revenue & Payouts
Users can track earnings, calculate splits, generate ATO reports, and view payout histories with dispute options.

### Story 5.1: Revenue Tracking and Splits
As an agency owner,
I want to view revenue tracking and calculate configurable splits with daily sync and alerts,
So that earnings are managed fairly.

**Acceptance Criteria:**

**Given** revenue data
**When** I view tracking
**Then** splits are calculated
**And** alerts for issues

### Story 5.2: ATO Export Reports
As an agency owner,
I want to generate ATO export reports per model/period with GST alerts,
So that tax compliance is maintained.

**Acceptance Criteria:**

**Given** payout data
**When** I generate report
**Then** ATO-formatted export is created
**And** GST alerts are included

### Story 5.3: View Payout History
As a model,
I want to view payout history and splits with dispute initiation,
So that I have transparency.

**Acceptance Criteria:**

**Given** I'm logged in
**When** I access payouts
**Then** history is displayed
**And** I can initiate disputes

## Epic 6: Compliance & Security
Users can access audit logs, export compliance reports, perform scoring, and receive breach notifications.

### Story 6.1: Generate Audit Logs
As the system,
I want to generate immutable audit logs for all actions,
So that compliance is tracked.

**Acceptance Criteria:**

**Given** any action occurs
**When** it's performed
**Then** an immutable log is created
**And** queryable by authorized users

### Story 6.2: Export Compliance Reports
As an agency owner,
I want to export compliance reports one-click in formats like PDF,
So that I can provide audits.

**Acceptance Criteria:**

**Given** compliance data
**When** I request export
**Then** a formatted report is generated
**And** downloadable

### Story 6.3: Compliance Scoring
As the system,
I want to perform compliance scoring and handle data requests with visibility,
So that ongoing compliance is maintained.

**Acceptance Criteria:**

**Given** data and actions
**When** scoring is run
**Then** scores are calculated
**And** visible to users

### Story 6.4: Breach Notifications
As the system,
I want to send breach notifications for issues within 30 days,
So that regulatory requirements are met.

**Acceptance Criteria:**

**Given** a breach occurs
**When** detected
**Then** notifications are sent
**And** OAIC reporting is handled

## Epic 7: Dashboards & Analytics
Users can access unified dashboards, view analytics, perform bulk actions, and handle error conditions across roles.

### Story 7.1: Unified Dashboard Access
As an agency manager,
I want to access unified dashboard with bookings, queue, revenue, and status,
So that I have an overview.

**Acceptance Criteria:**

**Given** I'm logged in
**When** I access dashboard
**Then** all sections are visible
**And** data loads within 2 seconds

### Story 7.2: Self-Scoped Dashboards
As a model,
I want to access self-scoped dashboard with profiles, bookings, earnings, and history,
So that I see relevant info.

**Acceptance Criteria:**

**Given** I'm logged in as model
**When** I access dashboard
**Then** only my data is shown
**And** scoped appropriately

### Story 7.3: Admin Audit Queries
As an internal admin,
I want to query audit trails with strict controls,
So that I can investigate issues.

**Acceptance Criteria:**

**Given** admin access
**When** I query audits
**Then** results are returned quickly
**And** access is controlled

### Story 7.4: Basic Analytics
As the system,
I want to provide basic analytics on dashboards cached for key metrics,
So that users get insights.

**Acceptance Criteria:**

**Given** dashboard access
**When** analytics are viewed
**Then** cached metrics are shown
**And** updated regularly

### Story 7.5: Bulk Actions
As an agency owner,
I want to perform bulk actions like report exports,
So that efficiency is improved.

**Acceptance Criteria:**

**Given** multiple items
**When** I select bulk action
**Then** it's applied to all
**And** success confirmed

### Story 7.6: Error Handling and Recovery
As the system,
I want to handle error conditions with notifications and recovery,
So that uptime is maintained.

**Acceptance Criteria:**

**Given** an error occurs
**When** it happens
**Then** user is notified
**And** recovery options provided