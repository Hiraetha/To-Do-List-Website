# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## TASKLY – To-Do List Web Application

### 1. Project Overview

TASKLY is a modern web-based task management application designed to help users organize, manage, and track their daily activities.

The application allows users to create an account, log in, create tasks, edit existing tasks, delete tasks, and mark tasks as completed.

The application will use React JS for frontend development and PHP for backend development.

IMPORTANT:
This project focuses exclusively on frontend development. The PHP backend will be developed separately by another developer.

The frontend must be structured to make future backend integration simple and straightforward.

### 2. Project Objectives

The main objectives are:

1. Build a modern and user-friendly To-Do List application.
2. Provide authentication interfaces for login and registration.
3. Allow users to manage their daily tasks through CRUD functionality.
4. Display task statistics and completion progress.
5. Create a responsive interface for desktop, tablet, and mobile.
6. Prepare a clean frontend architecture that can easily integrate with a PHP REST API.

### 3. Target Users

The target users are students, professionals, and individuals who need a simple application to organize their daily tasks.

### 4. Technology Stack

Use the following technologies:

- React JS with functional components.
- Vite as the development server and build tool.
- JavaScript (JSX), not TypeScript.
- CSS3 for all styling.
- React Router DOM for page navigation.
- Axios for HTTP requests.
- Lucide React for icons.

Do not use Tailwind CSS, Bootstrap, Material UI, or other CSS frameworks.

Use reusable React components and clean project architecture.

### 5. Design System – Neo-Brutalism

The entire application must follow a consistent Neo-Brutalism design system.

#### Color Palette

- Background: #F9F7F0
- Primary Yellow: #FFDE59
- Secondary Lime: #B8F28B
- Accent Purple: #A78BFA
- Coral: #FF8A80
- Text: #171717
- Border: #171717
- Card Background: #FFFFFF

#### Design Characteristics

- Thick black borders (2px–3px).
- Hard offset shadows (4px–6px).
- No blurred shadows.
- Bold typography.
- Strong color contrast.
- Slightly rounded corners (6px–10px).
- Clear spacing and visual hierarchy.
- Interactive hover and active states.

Use a modern sans-serif font such as Inter or Plus Jakarta Sans.

The UI must look professional, playful, bold, and clean.

Avoid excessive decorations and unnecessary animations.

### 6. Application Pages

The application must contain the following pages:

#### A. Login Page

Route: /login

Components:
- TASKLY logo.
- Heading: "WELCOME BACK!"
- Subtitle: "Let's get things done today."
- Email input.
- Password input.
- Show/hide password button.
- Login button.
- Link to registration page.
- Form validation messages.

Functional requirements:
- Validate required fields.
- Validate email format.
- Show appropriate error messages.
- Display loading state during submission.
- Prepare login submission through the authentication service.
- Redirect authenticated users to the dashboard.

#### B. Register Page

Route: /register

Components:
- TASKLY logo.
- Heading: "JOIN TASKLY!"
- Full name input.
- Email input.
- Password input.
- Confirm password input.
- Show/hide password buttons.
- Register button.
- Link to login page.

Functional requirements:
- Validate all required fields.
- Validate email format.
- Ensure password confirmation matches.
- Display validation errors.
- Display loading and submission states.
- Prepare registration submission through the authentication service.

#### C. Dashboard Page

Route: /dashboard

The dashboard is the main page after successful login.

Layout:

LEFT SIDEBAR:
- TASKLY logo.
- Dashboard menu.
- All Tasks menu.
- Pending Tasks menu.
- Completed Tasks menu.
- Logout button.

MAIN CONTENT:

Header:
- Welcome message.
- Current date.
- User information.
- Search task input.

Statistics section:
- Total Tasks.
- Completed Tasks.
- Pending Tasks.

Task management section:
- Section title: "MY TASKS".
- Add Task button.
- Task list.
- Task filtering.
- Empty state when there are no tasks.

Each task card must display:
- Task title.
- Task description.
- Due date.
- Task status.
- Complete task action.
- Edit action.
- Delete action.

### 7. Task Management Features

#### A. Add Task

Users can add a new task using a modal form.

Form fields:
- Task title (required).
- Task description (optional).
- Due date (optional).

Actions:
- Save Task.
- Cancel.

After successful creation, update the task list and statistics.

#### B. Edit Task

Users can edit an existing task.

The edit modal must contain the existing task information.

Users can update:
- Title.
- Description.
- Due date.

#### C. Delete Task

Users can delete a task.

Show a confirmation dialog before deleting.

#### D. Complete Task

Users can mark a task as completed or pending.

Completed tasks must have:
- Completed status indicator.
- Green status label.
- Strikethrough task title.

#### E. Search Task

Users can search tasks by title.

Search results should update dynamically.

#### F. Task Filtering

Provide the following filters:
- All Tasks.
- Pending Tasks.
- Completed Tasks.

Statistics must update according to the current task data.

### 8. Task Data Structure

Use the following data structure consistently throughout the frontend:

{
  "id": 1,
  "user_id": 1,
  "title": "Complete React Project",
  "description": "Finish the To-Do List frontend",
  "due_date": "2026-11-20",
  "status": "pending",
  "created_at": "2026-11-17"
}

Allowed task statuses:
- pending
- completed

Use this structure for mock data and API integration.

### 9. Frontend Architecture

Use the following folder structure:

