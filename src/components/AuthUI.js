"use client";

export function AuthHeader({ title, subtitle }) {
  return (
    <div className="mb-8 md:mb-10">
      <h1 className="text-[32px] md:text-[42px] lg:text-[50px] font-semibold leading-[1.05] tracking-tight text-[#FFFFFF]">
        {title}
      </h1>
      <p className="mt-5 text-[12px] text-[#FFFFFF]">{subtitle}</p>
    </div>
  );
}

export function Field({ label, id, error, className = "", ...props }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="space-y-2 md:space-y-3 mb-6 md:mb-10">
      <label
        htmlFor={id}
        className="block text-[16px] md:text-[18px] lg:text-[20px] text-[#FFFFFF]"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`w-full rounded-[10px] border bg-transparent px-4 py-[14px] text-[14px] text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:ring-1 ${
          error
            ? "border-[#FF5C5C] focus:border-[#FF5C5C] focus:ring-[#FF5C5C]/30"
            : "border-[#292929] focus:border-[#FFD900]/70 focus:ring-[#FFD900]/20"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-[13px] text-[#FF5C5C]">
          {error}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({ children, ...props }) {
  return (
    <button
      className="w-full rounded-[12px] bg-[#FFD900] py-4 text-center text-[16px] font-semibold text-[#030303] transition hover:bg-[#ffe23a] active:scale-[0.99]"
      {...props}
    >
      {children}
    </button>
  );
}

export function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border border-[#FAFAFA] bg-transparent transition"
    >
      {checked && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.2 5 8.7l4.5-5"
            stroke="#FAFAFA"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
