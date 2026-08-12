"use client";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  minLength?: number;
  options?: { value: string; label: string; disabled?: boolean }[];
  className?: string;
}

const baseInputClass =
  "bg-bg shadow-inner py-3 px-4 text-text-primary rounded-lg outline-none border border-border focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all font-medium w-full placeholder-text-secondary/50";

const labelClass =
  "block text-sm font-medium text-text-secondary mb-1.5 ml-1";

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  rows = 5,
  minLength,
  options,
  className = "",
}: FormFieldProps) => (
  <div className={`flex flex-col ${className}`}>
    {label && (
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
    )}
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || label}
        rows={rows}
        minLength={minLength}
        className={`${baseInputClass} resize-none`}
      />
    ) : type === "select" && options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseInputClass} appearance-none cursor-pointer`}
      >
        <option value="" disabled hidden>
          {placeholder || label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-surface text-text-primary">
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder || label}
        className={baseInputClass}
      />
    )}
  </div>
);

export default FormField;
