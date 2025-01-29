# SSO Auth

Fastify SSO Auth is a **Single Sign-On (SSO) authentication system** designed to provide seamless authentication across multiple applications. It is built with **Fastify, Next.js, PostgreSQL, and Prisma**, and uses **Turborepo** for managing a monorepo structure.

![Authentication Flow](images/AUTH-SSO.png)

## 🚀 Features

- **SSO Authentication** using JWT and cookies.
- **Fast and lightweight** authentication backend with Fastify.
- **Protected routes** with authentication middleware.
- **Full-stack monorepo** managed with Turborepo.
- **Seamless login persistence** across multiple frontends.
- **PostgreSQL database** managed with Prisma.
- **CORS and security** configured for cross-origin authentication.

---

## 🛠 Tech Stack

- **Backend:** Fastify, Fastify JWT, Prisma, PostgreSQL
- **Frontend:** Next.js (for multiple frontends)
- **Monorepo Management:** Turborepo
- **Authentication:** JWT, Cookies, Fastify Auth

---

## 📂 Project Structure

This project follows a monorepo structure managed by **Turborepo**:

```
repo-root/
├── apps/
│   ├── auth-server/        # Fastify authentication backend
│   ├── server/             # Fastify backend for service 1
│   ├── server-second/      # Fastify backend for service 2
│   ├── web/                # First Next.js frontend
│   ├── web-second/         # Second Next.js frontend
│
├── packages/
│   ├── ui/            # Shared UI components
│   ├── config/        # Shared configuration (e.g., Tailwind, ESLint)
│
├── turbo.json         # Turborepo configuration
└── package.json       # Root package.json with workspace dependencies
```

## 🔐 Authentication Flow

1. **User logs in** → Backend issues a **JWT** stored in an **HTTP-only cookie**.
2. **Frontend apps send requests** with the cookie for authentication.
3. **Protected routes** validate the JWT before granting access.
4. **Logout** clears the authentication token.
5. **If logged in on one frontend**, another frontend recognizes the authentication status automatically.

### 🚀 Happy Coding!
