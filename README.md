# Furniture Store — Backend

A backend application for a modern furniture e-commerce platform built with Node.js, Express, TypeScript, and MongoDB. The application provides APIs for managing customers, products, orders, payments, reviews, and other e-commerce operations.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Architecture:** MVC Pattern

## Project Structure

```text
FURNITURE-STORE/
├── src/
│   ├── controllers/
│   │   ├── customer.controller.ts
│   │   ├── product.controller.ts
│   │   ├── category.controller.ts
│   │   ├── order.controller.ts
│   │   ├── payment.controller.ts
│   │   └── review.controller.ts
│   ├── services/
│   │   ├── customer.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   └── payment.service.ts
│   ├── models/
│   │   ├── Customer.model.ts
│   │   ├── Product.model.ts
│   │   ├── Category.model.ts
│   │   ├── Brand.model.ts
│   │   ├── Order.model.ts
│   │   ├── OrderItem.model.ts
│   │   └── Review.model.ts
│   ├── routes/
│   │   ├── customer.route.ts
│   │   ├── product.route.ts
│   │   ├── order.route.ts
│   │   └── review.route.ts
│   ├── middleware/
│   ├── libs/
│   ├── app.ts
│   └── server.ts
├── uploads/
├── .env
├── package.json
├── package-lock.json
└── tsconfig.json
```

*The structure above is a suggested organization and should be adjusted to match the actual project.*

## Architecture

- **Controllers** — Handle incoming HTTP requests, validate input, and return appropriate responses.
- **Services** — Implement business logic and database operations.
- **Models / Schemas** — Define MongoDB document structures using Mongoose.
- **Routes** — Organize API endpoints for different application modules.
- **Middleware** — Handle authentication, authorization, and request processing.
- **Libs** — Contain shared utilities and reusable configurations.
- **Uploads** — Store uploaded product images and other media files.

## Core Features

- **Customer Management** — Customer registration, authentication, and profile management.
- **Product Management** — Create, update, delete, and retrieve furniture products.
- **Category Management** — Organize products into different furniture categories.
- **Brand Management** — Manage furniture brands and their associated products.
- **Order Management** — Process customer orders and track order statuses.
- **Payment Management** — Manage payment records and transaction statuses.
- **Review System** — Allow customers to rate and review products.
- **Product Interactions** — Track product views, likes, and customer engagement.
- **Session Management** — Manage customer authentication sessions.

## Database Structure

The application uses MongoDB with Mongoose to manage the following collections:

| Collection | Description |
|---|---|
| Customers | Customer accounts and profiles |
| Products | Furniture product information |
| Categories | Product categories |
| Brands | Furniture brands |
| Orders | Customer order records |
| OrderItems | Individual products within orders |
| Reviews | Product ratings and feedback |
| Payments | Payment records |
| Views | Product viewing activity |
| Likes | Customer likes |
| Follows | Customer follow relationships |
| Sessions | Authentication sessions |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jamolkhon06/furnova.git
cd furniture-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

*Make sure the variable names match your application's configuration.*

### 4. Run the application

Check `package.json` for the available scripts.

```bash
npm run dev
```

Use the appropriate development or production script configured in your project.

## Development

The project uses TypeScript for type safety and follows a modular MVC architecture. Separating controllers, services, models, and routes helps maintain clean code, scalability, and easier application maintenance.

## Security

- Keep `.env` and database credentials private.
- Never commit secrets or production credentials to GitHub.
- Use password hashing for customer authentication.
- Implement authentication and authorization middleware.
- Validate incoming requests before database operations.
- Configure `.gitignore` to exclude sensitive files and unnecessary dependencies.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

You are free to use, modify, distribute, and contribute to this project under the terms of the MIT License.
