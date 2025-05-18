# Product Requirements Document: Codantix (Frontend)

---

**Document Version:** 1.0  
**Date:** October 26, 2023  
**Product Name:** Codantix

---

## Table of Contents

1. [Introduction](#introduction)
2. [Goals & Objectives](#goals--objectives)
3. [User Stories / Personas](#user-stories--personas)
4. [Scope (Frontend)](#scope-frontend)
5. [Out of Scope (for this Frontend PRD)](#out-of-scope-for-this-frontend-prd)
6. [Features & Requirements (Frontend)](#features--requirements-frontend)
    - [Repository Catalog View](#repository-catalog-view)
    - [AI Chat Interface View](#ai-chat-interface-view)
7. [Open Questions & Future Considerations](#open-questions--future-considerations)
8. [Brand & Design](#brand--design)
9. [Technical Stack and Specifications (Frontend)](#technical-stack-and-specifications-frontend)

---

## 1. Introduction

Codantix is an internal platform designed to serve as a centralized, searchable, and interactive catalog for all company code repositories. The primary goal is to improve discovery, understanding, and accessibility of the company's codebase and platform knowledge for all employees, regardless of their technical background. This document outlines the requirements for the frontend application of Codantix, which will consume data and AI capabilities provided by a separate backend API.

---

## 2. Goals & Objectives

**Primary Goal:**  
Establish a single, user-friendly source of truth for exploring company code repositories and related platform knowledge.

**Key Objectives:**

- Enable all employees (Developers, Architects, PMs, Ops, etc.) to easily find and understand relevant code repositories.
- Provide a conversational interface (chat) for querying codebase information using natural language.
- Reduce reliance on developers for basic inquiries about repositories, services, and platform features.
- Improve cross-team awareness of existing code and capabilities.
- Increase overall efficiency in development, operations, and product discovery workflows.

**Success Metrics:**

| Metric | Description |
|--------|-------------|
| **User Adoption Rate** | Number of unique users accessing the platform |
| **Repeat Usage Rate** | Frequency of users returning to the platform |
| *[Potential future metrics]* | User satisfaction scores, reduced time spent on manual code discovery, number of questions answered by the chat interface vs. direct human inquiry |

---

## 3. User Stories / Personas

Codantix is intended for a broad internal audience. While specific personas could be developed, the current understanding suggests the need for potentially different levels of detail or "views" catering to technical vs. non-technical users.

**Personas:**

- **As a Developer:**
  - I want to find repositories related to a specific service or technology so I can understand implementation details or identify potential reuse opportunities.
  - I also want to use the chat to ask specific technical questions about code logic or patterns across repositories.

- **As an Architect:**
  - I want to quickly browse the landscape of repositories, understand team ownership, and see dependencies to assess the platform structure and identify areas for refactoring or standardization.

- **As a Product Manager:**
  - I want to easily find out which repositories are associated with a specific product feature or capability and use the chat to ask if the platform supports a certain function, without needing to involve engineering directly.

- **As an Operations Engineer:**
  - I want to be able to search and query the codebase via chat to check for usage of specific libraries, identify services owned by a team, or understand deployment-related information linked to a repository.

- **As any Employee:**
  - I want a simple way to discover what code exists at the company, who owns it, and get a basic understanding of what different repositories do.

> **Potential Views:** Consider exploring different UI complexities or information density based on assumed user roles (e.g., a "Simple View" for PMs/Ops, a "Developer View" with more technical details). This requires further design exploration.

---

## 4. Scope (Frontend)

This document focuses solely on the frontend application responsible for:

- Fetching data from the Codantix Backend API.
- Displaying repository information in a catalog view.
- Providing a chat interface for interacting with the LLM/Vector DB via the backend API.
- Implementing filtering, sorting, and search functionality for the catalog.
- Implementing filtering and history management for the chat interface.
- Rendering dynamic content (like markdown) in the chat responses.
- Handling user interactions (clicks, hovers, input).

---

## 5. Out of Scope (for this Frontend PRD)

- Backend API development (ingestion pipelines, vector database, LLM integration, search/query logic).
- Authentication and Authorization (assume the frontend consumes the API endpoints, access control is handled by the backend if needed).
- Deployment and hosting infrastructure for the frontend (beyond standard web deployment).
- Advanced analytics tracking (beyond success metrics defined).

---

## 6. Features & Requirements (Frontend)

The Codantix frontend will consist of two main sections: a **Repository Catalog View** and an **AI Chat Interface**, ideally accessible via navigation (e.g., tabs or separate pages).

### Repository Catalog View

**Requirements:**

- **6.1.1:** Display repositories in a card-based layout.
- **6.1.2:** Each repository card must display:
  - Repository Name
  - Primary Language (icon display preferred, as suggested)
  - [Optional, TBD]: Other simple, meaningful information on the card face (e.g., team name if space allows, or a small indicator).
- **6.1.3 (Hover):** On hover over a card, display a concise summary of the repository. (Expected length: Single sentence).
- **6.1.4 (Expansion):** Clicking a card must expand or navigate to a detail view/modal showing more information.
- **6.1.5 (Expanded Details):** The expanded/detail view must display:
  - Repository Name
  - More comprehensive Summary (Expected length: a paragraph or more, depending on API data)
  - Team Owner
  - Direct Link to the source repository (e.g., GitHub Enterprise URL)
  - List of Dependencies (displaying name and version)
- **6.1.6 (Search):** Provide a search bar to filter the catalog cards by repository name or keywords present in the summary/details.
- **6.1.7 (Filtering):** Provide filtering options for the catalog cards, including:
  - Filter by Team Owner (multi-select, searchable list/tags)
  - Filter by Primary Language (multi-select, searchable list/tags)
  - [Potential future filters]: By technology, recency (last updated), etc.
- **6.1.8 (Sorting):** Provide sorting options for the catalog cards, including:
  - Alphabetical by Name (A-Z, Z-A)
  - [Potential future sorting]: By last updated date, team, etc.
- **6.1.9:** The catalog view should handle the display of a large number of repositories efficiently (e.g., pagination, infinite scroll). Depends on the expected total number of repos.
- **6.1.10:** Indicate loading states while fetching data from the API.
- **6.1.11:** Display a clear message if no repositories match the current search/filter criteria.

---

### AI Chat Interface View

**Requirements:**

- **6.2.1:** Provide a conversational chat interface layout (input box, message display area).
- **6.2.2:** Allow users to input text queries.
- **6.2.3:** Display user queries in the chat history.
- **6.2.4:** Display responses from the backend AI API.
- **6.2.5:** Responses must be rendered using markdown format to support code snippets, links, bolding, etc., similar to tools like Gradio or Streamlit output.
- **6.2.6 (Filters):** Provide filter options specifically for the chat queries:
  - Select specific Repositories to query (multi-select, searchable list/tags). Default: All Repos.
  - Select specific Team Owners to query (multi-select, searchable list/tags). Default: All Teams.
- **6.2.7 (Filter Logic):** Implement hierarchical filtering logic: if a Team Owner is selected, the Repository filter options should be limited to repositories owned by that team. Users can then select specific repos within that team's ownership or query the entire selected team's repos.
- **6.2.8 (Chat History):** Maintain chat history for the current session using a chat ID provided by the backend. When a user returns, the previous conversation linked to that ID should be loaded.
- **6.2.9:** Indicate processing/typing state while waiting for the AI response from the backend API.
- **6.2.10:** Handle and display potential errors from the backend API (e.g., query failed, API unavailable).
- **6.2.11:** Allow users to start a new chat session (generate a new chat ID). Requires clarification on backend support.

---

## 7. Open Questions & Future Considerations

> - How are "Team Owners" managed and represented in the backend API? Is it a strict list? Does it map directly to internal org structure?
> - What is the expected maximum number of repositories to be displayed in the catalog? This impacts performance considerations for filtering, sorting, and rendering.
> - What are the specific primary languages we need to support icons for?
> - What is the typical response time expected from the AI Chat API? This affects the perceived responsiveness of the chat interface.
> - Are there requirements for accessibility (WCAG guidelines)?
> - Are there requirements for internationalization (i18n) or localization (l10n)?
> - Further refinement on the "clustering types" or different views for various user roles (technical vs. simple). How would this manifest in the UI?
> - Consider adding a mechanism for users to provide feedback on chat responses ("Was this helpful?").

---

## 8. Brand & Design

- **Branding:** Adhere to the brand name "Codantix".
- **Design System:** No specific company UI framework required initially, but build with modularity to potentially adopt one later. Focus on a clean, intuitive, and responsive design suitable for internal tools.

---

## 9. Technical Stack and Specifications (Frontend)

This section outlines the required technical stack and key specifications for the frontend application development.

| Area | Requirement |
|------|-------------|
| **Frontend Framework** | Next.js. The frontend application must be built using the Next.js framework. |
| **Styling** | shadcn/ui with Tailwind CSS. Styling will be implemented using Tailwind CSS, leveraging components from the shadcn/ui library for foundational UI elements. |
| **Package Manager** | pnpm. pnpm must be used as the package manager for the frontend project. |
| **Programming Language** | TypeScript. The entire frontend codebase must be written in TypeScript. |
| **Data Interaction (via Backend API)** | The frontend application must not connect directly to databases. All data required for the catalog display, filtering, sorting, search, and the AI chat interface must be consumed exclusively through defined endpoints of the Codantix Backend API. The frontend is responsible for fetching data, handling API request/response cycles, and presenting the data to the user. |