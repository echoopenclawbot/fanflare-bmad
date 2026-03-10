---
title: 'Agency Tenant Creation'
slug: 'agency-tenant-creation'
created: '2026-03-10'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js', 'Prisma', 'PostgreSQL', 'PouchDB']
files_to_modify: ['src/app/api/tenants/route.ts', 'src/components/features/tenants/TenantForm.tsx', 'prisma/schema.prisma']
code_patterns: ['PascalCase for components', 'camelCase for functions', 'kebab-case for API paths']
test_patterns: ['Jest with .test.tsx co-located', 'unit tests for components and services']
---

# Overview

## Problem Statement

Agency owners need to create new tenants during onboarding with basic customizations to achieve time-to-value in less than 5 minutes.

## Solution

Add a tenant creation form to the onboarding flow, capturing tenant name, basic branding (logo, color), and timezone, then creating the tenant in the database and setting up initial permissions.

## In Scope

- Form component for tenant creation
- API endpoint to create tenant
- Validation using Zod
- Basic branding fields: name, logo upload, primary color, timezone
- Success redirect to agency dashboard

## Out of Scope

- Advanced branding (fonts, themes)
- Bulk tenant creation
- Tenant management UI
- Integration with third-party services for this feature

# Context for Development

- Tech stack: Next.js for frontend, Prisma for ORM, PostgreSQL for DB, PouchDB for offline sync if needed.
- Patterns: Use API routes for backend, form validation with Zod, error handling with user-friendly messages.
- Constraints: Must be mobile-first, support offline if possible, but tenant creation likely requires online.
- Similar systems: Workspace creation in tools like Notion or Slack.

## Codebase Patterns

- Project structure: Feature-based organization in src/components/features/, API routes in src/app/api/
- Naming: PascalCase components, camelCase variables/functions, snake_case DB columns
- File structure: Co-located tests, absolute imports via @/

## Files to Reference

- schema.prisma: For tenant model
- lib/db.ts: For DB connection
- lib/auth.ts: For authentication setup

## Technical Decisions

- Use Prisma for tenant creation in DB
- Zod for form validation
- Next.js API route for POST /api/tenants
- Redirect to /dashboard after creation

# Implementation Plan

## Implementation Tasks

- [ ] Task 1: Add tenant model to Prisma schema
  - File: `prisma/schema.prisma`
  - Action: Define model Tenant with fields id (String @id @default(cuid())), name (String), logo (String?), primaryColor (String @default("#000000")), timezone (String @default("UTC")), createdAt (DateTime @default(now())), updatedAt (DateTime @updatedAt), ownerId (String)
  - Notes: Use snake_case for column names, add relation to User model

- [ ] Task 2: Create tenant creation API route
  - File: `src/app/api/tenants/route.ts`
  - Action: Implement POST handler: validate request with Zod schema, authenticate user, create tenant in DB with ownerId, return { success: true, data: { tenantId } }
  - Notes: Use Prisma client from lib/db, handle validation errors and DB errors, return wrapped response

- [ ] Task 3: Create TenantForm component
  - File: `src/components/features/tenants/TenantForm.tsx`
  - Action: Create form with inputs for name (text), logo (file upload), primaryColor (color picker), timezone (select), submit button; use React Hook Form with Zod resolver, handle file upload to /api/upload or similar
  - Notes: Display validation errors, show loading state, on success call API and redirect

- [ ] Task 4: Integrate form into onboarding page
  - File: `src/app/onboarding/page.tsx`
  - Action: Import TenantForm and render it in the page component
  - Notes: Assume onboarding layout exists, add form as main content

- [ ] Task 5: Add unit tests for TenantForm
  - File: `src/components/features/tenants/TenantForm.test.tsx`
  - Action: Test form rendering, validation, submission success/error
  - Notes: Use Jest and React Testing Library

- [ ] Task 6: Add integration test for API route
  - File: `src/app/api/tenants/route.test.ts`
  - Action: Test POST request with valid/invalid data, check DB state
  - Notes: Use test database, mock auth if needed

# Acceptance Criteria

- [ ] AC1: Given user is authenticated and on onboarding page, when page loads, then tenant creation form is displayed with all required fields
- [ ] AC2: Given form is filled with valid tenant name, logo, color, and timezone, when submitted, then tenant is created in database with correct owner and data, and user is redirected to /dashboard
- [ ] AC3: Given form is submitted with missing name, when submitted, then validation error "Name is required" is displayed
- [ ] AC4: Given form is submitted with invalid color format, when submitted, then validation error "Invalid color" is displayed
- [ ] AC5: Given logo upload fails due to file size, when submitted, then error message "Logo file too large" is shown
- [ ] AC6: Given database connection fails during creation, when submitted, then user-friendly error "Failed to create tenant" is displayed

# Dependencies

- Prisma ORM (for DB operations)
- Zod (for validation schemas)
- React Hook Form (for form handling)
- Next.js (for API routes and routing)
- File upload library (e.g., for logo handling)

# Testing Strategy

- Unit tests: TenantForm component rendering, validation, submission
- Integration tests: API route handling requests and DB updates
- Manual testing: End-to-end flow from onboarding to dashboard redirect

# Notes

- High-risk items: File upload for logo (handle large files, security)
- Known limitations: Offline support not implemented for tenant creation
- Future considerations: Bulk tenant creation, advanced branding options