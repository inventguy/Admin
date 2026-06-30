"use client";

import { useCallback, useState } from "react";

/**
 * Minimal form state with on-blur + on-submit validation.
 *
 * - A field validates on blur, then re-validates live once touched, so an error
 *   disappears the instant the user fixes it.
 * - `register(name)` returns everything a `<Field>` needs (value/onChange/onBlur/
 *   error) — spread it in.
 * - `submit(onValid)` validates the whole form and only calls `onValid` when it
 *   passes; otherwise it surfaces every error at once.
 */
export function useForm(initialValues, schema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, vals) => {
      const validate = schema[name];
      return validate ? validate(vals[name], vals) ?? undefined : undefined;
    },
    [schema]
  );

  const setValue = useCallback(
    (name, value) => {
      const next = { ...values, [name]: value };
      setValues(next);
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }));
      }
    },
    [values, touched, validateField]
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
    },
    [values, validateField]
  );

  const register = useCallback(
    (name) => ({
      value: values[name],
      error: errors[name],
      onChange: (e) => setValue(name, e.target.value),
      onBlur: () => handleBlur(name),
    }),
    [values, errors, setValue, handleBlur]
  );

  const submit = useCallback(
    (onValid) => (event) => {
      event.preventDefault();
      const nextErrors = {};
      let valid = true;
      Object.keys(schema).forEach((name) => {
        const error = validateField(name, values);
        if (error) {
          nextErrors[name] = error;
          valid = false;
        }
      });
      setErrors(nextErrors);
      setTouched(
        Object.keys(schema).reduce(
          (acc, name) => ({ ...acc, [name]: true }),
          {}
        )
      );
      if (valid) onValid(values);
    },
    [schema, values, validateField]
  );

  return { values, errors, register, submit, setValue };
}
