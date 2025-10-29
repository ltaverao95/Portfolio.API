
# Project Overview

This project is a robust backend API for a portfolio, built with Node.js and Express. It provides a comprehensive set of features for managing blog posts, including creating, reading, updating, and deleting (CRUD) operations. The API uses Firebase Firestore for data storage and includes authentication to secure the endpoints.

**Main Technologies:**

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Firebase Firestore:** A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud.
*   **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.

**Architecture:**

The application is structured in a modular way, with separate modules for authentication and blog posts. Each module has its own routes, controllers, services, and models. The application uses a centralized error handler and a custom 404 handler.

# Building and Running

**Environment Variables:**

To run this project, you will need to add the following environment variables to your `.env` file. You can use the `.env.example` file as a template.

*   `PORT`: The port the server will run on. (e.g., `PORT=3000`)
*   `NODE_ENV`: The application environment. (e.g., `NODE_ENV=development`)
*   `FRONTEND_URL`: The URL of the frontend application. (e.g., `FRONTEND_URL="http://localhost:9002"`)

### Google OAuth

*   `GOOGLE_SIGN_IN_URL_CALLBACK`: The URL to redirect to after Google has authenticated the user. (e.g., `GOOGLE_SIGN_IN_URL_CALLBACK="https://your-domain-name/api/auth/google/callback"`)
*   `GOOGLE_CLIENT_ID`: Your Google client ID. (e.g., `GOOGLE_CLIENT_ID="your-google-client-id"`)
*   `GOOGLE_CLIENT_SECRET`: Your Google client secret. (e.g., `GOOGLE_CLIENT_SECRET="your-google-client-secret"`)

### Firebase Credentials

The project uses a service account to authenticate with Firebase. You can set the environment variables directly.

**Using environment variables:**

*   `FIREBASE_TYPE`: The type of the service account. (e.g., `FIREBASE_TYPE="service_account"`)
*   `FIREBASE_PROJECT_ID`: Your Firebase project ID. (e.g., `FIREBASE_PROJECT_ID="your-project-id"`)
*   `FIREBASE_PRIVATE_KEY_ID`: Your Firebase private key ID. (e.g., `FIREBASE_PRIVATE_KEY_ID="your-private-key-id"`)
*   `FIREBASE_PRIVATE_KEY`: Your Firebase private key. (e.g., `FIREBASE_PRIVATE_KEY="your-private-key"`)
*   `FIREBASE_CLIENT_EMAIL`: Your Firebase client email. (e.g., `FIREBASE_CLIENT_EMAIL="your-client-email"`)
*   `FIREBASE_CLIENT_ID`: Your Firebase client ID. (e.g., `FIREBASE_CLIENT_ID="your-client-id"`)
*   `FIREBASE_AUTH_URI`: The Firebase auth URI. (e.g., `FIREBASE_AUTH_URI="https://accounts.google.com/o/oauth2/auth"`)
*   `FIREBASE_TOKEN_URI`: The Firebase token URI. (e.g., `FIREBASE_TOKEN_URI="https://oauth2.googleapis.com/token"`)
*   `FIREBASE_AUTH_PROVIDER_X509_CERT_URL`: The Firebase auth provider x509 cert URL. (e.g., `FIREBASE_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"`)
*   `FIREBASE_CLIENT_X509_CERT_URL`: The Firebase client x509 cert URL. (e.g., `FIREBASE_CLIENT_X509_CERT_URL="your-client-x509-cert-url"`)
*   `FIREBASE_UNIVERSE_DOMAIN`: The Firebase universe domain. (e.g., `FIREBASE_UNIVERSE_DOMAIN="googleapis.com"`)

**Commands:**

*   **Install dependencies:**

    ```sh
    npm install
    ```

*   **Run in development mode:**

    ```sh
    npm run dev
    ```

*   **Build for production:**

    ```sh
    npm run build
    ```

*   **Start in production mode:**

    ```sh
    npm start
    ```

*   **Run tests:**

    ```sh
    npm test
    ```

# Development Conventions

**Coding Style:**

*   The project uses TypeScript and follows the standard TypeScript and Node.js conventions.
*   The code is formatted using Prettier (inferred from the presence of `.prettierrc` file).

**Testing:**

*   The project uses Jest for unit and integration testing.
*   Tests are located in the `__tests__` directory within each module.
*   Tests are written in TypeScript.

**Contribution Guidelines:**

*   TODO: Add contribution guidelines.
