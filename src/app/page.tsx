import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CompanyLogoTabs from '@/components/CompanyLogoTabs';

export default function Home() {
  return (
    <>
      <main className="min-h-screen antialiased">
        <Hero />
        <CompanyLogoTabs />
        <Footer />
      </main>
    </>
  );
}
