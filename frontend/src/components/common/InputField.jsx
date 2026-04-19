import { useState } from "react";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  autoComplete,
  hint,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input-field ${error ? "border-red-500/60 focus:border-red-500" : ""} ${
            isPassword ? "pr-11" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors text-sm select-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className="input-error" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${name}-hint`} className="text-gray-500 text-xs mt-1">{hint}</p>
      )}
    </div>
  );
}
