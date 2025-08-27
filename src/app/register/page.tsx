"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ChevronDown, AlertCircle, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateReferralCode,
} from "@/utils/validation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (dropdownTriggerRef.current) {
      setDropdownWidth(dropdownTriggerRef.current.offsetWidth);
    }
  }, [role]);

  // --- Field handlers ---
  const handleFieldChange = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "name":
        setName(value);
        error = validateName(value);
        break;
      case "email":
        setEmail(value);
        error = validateEmail(value);
        break;
      case "password":
        setPassword(value);
        error = validatePassword(value);
        break;
      case "referralCode":
        setReferralCode(value);
        error = validateReferralCode(value);
        break;
      case "role":
        setRole(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    return (
      !validateName(name) &&
      !validateEmail(email) &&
      !validatePassword(password) &&
      !validateReferralCode(referralCode)
    );
  };

  // --- Submit ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, referralCode: true });

    if (!isFormValid()) return;

    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, referralCode }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const error = await res.json();
      alert(error.error || "Registration failed");
    }
    setLoading(false);
  };

  // --- Styling helpers ---
  const getInputClassName = (field: string) => {
    const hasError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field];

    return `w-full bg-zinc-900/70 border rounded-lg px-4 py-3 placeholder-zinc-500 focus:outline-none transition
      ${hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
        : isValid
        ? "border-green-500 focus:ring-2 focus:ring-green-500/40"
        : "border-zinc-700 focus:ring-2 focus:ring-violet-500/40"}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-6 py-20">
      {/* No gradients, just a solid dark background */}

      <div className="relative z-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-10 overflow-hidden">
        <h1 className="text-4xl font-extrabold text-center text-zinc-100 mb-10">
          Create Your GoHire Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name & Email */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={getInputClassName("name")}
                />
                {touched.name && !errors.name && name && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {touched.name && errors.name && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={getInputClassName("email")}
                />
                {touched.email && !errors.email && email && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {touched.email && errors.email && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password & Role */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => handleFieldChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={getInputClassName("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {touched.password && !errors.password && password && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={22} />
                )}
                {touched.password && errors.password && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={22} />
                )}
              </div>
              {touched.password && errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">I am a</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    id="role-dropdown-trigger"
                    ref={dropdownTriggerRef}
                    className="w-full flex items-center justify-between bg-gradient-to-r from-violet-950/70 to-indigo-950/60 border border-violet-700 rounded-lg px-4 py-3 pr-10 text-white font-medium shadow-inner focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40 transition"
                  >
                    {role === "student" ? "Student" : "Recruiter"}
                    <ChevronDown className="ml-2 text-violet-400" size={22} style={{ marginRight: "-0.5rem" }} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-0 p-0"
                  style={{ width: dropdownWidth ? `${dropdownWidth}px` : undefined }}
                >
                  <DropdownMenuItem
                    onSelect={() => handleFieldChange("role", "student")}
                    className={role === "student" ? "bg-violet-900/60 text-white" : ""}
                  >
                    Student
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleFieldChange("role", "recruiter")}
                    className={role === "recruiter" ? "bg-violet-900/60 text-white" : ""}
                  >
                    Recruiter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Referral */}
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Referral Code (Optional)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="ABC123"
                value={referralCode}
                onChange={(e) => handleFieldChange("referralCode", e.target.value)}
                onBlur={() => handleBlur("referralCode")}
                className={getInputClassName("referralCode")}
              />
              {touched.referralCode && !errors.referralCode && referralCode && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={22} />
              )}
              {touched.referralCode && errors.referralCode && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={22} />
              )}
            </div>
            {touched.referralCode && errors.referralCode && (
              <p className="text-red-400 text-xs mt-1">{errors.referralCode}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-200 shadow-lg shadow-violet-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}