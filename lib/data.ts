export interface Project {
  id: string
  name: string
  description: string
  fullDescription?: string
  stack: string[]
  status: 'draft' | 'in-progress' | 'completed'
  projectUrl?: string
  repoUrl?: string
  thumbnail?: string
  assetsCount: number
  contentCount: number
  createdAt: string
  updatedAt: string
}

export interface ContentIdea {
  id: string
  projectId: string
  title: string
  description: string
  type: 'demo' | 'tutorial' | 'behind-scenes' | 'hot-take' | 'code-review'
  status: 'pending' | 'in-production' | 'published'
  platforms: ('tiktok' | 'instagram' | 'youtube' | 'twitter')[]
  createdAt: string
}

export interface Asset {
  id: string
  projectId: string
  name: string
  type: 'image' | 'video' | 'code' | 'document'
  url: string
  size: number
  createdAt: string
}

export interface RenderJob {
  id: string
  projectId: string
  contentIdeaId: string
  status: 'queued' | 'rendering' | 'completed' | 'failed'
  progress: number
  outputUrl?: string
  createdAt: string
  completedAt?: string
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Content Factory',
    description: 'Portfolio + fábrica de contenido personal. Transforma proyectos en clips virales.',
    fullDescription: `Content Factory es una plataforma que combina un portfolio moderno con un sistema de generación de contenido automático.

Características principales:
- Portfolio interactivo con animaciones fluidas
- Sistema de gestión de proyectos con estados
- Upload de assets (videos, imágenes, código)
- Templates de contenido pre-armados
- Pipeline de renderizado automático
- Integración con múltiples plataformas sociales

Tecnologías utilizadas:
- Next.js 14 con App Router
- TypeScript para type safety
- Tailwind CSS para estilos
- Framer Motion para animaciones
- FFmpeg para procesamiento de video`,
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'FFmpeg'],
    status: 'in-progress',
    projectUrl: 'https://content-factory.vercel.app',
    repoUrl: 'https://github.com/facupicia/content-factory',
    thumbnail: '/thumbnails/content-factory.jpg',
    assetsCount: 12,
    contentCount: 5,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-17T08:30:00Z',
  },
  {
    id: '2',
    name: 'Task Manager Pro',
    description: 'App de gestión de tareas con drag & drop, colaboración en tiempo real y notificaciones.',
    fullDescription: `Task Manager Pro es una aplicación completa de gestión de tareas diseñada para equipos.

Funcionalidades:
- Tableros Kanban con drag & drop
- Colaboración en tiempo real
- Notificaciones push
- Etiquetas y filtros avanzados
- Integración con calendarios
- Reportes de productividad

Stack técnico:
- React con hooks personalizados
- Node.js + Express
- Socket.io para websockets
- MongoDB con Mongoose
- Redis para caching`,
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    status: 'completed',
    projectUrl: 'https://taskmanager.pro',
    repoUrl: 'https://github.com/facupicia/task-manager',
    thumbnail: '/thumbnails/task-manager.jpg',
    assetsCount: 24,
    contentCount: 12,
    createdAt: '2023-08-20T14:00:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
  },
  {
    id: '3',
    name: 'Crypto Dashboard',
    description: 'Dashboard de criptomonedas con precios en tiempo real, gráficos y alertas personalizadas.',
    fullDescription: `Un dashboard completo para traders de criptomonedas.

Features:
- Precios en tiempo real vía WebSocket
- Gráficos de velas interactivos
- Alertas de precio por email/SMS
- Portfolio tracking
- Análisis técnico básico
- Dark mode por defecto

Implementación:
- Vue.js 3 con Composition API
- Python FastAPI backend
- PostgreSQL para datos históricos
- WebSocket para datos en vivo
- Chart.js para visualizaciones`,
    stack: ['Vue.js', 'Python', 'FastAPI', 'PostgreSQL', 'WebSocket'],
    status: 'completed',
    projectUrl: 'https://crypto-dash-demo.vercel.app',
    repoUrl: 'https://github.com/facupicia/crypto-dashboard',
    thumbnail: '/thumbnails/crypto-dashboard.jpg',
    assetsCount: 18,
    contentCount: 8,
    createdAt: '2023-05-10T09:00:00Z',
    updatedAt: '2023-12-05T11:20:00Z',
  },
  {
    id: '4',
    name: 'AI Image Generator',
    description: 'Generador de imágenes con IA usando Stable Diffusion y fine-tuning personalizado.',
    fullDescription: `SaaS para generación de imágenes con inteligencia artificial.

Lo que hace:
- Generación de imágenes desde prompts
- Fine-tuning con datasets personalizados
- Upscaling de imágenes
- Inpainting y outpainting
- Galería pública/privada
- API para desarrolladores

Infraestructura:
- React frontend
- Python + PyTorch
- Stable Diffusion XL
- AWS EC2 con GPUs
- S3 para almacenamiento`,
    stack: ['Python', 'PyTorch', 'FastAPI', 'React', 'AWS'],
    status: 'in-progress',
    projectUrl: 'https://ai-image-gen-demo.vercel.app',
    repoUrl: 'https://github.com/facupicia/ai-image-gen',
    thumbnail: '/thumbnails/ai-image-gen.jpg',
    assetsCount: 45,
    contentCount: 3,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z',
  },
  {
    id: '5',
    name: 'DevPortfolio Template',
    description: 'Template de portfolio para desarrolladores con modo oscuro y animaciones.',
    fullDescription: `Un template open source para que desarrolladores muestren su trabajo.

Incluye:
- Diseño minimalista y moderno
- Modo oscuro por defecto
- Animaciones con Framer Motion
- Secciones: Hero, Proyectos, Skills, Contacto
- Formulario de contacto funcional
- SEO optimizado
- PWA ready

Tecnologías:
- Next.js 14
- Tailwind CSS
- Framer Motion
- TypeScript
- Resend para emails`,
    stack: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript'],
    status: 'completed',
    projectUrl: 'https://devportfolio-template.vercel.app',
    repoUrl: 'https://github.com/facupicia/devportfolio-template',
    thumbnail: '/thumbnails/devportfolio.jpg',
    assetsCount: 8,
    contentCount: 6,
    createdAt: '2023-11-15T08:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
  },
  {
    id: '6',
    name: 'E-commerce API',
    description: 'API RESTful completa para e-commerce con pagos, inventario y autenticación.',
    fullDescription: `Backend completo para plataformas de e-commerce.

Módulos:
- Autenticación JWT + OAuth
- Gestión de productos y categorías
- Carrito de compras
- Procesamiento de pagos (Stripe)
- Gestión de inventario
- Sistema de órdenes
- Notificaciones por email
- Panel de admin

Stack:
- Node.js + Express
- PostgreSQL + Prisma
- Redis para sesiones
- Stripe para pagos
- Jest para testing`,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis'],
    status: 'completed',
    projectUrl: 'https://ecommerce-api-docs.vercel.app',
    repoUrl: 'https://github.com/facupicia/ecommerce-api',
    thumbnail: '/thumbnails/ecommerce-api.jpg',
    assetsCount: 15,
    contentCount: 4,
    createdAt: '2023-09-05T11:00:00Z',
    updatedAt: '2023-11-20T09:30:00Z',
  },
  {
    id: '7',
    name: 'Weather CLI',
    description: 'CLI tool para ver el clima desde la terminal con pronóstico extendido.',
    fullDescription: `Una herramienta de línea de comandos para desarrolladores que quieren ver el clima rápidamente.

Features:
- Clima actual por ciudad
- Pronóstico de 5 días
- Detección automática de ubicación
- Diferentes unidades (C/F)
- Iconos en terminal
- Historial de búsquedas
- Favoritos

Built with:
- Rust
- OpenWeatherMap API
- Clap para CLI args
- Tokio para async
- Crossterm para styling`,
    stack: ['Rust', 'CLI', 'API Integration'],
    status: 'completed',
    projectUrl: 'https://crates.io/crates/weather-cli',
    repoUrl: 'https://github.com/facupicia/weather-cli',
    thumbnail: '/thumbnails/weather-cli.jpg',
    assetsCount: 6,
    contentCount: 2,
    createdAt: '2023-07-12T15:00:00Z',
    updatedAt: '2023-08-30T12:00:00Z',
  },
  {
    id: '8',
    name: 'Social Analytics',
    description: 'Dashboard de analytics para redes sociales con métricas unificadas.',
    fullDescription: `Unifica métricas de todas tus redes sociales en un solo dashboard.

Integraciones:
- Twitter/X Analytics
- Instagram Insights
- YouTube Analytics
- TikTok Analytics
- LinkedIn Analytics

Métricas:
- Followers growth
- Engagement rate
- Best posting times
- Top performing content
- Audience demographics
- Competitor analysis

Tech stack:
- Next.js
- tRPC
- PostgreSQL
- Prisma
- Chart.js`,
    stack: ['Next.js', 'tRPC', 'PostgreSQL', 'Prisma', 'Chart.js'],
    status: 'draft',
    projectUrl: undefined,
    repoUrl: 'https://github.com/facupicia/social-analytics',
    thumbnail: '/thumbnails/social-analytics.jpg',
    assetsCount: 3,
    contentCount: 0,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-10T16:00:00Z',
  },
]

