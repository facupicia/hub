'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { createProject } from '@/lib/supabase'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    full_description: '',
    stack: [] as string[],
    status: 'draft' as 'draft' | 'in-progress' | 'completed',
    project_url: '',
    repo_url: '',
  })
  
  const [newTech, setNewTech] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      await createProject({
        name: formData.name,
        description: formData.description,
        full_description: formData.full_description,
        stack: formData.stack,
        status: formData.status,
        project_url: formData.project_url || undefined,
        repo_url: formData.repo_url || undefined,
      })
      
      router.push('/projects')
      router.refresh()
    } catch (err) {
      setError('Error creando el proyecto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addTech = () => {
    if (newTech.trim() && !formData.stack.includes(newTech.trim())) {
      setFormData({ ...formData, stack: [...formData.stack, newTech.trim()] })
      setNewTech('')
    }
  }

  const removeTech = (tech: string) => {
    setFormData({ ...formData, stack: formData.stack.filter(t => t !== tech) })
  }

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
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
          <h1 className="mt-4 text-3xl font-bold">Nuevo Proyecto</h1>
          <p className="mt-2 text-gray-400">
            Agregá un proyecto para empezar a generar contenido.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Información del proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="rounded-lg bg-red-900/20 p-4 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium">Nombre *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Content Factory"
                    className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium">Descripción corta *</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Una línea que resuma el proyecto"
                    className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium">Descripción completa</label>
                  <textarea
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    placeholder="Detalles, features, stack técnico..."
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  >
                    <option value="draft">Borrador</option>
                    <option value="in-progress">En progreso</option>
                    <option value="completed">Completado</option>
                  </select>
                </div>

                {/* Stack */}
                <div>
                  <label className="block text-sm font-medium">Stack tecnológico</label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                      placeholder="Ej: React"
                      className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                    />
                    <Button type="button" variant="secondary" onClick={addTech}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.stack.map((tech) => (
                      <Badge key={tech} variant="default" className="flex items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="ml-1 rounded-full p-0.5 hover:bg-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* URLs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium">URL del proyecto</label>
                    <input
                      type="url"
                      value={formData.project_url}
                      onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      placeholder="https://..."
                      className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">URL del repo</label>
                    <input
                      type="url"
                      value={formData.repo_url}
                      onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Link href="/projects" className="flex-1">
                    <Button variant="secondary" className="w-full" disabled={loading}>
                      Cancelar
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      'Crear Proyecto'
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}