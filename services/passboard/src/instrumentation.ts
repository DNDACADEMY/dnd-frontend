export async function register() {
  if (process.env.NEXT_PUBLIC_MOCKING_ENABLED !== 'enabled') return

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./mocks/node')
    server.listen({ onUnhandledRequest: 'bypass' })
  }
}
