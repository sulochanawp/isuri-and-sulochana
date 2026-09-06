import { useState, useEffect, useRef, useCallback } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe } from './Hero'
import Footer from './Footer'
import lotusLight from '../assets/lotus-light.svg?raw'

function useIsRevealed(revealTime) {
  const [revealed, setRevealed] = useState(() => Date.now() >= revealTime.getTime())
  useEffect(() => {
    if (revealed) return
    const id = setInterval(() => {
      if (Date.now() >= revealTime.getTime()) { setRevealed(true); clearInterval(id) }
    }, 30_000)
    return () => clearInterval(id)
  }, [revealTime, revealed])
  return revealed
}

function SmallLotus() {
  return (
    <span
      className="inline-block w-[120px] [&>svg]:w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: lotusLight }}
    />
  )
}

const ACCEPTED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
  'video/mp4', 'video/quicktime',
]
const ACCEPT_ATTR = 'image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,.heic,.heif,.mov'

async function getUploadUrl(filename, mimeType, uploaderName) {
  const ts   = new Date().toISOString().replace(/[:.]/g, '-')
  const name = `${uploaderName}_${ts}_${filename}`
  const url  = `${WEDDING.appsScriptUrl}?action=getUploadUrl` +
               `&folderId=${encodeURIComponent(WEDDING.photoUploadFolderId)}` +
               `&filename=${encodeURIComponent(name)}` +
               `&mimeType=${encodeURIComponent(mimeType || 'application/octet-stream')}`
  const res  = await fetch(url)
  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Could not get upload URL')
  return data.uploadUrl
}

function uploadFileDirect(file, uploadUrl, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(e.loaded / e.total) }
    xhr.onload    = () => { xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Error ${xhr.status}`)) }
    xhr.onerror   = () => reject(new Error('Network error'))
    xhr.ontimeout = () => reject(new Error('Timed out'))
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')
    xhr.send(file)
  })
}

function isVideo(file) { return file.type.startsWith('video/') }

function DropZone({ onFiles, disabled }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    const files = [...e.dataTransfer.files].filter(
      f => ACCEPTED_TYPES.includes(f.type) || f.name.match(/\.(heic|heif|mov)$/i)
    )
    if (files.length) onFiles(files)
  }, [onFiles, disabled])

  return (
    <div
      onDragEnter={() => !disabled && setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`border-2 border-dashed transition-all duration-200 cursor-pointer
                  flex flex-col items-center justify-center py-10 px-6 text-center
                  ${dragging ? 'border-olive-500 bg-olive-50/60' : 'border-line hover:border-olive-400 hover:bg-pearl-50'}
                  ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT_ATTR}
        onChange={(e) => { if (e.target.files.length) onFiles([...e.target.files]); e.target.value = '' }}
        className="hidden"
        disabled={disabled}
      />
      <svg className="w-10 h-10 text-olive-400 mb-3" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6.5 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1.5M15 3h-6l-1.5 2.5h9L15 3ZM12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
      <p className="font-sans text-sm text-ink mb-1">
        {dragging ? 'Drop here to add' : 'Drag & drop photos or videos'}
      </p>
      <p className="font-sans text-xs text-muted">or click to browse · JPG · PNG · HEIC · MP4 · MOV</p>
    </div>
  )
}

function Thumbnail({ item, onRemove }) {
  const canRemove = item.status !== 'uploading'
  return (
    <div className="relative group aspect-square bg-line overflow-hidden">
      {isVideo(item.file) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/10 p-1">
          <svg className="w-6 h-6 text-olive-600 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
          <p className="text-olive-700 text-[9px] font-sans text-center truncate w-full px-1">{item.file.name}</p>
        </div>
      ) : (
        <img src={item.preview} alt={item.file.name} className="w-full h-full object-cover" />
      )}

      {canRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(item.id) }}
          className="absolute top-1 right-1 w-5 h-5 bg-pearl-100 text-ink flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity text-xs leading-none z-10"
          aria-label="Remove"
        >✕</button>
      )}

      {item.status === 'uploading' && (
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-ink/30 p-1.5">
          <div className="w-full h-1 bg-pearl-100/40 overflow-hidden">
            <div
              className="h-full bg-pearl-100 transition-all duration-200"
              style={{ width: `${Math.round((item.progress || 0) * 100)}%` }}
            />
          </div>
        </div>
      )}
      {item.status === 'done' && (
        <div className="absolute inset-0 flex items-center justify-center bg-olive-700/50">
          <svg className="w-6 h-6 text-pearl-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      {item.status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-700/50">
          <svg className="w-6 h-6 text-pearl-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}
    </div>
  )
}

let idSeq = 0

