"use client";

//shadcn ui

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

//react icons
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

const GroupDetails = () => {
  return (
    <div className="h-full flex items-center justify-center text-white bg-[#1b0918] text-w">
      Group details
    </div>
  );
};

export default GroupDetails;
