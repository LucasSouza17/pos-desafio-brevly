import { NewLinkForm } from "./new-link-form";

export function NewLink() {
  return (
    <div className="w-full p-8 bg-gray-100 rounded-lg">
      <div className="flex flex-col gap-6">
        <h2 className="title">Novo Link</h2>

        <NewLinkForm />
      </div>
    </div>
  )
}