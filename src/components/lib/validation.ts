/**
 * Form validation primitives.
 *
 * Every validator is a pure function: given a field value (and, optionally, the
 * whole form for cross-field rules like "confirm password"), it returns an error
 * message — or `null` when the value is valid. Compose them and hand a schema to
 * `useForm`. No classes, no magic, trivially unit-testable.
 */

export type Validator = (
  value: string,
  values?: Record<string, string>
) => string | null;

/** Catches real typos without rejecting valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Non-empty after trimming. */
export const required =
  (message = "This field is required"): Validator =>
  (value) =>
    value.trim().length > 0 ? null : message;

/** Present and shaped like an email address. */
export const email: Validator = (value) => {
  const v = value.trim();
  if (!v) return "Email address is required";
  return EMAIL_RE.test(v) ? null : "Enter a valid email address";
};

export const minLength =
  (n: number, message?: string): Validator =>
  (value) =>
    value.length >= n ? null : message ?? `Must be at least ${n} characters`;

/** 8+ characters with at least one letter and one number. */
export const password: Validator = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Za-z]/.test(value)) return "Include at least one letter";
  if (!/[0-9]/.test(value)) return "Include at least one number";
  return null;
};

/** Must equal another field's current value (e.g. confirm password). */
export const matches =
  (field: string, message = "Passwords do not match"): Validator =>
  (value, values) =>
    value === values?.[field] ? null : message;

/** Run validators left-to-right; return the first error encountered. */
export const compose =
  (...validators: Validator[]): Validator =>
  (value, values) => {
    for (const validate of validators) {
      const error = validate(value, values);
      if (error) return error;
    }
    return null;
  };

/** Exactly `length` digits — used for the OTP code. */
export const otpCode = (digits: string[], length = 6): string | null => {
  const code = digits.join("");
  if (code.length < length) return "Enter the complete code";
  return new RegExp(`^\\d{${length}}$`).test(code) ? null : "Enter digits only";
};
