<h1 align="center">🌿 kryzen-auth-pdf-form Website🌿 </h1>

<h3 align="justify" width="80%">

Welcome to the Kryzen! We're excited to invite you on board. This document outlines the requirements for developing a Node.js and React.js application. The primary features include user authentication, a simple
 data collection form, and displaying and downloading the collected data in PDF format. Based on this project we will evaluate your skills like cleanliness of code. Breaking problems down into small steps. UI and
 UX are not important, goal is to understand your analytical thinking and problem-solving [Assignment_0-1 (8).pdf](https://github.com/AyushiVashisth/kryzen-auth-pdf-form/files/13887387/Masai.Project.Overview.pdf)


### Frontend Deployed URL 👉 [Click here](https://frontend-ayushivashisth.vercel.app/)
### Backend Respositry URL 👉 [Click here](https://kryzen-api.onrender.com)

</h3>

<br/>

<h2 align="center">Technologies Used</h2>

<p align="center">
  <b>Frontend</b><br>
  <img src="https://img.shields.io/badge/react-%23323330.svg?style=for-the-badge&logo=react&logoColor=%23F7DF1E" alt="react">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwindcss">
</p>

<p align="center">
  <b>Backend</b><br>
  <img src="https://img.shields.io/badge/expressjs-%777BB4.svg?style=for-the-badge&logo=express.js&logoColor=white" alt="express">
  <img src="https://img.shields.io/badge/mongoose-%2300f.svg?style=for-the-badge&logo=mongoose&logoColor=white" alt="mongoose">
</p>

<p align="center">
  <b>Tools</b><br>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="github">
  <img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
  <img src="https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white" alt="vscode">
</p>

<p align="center">
  <b>Deployment</b><br>
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel">
  <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" alt="netlify">
</p>

<h2 align="center">Features</h2>

1. **User Registration:**
   - Allow users to register a new account with a unique username and password.
   - Ensure that the registration process securely stores user credentials.

2. **User Login:**
   - Implement a secure login mechanism where users can authenticate with their registered credentials.
   - Utilize JSON Web Tokens (JWT) for secure authentication.

3. **Access Control:**
   - Define specific pages or routes that should only be accessible when the user is authenticated.
   - Implement middleware on the server to check the validity of JWT tokens before granting access.

**Implementation Steps:**

1. **Backend Setup:**
   - Create user schema in MongoDB to store user data, including username and hashed password.
   - Set up routes for user registration and login using Express.

2. **User Registration:**
   - Implement a registration form on the frontend using React.
   - Validate and sanitize user input on the client and server sides.
   - Hash the user's password before storing it in the database.

3. **User Login:**
   - Develop a login form on the frontend.
   - Validate user input and authenticate the user by comparing the hashed password.
   - Generate a JWT upon successful login and send it to the client.

4. **Access Control:**
   - Create a middleware function on the server to verify the JWT in incoming requests.
   - Use the middleware to protect routes that require authentication.

**Considerations:**

- **Token Expiry:** Set a reasonable expiry time for JWT tokens to enhance security.
  
- **Password Policy:** Enforce strong password policies during registration.

- **Secure Transmission:** Ensure that user credentials and JWTs are transmitted securely over HTTPS.

- **Error Handling:** Implement error handling for various scenarios (e.g., incorrect password, user not found).

By successfully implementing the User Authentication feature, you establish a foundation for securing user data and controlling access to different application parts.

<h2 align="center">Getting Started</h2>

1. Clone the repository to your local machine.
2. Set up the backend API using Express and Mongoose (provide instructions if necessary).
3. Navigate to the project directory.
4. Run `npm install` to install the required dependencies.
5. Run `npm start` to start the development server.

<h3>This is an individual project that I developed as a solo full-stack web developer within 5 days.</h3>

<h2 align="center">Contribution Guidelines</h2>

We welcome contributions to the kryzen-auth-pdf-form project. If you have ideas for new features or find any bugs, please open an issue in the repository. Pull requests are also encouraged.

<h2 align="center">Show Your Support</h2>

If you find this project interesting or valuable, please consider giving it a ⭐️.

<h1 align="center">🚘 Happy Exploring! 🚘</h1>
