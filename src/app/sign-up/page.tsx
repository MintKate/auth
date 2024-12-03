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
    msv: "",
    hobby: "",
    workingSkill: "",
    mainActivity: "",
    infoSource: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // Debugging step
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), 
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
              placeholder="Họ và tên"
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
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Xác nhận lại mật khẩu"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <Input
              type="text"
              step="0.1"
              disabled={pending}
              placeholder="MSV"
              value={form.msv}
              onChange={(e) =>
                setForm({ ...form, msv: e.target.value })
              }
              required
            />

            {/* Sở thích */}
            <Select
              onValueChange={(value) =>
                setForm({ ...form, hobby: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sở thích" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                <SelectItem value="Nông nghiệp">Nông nghiệp</SelectItem>
                <SelectItem value="Bất động sản">Bất động sản</SelectItem>
                <SelectItem value="Giáo dục">Giáo dục</SelectItem>
              </SelectContent>
            </Select>


            {/* Kĩ năng làm việc */}
            <Select
              onValueChange={(value) =>
                setForm({ ...form, workingSkill: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Kĩ năng làm việc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tổng hợp">Tổng hợp</SelectItem>
                <SelectItem value="Tìm task">Tìm task</SelectItem>
                <SelectItem value="Phân chia task">Phân chia task</SelectItem>
              </SelectContent>
            </Select>

            {/* Hoạt động chính */}
            <Select
              onValueChange={(value) =>
                setForm({ ...form, mainActivity: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Hoạt động chính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phân tích tài chính">Phân tích tài chính</SelectItem>
                <SelectItem value="Sản xuất">Sản xuất</SelectItem>
                <SelectItem value="Đầu tư">Đầu tư</SelectItem>
                <SelectItem value="Đào tạo">Đào tạo</SelectItem>
              </SelectContent>
            </Select>

            {/* Nguồn thông tin */}
            <Select
              onValueChange={(value) => setForm({ ...form, infoSource: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Nguồn thông tin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Người dùng cá nhân">Người dùng cá nhân</SelectItem>
                <SelectItem value="Môi trường">Môi trường</SelectItem>
                <SelectItem value="Địa lý">Địa lý</SelectItem>
                <SelectItem value="Học tập">Học tập</SelectItem>
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
