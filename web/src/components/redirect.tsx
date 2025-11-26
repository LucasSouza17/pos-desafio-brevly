import { useParams } from '@tanstack/react-router'
import { getFullUrl } from '../http/get-full-url'
import { useEffect } from 'react'
import { incrementAccess } from '../http/increment-access'

export function Redirect() {
  const { slug } = useParams({ from: "/$slug" })

  async function redirectIfUrlExists() {
    const response = await getFullUrl({ slug })

    if (response.fullUrl) {
      await incrementAccess({ slug });
      return window.location.href = response.fullUrl
    }

    return window.location.href = '/not-found'
  }

  useEffect(() => {
    redirectIfUrlExists()
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[580px] flex items-center gap-6 flex-col bg-gray-100 rounded-lg px-12 py-16 text-center">
        <img src='logo_icon.svg' alt="404-image" className='h-20' />

        <p className='title'>Redirecionando...</p>

        <span className='text-md'>O link será aberto automaticamente em alguns instantes. </span>
        <span className='text-md'>Não foi redirecionado? <a className='text-blue-base font-semibold underline'>Acesse aqui</a></span>
      </div>
    </div>
  )
}