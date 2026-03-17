'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wand2, Video, Clock, CheckCircle, Play, Download, Sparkles, FolderOpen, Lightbulb, Film } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { getProjects, getAllContentIdeas, getStats, type Project, type ContentIdea } from '@/lib/supabase'

const templates = [
  {
    id: 1,
    name: 'Demo Rápida',
    description: 'Mostrá tu proyecto en 30 segundos con música upbeat',
    format: '9:16 (TikTok/Reels)',
    duration: '30s',
    style: 'Dinámico',
  },
  {
    id: 2,
    name: 'Behind the Scenes',
    description: 'Explicá el proceso de construcción, errores y aprendizajes',
    format: '9:16 (TikTok/Reels)',
    duration: '60s',
    style: 'Storytelling',
  },
  {
    id: 3,
    name: 'Code Review',
    description: 'Destacá un snippet interesante de tu código',
    format: '1:1 (Feed)',
    duration: '45s',
    style: 'Educativo',
  },
  {
    id: 4,
    name: 'Hot Take',
    description: 'Opinión polémica sobre una decisión técnica',
    format: '9:16 (TikTok/Reels)',
    duration: '30s',
    style: 'Opinión',
  },
]

export default function EnginePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalIdeas: 0,
    pendingIdeas: 0,
    inProduction: 0,
    publishedContent: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [projectsData, ideasData, statsData] = await Promise.all([
        getProjects(),
        getAllContentIdeas(),
        getStats(),
      ])
      setProjects(projectsData)
      setIdeas(ideasData)
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
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

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Wand2 className="h-4 w-4" />
            Engine Room
          </span>
          <h1 className="mt-6 text-4xl font-bold">Fábrica de Contenido</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Transformá tus proyectos en clips listos para publicar. Elegí un template, 
            seleccioná assets y dejá que el engine haga el resto.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Card>
            <CardContent className="flex items-center gap-4 py-6">
              <div className="rounded-full bg-accent/10 p-3">
                <FolderOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalProjects}</p>
                <p className="text-sm text-gray-500">Proyectos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 py-6">
              <div className="rounded-full bg-yellow-500/10 p-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalIdeas}</p>
                <p className="text-sm text-gray-500">Ideas totales</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 py-6">
              <div className="rounded-full bg-blue-500/10 p-3">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pendingIdeas}</p>
                <p className="text-sm text-gray-500">Pendientes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 py-6">
              <div className="rounded-full bg-green-500/10 p-3">
                <Film className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.publishedContent}</p>
                <p className="text-sm text-gray-500">Publicados</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link href="/projects">
            <Button variant="primary" size="lg">
              <Sparkles className="h-5 w-5" />
              Crear contenido nuevo
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            <Video className="h-5 w-5" />
            Screen recorder
          </Button>
        </motion.div>

        {/* Templates Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">Templates disponibles</h2>
          <p className="mt-2 text-gray-400">Elegí el formato que mejor se adapte a tu contenido</p>
          
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card hover>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <Badge variant="accent">{template.style}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        {template.format}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {template.duration}
                      </span>
                    </div>
                    <Button variant="secondary" className="mt-4 w-full">
                      Usar template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Ideas */}
        {ideas.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold">Ideas recientes</h2>
            <p className="mt-2 text-gray-400">Últimas ideas de contenido generadas</p>
            
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {ideas.slice(0, 4).map((idea) => {
                const project = projects.find(p => p.id === idea.project_id)
                return (
                  <Card key={idea.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{idea.title}</p>
                          <p className="text-sm text-gray-500">
                            {project?.name || 'Proyecto desconocido'} • {idea.type}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            idea.status === 'published' ? 'success' : 
                            idea.status === 'in-production' ? 'accent' : 'default'
                          }
                        >
                          {idea.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 rounded-2xl border border-dashed border-gray-700 bg-gray-900/30 p-12 text-center"
          >
            <div className="rounded-full bg-gray-800 p-4 mx-auto w-fit">
              <FolderOpen className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No hay proyectos aún</h3>
            <p className="mt-1 text-gray-500">
              Creá tu primer proyecto para empezar a generar contenido
            </p>
            <Link href="/projects/new" className="mt-6 inline-block">
              <Button>Crear Proyecto</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}