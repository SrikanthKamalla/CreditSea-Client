# CreditSea — Client

Frontend client application for the CreditSea project.

Server: https://github.com/SrikanthKamalla/CreditSea-server

## Table of contents

- About
- Prerequisites
- Installation
- Available scripts
- Environment
- Project structure
- Contributing
- License

## About

This repository contains the client (frontend) for CreditSea. It provides the UI and communicates with the CreditSea API.

## Prerequisites

- Node.js (LTS)
- npm, yarn or pnpm
- Git

## Installation

1. Clone the repo:
   git clone <repository-url>
2. Change to the client folder:
   cd Client
3. Install dependencies:
   npm install
   (or `yarn` / `pnpm install`)

## Available scripts

Use your package manager to run these. Standard names — adapt if your project uses different scripts.

- Start development server:
  npm run dev
  or
  npm start

- Build production assets:
  npm run build

- Run tests:
  npm test

- Lint and format:
  npm run lint
  npm run format

## Environment

Create a file named .env in the Client directory and add required variables. Common examples (adjust to your stack):

- For Create React App:
  REACT_APP_API_URL=https://api.example.com
- For Vite:
  VITE_API_URL=https://api.example.com

Do not commit secrets to version control.

## Project structure (example)

- public/ — static assets
- src/ — source code
  - components/
  - pages/
  - services/ — API clients
  - hooks/
  - styles/
- tests/ — unit/integration tests
- package.json
- README.md

## Contributing

- Create an issue for feature requests or bugs.
- Branch from `main` using a descriptive name: `feature/xyz` or `fix/abc`.
- Open a pull request with description and testing notes.
- Follow existing code style and lint rules.
