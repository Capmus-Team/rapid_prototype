'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, School, Menu, User, Heart, ChevronRight } from 'lucide-react';

// Category data
const categoryData = [
  { id: 'all', label: 'All', icon: 'Apps' },
  { id: 'housing', label: 'Housing', icon: 'Home' },
  { id: 'for-sale', label: 'For Sale', icon: 'Tag' },
  { id: 'jobs', label: 'Jobs', icon: 'Briefcase' },
  { id: 'personals', label: 'Personals', icon: 'User' },
  { id: 'campus-jobs', label: 'Campus Jobs', icon: 'GraduationCap' },
  { id: 'community', label: 'Community', icon: 'Users' },
  { id: 'services', label: 'Services', icon: 'Tool' },
  { id: 'events', label: 'Events', icon: 'Calendar' },
  { id: 'resumes', label: 'Resumes', icon: 'FileText' }
];

const universities = [
  'Santa Clara University',
  'Stanford University',
  'Arizona State University',
  'UC Berkeley',
  'Johns Hopkins University',
  'Harvard University'
];

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [showUniversityBar, setShowUniversityBar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          {/* Top Header Row */}
          <div className="flex items-center justify-between p-4">
            {/* Logo & University */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-900">Capmus</h1>
              {selectedUniversity && (
                <span className="text-gray-600 font-medium">{selectedUniversity}</span>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search posts..." 
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost">Create a post</Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowUniversityBar(!showUniversityBar)}
              >
                <School className="w-4 h-4" />
                University
              </Button>
              <div className="relative">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Menu className="w-4 h-4" />
                  <User className="w-4 h-4" />
                </Button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sign up</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Login</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Help Center</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* University Bar */}
          {showUniversityBar && (
            <div className="border-t border-gray-200 overflow-x-auto">
              <div className="flex gap-2 p-2">
                {universities.map((uni) => (
                  <Button
                    key={uni}
                    variant={selectedUniversity === uni ? "default" : "outline"}
                    onClick={() => setSelectedUniversity(uni)}
                    className="whitespace-nowrap"
                  >
                    {uni}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Category Bar */}
          <div className="border-t border-gray-200 bg-gray-50 p-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {categoryData.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex flex-col items-center gap-1 py-2"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs">{category.label}</span>
                </Button>
              ))}
              <Button variant="outline" className="ml-auto flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-48 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Sample Post Card */}
            <Card className="relative overflow-hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 z-10"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <img 
                src="/api/placeholder/400/300"
                alt="Post image"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Sample Post Title</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sample post description that goes here...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">$100</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
          <div className="flex justify-around py-2">
            <Button variant="ghost" className="flex flex-col items-center">
              <Search className="w-5 h-5" />
              <span className="text-xs mt-1">Explore</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">Wishlists</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Log in</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}