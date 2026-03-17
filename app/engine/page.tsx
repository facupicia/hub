'use client'

import { motion } from 'framer-motion'
import { Wand2, Video, Clock, CheckCircle, Play, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Badge } from '@/components/Badge'

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

const queue = [
  { id: 1, project: 'Content Factory', template: 'Demo Rápida', status: 'ready', createdAt: 'Hace 2 horas' },
  { id: 2, project: 'Content Factory', template: 'Behind the Scenes', status: 'rendering', createdAt: 'Hace 5 minutos' },
]

export default function EnginePage() {
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
          transition={{ delay: 0.2 }}
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
                transition={{ delay: 0.3 + index * 0.1 }}
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

        {/* Queue */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold">Cola de renderizado</h2>
          <p className="mt-2 text-gray-400">Videos en proceso y listos para descargar</p>
          
          <div className="mt-6 space-y-4">
            {queue.map((item) => (
              <Card key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full p-2 ${
                      item.status === 'ready' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {item.status === 'ready' ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.template}</p>
                      <p className="text-sm text-gray-500">
                        {item.project} • {item.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={item.status === 'ready' ? 'success' : 'warning'}>
                      {item.status === 'ready' ? 'Listo' : 'Renderizando...'}
                    </Badge>
                    {item.status === 'ready' && (
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    {item.status === 'ready' && (
                      <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}