import { useEffect, useState } from 'react'
import type { UserRole } from '../types/hospital'
import { supabase } from '../services/supabaseClient'

export interface UserProfile {
  id: string
  nome: string
  role: UserRole
  consultorio?: string
}

const STORAGE_KEY = 'plantaops-profile'

const demoProfiles: Record<string, UserProfile> = {
  recepcao: { id: 'demo-recepcao', nome: 'Recepcionista', role: 'recepcao' },
  enfermagem: { id: 'demo-enfermagem', nome: 'Enfermeira', role: 'enfermagem' },
  medico: { id: 'demo-medico', nome: 'Médico', role: 'medico' },
  gestao: { id: 'demo-gestao', nome: 'Gestão', role: 'gestao' },
  painel: { id: 'demo-painel', nome: 'Painel', role: 'painel' },
}

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setProfile(JSON.parse(saved) as UserProfile)
      }
    } catch {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (!normalizedEmail || !normalizedPassword) {
      return { error: 'Informe e-mail e senha.' }
    }

    const key =
      normalizedEmail.includes('recepcao')
        ? 'recepcao'
        : normalizedEmail.includes('enfermagem')
          ? 'enfermagem'
          : normalizedEmail.includes('medico')
            ? 'medico'
            : normalizedEmail.includes('gestao')
              ? 'gestao'
              : normalizedEmail.includes('painel')
                ? 'painel'
                : 'recepcao'

    const userProfile = {
      ...demoProfiles[key],
      nome: normalizedEmail.split('@')[0] || demoProfiles[key].nome,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile))
    setProfile(userProfile)
    return { error: null, profile: userProfile }
  }

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY)
    setProfile(null)
    return supabase.auth.signOut()
  }

  return { profile, loading, login, logout }
}