"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import {
  validateEmail,
  validatePassword,
} from "@/utils/validation";

interface ExtendedUser {
  role?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFieldErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Get the updated session to check user role
        const session = await getSession();
        const userRole = (session?.user as ExtendedUser)?.role;

        if (userRole === "student") {
          router.push("/student");
        } else if (userRole === "recruiter") {
          router.push("/recruiter");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (loginError) {
      console.error("Login error:", loginError);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      {/* No gradients, just a solid dark background */}

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-800/40 rounded-lg flex items-center text-red-400 text-sm">
              <AlertCircle size={16} className="mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: validateEmail(e.target.value),
                    }));
                  }
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200
                  ${touched.email && fieldErrors.email
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-zinc-700"
                  }`}
                placeholder="Enter your email"
                required
              />
              {touched.email && fieldErrors.email && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle size={16} className="mr-1" />
                  {fieldErrors.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (touched.password) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        password: validatePassword(e.target.value),
                      }));
                    }
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  className={`w-full px-4 py-3 pr-12 bg-zinc-800 border rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200
                    ${touched.password && fieldErrors.password
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-zinc-700"
                    }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && fieldErrors.password && (
                <div className="flex items-center text-red-400 text-xs mt-1">
                  <AlertCircle size={16} className="mr-1" />
                  {fieldErrors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}