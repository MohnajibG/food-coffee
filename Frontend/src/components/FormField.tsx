import type { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "peer w-full rounded-xl border border-black/10 bg-white px-4 pt-5 pb-2 text-ink outline-none transition focus:border-green-accent focus:ring-2 focus:ring-green-accent/30";

const labelClasses =
  "pointer-events-none absolute left-4 top-3.5 text-sm text-ink/40 transition-all peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-green-accent peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
}

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  className = "",
  ...props
}) => (
  <div className={`relative ${className}`}>
    <input id={name} name={name} placeholder=" " className={fieldClasses} {...props} />
    <label htmlFor={name} className={labelClasses}>
      {label}
    </label>
  </div>
);

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  className?: string;
}

export const FormTextarea: FC<FormTextareaProps> = ({
  label,
  name,
  className = "",
  ...props
}) => (
  <div className={`relative ${className}`}>
    <textarea
      id={name}
      name={name}
      placeholder=" "
      className={`${fieldClasses} min-h-32 resize-none`}
      {...props}
    />
    <label htmlFor={name} className={labelClasses}>
      {label}
    </label>
  </div>
);
