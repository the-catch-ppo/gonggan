'use client'
export default function LoadingSpin() {
  return(
    <div className="h-screen text-9xl flex flex-col justify-center items-center">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-28 w-28 border-t-8 border-sygnature-brown"></div>
      </div>
    </div>
  )
}