'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Pencil, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { AssetUploader } from '@/components/AssetUploader'
import { getProjectById, getAssetsByProjectId, getContentIdeasByProjectId, deleteProject, type Project, type Asset, type ContentIdea } from '@/lib/supabase'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [assets, setAssets] = useState<Asset[]>([])
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadProject()
  }, [params.id])

  async function loadProject() {
    try {
      setLoading(true)
      const [projectData, assetsData, ideasData] = await Promise.all([
        getProjectById(params.id),
        getAssetsByProjectId(params.id),
        getContentIdeasByProjectId(params.id),
      ])
      
      if (!projectData) {
        router.push('/projects')
        return
      }
      
      setProject(projectData)
      setAssets(assetsData)
      setIdeas(ideasData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return
    
    try {
      setDeleting(true)
      await deleteProject(params.id)
      router.push('/projects')
      router.refresh()
    } catch (err) {
      console.error(err)
      setDeleting(false)
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
        <div className="mx-auto max-w-4xl">
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        </div>
      </main>
    )
  }

  if (!project) return null

  return (
    <main className="min-h-screen px-6 py-12 pb-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
          
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge variant={getStatusVariant(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
              </div>
              <p className="mt-2 text-gray-400">{project.description}</p>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/projects/${project.id}/edit`}>
                <Button variant="secondary" size="sm">
                  <Pencil className="h-4 w-4" />
                  Editar
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="mt-4 flex flex-wrap gap-3">
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
                Ver proyecto
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700"
              >
                <Github className="h-4 w-4" />
                Ver código
              </a>
            )}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {project.full_description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre el proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      {project.full_description.split('\n').map((paragraph, i) => (
                        <p key={i} className="text-gray-300">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Assets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetUploader />
                  
                  {assets.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {assets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex items-center gap-3 rounded-xl bg-gray-800 p-3"
                        >
                          <div className="rounded-lg bg-gray-700 p-2">
                            {asset.type === 'image' ? '🖼️' : asset.type === 'video' ? '🎥' : '📄'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium">{asset.name}</p>
                            <p className="text-xs text-gray-500">
                              {(asset.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.stack?.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Ideas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Ideas de contenido</CardTitle>
                </CardHeader>
                <CardContent>
                  {ideas.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay ideas aún. Agregá ideas desde el Engine Room.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {ideas.slice(0, 5).map((idea) => (
                        <div
                          key={idea.id}
                          className="rounded-lg bg-gray-800 p-3"
                        >
                          <p className="text-sm font-medium">{idea.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge 
                              variant={
                                idea.status === 'published' ? 'success' : 
                                idea.status === 'in-production' ? 'accent' : 'default'
                              }
                              className="text-xs"
                            >
                              {idea.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{idea.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}