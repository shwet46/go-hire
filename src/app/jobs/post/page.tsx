"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/jobs/AuthGuard';
import PageHeader from '@/components/jobs/PageHeader';
import JobForm from '@/components/jobs/JobForm';

export default function PostJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        tags: tags.filter(tag => tag.trim()), // Filter out empty tags
      };

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Success!",
          description: "Your job has been posted successfully and is now live.",
        });
        
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          type: 'full-time',
          salary: '',
          description: '',
        });
        setTags([]);
        setTagInput('');
        
        // Delay navigation to show toast
        setTimeout(() => {
          router.push('/jobs');
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || 'Failed to post job. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard requiredRole="recruiter">
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <PageHeader title="Post a New Job" />
          
          <JobForm
            formData={formData}
            tags={tags}
            tagInput={tagInput}
            loading={loading}
            onInputChange={handleInputChange}
            onTypeChange={handleTypeChange}
            onTagInputChange={setTagInput}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AuthGuard>
  );
}