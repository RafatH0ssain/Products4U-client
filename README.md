# Product4U - Client Side

## Overview

Product4U is a platform where users can add, update, and delete product queries, view recommendations, and interact with other users’ queries and recommendations. The goal of this project is to allow users to explore and recommend alternative products while keeping a structured and user-friendly interface. This project has been developed with modern web technologies and ensures a responsive and seamless experience across all devices.

This repository contains the **client-side** code for the Product4U platform.

**Server-side Repository**: [Product4U - Server Side](https://github.com/RafatH0ssain/Products4U-server)

## Features

- **User Authentication**
  - Email/Password-based login and registration
  - Firebase Authentication
  
- **Product Queries**
  - Users can add, update, and delete product queries
  - Users can view all product queries in descending order, based on timestamps

- **Product Recommendations**
  - Users can add recommendations for a product query, with an option to include a recommendation reason and product details (name, image)
  - Recommendations are displayed below the query details and can be deleted by the recommending user
  - Recommendation count is incremented when a recommendation is added and decremented upon deletion
  
- **User Interaction**
  - Users can view and manage their own queries and recommendations in private routes
  - Conditional rendering of navigation items based on login status
  - Beautiful, user-friendly layout with dynamic routing and smooth transitions
  
- **404 Error Page**
  - A custom error page for invalid routes

## Live Demo

[Live Website](#) *(https://products-4-u.web.app/)*

## Technologies Used

- **React.js** for building the user interface
- **React Router** for managing routing
- **Firebase Authentication** for user authentication (Google and Email/Password)
- **MongoDB** for storing user queries and recommendations
- **CSS (Tailwind CSS)** for styling, ensuring responsiveness and a modern design
- **DaisyUI** for basic component jsx code
