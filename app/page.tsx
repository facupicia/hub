'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Video, Layers, FolderOpen, Lightbulb, Film } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { getStats } from '@/lib/supabase'

export default function Home() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalIdeas: 0,
    publishedContent: 0,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats()
        setStats(data)
      } catch (err) {
        console.error(err)
      }
    }
    loadStats()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Portfolio + Fábrica de Contenido
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Tu trabajo,{' '}
            <span className="text-accent">convertido en contenido</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-400"
          >
            Un portfolio que no solo muestra proyectos, sino que los transforma 
            automáticamente en clips listos para TikTok, Reels y Shorts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link href="/projects">
              <Button size="lg">
                Ver Proyectos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/engine">
              <Button variant="secondary" size="lg">
                <Video className="h-4 w-4" />
                Engine Room
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-4 sm:grid-cols-3"
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
                  <p className="text-sm text-gray-500">Ideas</p>
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Layers,
                title: 'Showroom',
                description: 'Portfolio diseñado para viralizar. Cada proyecto con formatos de contenido pre-armados.',
              },
              {
                icon: Video,
                title: 'Render Pipeline',
                description: 'Subís materia prima, te devuelve videos recortados para cada plataforma con subs automáticas.',
              },
              {
                icon: Sparkles,
                title: 'Idea Bank',
                description: 'Guardá sparks de ideas, se mezclan con tus proyectos para sugerir contenido nuevo.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="py-8">
                    <feature.icon className="h-8 w-8 text-accent" />
                    <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent/20 to-purple-900/20 p-12 text-center"
        >
          <h2 className="text-3xl font-bold">Empezá a construir</h2>
          <p className="mt-4 text-gray-400">
            Conectado a Supabase. Tus proyectos se guardan en la nube.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/projects/new">
              <Button size="lg">
                <Sparkles className="h-4 w-4" />
                Crear Primer Proyecto
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}