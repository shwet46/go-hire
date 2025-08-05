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

## 🐳 Docker Deployment

### Using Dockerfile

The project includes a production-ready Dockerfile with multi-stage build:

1. **Build the Docker image**
   ```bash
   docker build -t go-hire .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env.local go-hire
   ```

### Docker Compose 

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
```

Run with:
```bash
docker-compose up --build
```


