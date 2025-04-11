# Contact Form Demo

A modern contact form built with Laravel and React, featuring real-time validation and responsive design.

## Screenshot
![Contact Form Demo](src/laravel-app/public/images/final-result.png)

## Technologies Used

- **Frontend:**
  - React
  - Inertia.js
  - Tailwind CSS
  - ES6+

- **Backend:**
  - Laravel
  - PHP 8.3
  - MySQL 8.0

- **Development Environment:**
  - Docker
  - Docker Compose
  - PHP MyAdmin

## Prerequisites

- Docker Desktop
- Git
- IDE

## Installation

1. Clone the repository:
```bash
git clone https://github.com/emaddaem/test-php.git
cd test-php
```

2. Create environment files:
```bash
# Create Laravel .env
cp src/laravel-app/.env.example src/laravel-app/.env

# Create Docker .env
cp .env.example .env
```

3. Configure environment variables:
```properties
# .env
DB_DATABASE=testdb
DB_USERNAME=root
DB_PASSWORD=verysecurepassword
```

4. Start Docker containers:
```bash
docker compose up -d
```

5. Install dependencies:
```bash
# Install PHP dependencies
docker compose exec apache composer install

# Install Node.js dependencies
docker compose exec apache npm install

# Build assets
docker compose exec apache npm run build
```

6. Set up Laravel:
```bash
# Generate application key
docker compose exec apache php artisan key:generate

# Run migrations
docker compose exec apache php artisan migrate
```

## Usage

Access the application:
- Web application: http://localhost:8000
- PHP MyAdmin: http://localhost:8080
  - Username: root
  - Password: (as set in .env)

## Development

To work on the project:
```bash
docker compose exec apache npm run dev
```

## Docker Services

- **Apache + PHP**: `:8000` - Web server
- **MySQL**: `:3306` - Database
- **PHPMyAdmin**: `:8080` - Database management

## Project Structure

```
src/laravel-app/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   └── Contact/      # Contact form components
│   │   └── Pages/           # Inertia pages
│   └── css/
├── routes/
│   └── web.php              # Application routes
├── app/
│   ├── Http/
│   │   └── Controllers/     # Controllers
│   └── Models/              # Database models
└── database/
    └── migrations/          # Database migrations
```