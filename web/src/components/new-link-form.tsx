import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { InputField } from "./ui/input";
import { getQueryClient } from "../lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { createShortUrl } from "../http/create-short-url";
import { SpinnerIcon } from "@phosphor-icons/react";

export const newLinkForm = z.object({
  fullUrl: z.url({ error: 'A url não é válida.' }).min(1, "A URL é obrigatória."),
  slug: z.string().min(1, "O Link encurtado é obrigatório.").regex(/^[a-zA-Z0-9-_]+$/, "O Link encurtado só pode conter letras, números, hífens e underscores."),
})

type NewLinkForm = z.infer<typeof newLinkForm>

export function NewLinkForm() {
  const queryClient = getQueryClient();

  const { mutateAsync: createShortUrlAsync } = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    }
  })

  const { register, watch, formState: { isSubmitting, errors }, handleSubmit } = useForm<NewLinkForm>({
    defaultValues: {
      fullUrl: '',
      slug: '',
    },
    mode: "onBlur",
    resolver: zodResolver(newLinkForm),
  })

  async function onSubmit(data: NewLinkForm) {
    await createShortUrlAsync(data);
  }

  const fieldsFilled = watch('fullUrl') && watch('slug');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputField label="Link original" placeholder="www.example.com.br" error={errors.fullUrl?.message} {...register('fullUrl')} />
        </div>

        <div className="flex flex-col gap-2">
          <InputField prefix="brev.ly/" label="Link encurtado" error={errors.slug?.message} {...register('slug')} />
        </div>
      </div>

      <Button disabled={isSubmitting || !fieldsFilled} type="submit">
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <SpinnerIcon className="animate-spin" />
            Criando...
          </div>
        ) : "Salvar Link"}
      </Button>
    </form>
  )
}