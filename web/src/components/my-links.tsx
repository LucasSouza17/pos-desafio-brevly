import { Button } from "./ui/button";

export function MyLinks() {
  return (
    <div className="w-full p-8 bg-gray-100 rounded-lg">

      <div className="flex justify-between">
        <h2 className="text-display-lg">Meus Links</h2>
        <Button size="md" variant="secondary">Baixar CSV</Button>
      </div>

    </div>
  )
}