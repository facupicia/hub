import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types from Supabase tables
export interface Project {
  id: string
  name: string
  description: string
  full_description?: string
  stack: string[]
  status: 'draft' | 'in-progress' | 'completed'
  project_url?: string
  repo_url?: string
  thumbnail_url?: string
  created_at: string
  updated_at: string
}

export interface Asset {
  id: string
  project_id: string
  name: string
  type: 'image' | 'video' | 'code' | 'document'
  url: string
  size: number
  created_at: string
}

export interface ContentIdea {
  id: string
  project_id: string
  title: string
  description: string
  type: 'demo' | 'tutorial' | 'behind-scenes' | 'hot-take' | 'code-review'
  status: 'pending' | 'in-production' | 'published'
  platforms: string[]
  created_at: string
}

// Project operations
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) return null
  return data
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Asset operations
export async function getAssetsByProjectId(projectId: string): Promise<Asset[]> {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createAsset(asset: Omit<Asset, 'id' | 'created_at'>): Promise<Asset> {
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteAsset(id: string): Promise<void> {
  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Content ideas operations
export async function getContentIdeasByProjectId(projectId: string): Promise<ContentIdea[]> {
  const { data, error } = await supabase
    .from('content_ideas')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getAllContentIdeas(): Promise<ContentIdea[]> {
  const { data, error } = await supabase
    .from('content_ideas')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createContentIdea(idea: Omit<ContentIdea, 'id' | 'created_at'>): Promise<ContentIdea> {
  const { data, error } = await supabase
    .from('content_ideas')
    .insert([idea])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateContentIdea(id: string, updates: Partial<ContentIdea>): Promise<ContentIdea> {
  const { data, error } = await supabase
    .from('content_ideas')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Stats
export async function getStats() {
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('status')
  
  const { data: assets, error: assetsError } = await supabase
    .from('assets')
    .select('id', { count: 'exact' })
  
  const { data: ideas, error: ideasError } = await supabase
    .from('content_ideas')
    .select('status')
  
  if (projectsError || assetsError || ideasError) {
    throw projectsError || assetsError || ideasError
  }
  
  return {
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter(p => p.status === 'in-progress').length || 0,
    completedProjects: projects?.filter(p => p.status === 'completed').length || 0,
    totalAssets: assets?.length || 0,
    totalIdeas: ideas?.length || 0,
    pendingIdeas: ideas?.filter(i => i.status === 'pending').length || 0,
    inProduction: ideas?.filter(i => i.status === 'in-production').length || 0,
    publishedContent: ideas?.filter(i => i.status === 'published').length || 0,
  }
}