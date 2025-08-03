"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Mail, Lock } from "lucide-react";
import clsx from "clsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  // Validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return "";
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    const error =
      field === "email" ? validateEmail(value) : validatePassword(value);

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid = (): boolean =>
    !validateEmail(email) && !validatePassword(password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });

    if (!isFormValid()) return;

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      setErrors({ email: "", password: "Invalid email or password" });
    }
    setLoading(false);
  };

  const inputClass = (field: string) =>
    clsx(
      "w-full px-10 py-3 bg-zinc-900/50 text-white rounded-lg placeholder-zinc-500 border focus:outline-none transition-all duration-200",
      {
        "border-red-500 focus:ring-2 focus:ring-red-500/30":
          touched[field] && errors[field],
        "border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30":
          !errors[field],
      }
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-indigo-950 relative overflow-hidden">
      {/* Abstract Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-700/20 blur-3xl rounded-full z-0 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full z-0 animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl border border-zinc-700/50 shadow-2xl rounded-3xl px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-500">
              Welcome Back
            </h1>
            <p className="text-zinc-400 mt-2">Log in to your GoHire account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  className={inputClass("password")}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                />
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-white font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-800/30"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-violet-400 hover:text-violet-300 font-medium transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
