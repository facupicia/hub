'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { AssetUploader } from '@/components/AssetUploader'

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stack: '',
    githubUrl: '',
    liveUrl: '',
    status: 'En progreso',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Guardar en DB
    console.log('Guardando proyecto:', formData)
  }

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>
          <h1 className="mt-6 text-4xl font-bold">Nuevo Proyecto</h1>
          <p className="mt-2 text-gray-400">
            Agregá un proyecto a tu portfolio. Después podés generar contenido automáticamente.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          {/* Basic Info */}
          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Información básica</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Content Factory"
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="¿Qué hace este proyecto? ¿Qué problema resuelve?"
                  rows={4}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Stack tecnológico
                </label>
                <input
                  type="text"
                  value={formData.stack}
                  onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                  placeholder="Ej: Next.js, TypeScript, Tailwind, PostgreSQL"
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separá las tecnologías con comas
                </p>
              </div>
            </div>
          </section>

          {/* Links */}
          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Demo en vivo
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </section>

          {/* Assets */}
          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Assets</h2>
            <p className="mt-1 text-sm text-gray-400">
              Subí screenshots, videos de demo, grabaciones de pantalla. Se usarán para generar contenido.
            </p>
            <div className="mt-6">
              <AssetUploader />
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="ghost">
              <Trash2 className="h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="h-4 w-4" />
              Guardar proyecto
            </Button>
          </div>
        </motion.form>
      </div>
    </main>
  )
}