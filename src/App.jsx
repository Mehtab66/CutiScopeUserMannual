function pdfEmbedSrc(url) {
  if (!url) return url
  const extra = 'navpanes=0&pagemode=useNone'
  const i = url.indexOf('#')
  if (i === -1) return `${url}#${extra}`
  const base = url.slice(0, i + 1)
  const frag = url.slice(i + 1)
  return frag ? `${base}${frag}&${extra}` : `${base}${extra}`
}

export default function App() {
  const envUrl = import.meta.env.VITE_MANUAL_PDF_URL
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const defaultPath = '/cutiscope-user-manual.pdf'
  const raw = envUrl || (base ? `${base}${defaultPath}` : defaultPath)
  const src = pdfEmbedSrc(raw)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        margin: 0,
        padding: 0,
        background: '#1e293b',
      }}
    >
      <iframe
        title="Cutiscope User Manual"
        src={src}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#52525b',
        }}
      />
    </div>
  )
}
