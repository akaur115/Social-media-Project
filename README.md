# **Connectify -  Social Media Backend API**

A TypeScript-based social media API built using **Node.js**, **Express**, **Firebase Firestore**, **Firebase Authentication**, and **Swagger/OpenAPI**.  
This project was developed in **three milestones** focusing on secure coding practices, advanced features, testing, and backend architecture.


# **Features**

## Authentication & Authorization
- Register & Login (Firebase Auth)
- JWT-based authentication middleware
- Custom claims for **admin** and **user** roles
- Admin-only protected routes

##  Posts
- Create / Read / Update / Delete (CRUD)
- Upload images using Multer
- Filtering (by userId)
- Searching (title/content)
- Sorting (newest/oldest)
- Ownership verification  
  (only the creator can edit/delete)

##  Comments
- Add comments to a specific post  
- Stored within the Firestore post document  
- Includes userId, timestamp, and text

##  Users
- Register  
- Login  
- Get user profile  
- Upload profile picture  
- Admin-only delete user  

## Testing
- Jest + Supertest testing pipeline
- CRUD test coverage for Posts
- Test-ready Express App

## Swagger Documentation
- Fully documented API using OpenAPI 3.0
- Includes:
  - Auth routes
  - User routes
  - Posts CRUD
  - Comments
  - Filtering/sorting
  - Ownership rules
  - Admin-only endpoints

#  **Milestone Progress Overview**


## **Milestone 1 — Core Backend Setup**
- Project initialized (TypeScript + Node.js + Express)
- Basic folder structure & Firestore connection
- Firebase Auth login/register setup
- Base CRUD for Posts
- Initial Swagger documentation
- Initial testing setup


##  **Milestone 2 — Security, Testing, Documentation Updates**

###  Security Improvements
- `authRequired` middleware added  
- JWT validation + Firebase Admin SDK  
- Centralized error handling  
- `.env.example` created  
- Removed secrets from repo  

### Backend Improvements
- Refactored into Controller/Service/Repository layers  
- Firestore post repository implemented  
- Multer image upload added  

### Testing Enhancements
- Jest + Supertest working
- CRUD tests implemented

### Documentation
- Swagger updated with full route descriptions


## 🎉 **Milestone 3 — Final Touches & Advanced Features**

### Advanced Features Added
- Post Filtering (userId)
- Searching (title/content)
- Sorting (newest/oldest)
- Comment System  
- Ownership Middleware  
- Role-based Authorization  
- Admin-only routes  

### API Documentation (Full Swagger)
- Added:
  - Auth header security schemes
  - Comments routes
  - Sorting & filtering parameters
  - Admin-only routes
  - Request/response schema updates

###  Project Cleanup
- Improved folder structure  
- Added TypeScript types  
- Removed Firebase secret JSON  
- Added `.env.example`  
- Improved naming consistency  

### Working Tests
- Jest tests updated & passing
- Consistent supertest setup
