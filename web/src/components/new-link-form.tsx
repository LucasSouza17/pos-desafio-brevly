import { Button } from "./ui/button";
import { InputField } from "./ui/input";

export function NewLinkForm() {
  return (
    <form className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputField label="Link original" placeholder="www.example.com.br" />
        </div>

        <div className="flex flex-col gap-2">
          <InputField prefix="brev.ly/" label="Link encurtado" />
        </div>
      </div>

      <Button>Salvar link</Button>
    </form>
  )
}