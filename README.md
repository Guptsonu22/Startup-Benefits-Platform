# Startup Benefits Platform

## Overview
This is a full-stack web application built for startup founders and early-stage teams to discover, access, and manage exclusive SaaS deals.  
The platform helps startups reduce costs by unlocking curated benefits while enforcing access control through a verification-based system.

---

## Technology Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks / Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod

---

## Core Features
1. **Landing Page**  
   Premium SaaS-style landing page with animated hero section and a clear value proposition.

2. **Deals Listing**  
   Browse available deals with category filters, access-level indicators (locked/unlocked), and search functionality.

3. **Deal Details**  
   Detailed deal pages showing partner information, eligibility requirements, and claim actions.

4. **User Dashboard**  
   Centralized dashboard for viewing profile information, verification status, and claimed benefits with status tracking.

5. **Authentication & Authorization**  
   Secure registration and login flow with JWT-based route protection.

---

## End-to-End Application Flow
1. **Visitor**  
   Lands on the home page and explores featured deals.

2. **Registration / Login**  
   Users sign up or log in to access protected features.

3. **Browsing Deals**  
   Public deals are freely accessible. Locked deals are visually restricted and require verification.

4. **Claiming a Deal**
   - User clicks the claim action on a deal.
   - If not authenticated, the user is redirected to login.
   - If the deal is locked and the user is not verified, the claim is rejected with a clear message.
   - Eligible users can successfully submit a claim.

5. **Dashboard Tracking**  
   Claimed deals appear in the dashboard with real-time status updates.

---

## Authentication & Authorization Strategy
- **JWT-based Authentication**  
  JWT tokens are used to manage user sessions securely.
- **Password Security**  
  Passwords are hashed using `bcryptjs` before storage.
- **Protected Routes**  
  Middleware validates JWT tokens for sensitive routes such as claiming deals and accessing the dashboard.
- **Verification-Based Access Control**  
  User verification status directly controls access to locked deals.

---

## Claim Flow (Internal)
1. Frontend sends a `POST /api/claims/:dealId` request with the authentication token.
2. Authentication middleware validates the JWT token.
3. The controller checks whether the user has already claimed the deal.
4. The system verifies whether the deal is locked and whether the user is verified.
5. If eligible, a new `Claim` document is created with an initial status (`pending`).
6. The response is returned to the frontend, and the dashboard updates accordingly.

---

## Claim Status Lifecycle
- **Pending**: Claim submitted and awaiting approval.
- **Approved**: Deal access granted.
- **Rejected**: Claim denied due to eligibility or verification issues.

---

## UI & Performance Considerations
- **Motion Design**  
  Animations are used intentionally (hero transitions, card hover effects, page transitions) to enhance clarity without overwhelming the user.
- **Image Optimization**  
  Brand logos and assets use `next/image` for optimized loading, resizing, and lazy loading.
- **Responsive Design**  
  Mobile-first layout built using Tailwind CSS utilities.
- **Visual Access Control**  
  Locked deals use grayscale logos and overlays to clearly communicate restrictions.

---

## Known Limitations & Future Improvements
- **Verification Process**  
  Currently implemented as a manual verification flag in the database.  
  Future improvement: document-based or third-party startup verification.
- **Email Notifications**  
  Claim status notifications are not yet implemented.
- **Admin Moderation**  
  An admin panel for approving or rejecting claims would be required for production use.
- **Scalability Enhancements**  
  Role-based access control, rate limiting, and caching could be added for large-scale usage.

---
