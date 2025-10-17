Credit Report Analyzer - Frontend
A React-based frontend application for analyzing Experian soft credit pull XML files. Built with modern technologies including React, Redux, Tailwind CSS, and Axios.

🚀 Features
User Authentication - Secure login and registration

XML File Upload - Drag & drop interface for uploading Experian XML files

Credit Report Dashboard - Overview of all processed credit reports

Detailed Report View - Comprehensive credit report analysis with multiple sections

Search & Filter - Find reports by name, PAN, or phone number

Responsive Design - Works seamlessly on desktop and mobile devices

🛠 Tech Stack
Frontend Framework: React 18

State Management: Redux Toolkit

Routing: React Router DOM

HTTP Client: Axios

Styling: Tailwind CSS

Icons: Heroicons (via SVG)

File Upload: React Dropzone

Build Tool: Vite

📦 Installation
Prerequisites
Node.js (v16 or higher)

npm or yarn

Backend API server running

Setup Instructions
Clone the repository

bash
git clone <repository-url>
cd credit-report-analyzer-frontend
Install dependencies

bash
npm install
# or
yarn install
Environment Configuration
Create a .env file in the root directory:

env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
Start the development server

bash
npm run dev
# or
yarn dev
Open your browser
Navigate to http://localhost:5173

🏗 Project Structure
text
src/
├── components/
│   ├── Common/           # Reusable components
│   │   ├── LoadingSpinner.js
│   │   ├── ErrorMessage.js
│   │   └── ...
│   ├── Layout/           # Layout components
│   │   ├── Layout.js
│   │   ├── Header.js
│   │   └── Navbar.js
│   ├── Upload/           # File upload components
│   │   ├── FileUpload.js
│   │   └── UploadProgress.js
│   └── Reports/          # Report display components
│       ├── ReportCard.js
│       ├── BasicDetails.js
│       ├── ReportSummary.js
│       └── CreditAccounts.js
├── pages/                # Page components
│   ├── Dashboard.js
│   ├── UploadPage.js
│   ├── ReportDetail.js
│   ├── Login.js
│   └── SignUp.js
├── store/                # Redux store configuration
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       ├── uploadSlice.js
│       ├── reportsSlice.js
│       └── uiSlice.js
├── services/             # API services
│   ├── api.js
│   ├── axiosInstance.js
│   ├── authAPI.js
│   ├── uploadAPI.js
│   └── reportsAPI.js
├── helpers/              # Utility functions
│   └── localstorage.js
└── App.js                # Main app component
🔑 Authentication
The application uses JWT-based authentication:

Registration: Create new user accounts

Login: Authenticate existing users

Protected Routes: Automatic redirect to login for unauthorized access

Token Management: Automatic token inclusion in API requests

Authentication Flow
User registers or logs in

JWT token is stored in localStorage

Token is automatically included in all API requests

Protected routes check for valid token

Automatic logout on token expiration

📊 Components Overview
Core Pages
Login/SignUp - User authentication

Dashboard - Overview of all credit reports with search functionality

Upload Page - XML file upload interface with drag & drop

Report Detail - Detailed view of individual credit reports

Report Sections
Basic Details: Personal information (Name, PAN, Mobile, Credit Score)

Report Summary: Account overview (Total accounts, balances, enquiries)

Credit Accounts: Detailed account information with status and balances

🔌 API Integration
API Endpoints
Endpoint	Method	Description
/auth/register	POST	User registration
/auth/login	POST	User login
/auth/logout	POST	User logout
/auth/profile	GET	Get user profile
/upload/xml	POST	Upload XML file
/upload/status/:id	GET	Check upload status
/reports	GET	Get all reports
/reports/:id	GET	Get specific report
/reports/search	GET	Search reports
/reports/:id/basic-details	GET	Get basic details
/reports/:id/summary	GET	Get report summary
/reports/:id/credit-accounts	GET	Get credit accounts
Error Handling
Network error detection

Authentication error handling

User-friendly error messages

Automatic retry mechanisms

🎨 Styling
The application uses Tailwind CSS for styling with:

Responsive design using Tailwind's breakpoints

Consistent color palette with custom configurations

Component-based styling approach

Dark/light mode ready (can be extended)

Customization
To modify the styling:

Update Tailwind classes in components

Modify tailwind.config.js for theme changes

Add custom CSS in index.css if needed

📱 Responsive Design
The application is fully responsive across:

Desktop (1024px+)

Tablet (768px - 1023px)

Mobile (< 768px)

Breakpoints
sm: 640px

md: 768px

lg: 1024px

xl: 1280px

2xl: 1536px

🧪 Testing
Manual Testing Checklist
User registration and login

XML file upload with progress indication

Report list display and pagination

Report search functionality

Detailed report view

Responsive design on different screen sizes

Error handling for failed API calls

Authentication flow and protected routes

Browser Compatibility
Chrome (recommended)

Firefox

Safari

Edge

🚀 Deployment
Build for Production
bash
npm run build
# or
yarn build
Deployment Options
Netlify

bash
npm run build
# Deploy dist/ folder to Netlify
Vercel

bash
npm run build
# Connect GitHub repo to Vercel
Traditional Hosting

bash
npm run build
# Upload dist/ folder to web server
Environment Variables for Production
env
VITE_API_URL=https://your-backend-domain.com/api
VITE_ENV=production
🔧 Development
Available Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
Code Style
ESLint for code linting

Prettier for code formatting

Component-based architecture

Functional components with hooks

State Management
The app uses Redux Toolkit for state management with the following slices:

authSlice: User authentication state

uploadSlice: File upload progress and status

reportsSlice: Credit reports data

uiSlice: UI state and notifications
