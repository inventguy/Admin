"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthHeader, PrimaryButton } from "@/components/AuthUI";
import OtpInput from "@/components/OtpInput";
import { otpCode } from "@/components/lib/validation";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email")?.trim() || "your email";

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const message = otpCode(otp);
    if (message) {
      setError(message);
      return;
    }
    router.push("/change-password");
  }

  function handleChange(next) {
    setOtp(next);
    if (error) setError(null);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthHeader
        title="Verify email address"
        subtitle={`An OTP has been sent to ${email}`}
      />

      <div className="space-y-3">
        <label className="block text-[20px] text-[#FFFFFF]">OTP mail</label>
        <OtpInput value={otp} onChange={handleChange} invalid={!!error} />
        {error && (
          <p role="alert" className="text-[13px] text-[#FF5C5C]">
            {error}
          </p>
        )}
        <p className="pt-1 text-right text-[14px] text-[#FAFAFA]">
          Not received?{" "}
          <button
            type="button"
            className="font-medium text-[#FFD900] hover:underline"
            onClick={() => {
              setOtp(Array(6).fill(""));
              setError(null);
            }}
          >
            Resend OTP
          </button>
        </p>
      </div>

      <div className="mt-8">
        <PrimaryButton type="submit">Verify</PrimaryButton>
      </div>
    </form>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  );
}
