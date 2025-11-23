"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  type: z.enum(["accelerator", "startup", "investor", "other"], {
    required_error: "Please select an option.",
  }),
  stage: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  newsletter: z.boolean().optional().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      type: undefined,
      stage: "",
      message: "",
      newsletter: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "897b207e-9ae8-4514-80f9-5f50446e4915");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("company", data.company);
      formData.append("type", data.type);
      formData.append("stage", data.stage || "");
      formData.append("message", data.message);
      formData.append("newsletter", data.newsletter ? "yes" : "no");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast("Message sent successfully");
        form.reset();
      } else {
        toast("Error sending message", {
          description: "Please try again later",
          duration: 5000,
        });
      }
    } catch (error) {
      toast("Error sending message", {
        description: "Please try again later",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company and Type Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Company/Organization *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Company Name"
                    {...field}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  I am a... *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="accelerator">
                      Accelerator/Incubator
                    </SelectItem>
                    <SelectItem value="startup">Startup Founder</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Stage Field */}
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Current Stage
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    <SelectValue placeholder="Select stage (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="mvp">Building MVP</SelectItem>
                  <SelectItem value="launched">MVP Launched</SelectItem>
                  <SelectItem value="scaling">Scaling (v1.0+)</SelectItem>
                  <SelectItem value="established">
                    Established Program
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Tell us about your needs *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your technical challenges, goals, or how you'd like to partner with Collybrix..."
                  rows={6}
                  {...field}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Newsletter Checkbox */}
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                  />
                </FormControl>
                <FormLabel className="text-sm text-muted-foreground leading-relaxed font-normal">
                  {`I'd like to receive updates about Collybrix services, case studies, and technical insights. You can unsubscribe at any time.`}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="text-base text-primary-foreground bg-primary hover:bg-secondary/50 border-none"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Link href="https://calendar.app.google/mnJRSUAvU7nECYDK7">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="text-base bg-transparent border-primary hover:bg-primary/10"
            >
              Schedule a Demo Call
            </Button>
          </Link>
        </div>

        {/* Privacy Policy */}
        <p className="text-xs text-muted-foreground text-center">
          {`By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.`}
        </p>
      </form>
    </Form>
  );
}
