'use client'

import { motion } from 'framer-motion'
import { Plus, ExternalLink, Clock, CheckCircle, PauseCircle } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/Card'
import { Badge } from '@/components/Badge'

const projects = [
  {
    id: 1,
    name: 'Content Factory',
    description: 'Portfolio + fábrica de contenido personal. Transforma proyectos en clips virales.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    status: 'En progreso',
    assetsCount: 5,
    contentCount: 2,
    updatedAt: 'Hace 2 horas',
  },
  {
    id: 2,
    name: 'Task Manager Pro',
    description: 'App de gestión de tareas con drag & drop, colaboración en tiempo real y notificaciones.',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    status: 'Completado',
    assetsCount: 12,
    contentCount: 8,
    updatedAt: 'Hace 3 días',
  },
  {
    id: 3,
    name: 'Crypto Dashboard',
    description: 'Dashboard de criptomonedas con precios en tiempo real, gráficos y alertas personalizadas.',
    stack: ['Vue.js', 'Python', 'FastAPI', 'PostgreSQL'],
    status: 'Mantenimiento',
    assetsCount: 8,
    contentCount: 4,
    updatedAt: 'Hace 1 semana',
  },
  {
    id: 4,
    name: 'AI Image Generator',
    description: 'Generador de imágenes con IA usando Stable Diffusion y fine-tuning personalizado.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'React'],
    status: 'En progreso',
    assetsCount: 3,
    contentCount: 0,
    updatedAt: 'Hace 5 días',
  },
]

const statusConfig = {
  'En progreso': { icon: Clock, variant: 'warning' as const },
  'Completado': { icon: CheckCircle, variant: 'success' as const },
  'Mantenimiento': { icon: PauseCircle, variant: 'accent' as const },
  'Archivado': { icon: PauseCircle, variant: 'default' as const },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Proyectos</h1>
            <p className="mt-2 text-gray-400">
              Tu trabajo, organizado y listo para convertir en contenido.
            </p>
          </div>
          <Link
            href="/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            <Plus className="h-4 w-4" />
            Nuevo Proyecto
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: 'Total proyectos', value: projects.length },
            { label: 'En progreso', value: projects.filter(p => p.status === 'En progreso').length },
            { label: 'Assets totales', value: projects.reduce((acc, p) => acc + p.assetsCount, 0) },
            { label: 'Videos generados', value: projects.reduce((acc, p) => acc + p.contentCount, 0) },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-800 bg-gray-900/30 p-4"
            >
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon
            const statusVariant = statusConfig[project.status as keyof typeof statusConfig].variant
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <Card hover className="h-full">
                    <CardContent>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-full p-1.5 ${
                            project.status === 'Completado' ? 'bg-green-500/20' : 
                            project.status === 'En progreso' ? 'bg-yellow-500/20' : 'bg-gray-700/50'
                          }`}>
                            <StatusIcon className={`h-4 w-4 ${
                              project.status === 'Completado' ? 'text-green-400' : 
                              project.status === 'En progreso' ? 'text-yellow-400' : 'text-gray-400'
                            }`} />
                          </div>
                          <Badge variant={statusVariant}>{project.status}</Badge>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-500 transition group-hover:text-accent" />
                      </div>

                      <h3 className="mt-4 text-xl font-semibold transition group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-500">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-4 text-sm text-gray-500">
                        <div className="flex gap-4">
                          <span>{project.assetsCount} assets</span>
                          <span>{project.contentCount} videos</span>
                        </div>
                        <span>{project.updatedAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}

          {/* Add New Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Link href="/projects/new">
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-900/30 p-6 transition hover:border-accent/50 hover:bg-gray-900/50">
                <div className="rounded-full bg-gray-800 p-4 transition group-hover:bg-accent/20">
                  <Plus className="h-6 w-6 text-gray-400 transition group-hover:text-accent" />
                </div>
                <p className="mt-4 font-medium text-gray-400">Agregar proyecto</p>
                <p className="mt-1 text-sm text-gray-600">Empezá a generar contenido</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}