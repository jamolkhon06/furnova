# Burak — Backend

A TypeScript-based backend application built with Node.js, Express, and MongoDB. The project follows a modular structure with separate controllers, services, models, and routes for managing products, members, and restaurant-related operations.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Architecture:** MVC Pattern

## Project Structure

```text
BURAK/
├── src/
│   ├── controllers/
│   │   ├── member.controller.ts
│   │   ├── product.controller.ts
│   │   └── restaurant.controller.ts
│   ├── libs/
│   ├── models/
│   │   ├── Member.service.ts
│   │   └── Product.service.ts
│   ├── public/
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   ├── schema/
│   │   ├── Member.model.ts
│   │   └── Product.model.ts
│   ├── views/
│   ├── app.ts
│   ├── router-admin.ts
│   ├── router.ts
│   ├── server.ts
│   └── train.ts
├── uploads/
├── .env
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Architecture

- **Controllers** — Handle incoming requests, process input, and return responses.
- **Services** — Contain business logic and database operations.
- **Schemas / Models** — Define the structure of MongoDB documents.
- **Routes** — Organize application and admin endpoints.
- **Views & Public** — Store server-rendered templates and static assets.
- **Uploads** — Store uploaded files.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jamolkhon06/burak
cd burak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the environment variables required by the application.

```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
```

*Adjust the variable names to match your application's configuration.*

### 4. Run the application

Check `package.json` for the available scripts.

```bash
npm run start:dev
```

Run the appropriate development or build script listed in the output.

## Development

The project uses TypeScript for type safety and separates request handling from business logic to improve maintainability.

## Security

- Keep `.env` and database credentials private.
- Never commit secrets or production credentials to GitHub.
- Configure `.gitignore` to exclude sensitive files and unnecessary dependencies.

## License

Specify a license before distributing or reusing this project.
