import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800">
      <h1 className="text-4xl font-bold mb-4">Access Denied!</h1>
      <p className="text-lg mb-6">You do not have the necessary permissions to view this page.</p>
      <Link href="/" className="text-blue-600 hover:underline text-lg">
        Go to Home Page
      </Link>
    </div>
  );
}
