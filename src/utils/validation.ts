export const validateName = (name: string): string => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 50) return "Name must be less than 50 characters";
  if (!/^[a-zA-Z\s]+$/.test(name.trim()))
    return "Name can only contain letters and spaces";
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "Must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password)) return "Must contain at least one number";
  if (!/(?=.*[@$!%*?&])/.test(password))
    return "Must contain at least one special character (@$!%*?&)";
  return "";
};

export const validateReferralCode = (code: string): string => {
  if (code && code.length > 0) {
    if (code.length < 3) return "Referral code must be at least 3 characters";
    if (code.length > 20) return "Referral code must be less than 20 characters";
    if (!/^[a-zA-Z0-9]+$/.test(code))
      return "Referral code can only contain letters and numbers";
  }
  return "";
};