# Feast Forward

Create a premium, production-quality 3-tier food discovery and ordering web application called Feasto.

The design should feel as polished, colorful, modern, and engaging as leading food platforms such as Zomato and Swiggy, but it must have its own original branding, UI, layouts, illustrations, and visual identity. Do not copy their exact design.

This is not a basic landing page. Build a complete responsive web application with a beautiful customer experience and a proper 3-tier architecture.

1. Technology Architecture

Use:

Frontend:

React

TypeScript

Tailwind CSS

Modern component architecture

Responsive design

Backend:

Node.js

Express.js

TypeScript

REST API

Database:

PostgreSQL

Prisma ORM

Architecture:

User
↓
Nginx / Reverse Proxy
↓
React Frontend
↓
Node.js REST API
↓
PostgreSQL

Keep frontend, backend, and database logically separated.

2. Brand Identity

Brand name:

Feasto

Tagline:

"Discover. Order. Enjoy."

Create a memorable modern food-tech brand.

Use a colorful visual system inspired by food:

Warm coral

Vibrant orange

Raspberry pink

Golden yellow

Fresh green

Deep purple

Clean white backgrounds

Dark charcoal text

Use gradients tastefully.

The website should feel:

Premium

Colorful

Energetic

Friendly

Modern

App-like

Trustworthy

Delicious

Avoid making every section overly colorful. Use colorful gradients and cards strategically with plenty of whitespace.

3. Homepage

Create an impressive homepage.

Hero section:

Large headline:

"Good food is always a good idea."

Supporting text:

"Discover the best restaurants, cafés, and hidden food gems around you."

Large location/search area:

📍 Your location

Search placeholder:

"Search for restaurants, cuisines, or dishes..."

Add:

Search button

Location selector

Search suggestions

Popular searches

Hero background should have an attractive food-themed visual treatment.

Use beautiful food imagery and floating food cards.

4. Main Navigation

Create a premium responsive navbar.

Logo:

🍴 FEASTO

Navigation:

Home

Restaurants

Explore

Offers

Orders

Right side:

Search

Location

Login

Profile

Cart

Desktop and mobile navigation must both be polished.

On mobile, use a beautiful bottom navigation:

Home | Explore | Orders | Profile

5. Food Categories

Create a colorful horizontal category section.

Categories:

🍕 Pizza
🍔 Burgers
🍜 Asian
🍛 Indian
🌮 Mexican
🍣 Sushi
🥗 Healthy
🍰 Desserts
☕ Café
🍗 Chicken

Each category should have:

Beautiful image/icon

Category name

Hover animation

Active state

Use rounded cards and subtle shadows.

6. Restaurant Discovery

Create:

"Popular near you"

Restaurant cards should include:

Restaurant image

Restaurant name

Cuisine

Rating

Delivery time

Price range

Distance

Veg/non-veg indicator

Offer badge

Favorite heart

Delivery badge

Example restaurants:

Spice Route

Burger District

Tokyo Bowl

The Green Fork

Pasta House

Curry Culture

Urban Tandoor

Brew & Bean

These are fictional demo restaurants.

Make the cards visually rich.

7. Restaurant Detail Page

Create a complete restaurant page.

Include:

Large restaurant cover image

Restaurant logo

Name

Rating

Reviews

Cuisine

Price range

Delivery time

Distance

Address

Opening hours

Favorite button

Share button

Tabs:

Overview
Menu
Reviews
Photos

Menu categories:

Recommended
Starters
Main Course
Breads
Rice
Beverages
Desserts

Each food item should have:

Image

Name

Description

Price

Vegetarian indicator

Rating

Add button

The Add button should have smooth animation.

8. Food Cart

Create a beautiful slide-out cart.

Show:

Restaurant

Food items

Quantity controls

Item price

Subtotal

Delivery fee

Taxes

Discount

Total

CTA:

"Proceed to Checkout"

Add an attractive checkout progress indicator.

9. Checkout

Create a premium checkout experience.

Sections:

Delivery Address

Home

Work

Other

Payment

Credit/Debit Card

UPI

Cash on Delivery

Wallet

Order Summary

Show:

Items

Subtotal

Delivery

Taxes

Discount

Total

Primary CTA:

"Place Order"

10. Order Tracking

Create a beautiful real-time-style order tracking page.

Timeline:

✓ Order Confirmed

✓ Restaurant Preparing

🚴 Out for Delivery

○ Delivered

Display:

Estimated delivery time

Delivery partner

Restaurant

Order number

Live map placeholder

Contact delivery partner

Use smooth progress animations.

11. Offers

Create a colorful offers page.

Cards such as:

50% OFF

"On your first order"

FREE DELIVERY

"On orders above ₹299"

₹100 OFF

"Weekend special"

Use large colorful promotional cards.

12. User Dashboard

Create a customer dashboard.

Show:

Profile

Recent orders

Favorite restaurants

