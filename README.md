# QRYPTIC

![Project Banner](https://img.shields.io/badge/Status-Development-indigo?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-zinc?style=for-the-badge)

> **The Architecture of Connection.** > Create dynamic, beautiful, and trackable QR codes that last forever. Engineered for the modern web.

---

## ⚡️ Overview

**Qryptic** is a next-generation QR code management platform built for speed and aesthetics. Unlike standard generators, Qryptic offers a persistent history, real-time synchronization, and deep customization options, all wrapped in a "frosted glass" UI powered by Next.js 14 and Supabase.

### 🌟 Key Features

* **🎨 Deep Customization:** Custom foreground and background color pickers with real-time preview.
* **💾 Persistent History:** Automatically saves every generated code to your personal cloud archive.
* **🔄 Real-time Sync:** "State Lifting" architecture ensures your history updates instantly across the UI.
* **📥 Multi-Format Export:** Download high-resolution **PNG** or vector **SVG** files.
* **🔐 Secure Authentication:** Robust Email/Password login flow with session persistence (Google OAuth ready).
* **📱 Responsive Design:** A "Mobile-First" interface that feels native on any device.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Backend & Auth:** [Supabase](https://supabase.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management:** React Hooks & Supabase Realtime

---

## 🚀 Getting Started

Follow these steps to run Qryptic locally on your machine.

### Prerequisites

* Node.js 18+
* npm or yarn
* A Supabase Project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/CaSh007s/qryptic.git
    cd qryptic
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🚧 Development Notes

### 📊 Analytics & Redirect Engine
The project includes a complete **Redirect Engine** located at `src/app/go/[id]/route.ts`. This feature intercepts scans to track usage counts before redirecting the user.

**Current Status: DISABLED (Local Mode)**
Because the app is running on `localhost`, generating "Short Links" (e.g., `http://localhost:3000/go/xyz`) would result in QR codes that cannot be scanned by mobile devices (as phones cannot reach your laptop's localhost).

* **Current Behavior:** The app generates "Direct Links" (the actual URL you type).
* **To Enable Analytics:**
    1.  Deploy the application to Vercel.
    2.  Uncomment the "Short Link" logic in `src/components/qr-generator.tsx`.

### 🔐 Authentication
* **Google OAuth:** The UI includes a Google Login button which is currently "Frozen" (marked as SOON) to prioritize a stable Email/Password flow during the portfolio demo phase.
* **Middleware:** Protected routes (`/dashboard`) are guarded by `middleware.ts`, which verifies Supabase sessions server-side.

---

## 📂 Project Structure

```bash
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── auth/            # Auth callback routes
│   │   ├── dashboard/       # Protected user dashboard
│   │   ├── go/              # Redirect engine (Dynamic Routes)
│   │   ├── login/           # Login page
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   │   ├── qr-generator.tsx # Main logic engine
│   │   ├── qr-card.tsx      # History item component
│   │   └── ...
│   └── utils/               # Supabase client helpers
├── public/                  # Static assets
└── supabase/                # Migrations and types
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  **Fork the Project**
2.  **Create your Feature Branch**
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes**
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the Branch**
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **Open a Pull Request**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
