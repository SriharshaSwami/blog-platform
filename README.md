# Full Stack Blog Application

A full-stack, responsive blog platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a seamless experience for users to read, write, and manage articles, complete with secure authentication and image upload capabilities.

## 🚀 Features

*   **User Authentication & Authorization**: Secure login and registration flows utilizing JSON Web Tokens (JWT) and Bcrypt.js for password hashing.
*   **Role-Based Access Control**: Different user roles (e.g., Reader, Author, Admin) dictating access to specific features.
*   **Article Management (CRUD)**: Create, Read, Update, and Delete blog posts. 
*   **Image Uploads**: Integrated with Cloudinary and Multer to allow authors to seamlessly upload and attach images to their articles.
*   **State Management**: Efficient frontend state management using Zustand.
*   **Responsive UI**: Modern, clean, and responsive user interface built from the ground up with Tailwind CSS.
*   **Form Validation**: Robust frontend form handling and validation utilizing React Hook Form.

## 💻 Tech Stack

### Frontend
*   **React** (with Vite for fast build tooling)
*   **React Router Dom** (for client-side routing)
*   **Tailwind CSS** (for styling)
*   **Zustand** (for global state management)
*   **Axios** (for API requests)
*   **React Hook Form** (for form validation)
*   **React Hot Toast** (for sleek, accessible notifications)

### Backend
*   **Node.js & Express.js** (REST API framework)
*   **MongoDB & Mongoose** (Database & ODM)
*   **JSON Web Tokens (JWT)** (Authentication)
*   **Bcrypt.js** (Password hashing)
*   **Cloudinary & Multer** (Image hosting and handling)
*   **Cookie Parser & CORS** (Security and session management)

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system. You will also need a Cloudinary account for handling image uploads.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd blog-app
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and set up your environment variables.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Start the backend server:
```bash
npm run start
# or use nodemon for development:
# nodemon server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and configure your environment variables.
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Open the Application
Navigate to `http://localhost:5173` (or the port provided by Vite) in your browser to view the application!

## 🧪 Testing Credentials

You can use the following sample credentials to log in and explore the different features of the application.

### Admin
*   **Email**: `sriharshaswamy@gamil.com`
*   **Password**: `sriharsha@2004`

### User, Author
1. **Email**: `testuser1@gmail.com`
   **Password**: `testuser1`
2. **Email**: `author1@gmail.com`
   **Password**: `author1`

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
