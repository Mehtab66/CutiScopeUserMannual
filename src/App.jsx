import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Document, Outline, Page, pdfjs } from 'react-pdf'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export default function App() {
  const envUrl = import.meta.env.VITE_MANUAL_PDF_URL
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const defaultPath = '/UserManual.pdf'
  const file = useMemo(
    () => envUrl || (base ? `${base}${defaultPath}` : defaultPath),
    [envUrl, base],
  )
  const [numPages, setNumPages] = useState(0)
  const [error, setError] = useState('')
  const [pageWidth, setPageWidth] = useState(900)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pagesRef = useRef({})

  useEffect(() => {
    const updateWidth = () => {
      const isDesktop = window.innerWidth >= 960
      setIsMobile(!isDesktop)
      const horizontalPadding = isDesktop ? 56 : 24
      const sidebarWidth = isDesktop ? 320 : 0
      setPageWidth(Math.max(280, window.innerWidth - sidebarWidth - horizontalPadding))
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const onLoadSuccess = useCallback(async (loadedPdf) => {
    const totalPages = loadedPdf.numPages
    setError('')
    setNumPages(totalPages)
  }, [])

  const onLoadError = useCallback((loadError) => {
    setNumPages(0)
    setError(loadError?.message || 'Unable to open PDF')
  }, [])

  const goToPage = useCallback((pageNumber) => {
    const target = pagesRef.current[pageNumber]
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsSidebarOpen(false)
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        margin: 0,
        padding: 0,
        background: '#1e293b',
        boxSizing: 'border-box',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {isMobile && isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close table of contents"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            border: 'none',
            background: 'rgba(2, 6, 23, 0.5)',
            zIndex: 19,
          }}
        />
      ) : null}

      {isMobile ? (
        <button
          type="button"
          onClick={() => setIsSidebarOpen((open) => !open)}
          aria-label="Toggle table of contents"
          style={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 21,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: 8,
            padding: '8px 11px',
            fontSize: 18,
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          &#9776;
        </button>
      ) : null}

      <Document
        file={file}
        className="pdf-shell"
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<p style={{ color: '#f8fafc', padding: 12 }}>Loading PDF...</p>}
      >
        <aside
          style={{
            width: 320,
            maxWidth: '82vw',
            borderRight: '1px solid #334155',
            padding: 12,
            boxSizing: 'border-box',
            overflowY: 'auto',
            color: '#f8fafc',
            background: '#0f172a',
            position: isMobile ? 'fixed' : 'relative',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 20,
            transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Table of Contents</div>
          <Outline
            onItemClick={({ pageNumber }) => {
              if (pageNumber) goToPage(pageNumber)
            }}
          />
        </aside>

        <main className="pdf-main" style={{ padding: 12, boxSizing: 'border-box' }}>
          {error ? (
            <div style={{ color: '#fecaca' }}>
              {error}
              <br />
              Try opening <a href={file}>the PDF directly</a>.
            </div>
          ) : (
            Array.from({ length: numPages }, (_, index) => (
              <div
                key={index + 1}
                ref={(el) => {
                  pagesRef.current[index + 1] = el
                }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))
          )}
        </main>
      </Document>
    </div>
  )
}
