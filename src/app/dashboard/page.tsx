import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

interface UserSession {
  role?: string;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Redirect to role-specific dashboard in (dashboards) route group
  const userRole = (session.user as UserSession).role;
  
  if (userRole === 'student') {
    redirect("/student");
  } else if (userRole === 'recruiter') {
    redirect("/recruiter");
  } else {
    redirect("/admin");
  }
}
