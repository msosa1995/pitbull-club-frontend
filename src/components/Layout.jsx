import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', background: '#0e0e0e', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        padding: '28px 32px',
        minHeight: '100vh',
        background: '#0e0e0e',
      }}>
        {children}
      </main>
    </div>
  )
}