export const contentIdeas: ContentIdea[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Tour del Content Factory',
    description: 'Mostrar todas las features del proyecto en un video rápido de 60 segundos',
    type: 'demo',
    status: 'in-production',
    platforms: ['tiktok', 'instagram', 'youtube'],
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Cómo estructurar un proyecto Next.js',
    description: 'Tutorial paso a paso sobre la arquitectura usada en Content Factory',
    type: 'tutorial',
    status: 'pending',
    platforms: ['youtube', 'twitter'],
    createdAt: '2024-03-16T14:00:00Z',
  },
  {
    id: '3',
    projectId: '1',
    title: 'El problema con los portfolios tradicionales',
    description: 'Hot take sobre por qué los devs necesitan mostrar más que solo código',
    type: 'hot-take',
    status: 'published',
    platforms: ['twitter', 'tiktok'],
    createdAt: '2024-03-10T09:00:00Z',
  },
  {
    id: '4',
    projectId: '2',
    title: 'Drag & drop en React sin librerías',
    description: 'Code review de la implementación de drag & drop nativo',
    type: 'code-review',
    status: 'pending',
    platforms: ['youtube', 'twitter'],
    createdAt: '2024-03-14T11:00:00Z',
  },
  {
    id: '5',
    projectId: '2',
    title: 'Cómo manejar estado en tiempo real',
    description: 'Explicación de Socket.io y patrones de estado colaborativo',
    type: 'tutorial',
    status: 'in-production',
    platforms: ['youtube', 'instagram'],
    createdAt: '2024-03-12T16:00:00Z',
  },
  {
    id: '6',
    projectId: '4',
    title: 'Generando imágenes con IA',
    description: 'Demo del generador mostrando el proceso de creación',
    type: 'demo',
    status: 'pending',
    platforms: ['tiktok', 'instagram', 'youtube'],
    createdAt: '2024-03-17T10:00:00Z',
  },
  {
    id: '7',
    projectId: '4',
    title: 'Fine-tuning de Stable Diffusion',
    description: 'Tutorial completo de cómo entrenar tu propio modelo',
    type: 'tutorial',
    status: 'pending',
    platforms: ['youtube'],
    createdAt: '2024-03-16T09:00:00Z',
  },
  {
    id: '8',
    projectId: '7',
    title: 'Por qué elegí Rust para este CLI',
    description: 'Behind the scenes de la decisión técnica',
    type: 'behind-scenes',
    status: 'published',
    platforms: ['twitter', 'youtube'],
    createdAt: '2024-03-08T14:00:00Z',
  },
  {
    id: '9',
    projectId: '5',
    title: 'Template gratuito para devs',
    description: 'Anuncio del template con demo de features',
    type: 'demo',
    status: 'published',
    platforms: ['twitter', 'tiktok'],
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: '10',
    projectId: '6',
    title: 'Arquitectura de un e-commerce',
    description: 'Code review de las decisiones de diseño',
    type: 'code-review',
    status: 'pending',
    platforms: ['youtube', 'twitter'],
    createdAt: '2024-03-13T11:00:00Z',
  },
]

