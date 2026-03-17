'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Edit2, ExternalLink, Github, Play, Image as ImageIcon, FileText, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import { Card, CardContent } from '@/components/Card'

// Mock data
const project = {
  id: 1,
  name: 'Content Factory',
  description: 'Portfolio + fábrica de contenido personal. Transforma proyectos en clips virales automáticamente. Genera contenido para TikTok, Reels y Shorts sin esfuerzo.',
  stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'PostgreSQL'],
  status: 'En progreso',
  githubUrl: 'https://github.com/facupicia/content-factory',
  liveUrl: 'https://content-factory.vercel.app',
  createdAt: '2024-03-15',
  assets: [
    { id: 1, name: 'demo-hero.mp4', type: 'video', size: '12.5 MB', duration: '0:45' },
    { id: 2, name: 'screenshot-dashboard.png', type: 'image', size: '2.1 MB' },
    { id: 3, name: 'code-snippet.tsx', type: 'code', size: '4.2 KB' },
  ],
  contentQueue: [
    { id: 1, title: 'Demo del hero section', format: 'TikTok', status: 'ready' },
    { id: 2, title: 'Behind the scenes: Arquitectura', format: 'Reels', status: 'pending' },
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >n          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>
          
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <Badge variant={project.status === 'En progreso' ? 'warning' : 'success'}>
                  {project.status}
                </Badge>
              </div>
              <p className="mt-3 max-w-2xl text-gray-400">{project.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link href={`/projects/${params.id}/edit`}>
                <Button variant="secondary">
                  <Edit2 className="h-4 w-4" />
                  Editar
                </Button>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
              >
                <Github className="h-4 w-4" />
                Ver código
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
              >
                <Play className="h-4 w-4" />
                Demo en vivo
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Assets Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Assets</h2>
                <Button variant="ghost" size="sm">
                  + Agregar
                </Button>
              </div>
              <CardContent className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="group flex items-center gap-3 rounded-xl bg-gray-800/50 p-3 transition hover:bg-gray-800"
                    >
                      <div className="rounded-lg bg-gray-700 p-2">
                        {asset.type === 'video' && <Play className="h-4 w-4 text-accent" />}
                        {asset.type === 'image' && <ImageIcon className="h-4 w-4 text-green-400" />}
                        {asset.type === 'code' && <FileText className="h-4 w-4 text-yellow-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{asset.name}</p>
                        <p className="text-xs text-gray-500">
                          {asset.size}
                          {asset.duration && ` • ${asset.duration}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Content CTA */}
            <Card className="bg-gradient-to-br from-accent/10 to-purple-900/10 border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Generar contenido</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Creá clips para TikTok, Reels y Shorts automáticamente
                  </p>
                </div>
                <Link href="/engine">
                  <Button>
                    <Play className="h-4 w-4" />
                    Empezar
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-lg font-semibold">Cola de contenido</h2>
              <CardContent className="mt-4">
                {project.contentQueue.length > 0 ? (
                  <div className="space-y-3">
                    {project.contentQueue.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl bg-gray-800/50 p-3"
                      >
                        <div className={`rounded-full p-1.5 ${
                          item.status === 'ready' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                          <Clock className={`h-3 w-3 ${
                            item.status === 'ready' ? 'text-green-400' : 'text-yellow-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.format}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay contenido en cola. Generá tu primer clip desde el Engine Room.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold">Estadísticas</h2>
              <CardContent className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-800/50 p-4 text-center">
                    <p className="text-2xl font-bold text-accent">{project.assets.length}</p>
                    <p className="text-xs text-gray-500">Assets</p>
                  </div>
                  <div className="rounded-xl bg-gray-800/50 p-4 text-center">
                    <p className="text-2xl font-bold text-accent">{project.contentQueue.length}</p>
                    <p className="text-xs text-gray-500">En cola</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}