# Portfolio API Backend

This project is a robust backend API for a portfolio, built with Node.js and Express. It provides a comprehensive set of features for managing blog posts, including creating, reading, updating, and deleting (CRUD) operations. The API uses Firebase Firestore for data storage and includes authentication to secure the endpoints.

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can use the `.env.example` file as a template.

`PORT`

You can see an example in the `.env.example` file.

### Firebase Credentials

The `GOOGLE_APPLICATION_CREDENTIALS` variable should contain the path to your Firebase service account key file. 
1. Create a `serviceAccountKey.json` file in the root of the project.
2. Use the `serviceAccountKey.example.json` file as a template to fill in your actual credentials.
3. Set the `GOOGLE_APPLICATION_CREDENTIALS` in your `.env` file to point to this file (e.g., `GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json`).