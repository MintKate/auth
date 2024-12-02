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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Link from "next/link";

//react icons
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gpa: "",
    programmingSkill: "", // Khả năng lập trình
    teamworkSkill: "", // Khả năng làm việc nhóm
    hobby: "", // Sở thích
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // Debugging step
    setPending(true);

    const formData = { ...form, gpa: parseFloat(form.gpa) };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Gửi formData đã được cập nhật
    });

    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/sign-in");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };


  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6"
          role="alert"
          aria-live="assertive"
          >
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={pending}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <Input
              type="number"
              step="0.1"
              min="0"
              max="10"
              disabled={pending}
              placeholder="Average Score (0-10)"
              value={form.gpa}
              onChange={(e) =>
                setForm({ ...form, gpa: e.target.value })
              }
              required
            />

            {/* Khả năng lập trình */}
            <Select
              onValueChange={(value) =>
                setForm({ ...form, programmingSkill: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Programming Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rất kém">Rất kém</SelectItem>
                <SelectItem value="Kém">Kém</SelectItem>
                <SelectItem value="Trung bình">Trung bình</SelectItem>
                <SelectItem value="Ổn">Ổn</SelectItem>
                <SelectItem value="Tốt">Tốt</SelectItem>
              </SelectContent>
            </Select>

            {/* Khả năng làm việc nhóm */}
            <Select
              onValueChange={(value) =>
                setForm({ ...form, teamworkSkill: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Teamwork Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tổng hợp">Tổng hợp</SelectItem>
                <SelectItem value="Tìm task">Tìm task</SelectItem>
                <SelectItem value="Phân chia task">Phân chia task</SelectItem>
              </SelectContent>
            </Select>

            {/* Sở thích */}
            <Select
              onValueChange={(value) => setForm({ ...form, hobby: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hobby" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lập trình">Lập trình</SelectItem>
                <SelectItem value="Thiết kế">Thiết kế</SelectItem>
                <SelectItem value="Phân tích">Phân tích</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>

          <Separator />

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Already have an account?
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="sign-in"
            >
              Sign in{" "}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
