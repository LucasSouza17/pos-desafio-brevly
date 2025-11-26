import NotFoundImage from '../../public/404.svg'

export function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[580px] flex items-center gap-6 flex-col bg-gray-100 rounded-lg px-12 py-16 text-center">
        <img src={NotFoundImage} alt="404-image" className='h-20' />

        <p className='title'>Link não encontrado</p>

        <span className='text-md'>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href='/' className='text-blue-base font-semibold underline'>brev.ly</a>.</span>
      </div>
    </div>
  )
}