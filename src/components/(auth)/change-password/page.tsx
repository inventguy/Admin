"use client";

import { useRouter } from "next/navigation";
import { AuthHeader, Field, PrimaryButton } from "@/components/AuthUI";
import { useForm } from "@/components/lib/useForm";
import { compose, matches, password, required } from "@/components/lib/validation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const form = useForm(
    { password: "", confirmPassword: "" },
    {
      password,
      confirmPassword: compose(
        required("Confirm your password"),
        matches("password")
      ),
    }
  );

  return (
    <form onSubmit={form.submit(() => router.push("/login"))} noValidate>
      <AuthHeader title="Change Password" subtitle="Login to continue to dashboard" />

      <div>
        <Field
          label="Password"
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          {...form.register("password")}
        />
        <Field
          label="Confirm Password"
          id="confirm-password"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          {...form.register("confirmPassword")}
        />
      </div>

      <div className="mt-8">
        <PrimaryButton type="submit">Create Password</PrimaryButton>
      </div>
    </form>
  );
}
