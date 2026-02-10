# DEV@Deakin

A full-featured **frontend web application** built with **React** and **Firebase (BaaS)** as part of my university work at Deakin.

**Demo Link:** https://devs-at-deakin.netlify.app/

**NOTE:** *Stripe integration is for **demonstration purposes only** and some features (such as my **DEVBot**) have been disabled to avoid unnecessary costs.*

This project includes user authentication, protected routes, social-style posting, interactions (likes, comments, views), demo Stripe payment flow and a ChatGPT bot. It was designed and implemented end-to-end as a real application as my final project.

---

## Features

### Authentication & Access Control
- User sign up and sign in
- Anonymous authentication support
- Protected routes and auth-based layout gating
- Signed-in / signed-out guards for pages and actions

### The Wall 
- Public feed with a masonry layout of users posts
- Solution system (chosen answer is previewed on The Wall instead of requiring the post to be opened)
- Like & comment functionality
- View tracking for videos
- Ownership-based permissions (only authors can edit/delete their content)

### Payments (Demo)
- Stripe demo integration
- Client-side payment flow (test mode only)
- Used to explore real-world payment handling patterns

### Backend-as-a-Service
- Firebase Authentication
- Firestore database
- Structured subcollections for posts, likes, comments, and views
- Firestore rules enforcing ownership and access control

### Deployment
- Hosted on Netlify
- Environment variables used for sensitive configuration
- Serverless functions used where appropriate
- Production-ready build setup

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript**
- **TailwindCSS**
- **Firebase**
  - Authentication
  - Firestore
- **Stripe (demo/test mode)**
- **Netlify**
- **OpenAI (ChatGPT bot)**
---

## What I Learned

- Designing a real frontend architecture utilizing a BaaS
- Managing authentication state and protected routes
- Structuring Firestore collections and subcollections
- Writing Firestore security rules
- Handling client/server boundaries for sensitive logic
- Integrating third-party services (Firebase, Stripe)
- Deploying and managing a production-style frontend app
- Component libraries for React (TailwindCSS, React Bits)


