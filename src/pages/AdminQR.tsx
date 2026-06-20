import { useEffect, useRef, useState } from 'react'
import QRCode, { QRCodeRenderersOptions } from 'qrcode'
import { TABLE_COUNT, SITE_ORIGIN } from '../data/config'

const QR_OPTIONS: QRCodeRenderersOptions = {
  width: 300,
  margin: 2,
  color: {
    dark: '#1C1008',  // espresso
    light: '#F5ECD7', // cream
  },
}

/**
 * Builds the URL that the QR code for table `n` should encode.
 * Exported so it can be tested independently (Property 10).
 */
export function buildTableUrl(origin: string, tableNumber: number): string {
  return `${origin}/menu?table=${tableNumber}`
}

/**
 * Triggers a PNG download for a canvas element.
 */
function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.click()
}

export default function AdminQR() {
  const [tableCount, setTableCount] = useState(TABLE_COUNT)
  const [generated, setGenerated]   = useState(false)
  const [generating, setGenerating] = useState(false)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  // Reset refs array whenever table count changes
  useEffect(() => {
    canvasRefs.current = canvasRefs.current.slice(0, tableCount)
  }, [tableCount])

  async function generateQRCodes() {
    setGenerating(true)
    setGenerated(false)
    // Allow the grid to render first so canvas refs are populated
    await new Promise(resolve => setTimeout(resolve, 50))

    const origin = SITE_ORIGIN || window.location.origin

    for (let i = 0; i < tableCount; i++) {
      const canvas = canvasRefs.current[i]
      if (!canvas) continue
      const url = buildTableUrl(origin, i + 1)
      try {
        await QRCode.toCanvas(canvas, url, QR_OPTIONS)
        // NOTE: Logo overlay would go here — draw logo image centered on canvas
        // e.g.: ctx.drawImage(logoImg, (300 - logoSize) / 2, (300 - logoSize) / 2, logoSize, logoSize)
      } catch (err) {
        console.error(`Failed to generate QR for table ${i + 1}:`, err)
      }
    }

    setGenerating(false)
    setGenerated(true)
  }

  function handleDownloadSingle(index: number) {
    const canvas = canvasRefs.current[index]
    if (!canvas) return
    downloadCanvas(canvas, `table-${index + 1}-qr.png`)
  }

  function handleDownloadAll() {
    for (let i = 0; i < tableCount; i++) {
      const canvas = canvasRefs.current[i]
      if (!canvas) continue
      // Stagger downloads slightly to avoid browser blocking multiple downloads
      setTimeout(() => downloadCanvas(canvas, `table-${i + 1}-qr.png`), i * 100)
    }
  }

  return (
    <main className="min-h-screen bg-offwhite pb-16">
      {/* Page header */}
      <div className="bg-espresso text-cream py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-2">
            QR Code Generator
          </h1>
          <p className="text-offwhite text-sm">
            Generate print-ready QR codes for each table. Each code links to the table-specific menu.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="table-count" className="text-sm font-semibold text-espresso">
              Number of Tables
            </label>
            <input
              id="table-count"
              type="number"
              min={1}
              max={50}
              value={tableCount}
              onChange={e => {
                const v = Math.min(50, Math.max(1, Number(e.target.value)))
                setTableCount(v)
                setGenerated(false)
              }}
              className="rounded-lg border border-espresso/20 hover:border-espresso/40 px-4 py-2.5 text-sm text-espresso bg-offwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition w-full sm:w-40"
            />
          </div>

          <button
            type="button"
            onClick={generateQRCodes}
            disabled={generating}
            className="rounded-lg bg-amber text-cream font-semibold text-sm py-2.5 px-6 hover:bg-amber/90 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 whitespace-nowrap"
          >
            {generating ? 'Generating…' : 'Generate QR Codes'}
          </button>

          {generated && (
            <button
              type="button"
              onClick={handleDownloadAll}
              className="rounded-lg border-2 border-espresso text-espresso font-semibold text-sm py-2.5 px-6 hover:bg-espresso hover:text-cream active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Download All
            </button>
          )}
        </div>

        {/* QR Code Grid — always rendered so canvas refs are available */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          aria-label="QR code grid"
        >
          {Array.from({ length: tableCount }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center gap-3"
            >
              {/* Canvas — always mounted; QR drawn on generate */}
              <canvas
                ref={el => { canvasRefs.current[i] = el }}
                width={300}
                height={300}
                className={`w-full max-w-[180px] rounded-md transition ${generated ? 'opacity-100' : 'opacity-20 bg-offwhite'}`}
                aria-label={`QR code for Table ${i + 1}`}
              />

              <p className="text-sm font-semibold text-espresso">Table {i + 1}</p>

              {generated && (
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(i)}
                  className="text-xs text-amber underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
                >
                  Download PNG
                </button>
              )}

              {!generated && (
                <span className="text-xs text-espresso/30">
                  Click Generate
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Fallback message if canvas API is unavailable */}
        <noscript>
          <p className="mt-8 text-center text-sm text-espresso/60">
            QR code generation requires JavaScript. Please enable it and reload the page.
          </p>
        </noscript>
      </div>
    </main>
  )
}