src/
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── DashboardLayout.jsx
│   │
│   └── tasks/
│       ├── TaskCard.jsx
│       ├── TaskForm.jsx
│       ├── TaskList.jsx
│       ├── TaskStats.jsx
│       └── TaskFilter.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AllTasks.jsx
│   ├── PendingTasks.jsx
│   └── CompletedTasks.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── taskService.js
│
├── hooks/
│   └── useTasks.js
│
├── context/
│   └── AuthContext.jsx
│
├── styles/
│   ├── global.css
│   ├── variables.css
│   ├── auth.css
│   ├── dashboard.css
│   └── components.css
│
├── utils/
│   └── dateUtils.js
│
├── App.jsx
└── main.jsx

### 10. Backend Integration Preparation

The backend will be developed separately using PHP.

The frontend must not implement PHP, MySQL, or backend logic.

Create a centralized Axios instance in services/api.js.

Use an environment variable for the API base URL:

VITE_API_BASE_URL=http://localhost/backend/api

Prepare the following API endpoints:

AUTHENTICATION:

POST /login.php
POST /register.php
POST /logout.php

TASK MANAGEMENT:

GET /tasks.php
POST /tasks.php
PUT /tasks.php?id={id}
DELETE /tasks.php?id={id}
PATCH /tasks.php?id={id}

Expected API behavior:

- Login returns authentication information.
- Register creates a new account.
- GET tasks returns the authenticated user's tasks.
- POST creates a task.
- PUT updates a task.
- DELETE removes a task.
- PATCH updates task status.

Keep all HTTP requests inside service files.

Do not put Axios requests directly inside UI components.

IMPORTANT API REQUIREMENTS:

- Make endpoint paths configurable.
- Keep API request and response handling separate from UI.
- Do not assume the backend response format without documenting it.
- Prepare for JSON request and response bodies.
- Support API loading, success, and error states.
- Coordinate authentication method and response format with the backend developer.
- Do not hardcode backend URLs in components.

### 11. Mock Data and Development Mode

Since the backend is developed separately, the frontend must be fully testable without a PHP server.

Create mock data for development.

Implement a development data service that supports:
- Login simulation.
- Registration simulation.
- Fetching tasks.
- Creating tasks.
- Updating tasks.
- Deleting tasks.
- Completing tasks.

All CRUD features must work in mock mode.

Keep mock services separate from real API services.

Provide a simple configuration to switch between mock mode and API mode.

Example:

VITE_USE_MOCK_DATA=true

Do not make the frontend depend on a running PHP server during initial development.

### 12. Responsive Requirements

Desktop:
- Fixed or collapsible left sidebar.
- Spacious dashboard layout.
- Statistics cards in one row.
- Task list with clear actions.

Tablet:
- Compact sidebar.
- Flexible statistics cards.
- Adjusted spacing.

Mobile:
- Mobile-friendly navigation.
- Stacked statistics cards.
- Full-width task cards.
- Responsive modal forms.
- Touch-friendly buttons.
- No horizontal overflow.

### 13. UI/UX Requirements

- Every button must have a working interaction.
- Forms must have validation.
- Show loading indicators during asynchronous operations.
- Show success and error feedback.
- Provide empty states.
- Provide confirmation before deleting tasks.
- Maintain consistent spacing and colors.
- Use reusable components.
- Maintain accessible labels and keyboard navigation.
- Ensure sufficient text contrast.
- Do not use alert() as the main notification interface.
- Use toast notifications or custom feedback components.

### 14. Security and Authentication Boundaries

The frontend is not responsible for implementing real authentication security.

- Never store plaintext passwords.
- Do not treat frontend route protection as backend authorization.
- Coordinate session or token authentication with the PHP developer.
- Do not assume localStorage is an appropriate token storage mechanism without agreeing on the authentication architecture.
- The backend must validate authentication and authorize access to user-specific tasks.

### 15. Development Workflow

Build the application in the following order:

PHASE 1:
- Initialize React + Vite project.
- Install required dependencies.
- Configure global CSS and design tokens.
- Create reusable UI components.

PHASE 2:
- Build Login page.
- Build Register page.
- Implement form validation.
- Implement navigation.

PHASE 3:
- Build Dashboard layout.
- Build sidebar and header.
- Build task statistics.
- Build task cards and task list.

PHASE 4:
- Implement task creation.
- Implement task editing.
- Implement task deletion.
- Implement task completion.
- Implement searching and filtering.

PHASE 5:
- Implement mock services.
- Prepare API services.
- Test frontend independently from PHP.

PHASE 6:
- Responsive optimization.
- UI consistency review.
- Fix bugs.
- Production build verification.

### 16. Acceptance Criteria

The project is considered complete when:

1. Users can navigate between Login and Register pages.
2. Login and Register forms have working frontend validation.
3. Dashboard displays task statistics.
4. Users can create tasks.
5. Users can edit tasks.
6. Users can delete tasks with confirmation.
7. Users can mark tasks as completed or pending.
8. Users can search tasks.
9. Users can filter tasks by status.
10. Statistics update automatically after task changes.
11. The application works in mock mode without PHP.
12. API services are ready for PHP integration.
13. All pages follow the Neo-Brutalism design system.
14. All pages are responsive.
15. The project runs successfully using npm run dev.
16. The project builds successfully using npm run build.

### 17. Final Instructions for the AI Developer

Build a complete and functional frontend application, not just static UI mockups.

Prioritize clean code, reusable components, maintainable architecture, and a consistent Neo-Brutalism design system.

Do not implement the PHP backend or database.

Do not skip any of the required CRUD features.

Do not leave buttons or interactions non-functional.

Use mock data until the PHP backend is available.

Before finishing, verify all routes, forms, task operations, responsive layouts, and production build.

The final application must be easy for another developer to connect to a PHP REST API without rewriting the frontend architecture.