Saved addresses

Payment methods

Offers

Account settings

13. Authentication

Create beautiful:

/login

/register

/forgot-password

Login options:

Email

Phone

Google-style social login UI

Use modern authentication forms with validation.

14. Search Experience

Create a powerful search interface.

Search:

Restaurants

Dishes

Cuisines

Categories

Include:

Recent searches

Popular searches

Search suggestions

Filters

Sort options

Filters:

Rating

Delivery time

Price

Cuisine

Vegetarian

Offers

15. Admin Dashboard

Create a separate admin interface.

Admin dashboard should include:

Total users

Total restaurants

Total orders

Revenue

Active orders

Today's orders

Charts:

Revenue

Orders

Users

Popular cuisines

Admin sections:

Users

Restaurants

Menu items

Orders

Payments

Offers

Reviews

Analytics

16. Restaurant Owner Dashboard

Create a restaurant-owner portal.

Restaurant owners can:

Manage restaurant

Add/edit/delete menu items

Manage prices

View orders

Accept/reject orders

Update order status

View revenue

View analytics

Dashboard metrics:

Today's orders

Revenue

Average rating

Popular dishes

Pending orders

17. Database Architecture

Design PostgreSQL schema for:

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

Use proper:

Relationships

Foreign keys

Indexes

Constraints

Timestamps

Use Prisma ORM.

18. Backend API

Create REST APIs.

Authentication:

/api/v1/auth/register
/api/v1/auth/login
/api/v1/auth/logout

Restaurants:

/api/v1/restaurants
/api/v1/restaurants/:id

Menu:

/api/v1/restaurants/:id/menu

Orders:

/api/v1/orders
/api/v1/orders/:id

Cart:

/api/v1/cart

Reviews:

/api/v1/reviews

Offers:

/api/v1/offers

Users:

/api/v1/users

Admin:

/api/v1/admin/*

Health:

/api/v1/health

Implement:

Authentication

Authorization

Validation

Pagination

Filtering

Sorting

Error handling

Rate limiting

Security headers

CORS

19. UI/UX Requirements

This is extremely important.

Make the website feel like a premium modern food-tech application.

Use:

Large rounded cards

Soft shadows

Smooth hover effects

Micro animations

Gradient backgrounds

Beautiful food imagery

Glass effects where appropriate

Sticky navigation

Animated buttons

Skeleton loading

Toast notifications

Empty states

Error states

Use animations carefully.

Do not over-animate the interface.

Prioritize performance and usability.

20. Responsive Design

The application must work perfectly on:

Desktop

Laptop

Tablet

Mobile

Mobile experience should feel like a native food-ordering app.

Use:

Bottom navigation

Sticky cart

Swipeable categories

Responsive cards

Mobile-friendly checkout

21. Accessibility

Implement:

Semantic HTML

Keyboard navigation

Accessible forms

Proper labels

ARIA where required

Good color contrast

Visible focus states

22. Production Architecture

Create:

frontend/
backend/
database/
nginx/

Include:

docker-compose.yml
.env.example
Dockerfiles
README.md

Use environment variables.

Never hardcode:

Database passwords

JWT secrets

API keys

Payment credentials

23. Demo Data

Populate the application with realistic fictional data.

Create:

20+ restaurants

100+ menu items

Multiple categories

Multiple users

Sample orders

Reviews

Offers

Favorites

Make the application look populated when first launched.

24. Important UI Details

Add a floating cart button.

Add notification animations.

Add favorite heart animations.

Add food image hover effects.

Add restaurant card hover effects.

Add smooth page transitions.

Add skeleton loaders.

Add beautiful confirmation dialogs.

Add toast notifications.

Create attractive loading screens.

Create a polished 404 page.

Create a polished error page.

25. Final Quality Requirement

Do NOT create a generic template.

The final application should feel like a real startup product that could be shown in a professional portfolio.

The visual quality should be comparable to modern food delivery platforms.

Use original branding and UI.

Do not copy Zomato's exact interface, branding, logo, colors, text, or assets.

Build the application so that it can later be connected to:

Jenkins

SonarQube

OWASP Dependency-Check

Trivy

OWASP ZAP

Docker

Nginx

PostgreSQL

AWS EC2

HTTPS/Certbot

Start by creating the complete frontend experience and reusable component system.

Then implement the backend API.

Then connect PostgreSQL through Prisma.

Finally verify that the entire 3-tier application works end-to-end.

Before considering the project complete, test:

Registration

Login

Restaurant browsing

Search

Filtering

Restaurant details

Menu

Cart

Checkout

Order creation

Order tracking

Reviews

Favorites

Admin dashboard

Restaurant owner dashboard

Responsive mobile UI

Fix all errors and broken states.

The final result should be a colorful, premium, production-style 3-tier food ordering platform named FEASTO.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e9408755-dce7-44ad-8b3e-a873f854c1f7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
