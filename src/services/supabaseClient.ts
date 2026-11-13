export const supabase = {
  auth: {
    getSession: async (): Promise<{ data: { session: { user: { id: string } } | null }; error: null }> => ({
      data: { session: null },
      error: null,
    }),
    onAuthStateChange: (_callback: (event: string, session: any) => void) => ({
      data: {
        subscription: {
          unsubscribe: () => undefined,
        },
      },
    }),
    signInWithPassword: async () => ({
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
  rpc: async () => ({ data: null, error: null }),
  channel: (_name?: string) => ({
    on: (_event: string, _options: any, _callback: () => void) => ({
      subscribe: () => ({ unsubscribe: () => undefined }),
    }),
  }),
  removeChannel: (_channel?: unknown) => undefined,
}

export default supabase
