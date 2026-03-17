'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, FolderOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { getProjects, type Project } from '@/lib/supabase'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError('Error cargando proyectos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'accent'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'in-progress': return 'En progreso'
      default: return 'Borrador'
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-800 bg-red-900/20 p-8 text-center">
            <p className="text-red-400">{error}</p>
            <Button variant="secondary" className="mt-4" onClick={loadProjects}>
              Reintentar
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Proyectos</h1>
            <p className="mt-2 text-gray-400">
              Tu trabajo, organizado y listo para convertir en contenido.
            </p>
          </div>
          <Link href="/projects/new">
            <Button>
              <Plus className="h-4 w-4" />
              Nuevo Proyecto
            </Button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-900/30 p-16"
          >
            <div className="rounded-full bg-gray-800 p-4">
              <FolderOpen className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No hay proyectos aún</h3>
            <p className="mt-1 text-sm text-gray-500">
              Creá tu primer proyecto para empezar a generar contenido
            </p>
            <Link href="/projects/new" className="mt-6">
              <Button>Crear Proyecto</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <Card hover className="h-full">
                    <CardContent className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <Badge variant={getStatusVariant(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                      
                      <h3 className="mt-4 text-xl font-semibold">{project.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                        {project.description}
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack?.length > 4 && (
                          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-500">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 text-xs text-gray-500">
                        Actualizado {new Date(project.updated_at).toLocaleDateString('es-AR')}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}