export function PhotoUploadPage() {
  const revealed                        = useIsRevealed(WEDDING.photoRevealTime)
  const [uploaderName, setUploaderName] = useState('')
  const [nameError, setNameError]       = useState(false)
  const [items, setItems]               = useState([])
  const [phase, setPhase]               = useState('idle')
  const [progress, setProgress]         = useState({ current: 0, total: 0 })

  const addFiles = useCallback((files) => {
    const newItems = files.map(file => ({
      id:       ++idSeq,
      file,
      preview:  isVideo(file) ? null : URL.createObjectURL(file),
      status:   'pending',
      progress: 0,
    }))
    setItems(prev => [...prev, ...newItems])
  }, [])

  const removeItem = (id) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id)
      if (item?.preview) URL.revokeObjectURL(item.preview)
      return prev.filter(i => i.id !== id)
    })
  }

  const handleUpload = async () => {
    if (!uploaderName.trim()) { setNameError(true); return }
    setNameError(false)

    const pending = items.filter(i => i.status === 'pending' || i.status === 'error')
    if (!pending.length) return

    setItems(prev => prev.map(it =>
      it.status === 'error' ? { ...it, status: 'pending', progress: 0 } : it
    ))
    setPhase('uploading')
    setProgress({ current: 0, total: pending.length })

    let anyError = false

    for (let i = 0; i < pending.length; i++) {
      const item = pending[i]
      setProgress({ current: i + 1, total: pending.length })
      setItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'uploading', progress: 0 } : it))

      try {
        const uploadUrl = await getUploadUrl(item.file.name, item.file.type, uploaderName.trim())
        await uploadFileDirect(item.file, uploadUrl, (progress) => {
          setItems(prev => prev.map(it => it.id === item.id ? { ...it, progress } : it))
        })
        setItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'done', progress: 1 } : it))
      } catch {
        anyError = true
        setItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'error' } : it))
      }
    }

    setPhase(anyError ? 'error' : 'done')
  }

  const pendingCount = items.filter(i => i.status === 'pending' || i.status === 'error').length
  const uploading    = phase === 'uploading'
  const allDone      = phase === 'done' && items.length > 0 && items.every(i => i.status === 'done')

  /* ── Pre-reveal holding page ── */
  if (!revealed) {
    return (
      <div className="min-h-screen bg-pearl-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6"><SmallLotus /></div>
        <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
          {WEDDING.date}
        </p>
        <h2 className="font-serif text-3xl text-ink font-light mb-4">Photos Open on the Day</h2>
        <div className="flex items-center gap-4 my-4 opacity-20 w-32">
          <div className="flex-1 border-t border-ink" />
          <div className="w-1.5 h-1.5 rotate-45 bg-ink" />
          <div className="flex-1 border-t border-ink" />
        </div>
        <p className="text-muted text-sm max-w-xs leading-relaxed">
          The photo upload will open on the morning of the wedding.
          Please come back then to share your memories with us.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl-100 flex flex-col">

      <div className="flex flex-col items-center px-6 pt-10 pb-6">
        <FloralStripe className="mb-10 w-full" />
        <p className="text-olive-600 text-xs tracking-[0.4em] uppercase font-sans mb-3">
          {WEDDING.date}
        </p>
        <h1 className="section-heading mb-1">Share Your Moments</h1>
        <LotusDivider />
        <p className="text-muted text-sm mt-5 leading-relaxed max-w-sm text-center">
          Thank you for celebrating with us today. We would love to see the day
          through your eyes — share your favourite photos and videos below.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pb-16">
        <div className="card corner-ornament w-full max-w-lg overflow-hidden">

          <div className="bg-olive-700 px-8 py-5 text-center -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-7">
            <p className="text-pearl-300/60 text-xs tracking-[0.35em] uppercase font-sans mb-1">
              Isuri &amp; Sulochana
            </p>
            <p className="font-serif text-xl text-pearl-100 font-light tracking-wide">
              Guest Photos
            </p>
          </div>

          {allDone ? (
            <div className="flex flex-col items-center py-8 text-center">
              <svg className="w-12 h-12 text-olive-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-serif text-2xl text-ink font-light mb-2">Received — thank you!</h3>
              <p className="text-muted text-sm leading-relaxed max-w-xs">
                Your photos are saved in our wedding album. We are so grateful to share this day with you.
              </p>
              <button onClick={() => { setItems([]); setPhase('idle') }} className="btn-secondary mt-6">
                Upload More
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-muted mb-2">Your Name</label>
                <input
                  type="text"
                  value={uploaderName}
                  onChange={e => { setUploaderName(e.target.value); if (e.target.value.trim()) setNameError(false) }}
                  placeholder="e.g. Auntie Kamala"
                  className={`input-field ${nameError ? 'border-red-400' : ''}`}
                  disabled={uploading}
                />
                {nameError && (
                  <p className="text-xs text-red-500 font-sans mt-1.5">Please enter your name before uploading.</p>
                )}
              </div>

              <div className="mb-5">
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-muted mb-2">
                  Photos &amp; Videos
                </label>
                <DropZone onFiles={addFiles} disabled={uploading} />
              </div>

              {items.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-5">
                  {items.map(item => (
                    <Thumbnail key={item.id} item={item} onRemove={removeItem} />
                  ))}
                </div>
              )}

              {uploading && (
                <div className="mb-5">
                  <div className="flex justify-between font-sans text-xs text-muted mb-1.5">
                    <span>Uploading…</span>
                    <span>{progress.current} of {progress.total}</span>
                  </div>
                  <div className="w-full h-1 bg-line">
                    <div
                      className="h-1 bg-olive-500 transition-all duration-300"
                      style={{ width: `${(progress.current / progress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {phase === 'error' && (
                <p className="text-sm text-red-600 font-sans mb-4 text-center">
                  Some files could not be uploaded. Tap Upload to try again.
                </p>
              )}

              <button
                onClick={handleUpload}
                disabled={!pendingCount || uploading}
                className={`btn-primary w-full ${!pendingCount || uploading ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {uploading
                  ? `Uploading ${progress.current} of ${progress.total}…`
                  : pendingCount
                    ? `Upload ${pendingCount} File${pendingCount !== 1 ? 's' : ''}`
                    : 'Select Files to Upload'}
              </button>

              <p className="text-xs text-muted font-sans mt-4 text-center leading-relaxed">
                Files are sent directly to our private Drive folder.
                Photos and videos of any size are supported.
              </p>
            </>
          )}
        </div>
      </div>

      <Footer showMap={false} showWhatsApp={false} showRsvpButton={false} />
    </div>
  )
}
