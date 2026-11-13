export const supabaseClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (_callback: (event: string, session: any) => void) => ({
      data: {
        subscription: {
          unsubscribe: () => undefined,
        },
      },
    }),
    signInWithPassword: async (_credentials: { email: string; password: string }) => ({
      data: { user: null, session: null },
      error: null,
    }),
    signOut: async () => ({ error: null }),
  },
  from: (_table: string) => ({
    select: (_query?: string) => ({
      data: [],
      error: null,
      eq: (_field: string, _value: unknown) => ({
        data: [],
        error: null,
        single: async () => ({ data: null, error: null }),
      }),
      or: () => ({
        data: [],
        error: null,
      }),
      single: async () => ({ data: null, error: null }),
    }),
    insert: async (_payload?: unknown) => ({ data: null, error: null }),
    update: async (_payload?: unknown) => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
    eq: (_field: string, _value: unknown) => ({
      select: async () => ({ data: [], error: null }),
      single: async () => ({ data: null, error: null }),
    }),
    order: () => ({
      select: async () => ({ data: [], error: null }),
    }),
    or: () => ({
      select: async () => ({ data: [], error: null }),
    }),
    single: async () => ({ data: null, error: null }),
  }),
  rpc: async (_name?: string, _params?: Record<string, unknown>) => ({ data: null, error: null }),
  channel: () => ({
    on: () => ({
      subscribe: () => ({ unsubscribe: () => undefined }),
    }),
  }),
  removeChannel: () => undefined,
}

export default supabaseClient
