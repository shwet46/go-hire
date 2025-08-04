import practiceData from '@/data/practice.json';
import { Resource } from '@/components/practice/ResourceCard';

interface DataResource {
  name: string;
  url?: string;
  type?: string;
  difficulty?: string;
  price?: string;
  duration?: string;
  description: string;
  technologies?: string[];
  author?: string;
}

export const useResourcesData = () => {
  const getAllResources = (): (Resource & { category: string })[] => {
    const d = practiceData.coding_resources_for_placements;
    const res: (Resource & { category: string })[] = [];

    const add = (resources: DataResource[], category: string) =>
      resources.forEach((resource: DataResource) =>
        res.push({ ...resource, category, type: resource.type ?? 'Resource' })
      );

    add(d.data_structures_algorithms.free_resources, 'dsa');
    add(d.data_structures_algorithms.paid_courses, 'dsa');
    add(d.system_design.free_resources, 'system_design');
    add(d.system_design.paid_courses, 'system_design');
    add(d.web_development.frontend, 'web_dev');
    add(d.web_development.backend, 'web_dev');
    add(d.web_development.paid_courses, 'web_dev');
    add(d.mobile_development.android, 'mobile_dev');
    add(d.mobile_development.ios, 'mobile_dev');
    add(d.mobile_development.cross_platform, 'mobile_dev');
    add(d.competitive_programming.platforms, 'competitive');
    add(d.competitive_programming.learning_resources, 'competitive');
    add(d.interview_preparation.coding_interview, 'interview');
    add(d.interview_preparation.system_design_interview, 'interview');
    add(d.interview_preparation.behavioral_interview, 'interview');
    add(d.additional_skills.database, 'dsa');
    add(d.additional_skills.cloud_computing, 'system_design');
    add(d.additional_skills.version_control, 'web_dev');

    return res;
  };

  return { getAllResources };
};
