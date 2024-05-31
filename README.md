# Microservices Project

This project consists of two microservices: `product-service` and `user-service`. These microservices are built using NestJS and communicate with each other using event-driven architecture. The project is containerized using Docker and orchestrated with Docker Compose.



## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Bilal-Gujjar/MicroServices-User-Product.git
   cd MicroServices-User-Product

## Running the Services

You can run the services using Docker Compose. This will build and start both microservices along with their dependencies (e.g., databases).

2. Build and start the services:

   ```bash
   docker-compose up --build
   
### You can also run the services independently by setting up the .env

2.  Move to service directory :

    ```bash
    cd product-service
    cd user-service

### Setup the .env on the root of service:
    
1. For the product-service

    ```bash
    MONGO_URL=mongodb://localhost:27017/products
    USER_SERVICE_HOST=user-service
    USER_SERVICE_PORT=3000
    MICROSERVICE_PORT=3001
    
2. For user-service

    ```bash 
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=example
    POSTGRES_DB=users
    PRODUCT_SERVICE_HOST=product-service
    PRODUCT_SERVICE_PORT=3001
    MICROSERVICE_PORT=3000

## Run the Project 
1. Run this on the root of service 
    ```bash
    npm run start:dev

    

## IN THE CASE OF DOCKER COMPOSE UP  THERE IS NOT NEED TO RUN THE SEPARATELY SERVICES




## Running PORTs
The services should now be running and accessible on the following ports:
1. Product-service: http://localhost:4001
2. User-service: http://localhost:4000

# NOTE:  POSTMAN COOLECTION is also add on the root of Project
