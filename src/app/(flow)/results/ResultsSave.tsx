"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ResultsSave = () => {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Save Your Results</h2>

      <Separator className="my-4" />

      <div className="text-center">
        <p className="text-sm mb-3">Create an account to save your data</p>
        <Button asChild className="w-full">
          <Link href="/sign-up">Sign Up Now</Link>
        </Button>
      </div>
    </div>
  );
};
