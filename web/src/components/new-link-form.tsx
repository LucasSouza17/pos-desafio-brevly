import { Button } from "./ui/button";
import { Input, InputLabel } from "./ui/input";

export function NewLinkForm() {
  return (
    <form className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel>Link original</InputLabel>
          <Input placeholder="https://google.com" />
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel>Link encurtado</InputLabel>
          <Input placeholder="Google" />
        </div>
      </div>

      <Button>Salvar link</Button>
    </form>
  )
}