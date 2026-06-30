"use client";

import { useRouter } from "next/navigation";
import { AuthHeader, Field, PrimaryButton } from "@/components/AuthUI";
import { useForm } from "@/components/lib/useForm";
import { email } from "@/components/lib/validation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const form = useForm({ email: "" }, { email });

  return (
    <form
      onSubmit={form.submit(({ email }) =>
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`)
      )}
      noValidate
    >
      <AuthHeader title="Forget Password" subtitle="Reset your password" />

      <div>
        <Field
          label="Email address"
          id="email"
          type="email"
          placeholder="Enter email address"
          autoComplete="email"
          {...form.register("email")}
        />
      </div>

      <div className="mt-8">
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </div>
    </form>
  );
}
