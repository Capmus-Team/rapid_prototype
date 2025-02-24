'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Hello World</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">
            Welcome to our Next.js app using Tailwind CSS and shadcn/ui components.
          </p>
          <div className="mb-4">
            <Input placeholder="Enter your name..." />
          </div>
          <Button variant="default">
            Click Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
