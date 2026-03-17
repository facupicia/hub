'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, FolderOpen, Zap, Settings } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/projects', label: 'Proyectos', icon: FolderOpen },
  { href: '/engine', label: 'Engine', icon: Zap },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 rounded-full border border-gray-800 bg-gray-900/90 px-2 py-2 backdrop-blur-xl"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}
      </motion.div>
    </nav>
  )
}