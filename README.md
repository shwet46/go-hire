## 🛠 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js with JWT
- **UI Components**: Radix UI, Framer Motion, ShadCN
- **Deployment**: Vercel (or Docker)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shwet46/go-hire.git
   cd go-hire
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Optional: For production
   NODE_ENV=development
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

   ***
