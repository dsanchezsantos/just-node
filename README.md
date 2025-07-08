# Itaú Back-end Challenge 🚀

This project is a self-imposed challenge to apply and solidify my understanding of back-end development with Node.js. The core of this challenge, originally proposed by Itaú and found on GitHub, was built from the ground up using **TypeScript** and the **native Node.js `http` module**, without relying on external frameworks like Express or Fastify.

The main goal was to focus on software architecture, design principles, and core Node.js capabilities. It was an enriching experience that enhanced my productivity in code maintenance and streamlined the implementation of scoped features.

## ✨ Features

-   **Transaction Management**: Create and register new financial transactions.
-   **History Deletion**: Clear the entire transaction history with a single API call.
-   **Financial Statistics**: Generate a summary of statistics (sum, average, count, etc.) for all registered transactions.

## 🏛️ Architectural Highlights & Key Implementations

This project was developed with a strong emphasis on clean code and robust architecture.

-   ✅ **SOLID Principles**: The entire application architecture and implementation were guided by the five SOLID principles, ensuring a scalable, maintainable, and testable codebase.
-   ✅ **Native Validation**: All incoming data is validated according to the challenge's requirements using only native JavaScript and TypeScript, without external validation libraries.
-   ✅ **Interaction Logging**: The API logs all significant interactions, providing a clear trail for debugging and monitoring purposes.
-   ✅ **High Performance**: The service is optimized for speed. In performance tests, it successfully processed and registered **10,000 transactions in just a few milliseconds**.

## 🛠️ Tech Stack

-   **[Node.js](https://nodejs.org/)** (using the native `http` module)
-   **[TypeScript](https://www.typescriptlang.org/)**

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/dsanchezsantos/just-node
    ```
2.  Navigate to the project directory
    ```sh
    cd just-node
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

-   To run the server in development mode (with auto-reload):
    ```sh
    npm run start:watch
    ```
-   To build and run the server in production mode:
    ```sh
    npm run dist
    npm run start:dist
    ```

## ⚙️ API Endpoints

Here are the available endpoints to interact with the API.

### Create a Transaction

Registers a new transaction.

-   **URL**: `/transacao`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
      "valor": 120.50,
      "dataHora": "2025-07-08T17:09:05.123Z"
    }
    ```

### Get Statistics

Returns a summary of all transactions.

-   **URL**: `/estatistica`
-   **Method**: `GET`
-   **Success Response**:
    ```json
    {
      "sum": 580.5,
      "avg": 145.12,
      "max": 300,
      "min": 20.5,
      "count": 4
    }
    ```

### Delete All Transactions

Clears the entire transaction history.

-   **URL**: `/transactions`
-   **Method**: `DELETE`

## 🔮 Future Plans

The journey continues! The next steps for this project are:
-   Refactor the entire application using **Fastify**.
-   Refactor it again using **Express**.
-   Write a detailed comparison of the pros and cons of each framework versus the native `http` module implementation.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
