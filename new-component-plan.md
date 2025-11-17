# New Component Research and Planning

## 1. Chosen Component
**Component Name:** Multer  
**Purpose:** Middleware for handling image and file uploads in Express applications.

### Why I Chose Multer
For my Connectify Social Media API, users need to upload profile pictures and images for posts.  
Multer is perfect because it lets the server accept image uploads easily while checking file size and type for safety.
It fits the real-world social-media theme and shows how to integrate file management into a backend project.

## 2. Component Description
Multer is an npm package that works as middleware for Express.  
It lets the server process multipart/form-data requests, which are used when uploading files.

**Main Features:**
- Supports single or multiple file uploads.  
- Can store files locally or on cloud storage like AWS S3.  
- Allows file type and size validation.  
- Works easily with TypeScript and Express routes.

## 3. Implementation Plan ###
Step 1 - Install Packages bash
npm install multer
npm install --save-dev @types/multer