export const renderJobs: RenderJob[] = [
  {
    id: '1',
    projectId: '1',
    contentIdeaId: '1',
    status: 'rendering',
    progress: 65,
    createdAt: '2024-03-17T09:00:00Z',
  },
  {
    id: '2',
    projectId: '2',
    contentIdeaId: '5',
    status: 'completed',
    progress: 100,
    outputUrl: '/renders/task-manager-tutorial.mp4',
    createdAt: '2024-03-15T10:00:00Z',
    completedAt: '2024-03-15T10:05:00Z',
  },
  {
    id: '3',
    projectId: '1',
    contentIdeaId: '3',
    status: 'completed',
    progress: 100,
    outputUrl: '/renders/hot-take-portfolios.mp4',
    createdAt: '2024-03-10T09:00:00Z',
    completedAt: '2024-03-10T09:03:00Z',
  },
  {
    id: '4',
    projectId: '7',
    contentIdeaId: '8',
    status: 'completed',
    progress: 100,
    outputUrl: '/renders/rust-cli-behind-scenes.mp4',
    createdAt: '2024-03-08T14:00:00Z',
    completedAt: '2024-03-08T14:04:00Z',
  },
  {
    id: '5',
    projectId: '5',
    contentIdeaId: '9',
    status: 'completed',
    progress: 100,
    outputUrl: '/renders/template-demo.mp4',
    createdAt: '2024-01-25T10:00:00Z',
    completedAt: '2024-01-25T10:02:00Z',
  },
]

export const stats = {
  totalProjects: projects.length,
  activeProjects: projects.filter(p => p.status === 'in-progress').length,
  completedProjects: projects.filter(p => p.status === 'completed').length,
  totalAssets: projects.reduce((acc, p) => acc + p.assetsCount, 0),
  totalIdeas: contentIdeas.length,
  pendingIdeas: contentIdeas.filter(i => i.status === 'pending').length,
  inProduction: contentIdeas.filter(i => i.status === 'in-production').length,
  publishedContent: contentIdeas.filter(i => i.status === 'published').length,
  totalVideos: renderJobs.filter(r => r.status === 'completed').length,
  videosRendering: renderJobs.filter(r => r.status === 'rendering').length,
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getContentIdeasByProjectId(projectId: string): ContentIdea[] {
  return contentIdeas.filter(c => c.projectId === projectId)
}

export function getRecentRenders(limit: number = 5): RenderJob[] {
  return renderJobs
    .filter(r => r.status === 'completed')
    .sort((a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime())
    .slice(0, limit)
}

export function getPendingIdeas(limit: number = 6): ContentIdea[] {
  return contentIdeas
    .filter(c => c.status === 'pending')
    .slice(0, limit)
}
