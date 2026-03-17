'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Video, Layers, Zap, Wand2, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Layers,
    title: 'Showroom',
    description: 'Portfolio diseñado para viralizar. Cada proyecto tiene formatos de contenido pre-armados.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Video,
    title: 'Render Pipeline',
    description: 'Subís materia prima, te devuelve videos recortados para cada plataforma con subs automáticas.',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Zap,
    title: 'Idea Bank',
    description: 'Guardá sparks de ideas, se mezclan con tus proyectos para sugerir contenido nuevo.',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: Wand2,
    title: 'Auto-Generate',
    description: 'Cada proyecto nuevo genera automáticamente clips listos para revisar y publicar.',
    color: 'from-green-500/20 to-emerald-500/20',
  },
]

const steps = [
  { number: '01', title: 'Subí tu proyecto', description: 'Agregá código, screenshots y videos de demo.' },
  { number: '02', title: 'Elegí un template', description: 'Demo rápida, behind the scenes, code review, hot take.' },
  { number: '03', title: 'Renderizá', description: 'El engine arma el video con subs, música y transiciones.' },
  { number: '04', title: 'Publicá', description: 'Descargá en el formato perfecto para cada plataforma.' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
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
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              convertido en contenido
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400"
          >
            Un portfolio que no solo muestra proyectos, sino que los transforma 
            automáticamente en clips listos para TikTok, Reels y Shorts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:scale-105 active:scale-95"
            >
              Ver Proyectos
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/engine"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/50 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-gray-800"
            >
              <Wand2 className="h-5 w-5" />
              Probar Engine
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Dos sistemas, un objetivo</h2>
            <p className="mt-4 text-gray-400">Showroom para mostrar, Engine Room para crear contenido</p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br ${feature.color} p-8 transition-all hover:border-gray-700`}>
                  <div className="absolute inset-0 bg-gray-900/90" />
                  <div className="relative">
                    <div className="inline-flex rounded-xl bg-gray-800 p-3">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Cómo funciona</h2>
            <p className="mt-4 text-gray-400">De proyecto a contenido viral en 4 pasos</p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative"
              >
                <span className="text-5xl font-bold text-gray-800">{step.number}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-8 hidden h-px w-8 bg-gray-800 lg:block" />
                )}
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
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent/20 via-purple-900/20 to-accent/10 p-12 text-center"
        >
          <h2 className="text-3xl font-bold">Empezá a construir</h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Fase 1: Foundation — Portfolio con sistema de proyectos, upload de assets y templates de contenido.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-hover hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              Crear Primer Proyecto
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="font-semibold">Content Factory</span>
            </div>
            <p className="text-sm text-gray-500">
              Hecho con Next.js, Tailwind y mucho café
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/facupicia" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}