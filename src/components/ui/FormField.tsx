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
  "peer bg-bg shadow-inner pt-7 pb-2 px-4 text-text-primary rounded-lg outline-none border border-border focus:border-text-muted focus:ring-1 focus:ring-text-muted transition-all font-medium w-full placeholder-transparent";

const labelClass =
  "absolute text-sm text-text-secondary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-white pointer-events-none";

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
  <div className={`relative ${className}`}>
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
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>
  </div>
);

export default FormField;
