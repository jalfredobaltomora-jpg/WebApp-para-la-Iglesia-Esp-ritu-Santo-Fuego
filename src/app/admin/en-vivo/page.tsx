'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Youtube, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const STORAGE_KEY = 'iesfuego-live-settings'

export default function AdminEnVivoPage() {
  const router = useRouter()
  const [channelId, setChannelId] = useState('')
  const [activo, setActivo] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setChannelId(data.channelId || '')
        setActivo(data.activo || false)
        setMensaje(data.mensaje || '')
      } catch {}
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ channelId, activo, mensaje }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-dark">Transmisión en Vivo</h1>
      </div>

      <Card className="mx-auto max-w-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="ID del Canal de YouTube"
              placeholder="Ej: UC_X19lVhHj3U4mGkUpRqY8w"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
            />

            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500 peer-checked:after:translate-x-full" />
              </label>
              <span className="text-sm font-medium text-gray-700">
                {activo ? 'En Vivo ahora' : 'Transmisión desactivada'}
              </span>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Mensaje cuando no hay live <span className="text-gray-400">(opcional)</span>
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Ej: Próximo culto: Domingo 10:00 AM"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                rows={2}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              <Save className="mr-2 h-4 w-4" /> {saved ? '✓ Guardado' : 'Guardar Configuración'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {channelId && (
        <Card className="mx-auto mt-6 max-w-lg">
          <CardHeader>
            <h3 className="flex items-center gap-2 font-semibold text-dark">
              <Youtube className="h-5 w-5 text-red-500" /> Vista Previa
            </h3>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-dark/5">
              <iframe
                src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              href={`https://www.youtube.com/channel/${channelId}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 text-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" /> Abrir en YouTube
            </a>
          </CardContent>
        </Card>
      )}

      <Card className="mx-auto mt-6 max-w-lg">
        <CardHeader>
          <h3 className="font-semibold text-dark">¿Cómo transmitir?</h3>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>1. Abre YouTube en tu celular o computadora.</p>
          <p>2. Toca el icono de <strong>"+"</strong> (crear) → <strong>"Transmitir en vivo"</strong>.</p>
          <p>3. Configura tu transmisión y presiona <strong>"Transmitir"</strong>.</p>
          <p>4. La página mostrará automáticamente tu live.</p>
          <p className="mt-2 text-xs text-gray-400">
            Asegúrate de que el ID del canal de YouTube esté configurado arriba.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
