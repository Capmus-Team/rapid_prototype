'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, School, Menu, User, Heart, ChevronRight, 
  Tag, Briefcase, GraduationCap, Users,
  Calendar, FileText, Grid, Settings
} from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "Orange Bike for Sale",
    description: "Great condition, used for one year. Pickup on campus...",
    price: "$100",
    timeAgo: "5 secs",
    category: "for-sale",
    image: "/api/placeholder/400/300",
    email: "@stanford.edu"
  },
  {
    id: 2,
    title: "Roommate Wanted",
    description: "Looking for a roommate near campus. Spacious room with great...",
    price: "$800/mo",
    timeAgo: "1 min",
    category: "housing",
    image: "/api/placeholder/400/300",
    email: "@harvard.edu"
  },
  {
    id: 3,
    title: "CS Textbook",
    description: "Intro to Algorithms in excellent condition. No highlights or...",
    price: "$30",
    timeAgo: "5 mins",
    category: "for-sale",
    image: "/api/placeholder/400/300",
    email: "@mit.edu"
  },
  {
    id: 4,
    title: "Guitar Lessons",
    description: "Offering beginner guitar lessons at affordable rates. Flexible...",
    price: "Starting at $20/hr",
    timeAgo: "27 days",
    category: "services",
    image: "/api/placeholder/400/300",
    email: "@stanford.edu"
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Grid, className: 'bg-blue-700 text-white' },
  { id: 'housing', label: 'Housing', icon: Heart, className: 'bg-green-500 text-white' },
  { id: 'for-sale', label: 'For Sale', icon: Tag, className: 'bg-orange-500 text-white' },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, className: 'bg-purple-600 text-white' },
  { id: 'personals', label: 'Personals', icon: User, className: 'bg-pink-500 text-white' },
  { id: 'campus-jobs', label: 'Campus Jobs', icon: School, className: 'bg-teal-600 text-white' },
  { id: 'community', label: 'Community', icon: Users, className: 'bg-red-500 text-white' },
  { id: 'services', label: 'Services', icon: GraduationCap, className: 'bg-brown-500 text-white' },
  { id: 'events', label: 'Events', icon: Calendar, className: 'bg-indigo-700 text-white' },
  { id: 'resumes', label: 'Resumes', icon: FileText, className: 'bg-gray-700 text-white' }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 h-16">
          <h1 className="text-2xl font-bold text-[#1A3771]">Capmus</h1>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10 w-full bg-gray-50 border border-gray-200" 
                placeholder="Search posts..." 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button>Create a post</Button>
            <Button variant="outline" className="rounded-full">
              <School className="h-4 w-4 mr-2" />
              University
            </Button>
            <Button variant="outline" className="rounded-full">
              <Menu className="h-4 w-4 mr-2" />
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* University Bar */}
        <div className="bg-white border-y">
          <div className="px-6 py-2 flex gap-2 overflow-x-auto">
            {[
              'Santa Clara University',
              'Stanford University',
              'Arizona State University',
              'UC Berkeley',
              'Johns Hopkins University',
              'Harvard University'
            ].map((uni) => (
              <Button
                key={uni}
                variant="outline"
                className="rounded-full whitespace-nowrap"
              >
                {uni}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Bar */}
        <div className="bg-white shadow">
          <div className="px-6 flex items-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 py-3 px-4 rounded-none border-b-2 
                  ${selectedCategory === category.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent'}`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#1A3771] mb-2">
                    {post.title}
                  </h3>
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm text-white
                      ${categories.find(c => c.id === post.category)?.className}`}>
                      <Tag className="h-4 w-4 mr-1" />
                      {post.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-[#1A3771]">{post.price}</span>
                    <span className="text-sm text-gray-500">{post.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {post.description}
                  </p>
                  <p className="text-sm font-medium text-gray-800">{post.email}</p>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}