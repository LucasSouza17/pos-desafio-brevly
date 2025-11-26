import type * as React from "react"
import { cn } from "../../utils/tailwindcss-cn"
import { WarningIcon } from "@phosphor-icons/react"

export type InputFieldProps = Omit<React.ComponentProps<"input">, "prefix"> & {
  label?: string
  error?: string
  prefix?: string
}

export function InputField({ label, error, prefix, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 group">
      {label && (
        <label
          className={cn(
            "text-xs transition-colors",
            error ? "text-danger" : "text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold",
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-baseline w-full rounded-lg border transition-all",
          error
            ? "border-danger bg-white"
            : "border-gray-300 bg-white focus-within:border-blue-base focus-within:ring-1 focus-within:ring-blue-base",
        )}
      >
        {prefix && (
          <span className="pl-3 pr-0 text-md text-gray-400 flex items-center h-full whitespace-nowrap">{prefix}</span>
        )}

        <input
          className={cn(
            "flex-1 h-12 text-md text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent rounded-r-lg",
            prefix ? "pl-0 pr-3" : "px-3",
            className,
          )}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-danger">
          <WarningIcon className="w-4 h-4 text-danger" />
          <span className="text-gray-500">{error}</span>
        </div>
      )}
    </div>
  )
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
