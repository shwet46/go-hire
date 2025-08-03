"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim()))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    if (!/(?=.*[@$!%*?&])/.test(password))
      return "Password must contain at least one special character (@$!%*?&)";
    return "";
  };

  const validateReferralCode = (code: string): string => {
    if (code && code.length > 0) {
      if (code.length < 3) return "Referral code must be at least 3 characters";
      if (code.length > 20) return "Referral code must be less than 20 characters";
      if (!/^[a-zA-Z0-9]+$/.test(code))
        return "Referral code can only contain letters and numbers";
    }
    return "";
  };

  // Handle field validation
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

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const isFormValid = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const referralError = validateReferralCode(referralCode);

    return !nameError && !emailError && !passwordError && !referralError;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      referralCode: true,
    });

    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const referralError = validateReferralCode(referralCode);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      referralCode: referralError,
    });

    if (!isFormValid()) {
      return;
    }

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

  const getInputClassName = (field: string) => {
    const hasError = touched[field] && errors[field];
    const isValid =
      touched[field] &&
      !errors[field] &&
      ((field === "name" && name) ||
        (field === "email" && email) ||
        (field === "password" && password) ||
        (field === "referralCode"));

    return `w-full bg-zinc-800/60 border rounded-lg px-4 py-3 placeholder-zinc-500 focus:outline-none transition ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
        : isValid
        ? "border-green-500 focus:ring-2 focus:ring-green-500/40"
        : "border-zinc-700 focus:ring-2 focus:ring-violet-500/40"
    }`;
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950 text-white overflow-hidden px-6 py-24 sm:px-10">
      {/* Abstract gradient blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/30 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-[-120px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] bg-purple-600/10 -translate-x-1/2 -translate-y-1/2 rotate-45 blur-3xl opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-12 text-center">
          Create Your GoHire Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">
                Full Name
              </label>
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

            <div>
              <label className="text-sm text-zinc-400 mb-1 block">
                Email Address
              </label>
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

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => handleFieldChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={getInputClassName("password")}
                />
                {touched.password && !errors.password && password && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {touched.password && errors.password && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                )}
              </div>
              {touched.password && errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
              {password && !errors.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-zinc-700 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          password.length >= 8 &&
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
                            ? "bg-green-500 w-full"
                            : password.length >= 6
                            ? "bg-yellow-500 w-2/3"
                            : "bg-red-500 w-1/3"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-zinc-400">
                      {password.length >= 8 &&
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
                        ? "Strong"
                        : password.length >= 6
                        ? "Medium"
                        : "Weak"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Styled Dropdown */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">I am a</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  className="appearance-none w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                >
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Referral */}
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">
              Referral Code (Optional)
            </label>
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
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
              )}
              {touched.referralCode && errors.referralCode && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              )}
            </div>
            {touched.referralCode && errors.referralCode && (
              <p className="text-red-400 text-xs mt-1">{errors.referralCode}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-200 shadow-lg shadow-violet-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}