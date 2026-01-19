# Clynr App Navigation Guide

This guide documents all screens, navigation paths, and role-based access in the Clynr app.

---

## Table of Contents

1. [Role Legend](#role-legend)
2. [Tab Bar Navigation](#tab-bar-navigation)
3. [Home Tab (DashboardTab)](#1-home-tab-dashboardtab)
4. [Jobs Tab (JobsTab)](#2-jobs-tab-jobstab)
   - [JobsScreen](#screen-jobsscreen)
   - [JobDetailsScreen](#screen-jobdetailsscreen)
   - [VisitDetailsScreen](#screen-visitdetailsscreen)
   - [CreateJobScreen](#screen-createjobscreen-modal)
   - [RequestsListScreen](#screen-requestslistscreen)
   - [RequestDetailsScreen](#screen-requestdetailsscreen)
   - [CreateRequestScreen](#screen-createrequestscreen-modal)
5. [Calendar Tab (CalendarTab)](#3-calendar-tab-calendartab)
   - [CalendarScreen](#screen-calendarscreen)
   - [RouteOptimizationScreen](#screen-routeoptimizationscreen)
6. [Timesheet Tab (TimesheetTab)](#4-timesheet-tab-timesheettab)
7. [Clients Tab (ClientsTab)](#5-clients-tab-clientstab)
   - [ClientsScreen](#screen-clientsscreen)
   - [ClientDetailsScreen](#screen-clientdetailsscreen)
   - [CreateClientScreen](#screen-createclientscreen-modal)
8. [More Tab (MoreTab)](#6-more-tab-moretab)
   - [Management Section](#management-section)
   - [My Work Section](#my-work-section)
   - [Settings Section](#settings-section)
   - [Key Screens](#key-screens-in-more-tab)
9. [Global Modals & Screens](#global-modals--screens)
10. [Floating Action Button (FAB)](#floating-action-button-fab)
11. [GPS & Geofencing](#gps--geofencing)
12. [Status Reference](#status-reference)
    - [Visit Statuses](#visit-statuses)
    - [Job Statuses](#job-statuses)
    - [Visit-Job Status Relationship](#visit-job-status-relationship)
    - [Status Colors Quick Reference](#status-colors-quick-reference)
    - [Clock Button States](#clock-button-states)
13. [Biometric Authentication](#biometric-authentication)
14. [Navigation Tips](#navigation-tips)

---

## Role Legend

| Role | Access Level |
|------|--------------|
| **Super Admin** | Full access to all features |
| **Admin** | Full access (except some super admin features) |
| **Manager** | Management section + most features |
| **Employee** | Basic features (Jobs, Calendar, Timesheet, Profile) |
| **Contractor** | Same as Employee |

---

## Tab Bar Navigation

The app has a bottom tab bar with 5-6 tabs depending on user role:

| Tab | Icon | Route Name | Access |
|-----|------|------------|--------|
| Home | `home` | DashboardTab | Admin, Manager only |
| Jobs | `briefcase` | JobsTab | All users |
| Calendar | `calendar` | CalendarTab | All users |
| Timesheet | `clock` | TimesheetTab | All users |
| Clients | `users` | ClientsTab | Admin, Manager only |
| More | `more-horizontal` | MoreTab | All users |

---

## 1. HOME TAB (DashboardTab)

**Access:** Admin, Manager, Super Admin only

### Screen: DashboardScreen
**Route:** `DashboardTab`

**Key Elements:**
- Summary cards (Jobs Today, Pending Quotes, Outstanding Invoices)
- Quick action buttons
- Recent activity feed

**Navigation Paths:**
- Tap job card → JobDetails
- Tap quote card → QuoteDetails
- Tap invoice card → InvoiceDetails

---

## 2. JOBS TAB (JobsTab)

**Access:** All users

### Screen: JobsScreen
**Route:** `JobsTab` → `Jobs`

**Key Elements:**
- **Filter Tabs:** All, Today, Late, Upcoming, Unscheduled, Ending Soon, Requires Invoicing
- **Status Filter Dropdown:** All Statuses, Scheduled, In Progress, Completed, etc.
- **Job Cards:** Display client name, address, status badge, scheduled date
- **Floating Action Button (FAB):** Create new job (+)

**Navigation Paths:**
- Tap job card → JobDetails
- Tap FAB (+) → CreateJob (modal)
- Tap search icon → Search (modal)

---

### Screen: JobDetailsScreen
**Route:** `JobDetails` (params: `{ jobId: string }`)

**Key Elements:**
- **Header Section:** Job number, status badge, client name, actual vs budgeted time
- **Job Info Card:** Title, address, service types, assigned employee
- **Visits Section:** List of scheduled visits with:
  - Status badges and date/time
  - Expandable visit cards with forms, checklists, notes counts
  - Quick navigation to visit details
- **Job Total Section:** Aggregated line items from all visits with:
  - Services and products breakdown
  - Subtotal, tax calculation, total amount
  - Generate Invoice button (creates draft invoice from line items)
- **Job History Section:** Completed forms, checklists, and notes organized by visit
- **Actions:** Edit, Generate Invoice, Archive, Status changes

**Navigation Paths:**
- Tap visit → VisitDetails
- Tap Edit → CreateJob (edit mode)
- Tap client name → ClientDetails
- Tap Generate Invoice → Creates invoice and navigates to InvoiceDetails
- Back arrow → JobsScreen

---

### Screen: VisitDetailsScreen
**Route:** `VisitDetails` (params: `{ visitId: string }`)

**Key Elements:**
- **Visit Header:** Visit number, status badge, visit name
- **Job Details Card:** Client name, address with navigation button
- **Schedule Card:** Date, start/end time, budgeted vs actual time display
- **Time Tracking Card:** Clock in/out button, elapsed time, GPS geofence status
  - Shows remaining time or overtime indicator
  - Single clock-in constraint (only one job at a time)
- **Visit Line Items:** (Manager only) Services and products billed for this visit
- **Items to Bring:** Product checklist showing items assigned to this visit
- **Forms Section:** Attached form templates for completion
- **Checklists Section:** Attached checklists with progress tracking
- **Notes Section:** Visit notes with photo attachments
- **Assigned Staff Section:** (Manager only) Staff assignment panel

**Navigation Paths:**
- Tap address → Opens maps app for navigation
- Tap forms → FormFill screen
- Back arrow → JobDetailsScreen

---

### Screen: CreateJobScreen (Modal)
**Route:** `CreateJob` (params: `{ jobId?: string }`)

**Key Elements:**
- **Client Selector:** Search/select client
- **Site Selector:** Choose client site address
- **Job Type Toggle:** One-off / Recurring
- **Service Types:** Multi-select from Products & Services
- **Visit Schedule:** Date, time, duration
- **Employee Assignment:** Assign staff member
- **Visit Instructions:** Text field for special instructions
- **Billing Section:** Quote/Invoice settings

**Navigation Paths:**
- Save → Returns to previous screen
- Cancel → Dismisses modal

---

### Screen: RequestsListScreen
**Route:** `RequestsList`

**Access:** Admin, Manager, Super Admin

**Key Elements:**
- **Schedule Filter Tabs:** All, Today, Overdue, Upcoming, Unscheduled
- **Status Filter Chips:** New, Pending, Accepted, Rejected, Converted, Visit Complete, Archived
- **Request Cards:** Display title, type badge, status badge, client info, scheduled date
- **Floating Action Button (FAB):** Create new request (+)

**Request Type Badges:**
| Type | Icon | Description |
|------|------|-------------|
| New Client | `user-plus` | New business enquiry |
| Existing Client | `users` | Request from existing client |
| Order | `shopping-cart` | Consumables order |

**Navigation Paths:**
- Tap request card → RequestDetails
- Tap FAB (+) → CreateRequest (modal)

---

### Screen: RequestDetailsScreen
**Route:** `RequestDetails` (params: `{ requestId: string }`)

**Key Elements:**
- **Header Section:** Request number, status badge, type badge
- **Request Info Card:** Title, description, services requested
- **Client Section:** Client name, contact info, referral source (for new clients)
- **Site Information:** Site name, address (if applicable)
- **Schedule Section:** Preferred date, visit date/time (if scheduled)
- **Photos/Media:** Attached images or videos
- **Actions:** Edit, Change Status, Convert to Job, Archive

**Request Statuses:**
| Status | Color | Meaning |
|--------|-------|---------|
| New | Blue | Just received, not reviewed |
| Pending | Amber | Being reviewed |
| Accepted | Green | Approved, ready to schedule |
| Rejected | Red | Declined |
| Converted | Teal | Converted to a job |
| Visit Complete | Green | Site visit completed |
| Archived | Gray | No longer active |

**Navigation Paths:**
- Tap Edit → CreateRequest (edit mode)
- Tap Convert to Job → CreateJob (pre-filled with request data)
- Back arrow → RequestsListScreen

---

### Screen: CreateRequestScreen (Modal)
**Route:** `CreateRequest` (params: `{ requestId?: string }`)

**Key Elements:**
- **Request Type Selector:** New Client Enquiry, Existing Client Request, Consumables Order
- **Title Field:** Request title (required)
- **Services Selector:** Multi-select from Products & Services catalog
- **Client Section:**
  - For existing client: Client selector dropdown
  - For new client: Name, phone, email fields
- **Referral Source:** (New Client only) How they found you (Google, Facebook, Referral, etc.)
- **Site/Location:** Select client site or enter address
- **Preferred Date:** When client wants service
- **Description:** Additional notes/requirements
- **Photos/Videos:** Attach up to 10 media files
- **Site Visit Details:** (for site visits)
  - Visit date and time
  - Assigned team member
  - Visit instructions
  - Reminder settings (15 min, 30 min, 1 hour, 2 hours, 1 day before)
- **Delivery Options:** (Consumables Order only)
  - Client Pickup
  - Deliver on Next Visit
  - Ship to Client
  - Urgent Delivery

**Navigation Paths:**
- Save → Returns to previous screen
- Cancel → Dismisses modal

---

## 3. CALENDAR TAB (CalendarTab)

**Access:** All users

### Screen: CalendarScreen
**Route:** `CalendarTab` → `Calendar`

**Key Elements:**
- **Month Header:** Current month/year with navigation arrows
- **Calendar Grid:** Days with job indicators (dots)
- **Daily Job List:** Jobs scheduled for selected date
- **Route Optimization Button:** Optimize today's route

**Navigation Paths:**
- Tap day → Shows jobs for that day
- Tap job in list → JobDetails or VisitDetails
- Tap Route Optimization → RouteOptimizationScreen

---

### Screen: RouteOptimizationScreen
**Route:** `RouteOptimization` (params: `{ date?: string }`)

**Key Elements:**
- **Map View:** Interactive map showing job locations
- **Optimized Route List:** Jobs in optimized order
- **Distance/Time Estimates:** Travel time between stops
- **Navigation Button:** Open in maps app

**Navigation Paths:**
- Tap job → VisitDetails
- Tap Navigate → Opens external maps app
- Back arrow → CalendarScreen

---

## 4. TIMESHEET TAB (TimesheetTab)

**Access:** All users

### Screen: TimesheetScreen
**Route:** `TimesheetTab` → `Timesheet`

**Key Elements:**
- **Week Selector:** Navigate between weeks
- **Daily Rows:** Show date, hours worked, job count
- **Weekly Total:** Sum of hours for the week
- **Time Entry List:** Individual clock in/out entries

**Navigation Paths:**
- Tap day row → Expands to show time entries
- Tap time entry → VisitDetails (if linked)

---

## 5. CLIENTS TAB (ClientsTab)

**Access:** Admin, Manager, Super Admin only

### Screen: ClientsScreen
**Route:** `ClientsTab` → `Clients`

**Key Elements:**
- **Search Bar:** Search clients by name
- **Client Cards:** Display name, phone, email, site count
- **Floating Action Button (FAB):** Create new client (+)

**Navigation Paths:**
- Tap client card → ClientDetailsScreen
- Tap FAB (+) → CreateClient (modal)

---

### Screen: ClientDetailsScreen
**Route:** `ClientDetails` (params: `{ clientId: string }`)

**Key Elements:**
- **Client Header:** Name, contact info
- **Sites Section:** List of client addresses/sites
- **Billing Address:** Invoicing address
- **Job History:** Past and upcoming jobs
- **Actions:** Edit, Create Job, Create Quote

**Navigation Paths:**
- Tap Edit → CreateClient (edit mode)
- Tap site → Site editing
- Tap job → JobDetails
- Tap Create Job → CreateJob (with client pre-selected)

---

### Screen: CreateClientScreen (Modal)
**Route:** `CreateClient` (params: `{ clientId?: string }`)

**Key Elements:**
- **Basic Info:** First name, last name, company, use company as primary toggle
- **Contact:** Email, phone
- **Sites Section:** Add/edit site addresses with:
  - Site nickname (e.g., "Head Office", "Warehouse")
  - Street Address Line 1
  - Street Address Line 2 (unit/suite/building)
  - City, State, Zip
  - Google Places autocomplete for address lookup
  - GPS coordinates (auto-filled from address)
  - Geofencing settings (Off, Automatic, Reminder)
  - Default form template assignment
- **Billing Address Toggle:** Same as site or different

**Navigation Paths:**
- Save → Returns to previous screen
- Cancel → Dismisses modal

---

## 6. MORE TAB (MoreTab)

**Access:** All users (content varies by role)

### Screen: MoreScreen
**Route:** `MoreTab` → `More`

The More screen shows menu sections based on user role.

---

### MANAGEMENT Section
**Access:** Admin, Manager, Super Admin

| Menu Item | Route | Description |
|-----------|-------|-------------|
| Requests | `RequestsListScreen` | View and manage service requests |
| Company Details | `CompanyDetailsScreen` | Company info, timezone, regional settings |
| Team Members | `TeamMembersScreen` | Add/edit staff, assign roles |
| Products & Services | `ProductsServicesScreen` | Service catalog, pricing |
| Forms | `FormsScreen` | Custom form templates |
| Lists | `ListsScreen` | Checklist templates |
| Financial Report | `ReportsScreen` | Revenue analytics, job stats |
| Requires Invoicing | `RequiresInvoicingReportScreen` | Completed jobs needing invoices |
| Staff Scheduler | `StaffSchedulerScreen` | View/manage staff schedules |

---

### ReportsScreen (Financial Report)
**Route:** `ReportsScreen`

**Key Elements:**
- **Period Selector:** Filter by Week, Month, Quarter, Year
- **Overview Metrics:** Revenue Collected, Completed Jobs, Outstanding Invoices, Hours Worked
- **Summary Card:** Average Job Value, Total Invoiced
- **Revenue by Service Type:** Breakdown chart
- **Invoice Status:** Breakdown by Paid, Sent, Overdue, Draft

---

### RequiresInvoicingReportScreen
**Route:** `RequiresInvoicingReportScreen`

**Access:** Admin, Manager, Super Admin

This dedicated screen shows all completed jobs that don't have an invoice linked and haven't been marked as manually invoiced.

**Key Elements:**
- **Summary Card:** Count of jobs requiring invoicing, Download Report button
- **Jobs List:** Clickable job rows with client name, job title, scheduled date

**Actions:**
| Action | Description |
|--------|-------------|
| Tap job row | Confirms marking job as manually invoiced (removes from list) |
| Download Report button | Generates consolidated PDF report of all jobs requiring invoicing |

**Consolidated PDF Report includes:**
- Company header with contact info
- Report title and generation date
- Total jobs count and total value summary
- Table listing all jobs with job number, client/title, completed date, amount
- Footer with grand total

---

### MY WORK Section
**Access:** All users

| Menu Item | Route | Description |
|-----------|-------|-------------|
| My Schedule | `MyScheduleScreen` | Your daily job assignments |

---

### SETTINGS Section
**Access:** Varies by item

| Menu Item | Route | Access | Description |
|-----------|-------|--------|-------------|
| Profile | `ProfileScreen` | All | Your account, select team profile |
| Job Settings | `JobSettingsScreen` | Admin, Manager | Job numbering, defaults |
| Notifications | `NotificationsScreen` | All | Push notification preferences |
| Appearance | `AppearanceScreen` | All | Theme (light/dark/system) |
| Connected Apps | `ConnectedAppsScreen` | Admin, Manager | Third-party integrations |
| Communications | `CommunicationsScreen` | Admin, Manager | SMS/email templates |
| Subscription | `SubscriptionScreen` | Admin only | Billing, plan management |

---

## Key Screens in More Tab

### ProfileScreen
**Route:** `ProfileScreen`

**Key Elements:**
- **Profile Selector:** Link to team member account
- **User Info:** Name, email, role display
- **Availability Editor:** Set weekly work hours
- **Security Section:** Biometric authentication toggle
- **Sign Out Button**

---

### TeamMembersScreen
**Route:** `TeamMembersScreen`

**Key Elements:**
- **Team Member List:** Cards showing name, role, status
- **Add Button:** Create new team member
- **Role Badges:** Visual role indicators

**Navigation Paths:**
- Tap member → Edit member modal
- Tap Add → New member form

---

### StaffSchedulerScreen
**Route:** `StaffSchedulerScreen`

**Key Elements:**
- **View Toggle:** Daily / Weekly / Monthly
- **Date Navigation:** Previous, Today, Next
- **Summary Stats:** Total visits, assigned, unassigned counts
- **Staff Cards:** Each team member's assigned visits
- **Unassigned Card:** Visits without staff assignment

**Navigation Paths:**
- Tap visit → VisitDetails

---

### MyScheduleScreen
**Route:** `MyScheduleScreen`

**Key Elements:**
- **Date Navigation:** View different days
- **Visit Cards:** Your assigned visits for the day
- **Status Indicators:** Scheduled, In Progress, Completed

**Navigation Paths:**
- Tap visit → VisitDetails

---

### ProductsServicesScreen
**Route:** `ProductsServicesScreen`

**Key Elements:**
- **Type Filter:** All, Products, Services
- **Item Cards:** Name, description, unit price
- **Add Button:** Create new product/service

**Navigation Paths:**
- Tap item → AddProductService (edit mode)
- Tap Add → AddProductService (new)

---

## Global Modals & Screens

| Screen | Route | Access | Purpose |
|--------|-------|--------|---------|
| Search | `Search` | All | Global search for jobs, clients |
| Add Product/Service | `AddProductService` | Admin, Manager | Create/edit catalog items |
| Create Request | `CreateRequest` | Admin, Manager | Create/edit service requests |
| Request Details | `RequestDetails` | Admin, Manager | View request details, convert to job |
| Client Portal | `ClientPortal` | Admin (demo) | Customer-facing portal preview |

---

## Floating Action Button (FAB)

The FAB appears on main screens and provides quick actions:

**Jobs Screen FAB:**
- Create New Job
- Create New Quote
- Create New Request

**Clients Screen FAB:**
- Create New Client

**Calendar Screen:**
- Route Optimization button (in header)

---

## GPS & Geofencing

The app uses GPS geofencing for automatic time tracking at client sites.

**Geofence Modes (configured per site):**

| Mode | Behavior |
|------|----------|
| **Off** | Geofencing disabled for this site |
| **Automatic** | Auto clock-in when entering geofence, auto clock-out when leaving |
| **Reminder** | Shows confirmation dialog prompting user to clock in/out |

**Time Tracking Rules:**
- Only one job can be clocked into at a time (single clock-in constraint)
- GPS geofence radius is 100m by default
- After last visit clock-out, user is prompted to close the job
- Each visit tracks actual minutes vs budgeted time

---

## Status Reference

This section explains all visit and job statuses, their colors, meanings, and how they are programmed to function.

### Visit Statuses

Visits are individual appointments within a job. Each visit has its own status that tracks progress.

| Status | Color | Hex Code | Icon | Description |
|--------|-------|----------|------|-------------|
| **Scheduled** | Blue | `#3B82F6` | `calendar` | Visit is scheduled for a future date/time. Default state when a visit is created. |
| **In Progress** | Amber | `#F59E0B` | `clock` | Work is currently happening. Active time tracking in progress. |
| **Completed** | Green | `#10B981` | `check-circle` | Visit finished successfully. All work done. |
| **Cancelled** | Red | `#EF4444` | `x-circle` | Visit was cancelled. No work performed. |
| **On Hold** | Purple | `#8B5CF6` | `pause-circle` | Temporarily paused by manager. |
| **Action Required** | Pink | `#EC4899` | `alert-triangle` | Issue flagged. Needs back-office review. |

**Visit Status Transitions:**

```
Scheduled → In Progress → Completed
    ↓           ↓            ↓
    ↓      On Hold ←→    Cancelled
    ↓           ↓
    └──→ Action Required
```

**How Visit Statuses Change:**

| Trigger | From Status | To Status |
|---------|-------------|-----------|
| **Clock In** (manual or GPS auto) | Scheduled | In Progress |
| **Resume from Break** | Scheduled (with prior work) | In Progress |
| **Clock Out + Complete Visit** | In Progress | Completed |
| **GPS Auto Clock-Out + Confirm Complete** | In Progress | Completed |
| **Flag Issue** (without cancel) | Any | Action Required |
| **Flag Issue** (with cancel) | Any | Cancelled |
| **Manager puts on hold** | Any | On Hold |
| **Reopen Visit** | Completed | In Progress |
| **Resume from On Hold** | On Hold | Scheduled/In Progress |

**Automatic Behaviors:**

- **GPS Auto Clock-In:** When entering the site geofence (100m radius) in Automatic mode, the visit status changes from Scheduled to In Progress.
- **GPS Auto Clock-Out:** When leaving the site geofence in Automatic mode, the system prompts to complete the visit.
- **Break State:** Clocking out without completing keeps the visit as Scheduled but with accumulated time.

---

### Job Statuses

Jobs are the parent container for one or more visits. Job status reflects overall progress.

| Status | Color | Hex Code | Icon | Description |
|--------|-------|----------|------|-------------|
| **Unscheduled** | Cyan | `#06B6D4` | `clock` | No visits scheduled yet. Draft state. |
| **Scheduled** | Blue | `#3B82F6` | `calendar` | Has at least one future visit scheduled. |
| **In Progress** | Amber | `#F59E0B` | `clock` | At least one visit is currently in progress. |
| **Completed** | Green | `#10B981` | `check-circle` | All visits completed. Ready for invoicing. |
| **Cancelled** | Red | `#EF4444` | `x-circle` | Job was cancelled. No work performed. |
| **On Hold** | Purple | `#8B5CF6` | `pause-circle` | Job paused (e.g., contract suspension). |
| **Archived** | Gray | `#6B7280` | `archive` | Historical record. No longer active. |
| **Action Required** | Pink | `#EC4899` | `alert-triangle` | One or more visits have issues. Needs attention. |

**Job Status Transitions:**

```
Unscheduled → Scheduled → In Progress → Completed → Archived
      ↓           ↓            ↓            ↓
      ↓      On Hold ←──────────────────→ On Hold
      ↓           ↓
      └─────→ Cancelled
              Action Required (if any visit flagged)
```

**How Job Statuses Change:**

| Trigger | From Status | To Status |
|---------|-------------|-----------|
| **Add visit with future date** | Unscheduled | Scheduled |
| **First visit clocks in** | Scheduled | In Progress |
| **All visits completed** | In Progress | Completed |
| **Generate invoice** | Completed | Completed (with invoice linked) |
| **Cancel job** | Any | Cancelled |
| **Archive job** | Any | Archived |
| **Archive client** | Any | Archived (auto) |
| **Put on hold** | Any | On Hold |
| **Any visit flags issue** | Any | Action Required |
| **Resolve all visit issues** | Action Required | Previous status |

**Automatic Behaviors:**

- **Job Auto-Start:** When the first visit of a job is clocked in, the job status automatically changes from Scheduled to In Progress.
- **Job Completion Prompt:** After the last visit is clocked out, users are prompted to close the job.
- **Issue Propagation:** If any visit is marked as Action Required, the parent job also shows Action Required.
- **Invoice Linking:** When "Generate Invoice" is tapped, the job gets linked to the invoice via `invoiceId` field.

---

### Visit-Job Status Relationship

**The job status is automatically recalculated whenever any visit status changes.** This ensures the job always reflects the current state of its visits.

**Priority Order (highest to lowest):**

| Priority | Condition | Job Status |
|----------|-----------|------------|
| 1 | All visits cancelled | Cancelled |
| 2 | All visits completed | Completed |
| 3 | Any visit has action required | Action Required |
| 4 | Any visit is on hold | On Hold |
| 5 | Any visit is in progress | In Progress |
| 6 | All visits are scheduled | Scheduled |

**Examples:**

| Scenario | Visit States | Job Status |
|----------|--------------|------------|
| New job with 3 scheduled visits | Scheduled, Scheduled, Scheduled | Scheduled |
| First visit clocks in | In Progress, Scheduled, Scheduled | In Progress |
| First visit completes | Completed, Scheduled, Scheduled | Scheduled |
| Second visit clocks in | Completed, In Progress, Scheduled | In Progress |
| Issue flagged on third visit | Completed, In Progress, Action Required | Action Required |
| Issue resolved | Completed, In Progress, Scheduled | In Progress |
| All visits complete | Completed, Completed, Completed | Completed |
| Completed visit reopened | In Progress, Completed, Completed | In Progress |
| Reopened visit returns to scheduled | Scheduled, Completed, Completed | In Progress |
| All completed visits reopened | Scheduled, Scheduled, Scheduled | Scheduled |

**Key Behaviors:**

- **Manual job completion requires all visits to be completed** - You cannot manually mark a job as complete if any visits are still scheduled or in progress
- **Reopening a completed visit** will change the job back from Completed to In Progress (or Scheduled if all visits return to scheduled)
- **Flagging any visit** immediately sets the job to Action Required
- **Resolving all issues** recalculates the job status based on remaining visit states
- **Cancelling all visits** sets the job to Cancelled
- **Putting any visit on hold** sets the job to On Hold (unless there's an action required visit)

**Job Completion Flow:**

1. Complete all visits for the job (via clock out → "Complete Visit" or manual status change)
2. Once all visits are completed, either:
   - The job auto-completes (via visit-job sync), OR
   - Tap "Complete Job" button on the Job Details screen
3. If you try to complete a job with incomplete visits, you'll see an error message listing how many visits still need completion

---

### Status Colors Quick Reference

| Status | Light/Dark Theme | Usage |
|--------|------------------|-------|
| Scheduled | Blue `#3B82F6` | Planned future work |
| In Progress | Amber `#F59E0B` | Active work happening |
| Completed | Green `#10B981` | Successfully finished |
| Cancelled | Red `#EF4444` | Not happening |
| On Hold | Purple `#8B5CF6` | Temporarily paused |
| Archived | Gray `#6B7280` | Historical record |
| Action Required | Pink `#EC4899` | Needs attention |
| Unscheduled | Cyan `#06B6D4` | No date set |

---

### Clock Button States

The time tracking button on the Visit Details screen changes appearance based on the current state:

| State | Color | Icon | Text |
|-------|-------|------|------|
| **Not Started** | Green | `play-circle` | "Tap to Clock In" |
| **In Progress** | Amber | `clock` | "Remaining - Tap to Clock Out" |
| **On Break** | Orange | `coffee` | "On Break - Tap to Resume" |
| **Overtime** | Amber (red fill) | `alert-circle` | "Overtime - Tap to Clock Out" |
| **Completed** | Blue/Teal | `check-circle` | "Completed - Under Budget" or "Completed - Overtime" |

The button also displays:
- **Timer:** Shows remaining time (when clocked in) or total time (when not started/completed)
- **Progress Bar:** Visual fill showing actual vs scheduled time
- **Pulse Indicator:** Animated dot when actively clocked in

---

## Biometric Authentication

Users can enable Face ID or Touch ID for quick app unlock:

1. Go to More → Profile → Security section
2. Toggle "Use Face ID/Touch ID to unlock"
3. Authenticate to confirm
4. App will require biometric on next launch

**Note:** Available on iOS/Android devices only, not web.

---

## Navigation Tips

1. **To access Staff Scheduler:** More → Staff Scheduler (requires Manager/Admin role)
2. **To assign staff to visits:** Open a visit → Scroll to "Assigned Staff" section (Manager only)
3. **To set your profile:** More → Profile → Tap "Select your profile"
4. **To view your schedule:** More → My Schedule
5. **To clock in/out:** Open the visit → Use the Time Tracking card
6. **To generate an invoice:** Open job → Scroll to Job Total → Tap "Generate Invoice"
7. **To add products to a visit:** Open visit → Use "Items to Bring" or "Visit Line Items" section
8. **To create a request:** Jobs → + button → New Request (or More → Requests → + button)
9. **To view all requests:** More → Requests
10. **To convert a request to a job:** Open request → Tap "Convert to Job"
