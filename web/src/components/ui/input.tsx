import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const inputVariants = tv({
  base: "w-full rounded-lg border border-gray-300 px-3 h-12 text-display-md text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-base transition-all",

  variants: {
    size: {
      default: "h-10",
      sm: "h-8 text-xs",
      lg: "h-12 text-base",
    },
  },

  defaultVariants: {
    size: "default",
  },
})

// Label
const labelVariants = tv({
  base: "text-display-xs text-gray-500 mb-1 block",
})

// Botão simples
const iconButtonVariants = tv({
  base: "ml-2 rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all",
})

export type InputProps = ComponentProps<'input'> & VariantProps<typeof inputVariants>
export type InputLabelProps = ComponentProps<'label'>
export type PrefixProps = ComponentProps<'span'>
export type IconButtonProps = ComponentProps<'button'>

export function Input({ className, size, ...props }: InputProps) {
  return <input className={inputVariants({ size, className })} {...props} />
}

export function InputLabel({ className, ...props }: InputLabelProps) {
  return <label className={labelVariants({ className })} {...props} />
}

export function IconButton({ className, ...props }: IconButtonProps) {
  return <button className={iconButtonVariants({ className })} {...props} />
}