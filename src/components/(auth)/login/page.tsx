"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader, Field, PrimaryButton, Checkbox } from "@/components/AuthUI";
import { useForm } from "@/components/lib/useForm";
import { email, required } from "@/components/lib/validation";

export default function LoginPage() {
  const router = useRouter();
  const [remember, setRemember] = useState(true);
  const form = useForm(
    { email: "", password: "" },
    { email, password: required("Password is required") }
  );

  return (
    <form onSubmit={form.submit(() => router.push("/dashboard"))} noValidate>
      <AuthHeader title="Log in" subtitle="Login to continue to dashboard" />

      <div>
        <Field
          label="Email address"
          id="email"
          type="email"
          placeholder="Enter email address"
          autoComplete="email"
          {...form.register("email")}
        />
        <Field
          label="Password"
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <label className="flex cursor-pointer select-none items-center gap-2 text-[14px] text-[#FAFAFA]">
          <Checkbox checked={remember} onChange={setRemember} />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-[16px] text-[#FFD900] hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      <div className="mt-8">
        <PrimaryButton type="submit">Login</PrimaryButton>
      </div>
    </form>
  );
}
