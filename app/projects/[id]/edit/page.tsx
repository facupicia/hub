'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { AssetUploader } from '@/components/AssetUploader'

// Mock data
const projectData = {
  id: 1,
  name: 'Content Factory',
  description: 'Portfolio + fábrica de contenido personal. Transforma proyectos en clips virales automáticamente.',
  stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'PostgreSQL'],
  status: 'En progreso',
  githubUrl: 'https://github.com/facupicia/content-factory',
  liveUrl: 'https://content-factory.vercel.app',
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState(projectData)
  const [newTech, setNewTech] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Actualizando proyecto:', formData)
  }

  const addTech = () => {
    if (newTech && !formData.stack.includes(newTech)) {
      setFormData({ ...formData, stack: [...formData.stack, newTech] })
      setNewTech('')
    }
  }

  const removeTech = (tech: string) => {
    setFormData({ ...formData, stack: formData.stack.filter((t) => t !== tech) })
  }

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al proyecto
          </Link>
          <h1 className="mt-6 text-4xl font-bold">Editar Proyecto</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Información básica</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Stack</label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    placeholder="Agregar tecnología"
                    className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <Button type="button" onClick={addTech} variant="secondary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Archivado">Archivado</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">GitHub</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Demo en vivo</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="mt-2 block w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6">
            <h2 className="text-lg font-semibold">Nuevos Assets</h2>
            <p className="mt-1 text-sm text-gray-400">
              Agregá más screenshots, videos o código al proyecto.
            </p>
            <div className="mt-6">
              <AssetUploader />
            </div>
          </section>

          <div className="flex items-center justify-between">
            <Button type="button" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4" />
              Eliminar proyecto
            </Button>
            <div className="flex gap-3">
              <Link href={`/projects/${params.id}`}>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="primary">
                <Save className="h-4 w-4" />
                Guardar cambios
              </Button>
            </div>
          </div>
        </motion.form>
      </div>
    </main>
  )
}