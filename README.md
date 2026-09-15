# 🍴 Feasto — Discover. Order. Enjoy.

> **A modern, production-style 3-tier food discovery and ordering platform built with React, Node.js, Express, PostgreSQL, and Prisma.**

Feasto is a full-stack food discovery and ordering application designed to provide a premium, modern experience for discovering restaurants, browsing menus, placing orders, tracking deliveries, and managing accounts.

The project is designed with a **production-oriented 3-tier architecture** and can be integrated with modern **DevOps and DevSecOps tooling** including Docker, Jenkins, SonarQube, Trivy, OWASP ZAP, Nginx, AWS EC2, PostgreSQL, and HTTPS/Certbot.

---

## ✨ Features

### 👤 Customer Experience

* 🔐 User registration and authentication
* 📍 Location-based restaurant discovery
* 🔎 Restaurant, dish, and cuisine search
* 🍕 Food category browsing
* 🏪 Restaurant discovery
* 📋 Restaurant detail pages
* 🍔 Interactive food menus
* 🛒 Shopping cart
* 💳 Checkout
* 📦 Order placement
* 🚴 Order tracking
* ⭐ Restaurant and food reviews
* ❤️ Favorite restaurants
* 🎁 Offers and discounts
* 👤 Customer dashboard
* 📱 Responsive mobile experience

The application includes dedicated experiences for authentication, search, restaurants, carts, checkout, order tracking, offers, and customer dashboards.

---

## 🏪 Restaurant Owner Portal

Restaurant owners can manage their restaurant operations through a dedicated dashboard.

### Capabilities

* Manage restaurant information
* Add menu items
* Edit menu items
* Delete menu items
* Manage food prices
* View incoming orders
* Accept/reject orders
* Update order status
* Monitor revenue
* View analytics
* Track popular dishes
* Monitor pending orders

### Dashboard Metrics

* Today's orders
* Revenue
* Average rating
* Popular dishes
* Pending orders

---

## 🛡️ Admin Dashboard

A dedicated administration interface provides platform-level management and analytics.

### Dashboard

* Total users
* Total restaurants
* Total orders
* Revenue
* Active orders
* Today's orders

### Management

* Users
* Restaurants
* Menu items
* Orders
* Payments
* Offers
* Reviews
* Analytics

### Analytics

* Revenue analytics
* Order analytics
* User analytics
* Popular cuisines

---

# 🏗️ System Architecture

Feasto follows a logical **3-tier architecture**:

```text
                    ┌─────────────────────┐
                    │       Users         │
                    │ Desktop / Mobile   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Nginx / Reverse    │
                    │       Proxy         │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
      ┌─────────────────┐          ┌─────────────────┐
      │ React Frontend  │          │ Node.js Backend │
      │ TypeScript      │◄────────►│ Express.js      │
      │ Tailwind CSS    │   REST   │ TypeScript      │
      └─────────────────┘    API   └────────┬────────┘
                                            │
                                            ▼
                                  ┌──────────────────┐
                                  │   PostgreSQL     │
                                  │   Prisma ORM     │
                                  └──────────────────┘
```

The frontend, backend, and database are logically separated according to the project's architecture requirements.

---

# 🧰 Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Responsive UI
* Reusable component architecture

## Backend

* Node.js
* Express.js
* TypeScript
* REST API

## Database

* PostgreSQL
* Prisma ORM

## Infrastructure

* Docker
* Docker Compose
* Nginx
* AWS EC2
* HTTPS / Certbot

## DevOps & DevSecOps

Designed for integration with:

* Jenkins
* SonarQube
* Trivy
* OWASP Dependency-Check
* OWASP ZAP
* Docker
* Nginx
* PostgreSQL
* AWS EC2
* Certbot

---

# 📁 Project Structure

```text
feasto/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   └── ...
│
├── database/
│   ├── prisma/
│   ├── migrations/
│   └── seed/
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
├── .env.example
├── Dockerfile
└── README.md
```

The intended production structure separates `frontend`, `backend`, `database`, and `nginx` components.

---

# 🗄️ Database Design

Feasto uses **PostgreSQL with Prisma ORM**.

Core entities include:

```text
Users
Restaurants
RestaurantOwners
Categories
MenuItems
Orders
OrderItems
Payments
Addresses
Reviews
Favorites
Offers
Cart
Notifications
DeliveryPartners
```

The database design uses:

* Foreign keys
* Relationships
* Indexes
* Constraints
* Timestamps
* Prisma ORM

---

# 🔌 REST API

The backend follows a versioned REST API structure.

## Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
```

## Restaurants

```http
GET /api/v1/restaurants
GET /api/v1/restaurants/:id
```

## Menu

```http
GET /api/v1/restaurants/:id/menu
```

## Orders

```http
GET  /api/v1/orders
POST /api/v1/orders
GET  /api/v1/orders/:id
```

## Cart

```http
GET /api/v1/cart
```

## Reviews

```http
GET  /api/v1/reviews
POST /api/v1/reviews
```

## Offers

```http
GET /api/v1/offers
```

## Users

```http
GET /api/v1/users
```

## Admin

```http
/api/v1/admin/*
```

## Health Check

```http
GET /api/v1/health
```

The API specification includes authentication, restaurants, menus, orders, carts, reviews, offers, users, admin functionality, and health checks.

---

# 🔐 Security

Security is treated as an important part of the application architecture.

The backend is designed to implement:

* Authentication
* Authorization
* Request validation
* Pagination
* Filtering
* Sorting
* Centralized error handling
* Rate limiting
* Security headers
* CORS configuration

Sensitive configuration must be supplied through environment variables.

### Never commit:

```text
Database passwords
JWT secrets
API keys
Payment credentials
.env
Private SSH keys
```

Use the provided environment template:

```bash
cp .env.example .env
```

---

# 🎨 UI / UX

Feasto is designed to feel like a premium food-tech product rather than a generic template.

### Design Principles

* Modern rounded cards
* Soft shadows
* Smooth hover effects
* Micro-interactions
* Carefully used gradients
* Food imagery
* Glass effects where appropriate
* Sticky navigation
* Animated buttons
* Skeleton loading
* Toast notifications
* Empty states
* Error states
* Responsive layouts

Animations are intentionally kept subtle so that usability and performance remain the priority.

---

# 📱 Responsive Design

Feasto is designed for:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

Mobile-specific functionality includes:

* Bottom navigation
* Sticky cart
* Swipeable categories
* Responsive restaurant cards
* Mobile-friendly checkout

---

# ♿ Accessibility

The application follows accessibility-focused UI practices:

* Semantic HTML
* Keyboard navigation
* Accessible forms
* Proper form labels
* ARIA attributes where required
* Good color contrast
* Visible focus states

---

# 🐳 Running with Docker

Build and start the application:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

---

# 💻 Local Development

## Prerequisites

Make sure you have:

* Node.js
* npm
* PostgreSQL
* Git

Clone the repository:

```bash
git clone <your-repository-url>
cd <repository-name>
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The original project setup also supports local development through Node.js/npm.

---

# ⚙️ Environment Variables

Example configuration:

```env
NODE_ENV=development

PORT=4000

DATABASE_URL=postgresql://user:password@localhost:5432/feasto

JWT_SECRET=your-super-secret-key

CORS_ORIGIN=http://localhost:3000

API_URL=http://localhost:4000
```

> ⚠️ Do not commit real credentials to GitHub.

---

# 🌱 Demo Data

The application is designed to include realistic fictional data so that the platform feels populated immediately after launch.

Target demo dataset:

* 20+ restaurants
* 100+ menu items
* Multiple food categories
* Multiple users
* Sample orders
* Reviews
* Offers
* Favorites

All restaurant and food data are fictional demo content.

---

# 🧪 Testing Checklist

Before considering the application production-ready, verify:

```text
☑ Registration
☑ Login
☑ Restaurant browsing
☑ Search
☑ Filtering
☑ Restaurant details
☑ Menu browsing
☑ Cart
☑ Checkout
☑ Order creation
☑ Order tracking
☑ Reviews
☑ Favorites
☑ Admin dashboard
☑ Restaurant owner dashboard
☑ Responsive mobile UI
```

The project specification explicitly calls for end-to-end verification of these core workflows.

---

# 🚀 DevOps / DevSecOps Roadmap

Feasto is designed to evolve into a complete CI/CD and DevSecOps project.

### Planned Pipeline

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Jenkins CI/CD
    │
    ├── Build
    │
    ├── Unit Tests
    │
    ├── SonarQube
    │
    ├── OWASP Dependency-Check
    │
    ├── Trivy
    │
    ├── Docker Build
    │
    ├── OWASP ZAP
    │
    ▼
Docker Registry
    │
    ▼
AWS EC2
    │
    ▼
Nginx
    │
    ▼
HTTPS / Certbot
    │
    ▼
Feasto
```

This makes the project suitable for demonstrating **Cloud, DevOps, CI/CD, containerization, security scanning, and deployment automation**.

---

# ☁️ Production Deployment Architecture

A production deployment can follow this structure:

```text
                         Internet
                            │
                            ▼
                     ┌─────────────┐
                     │   HTTPS     │
                     │  Certbot    │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │    Nginx    │
                     │ Reverse     │
                     │ Proxy       │
                     └──────┬──────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
      ┌─────────────┐               ┌─────────────┐
      │  Frontend   │               │   Backend   │
      │   React     │               │ Node/Express│
      └─────────────┘               └──────┬──────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │ PostgreSQL  │
                                    │ + Prisma    │
                                    └─────────────┘
```

---

# 📊 Project Goals

Feasto is built with the goal of demonstrating a complete software delivery lifecycle:

```text
Development
     ↓
Version Control
     ↓
CI/CD
     ↓
Testing
     ↓
Code Quality
     ↓
Security Scanning
     ↓
Containerization
     ↓
Deployment
     ↓
Monitoring
     ↓
Continuous Improvement
```

---

# 🎯 Portfolio Highlights

This project demonstrates practical experience with:

* Full-stack application architecture
* React development
* TypeScript
* REST API development
* PostgreSQL
* Prisma ORM
* Authentication & authorization
* Docker
* Nginx
* AWS deployment
* CI/CD
* Jenkins
* SonarQube
* Container security
* Dependency security
* OWASP ZAP
* Infrastructure-oriented deployment
* Responsive UI/UX

---

# 📌 Project Status

🚧 **Active Development**

The application is being developed as a production-style portfolio project with a focus on **full-stack engineering, cloud deployment, DevOps, and DevSecOps practices**.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is intended for educational, portfolio, and development purposes.

Add your preferred license here, for example:

```text
MIT License
```

---

# 👨‍💻 Author

**Navnit Rathore**

DevOps Engineer | Cloud | DevSecOps

Interested in:

```text
AWS
Docker
Kubernetes
Terraform
Jenkins
CI/CD
DevSecOps
Cloud Security
```

---

## ⭐ If you like this project

Give the repository a ⭐ and feel free to explore the code, architecture, and deployment workflow.

---

> **Feasto — Discover. Order. Enjoy. 🍴**
