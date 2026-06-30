"use client";

import { useCallback, useState } from "react";
import type { Validator } from "./validation";

type Schema<T> = Partial<Record<keyof T, Validator>>;
type Errors<T> = Partial<Record<keyof T, string>>;
type Touched<T> = Partial<Record<keyof T, boolean>>;


export function useForm<T extends Record<string, string>>(
  initialValues: T,
  schema: Schema<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});

  const validateField = useCallback(
    (name: keyof T, vals: T): string | undefined => {
      const validate = schema[name];
      return validate ? validate(vals[name], vals) ?? undefined : undefined;
    },
    [schema]
  );

  const setValue = useCallback(
    (name: keyof T, value: string) => {
      const next = { ...values, [name]: value };
      setValues(next);
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }));
      }
    },
    [values, touched, validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
    },
    [values, validateField]
  );

  const register = useCallback(
    (name: keyof T) => ({
      value: values[name],
      error: errors[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(name, e.target.value),
      onBlur: () => handleBlur(name),
    }),
    [values, errors, setValue, handleBlur]
  );

  const submit = useCallback(
    (onValid: (values: T) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const nextErrors: Errors<T> = {};
      let valid = true;
      (Object.keys(schema) as (keyof T)[]).forEach((name) => {
        const error = validateField(name, values);
        if (error) {
          nextErrors[name] = error;
          valid = false;
        }
      });
      setErrors(nextErrors);
      setTouched(
        (Object.keys(schema) as (keyof T)[]).reduce(
          (acc, name) => ({ ...acc, [name]: true }),
          {} as Touched<T>
        )
      );
      if (valid) onValid(values);
    },
    [schema, values, validateField]
  );

  return { values, errors, register, submit, setValue };
}
