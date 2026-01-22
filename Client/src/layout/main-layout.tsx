import { useEffect } from "react"
import { Navigate, Outlet } from 'react-router-dom'
import { SidebarProvider } from "../components/ui/sidebar"
import { AppSidebar } from './navbar'
import type { Role } from '../pages/auth/types'
import { DashboardHeader } from './dashboard-header'

export const MainLayout = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') as Role | undefined

  useEffect(() => {
    document.documentElement.classList.remove("telegram-dark")
  }, [])

  if (!token || !role) {
    return <Navigate replace to={"/"} />
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className='grow w-full'>
        <DashboardHeader />
        <div className='p-8 bg-gray-100 dark:bg-gray-900 min-h-screen'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
