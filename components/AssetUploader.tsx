'use client'

import { motion } from 'framer-motion'
import { Upload, X, FileText, Image, Video } from 'lucide-react'
import { useState, useCallback } from 'react'

interface AssetUploaderProps {
  onUpload?: (files: File[]) => void
}

export function AssetUploader({ onUpload }: AssetUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
      onUpload?.(newFiles)
    }
  }, [onUpload])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
      onUpload?.(newFiles)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image
    if (type.startsWith('video/')) return Video
    return FileText
  }

  return (
    <div className="space-y-4">
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        animate={{ scale: isDragActive ? 1.02 : 1 }}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? 'border-accent bg-accent/5'
            : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-gray-800 p-3">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-white">
              Arrastrá archivos o hacé clic para subir
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Videos, imágenes, screenshots, código
            </p>
          </div>
        </div>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const Icon = getFileIcon(file.type)
            return (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between rounded-xl bg-gray-900 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-800 p-2">
                    <Icon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-800 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}