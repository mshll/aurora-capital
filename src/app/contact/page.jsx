import MainLayout from '@/components/MainLayout';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from 'react';

const HelloWorld = () => {

  return (
    <MainLayout>
      <div className="space-y-8 pt-20 w-[500px]">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Get in touch</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Don't hesitate to reach out! We don't bite.
          </p>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-bold">Contact Details</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar prompt="postal address" className="w-4 h-4" />
                  <span>Ghazali Rd, Free Trade Zone 70050</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar prompt="phone number" className="w-4 h-4" />
                  <span>(965) 1234-5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar prompt="email address" className="w-4 h-4" />
                  <Link href="#" prefetch={false}>
                    contact@auroracapital.com
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <form id="contactForm" action="#" method="post">
              <CardHeader>
                <h3 className="text-2xl font-bold">Leave a Message</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Enter your name" />
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="Enter your email" type="email" />
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[100px]" />
                  <div className='flex justify-end'>
                    <Button type="submit" className='w-[150px]' variant='ghost'>Send message</Button>
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelloWorld;
