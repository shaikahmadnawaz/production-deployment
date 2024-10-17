# Node.js and MongoDB Docker Compose Setup

This repository contains a setup for running a Node.js backend service and a MongoDB database using Docker Compose. It defines two services, `mongoserver` for the MongoDB instance and `nodejs-backend` for the Node.js application, each running in its own container.

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed on your machine.

## Project Structure

```bash
.
├── docker-compose.yaml    # Docker Compose file to orchestrate services
├── .env                  # Environment variables for the Node.js backend (not included in repo, create this file)
└── README.md             # Project documentation (this file)
```

## Docker Services

This setup uses Docker Compose to define and manage the following services:

### 1. **MongoDB (`mongoserver`)**

- Runs the official MongoDB image.
- Sets root username and password using environment variables.
- Persists MongoDB data to a volume on the host machine (`~/mongo/data`).
- Connected to a custom Docker network for communication with the Node.js service.

### 2. **Node.js Backend (`nodejs-backend`)**

- Runs a custom Node.js backend image (`shaikahmadnawaz/nodejs-backend:v1`).
- Maps port `5000` of the container to port `5000` on the host, making the application accessible via `http://localhost:5000`.
- Loads environment variables from an `.env` file.
- Depends on the MongoDB service to ensure MongoDB starts first.

## Setup Instructions

Follow these steps to get the Node.js and MongoDB services up and running:

### 1. Clone the Repository

```bash
git clone [https://github.com/shaikahmadnawaz/production-deployment.git](https://github.com/shaikahmadnawaz/production-deployment.git)
cd production-deployment/nodejs-mongodb
```

### 2. Create an `.env` File

In the root directory, create a file named `.env` to store environment variables for the Node.js application.

Example `.env` file:

```bash
# Example environment variables for Node.js backend
MONGO_URL=mongodb://root:root@mongoserver:27017/mydatabase?authSource=admin
PORT=5000
JWT_SECRET=your-secret-key
```

- `MONGO_URL`: Connection string for MongoDB.
- `PORT`: Port where your Node.js app will run.
- `JWT_SECRET`: Example secret for JWT authentication (customize based on your app).

### 3. Run the Services with Docker Compose

To start both the MongoDB and Node.js services, run the following command:

```bash
docker-compose up -d
```

- The `-d` flag runs the services in detached mode, allowing them to run in the background.

### 4. Access the Node.js Application

Once the services are up, you can access the Node.js backend at:

```bash
http://localhost:5000
```

Make sure the backend is listening on port `5000`, as defined in the `docker-compose.yaml` file.

### 5. Stopping the Services

To stop the running services, use:

```bash
docker-compose down
```

This will stop and remove the containers but will keep the MongoDB data in the local volume (`~/mongo/data`).

## Docker Compose Breakdown

### MongoDB (`mongoserver`)

- **Image**: Official MongoDB Docker image.
- **Environment Variables**: `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` are used to set the root user's credentials.
- **Volumes**: Data is stored in a persistent volume on the host machine (`~/mongo/data:/data/db`).
- **Network**: Uses a custom bridge network (`nodejs-mongodb-network`) for communication with the Node.js backend.

### Node.js Backend (`nodejs-backend`)

- **Image**: Custom Node.js backend image (`shaikahmadnawaz/nodejs-backend:v1`).
- **Ports**: Exposes port `5000` for the backend service.
- **Env File**: Loads environment variables from a `.env` file.
- **depends_on**: Ensures the MongoDB service starts before the Node.js backend.

## Networks

The Docker Compose file creates a custom network (`nodejs-mongodb-network`) using the bridge driver, which allows containers to communicate with each other securely.

## Additional Commands

- To view the logs of the running containers:

  ```bash
  docker-compose logs -f
  ```

- To restart the services after making changes:

  ```bash
  docker-compose restart
  ```
