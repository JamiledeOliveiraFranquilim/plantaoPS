import { supabaseClient } from '../lib/supabaseClient'

export async function getSession() {
  return supabaseClient.auth.getSession()
}

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  return supabaseClient.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabaseClient.auth.signOut()
}
