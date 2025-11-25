import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = tv({
  base: `
    cursor-pointer
    flex items-center justify-center
    transition-all
    disabled:opacity-50 disabled:pointer-events-none
  `,

  variants: {
    variant: {
      default: "bg-blue-base text-white hover:bg-blue-dark",
      secondary: "bg-gray-200 text-gray-500 border border-gray-200 hover:border-blue-base"
    },
    size: {
      default: "px-6 py-3 h-12 font-medium text-display-md rounded-lg",
      md: "px-3 h-8 rounded-sm text-display-sm font-semibold",
      icon: "p-3",
      "icon-sm": "p-2",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ size, variant, className, ...props }: ButtonProps) {
  const Component = props.asChild ? Slot : "button";

  return (
    <Component className={buttonVariants({ size, variant, className })} {...props} />
  );
}
