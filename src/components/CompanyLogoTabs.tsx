'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  logo: string;
  category: string;
  website: string;
}

interface CompanyLogoTabsProps {
  companies?: Company[];
  activeCompanyId?: string;
  onCompanySelect?: (company: Company) => void;
  className?: string;
}

const CompanyLogoTabs: React.FC<CompanyLogoTabsProps> = ({
  companies: propCompanies,
  activeCompanyId,
  onCompanySelect,
  className = '',
}) => {
  // Updated companies data focused on startups and hiring platforms
  const defaultCompanies: Company[] = [
    {
      id: '1',
      name: 'Y Combinator',
      logo: 'https://logo.clearbit.com/ycombinator.com',
      category: 'Accelerator',
      website: 'ycombinator.com',
    },
    {
      id: '2',
      name: 'Stripe',
      logo: 'https://logo.clearbit.com/stripe.com',
      category: 'FinTech Startup',
      website: 'stripe.com',
    },
    {
      id: '3',
      name: 'Airbnb',
      logo: 'https://logo.clearbit.com/airbnb.com',
      category: 'Travel Startup',
      website: 'airbnb.com',
    },
    {
      id: '4',
      name: 'Uber',
      logo: 'https://logo.clearbit.com/uber.com',
      category: 'Mobility Startup',
      website: 'uber.com',
    },
    {
      id: '5',
      name: 'Shopify',
      logo: 'https://logo.clearbit.com/shopify.com',
      category: 'E-commerce',
      website: 'shopify.com',
    },
    {
      id: '6',
      name: 'Canva',
      logo: 'https://logo.clearbit.com/canva.com',
      category: 'Design Startup',
      website: 'canva.com',
    },
    {
      id: '7',
      name: 'Notion',
      logo: 'https://logo.clearbit.com/notion.so',
      category: 'Productivity',
      website: 'notion.so',
    },
    {
      id: '8',
      name: 'Figma',
      logo: 'https://logo.clearbit.com/figma.com',
      category: 'Design Tools',
      website: 'figma.com',
    },
    {
      id: '9',
      name: 'Discord',
      logo: 'https://logo.clearbit.com/discord.com',
      category: 'Communication',
      website: 'discord.com',
    },
    {
      id: '10',
      name: 'Slack',
      logo: 'https://logo.clearbit.com/slack.com',
      category: 'Workplace',
      website: 'slack.com',
    },
    {
      id: '11',
      name: 'Zoom',
      logo: 'https://logo.clearbit.com/zoom.us',
      category: 'Video Tech',
      website: 'zoom.us',
    },
    {
      id: '12',
      name: 'Dropbox',
      logo: 'https://logo.clearbit.com/dropbox.com',
      category: 'Cloud Storage',
      website: 'dropbox.com',
    },
    {
      id: '13',
      name: 'GitHub',
      logo: 'https://logo.clearbit.com/github.com',
      category: 'Developer Tools',
      website: 'github.com',
    },
    {
      id: '14',
      name: 'Twitch',
      logo: 'https://logo.clearbit.com/twitch.tv',
      category: 'Gaming',
      website: 'twitch.tv',
    },
    {
      id: '15',
      name: 'Reddit',
      logo: 'https://logo.clearbit.com/reddit.com',
      category: 'Social Platform',
      website: 'reddit.com',
    },
    {
      id: '16',
      name: 'Pinterest',
      logo: 'https://logo.clearbit.com/pinterest.com',
      category: 'Social Discovery',
      website: 'pinterest.com',
    },
    {
      id: '17',
      name: 'Asana',
      logo: 'https://logo.clearbit.com/asana.com',
      category: 'Project Mgmt',
      website: 'asana.com',
    },
    {
      id: '18',
      name: 'Atlassian',
      logo: 'https://logo.clearbit.com/atlassian.com',
      category: 'Dev Tools',
      website: 'atlassian.com',
    },
    {
      id: '19',
      name: 'HubSpot',
      logo: 'https://logo.clearbit.com/hubspot.com',
      category: 'Marketing',
      website: 'hubspot.com',
    },
    {
      id: '20',
      name: 'Mailchimp',
      logo: 'https://logo.clearbit.com/mailchimp.com',
      category: 'Email Marketing',
      website: 'mailchimp.com',
    },
    {
      id: '21',
      name: 'Zapier',
      logo: 'https://logo.clearbit.com/zapier.com',
      category: 'Automation',
      website: 'zapier.com',
    },
    {
      id: '22',
      name: 'Airtable',
      logo: 'https://logo.clearbit.com/airtable.com',
      category: 'Database',
      website: 'airtable.com',
    },
    {
      id: '23',
      name: 'Vercel',
      logo: 'https://logo.clearbit.com/vercel.com',
      category: 'Web Platform',
      website: 'vercel.com',
    },
    {
      id: '24',
      name: 'Supabase',
      logo: 'https://logo.clearbit.com/supabase.com',
      category: 'Backend',
      website: 'supabase.com',
    },
    {
      id: '25',
      name: 'Linear',
      logo: 'https://logo.clearbit.com/linear.app',
      category: 'Issue Tracking',
      website: 'linear.app',
    },
    {
      id: '26',
      name: 'Framer',
      logo: 'https://logo.clearbit.com/framer.com',
      category: 'Design Platform',
      website: 'framer.com',
    },
    {
      id: '27',
      name: 'Webflow',
      logo: 'https://logo.clearbit.com/webflow.com',
      category: 'Web Design',
      website: 'webflow.com',
    },
    {
      id: '28',
      name: 'Calendly',
      logo: 'https://logo.clearbit.com/calendly.com',
      category: 'Scheduling',
      website: 'calendly.com',
    },
    {
      id: '29',
      name: 'Loom',
      logo: 'https://logo.clearbit.com/loom.com',
      category: 'Video Messaging',
      website: 'loom.com',
    },
    {
      id: '30',
      name: 'Miro',
      logo: 'https://logo.clearbit.com/miro.com',
      category: 'Collaboration',
      website: 'miro.com',
    },
    {
      id: '31',
      name: 'Typeform',
      logo: 'https://logo.clearbit.com/typeform.com',
      category: 'Forms',
      website: 'typeform.com',
    },
    {
      id: '32',
      name: 'Hotjar',
      logo: 'https://logo.clearbit.com/hotjar.com',
      category: 'Analytics',
      website: 'hotjar.com',
    },
    {
      id: '33',
      name: 'Intercom',
      logo: 'https://logo.clearbit.com/intercom.com',
      category: 'Customer Support',
      website: 'intercom.com',
    },
    {
      id: '34',
      name: 'Segment',
      logo: 'https://logo.clearbit.com/segment.com',
      category: 'Data Platform',
      website: 'segment.com',
    },
    {
      id: '35',
      name: 'PlanetScale',
      logo: 'https://logo.clearbit.com/planetscale.com',
      category: 'Database',
      website: 'planetscale.com',
    },
    {
      id: '36',
      name: 'Railway',
      logo: 'https://logo.clearbit.com/railway.app',
      category: 'Cloud Platform',
      website: 'railway.app',
    },
    {
      id: '37',
      name: 'Render',
      logo: 'https://logo.clearbit.com/render.com',
      category: 'Cloud Hosting',
      website: 'render.com',
    },
    {
      id: '38',
      name: 'Fly.io',
      logo: 'https://logo.clearbit.com/fly.io',
      category: 'Edge Platform',
      website: 'fly.io',
    },
    {
      id: '39',
      name: 'Retool',
      logo: 'https://logo.clearbit.com/retool.com',
      category: 'Internal Tools',
      website: 'retool.com',
    },
    {
      id: '40',
      name: 'Postman',
      logo: 'https://logo.clearbit.com/postman.com',
      category: 'API Tools',
      website: 'postman.com',
    },
  ];

  const companies = propCompanies || defaultCompanies;
  const [activeId, setActiveId] = useState<string>(activeCompanyId || companies[0]?.id || '');
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const scrollContainerRef1 = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  // Split companies into two rows
  const firstRowCompanies = companies.slice(0, Math.ceil(companies.length / 2));
  const secondRowCompanies = companies.slice(Math.ceil(companies.length / 2));

  // Create seamless infinite scroll by tripling the companies for each row
  const tripleFirstRow = [...firstRowCompanies, ...firstRowCompanies, ...firstRowCompanies];
  const tripleSecondRow = [...secondRowCompanies, ...secondRowCompanies, ...secondRowCompanies];

  // Handle image errors
  const handleImageError = (companyId: string) => {
    setImageErrors((prev) => new Set(prev).add(companyId));
  };

  // Generate fallback image URL
  const getFallbackImageUrl = (companyName: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=374151&color=8b5cf6&size=64&font-size=0.5`;
  };

  // Auto-scroll animation (right to left for first row, left to right for second row)
  useEffect(() => {
    const animate = () => {
      if ((!scrollContainerRef1.current && !scrollContainerRef2.current) || isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const scrollSpeed = 0.8;

      // First row - scroll right to left
      if (scrollContainerRef1.current) {
        const container1 = scrollContainerRef1.current;
        container1.scrollLeft += scrollSpeed;

        const itemWidth = 110;
        const resetPoint = firstRowCompanies.length * itemWidth;

        if (container1.scrollLeft >= resetPoint * 2) {
          container1.scrollLeft = resetPoint;
        }
      }

      // Second row - scroll left to right (reverse direction)
      if (scrollContainerRef2.current) {
        const container2 = scrollContainerRef2.current;
        container2.scrollLeft -= scrollSpeed;

        const itemWidth = 110;
        const resetPoint = secondRowCompanies.length * itemWidth;

        if (container2.scrollLeft <= 0) {
          container2.scrollLeft = resetPoint;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, firstRowCompanies.length, secondRowCompanies.length]);

  // Initialize scroll positions
  useEffect(() => {
    if (scrollContainerRef1.current) {
      const container = scrollContainerRef1.current;
      const itemWidth = 110;
      container.scrollLeft = firstRowCompanies.length * itemWidth;
    }
    if (scrollContainerRef2.current) {
      const container = scrollContainerRef2.current;
      const itemWidth = 110;
      container.scrollLeft = secondRowCompanies.length * itemWidth;
    }
  }, [firstRowCompanies.length, secondRowCompanies.length]);

  const handleCompanySelect = (company: Company) => {
    setActiveId(company.id);
    onCompanySelect?.(company);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderCompanyButton = (company: Company, idx: number) => {
    const hasError = imageErrors.has(company.id);
    const imageSrc = hasError ? getFallbackImageUrl(company.name) : company.logo;

    return (
      <button
        key={`${company.id}-${idx}`}
        onClick={() => handleCompanySelect(company)}
        className={`
          group relative flex-shrink-0 p-2 transition-all duration-300 transform
          hover:scale-110 hover:-translate-y-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50
          ${activeId === company.id ? 'scale-105' : ''}
        `}
        title={`${company.name} - ${company.category}`}
        tabIndex={-1}
        style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
      >
        <div className="flex flex-col items-center space-y-2 min-w-[85px]">
          {/* Logo container - no border, no bg */}
          <div className="relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300">
            <Image
              src={imageSrc}
              alt={`${company.name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              onError={() => handleImageError(company.id)}
              priority={idx < 10} // Prioritize first 10 images
              unoptimized={hasError} // Don't optimize fallback images
            />
            {/* Active indicator */}
            {activeId === company.id && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full shadow-lg">
                <div className="w-full h-full bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          {/* Company info */}
          <div className="text-center space-y-1">
            <div
              className={`
              text-sm font-bold truncate max-w-[80px] transition-all duration-300
              ${
                activeId === company.id ? 'text-violet-300' : 'text-zinc-200 group-hover:text-white'
              }
            `}
            >
              {company.name}
            </div>
            <div
              className={`
              text-xs font-medium truncate max-w-[80px] transition-colors duration-300
              ${
                activeId === company.id
                  ? 'text-purple-300/90'
                  : 'text-zinc-400 group-hover:text-zinc-300'
              }
            `}
            >
              {company.category}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
          Startup Success Stories
        </h2>
        <p className="text-zinc-400 text-lg font-medium">
          Companies that grew from ideas to industry leaders
        </p>
      </div>

      <div
        className="relative space-y-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Enhanced gradient overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none"></div>

        {/* First Row (right to left) */}
        <div
          ref={scrollContainerRef1}
          className="overflow-x-hidden whitespace-nowrap py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="inline-flex space-x-6">
            {tripleFirstRow.map((company, idx) => renderCompanyButton(company, idx))}
          </div>
        </div>

        {/* Second Row (left to right) */}
        <div
          ref={scrollContainerRef2}
          className="overflow-x-hidden whitespace-nowrap py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="inline-flex space-x-6">
            {tripleSecondRow.map((company, idx) => renderCompanyButton(company, idx))}
          </div>
        </div>
      </div>

      {/* Centered info text below the rows */}
      <div className="text-center mt-6 text-sm text-zinc-400">
        These startups found their early talent through platforms like ours
      </div>
    </div>
  );
};

export default CompanyLogoTabs;

export const CompanyTabsExample: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    console.log('Selected company:', company);
  };

  // Fallback image URL generator
  const getFallbackImageUrl = (companyName: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=374151&color=8b5cf6&size=64&font-size=0.5`;
  };

  // Handle image error
  const handleImageError = (companyId: string) => {
    setImageErrors((prev) => new Set(prev).add(companyId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-20 pb-12">
          <CompanyLogoTabs onCompanySelect={handleCompanySelect} className="mb-16" />
        </div>

        {selectedCompany && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-zinc-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-start space-x-8 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-zinc-800/50 rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-zinc-700/50">
                      <Image
                        src={
                          imageErrors.has(selectedCompany.id)
                            ? getFallbackImageUrl(selectedCompany.name)
                            : selectedCompany.logo
                        }
                        alt={`${selectedCompany.name} logo`}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(selectedCompany.id)}
                        unoptimized={imageErrors.has(selectedCompany.id)}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-3">
                      {selectedCompany.name}
                    </h3>
                    <div className="flex items-center space-x-6 mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 font-semibold rounded-full shadow-lg border border-violet-500/30">
                        {selectedCompany.category}
                      </span>
                      <a
                        href={`https://${selectedCompany.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-violet-400 font-medium transition-colors duration-200 flex items-center space-x-2 group"
                      >
                        <span>{selectedCompany.website}</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      <span className="text-violet-400 font-semibold">{selectedCompany.name}</span>{' '}
                      started as a small startup and grew into a leading{' '}
                      {selectedCompany.category.toLowerCase()} company. They found their early
                      talent through platforms connecting startups with passionate students and
                      freelancers, just like you can today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
