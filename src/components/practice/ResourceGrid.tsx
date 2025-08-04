import React from 'react';
import ResourceCard, { Resource } from './ResourceCard';

interface ResourceGridProps {
  resources: (Resource & { category: string })[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-lg">No resources found for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <ResourceCard key={index} resource={resource} />
      ))}
    </div>
  );
}
