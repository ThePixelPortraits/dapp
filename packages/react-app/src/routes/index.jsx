import { lazy } from 'react'

import { useRoutes } from 'hookrouter'

const AdminBeaten = lazy(() => import('views/admin/queue-beaten'))
const AdminPending = lazy(() => import('views/admin/queue-pending'))
const AdminQueued = lazy(() => import('views/admin/queue-queued'))
const AdminZombies = lazy(() => import('views/admin/zombies'))
const Queue = lazy(() => import('views/full-queue'))
const Gallery = lazy(() => import('views/gallery'))
const Home = lazy(() => import('views/home'))
const Manifesto = lazy(() => import('views/manifesto'))
const Metrics = lazy(() => import('views/metrics'))
const Terms = lazy(() => import('views/terms'))
const TheTeam = lazy(() => import('views/the-team'))
const Zombies = lazy(() => import('views/zombies'))
const AdminAccepted = lazy(() => import('views/admin/queue-accepted'))
const AdminConfigs = lazy(() => import('views/admin/configs'))
const AdminMint = lazy(() => import('views/admin/mint'))

export const Routes = () => {
  const routes = {
    '/': () => <Home />,
    '/metrics': () => <Metrics />,
    '/the-team': () => <TheTeam />,
    '/manifesto': () => <Manifesto />,
    '/gallery': () => <Gallery />,
    '/terms': () => <Terms />,
    '/queue': () => <Queue />,
    '/zombies': () => <Zombies />,
    '/admin/zombies': () => <AdminZombies />,
    '/admin/accepted': () => <AdminAccepted />,
    '/admin/queued': () => <AdminQueued />,
    '/admin/pending': () => <AdminPending />,
    '/admin/beaten': () => <AdminBeaten />,
    '/admin/configs': () => <AdminConfigs />,
    '/admin/mint': () => <AdminMint />,
  }
  return useRoutes(routes)
}
