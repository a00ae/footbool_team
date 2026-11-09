# ⚽ Football Match Tactics & Lineup Manager

An interactive and professional web application for managing football tactics, dragging and positioning players dynamically, configuring formation lines, and supporting multi-device interactions (touch and mouse). Prepared for seamless integration with an ASP.NET Core backend and SQL Server.

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started & Development](#-getting-started--development)
- [Best Practices](#-best-practices)
- [Roadmap](#-roadmap)

---

## 🎯 About the Project

This project provides a lightweight, performant, and reliable tool for football coaches and analysts to organize tactics and player positioning on the pitch. Key design goals include:

* **High Performance:** Smooth dragging without layout reflows, leveraging GPU acceleration (`transform: translate`).
* **Type Safety:** Full transition to **TypeScript** with strict data contracts (`interfaces` and `types`) to prevent runtime bugs during development.
* **Scalable Architecture:** Structured frontend state management ready for backend API integration (**C# / ASP.NET Core** & **SQL Server**).

---

## ✨ Key Features

* 🏃‍♂️ **Cross-Platform Drag & Drop:** Dual input support handling both Mouse and Touch events seamlessly across desktop, tablet, and mobile browsers.
* ⚽ **Dynamic Tactical Lines:** Grouping and managing players across specific squad lines (`attacks`, `middle`, etc.).
* 🛡️ **Dual-Team Architecture:** Structured data models supporting both home (`myTeam`) and opposition (`opponent`) dynamics.
* ➕ **Dynamic Player Injection:** Programmatic squad updates with clean DOM re-rendering to prevent duplicate elements or state leaks.
* 🎨 **Modern Iconography:** Integrated with **Remix Icon** for crisp, scalable sports UI elements.

---

## 💻 Tech Stack

### Frontend
* **HTML5 & CSS3:** Responsive pitch layout and card styling.
* **TypeScript:** Strong typing, module compilation (`ESNext`), and reliable DOM handling.
* **Remix Icon:** UI icon assets.

### Backend (*Planned Migration*)
* **C# / ASP.NET Core Web API:** RESTful service layer for tactics persistence.
* **SQL Server:** Relational database storage for teams, lineups, and match data.
* **Entity Framework Core:** Object-Relational Mapping (ORM).

---

## 📂 Project Structure

```
football-tactics-app/
│
├── index.html            # Main markup & canvas container
├── tsconfig.json         # TypeScript compiler configuration (ESNext modules)
├── .gitignore            # Git exclusion rules (build artifacts, node_modules)
├── package.json          # Project dependencies & package scripts
│
└── src/
    └── main.ts           # Primary application logic & state handling
```

---

## 🚀 Getting Started & Development

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/a00ae/footbool_team.git

# Navigate into project folder
cd football-tactics-app

# Install dependencies
npm install
```

### 2. TypeScript Compilation

Run the TypeScript compiler in watch mode to automatically generate compiled JavaScript output (`main.js`):

```bash
npx tsc --watch
```

### 3. Running the App

Launch `index.html` using a local web server (such as VS Code's **Live Server** at `http://127.0.0.1:5500`).

---

## 🛠️ Best Practices

* **Ignored Build Outputs:** Compiled JavaScript (`main.js`) is listed in `.gitignore` while tracked configuration files (`tsconfig.json` and `main.ts`) maintain source integrity.
* **GPU-Optimized Dragging:** Uses `transform: translate()` instead of altering `top`/`left` DOM properties.
* **Modular Logic:** Clear separation between event handlers (`makeDraggable`), rendering pipelines (`renderPlayers`), and state mutators (`addNewPlayer`).

---

## 🗺️ Roadmap

- [x] Migrate codebase to TypeScript and set up `tsconfig.json`.
- [x] Implement dual mouse/touch event listeners for drag-and-drop.
- [x] Configure production-grade `.gitignore` rules.
- [ ] Build **ASP.NET Core Web API** models and controller endpoints.
- [ ] Connect frontend to API endpoints for persistent storage in **SQL Server**.
- [ ] Add tactic export options (PDF/Image export).

---

Developed with ❤️ for Football Tactics Enthusiasts.
