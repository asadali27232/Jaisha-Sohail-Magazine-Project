# Jaisha-Sohail-Magazine-Project

# Running a Next.js and Node.js Server

This README provides instructions on how to run a Next.js application alongside a separate Node.js server (likely for API or backend functionality). This setup is common when you want to decouple your frontend (Next.js) from your backend (Node.js).

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js:** Make sure you have a recent version of Node.js installed. You can download it from [nodejs.org](nodejs.org) or use a Node version manager like nvm (recommended).

```
version: 23.8.0
```

-   **npm or yarn:** You'll need a package manager. Node.js comes with npm, but yarn is also a popular alternative.
-   **Git (Optional):** If you're cloning this repository, you'll need Git.

## Installation

1. **Clone the repository (if applicable):**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Start the Next.js application:**

    ```bash
    cd magazine-frontend
    npm install
     npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    This will start the Next.js application on `http://localhost:3000`.

3. **Start the Node.js server:**

    ```bash
    cd magazine-backend
    npm install
    node server.js
    ```

    This will start the Node.js server on `http://localhost:5000`.

4. **Open your browser:**

    Open your browser and navigate to `http://localhost:3000` to see the Next.js application.

5. **MongoDB URI:**

    Make sure to add your MongoDB URI in the `src/config/db.js` file in the `magazine-backend` directory.

# Regards

Asad Ali

# Special Thanks

Jaisha Sohail

```
    For any queries, feel free to reach out to me. Thanks!
```
