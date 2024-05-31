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

1. Build and start the services:

   ```bash
   docker-compose up --build

## Running PORTs
The services should now be running and accessible on the following ports:
1. Product-service: http://localhost:4001
2. User-service: http://localhost:4000

# NOTE:  POSTMAN COOLECTION is also add on the root of Project
