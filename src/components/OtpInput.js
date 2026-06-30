"use client";

import { useRef } from "react";

export default function OtpInput({
  length = 6,
  value,
  onChange,
  invalid = false,
}) {
  const refs = useRef([]);

  function setDigit(index, digit) {
    const next = [...value];
    next[index] = digit;
    onChange(next);
  }

  function handleChange(index, raw) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    const next = Array.from({ length }, (_, i) => pasted[i] ?? "");
    onChange(next);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex w-full justify-between">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-invalid={invalid ? true : undefined}
          className={`h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] md:h-[56px] md:w-[56px] lg:h-[62px] lg:w-[62px] rounded-[10px] border bg-transparent text-center text-[16px] md:text-[18px] text-white outline-none transition focus:ring-1 ${
            invalid
              ? "border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/30"
              : "border-[#F0F0F0] focus:border-[#FFD900]/70 focus:ring-[#FFD900]/20"
          }`}
        />
      ))}
    </div>
  );
}
