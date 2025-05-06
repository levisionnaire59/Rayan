"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, FileText, Home, LogOut, Menu, MessageSquare, User, X } from "lucide-react"

interface StagiaireLayoutProps {
  children: React.ReactNode
}

export function StagiaireLayout({ children }: StagiaireLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const navigation = [
    { name: "Tableau de bord", href: "/stagiaire/dashboard", icon: Home },
    { name: "Mon profil", href: "/stagiaire/profil", icon: User },
    { name: "Mes formations", href: "/stagiaire/formations", icon: BookOpen },
    { name: "Mes documents", href: "/stagiaire/documents", icon: FileText },
    { name: "Calendrier", href: "/stagiaire/calendrier", icon: Calendar },
    { name: "Messages", href: "/stagiaire/messages", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div
          className="fixed inset-0 bg-gray-900/80 z-40"
          style={{ display: sidebarOpen ? "block" : "none" }}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <span className="text-xl font-bold text-[#2D2E83]">Tous Ensemble</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="px-3 py-4">{renderNavLinks()}</nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex items-center h-16 px-6 border-b">
            <span className="text-xl font-bold text-[#2D2E83]">Tous Ensemble</span>
          </div>
          <nav className="flex-1 px-3 py-4">{renderNavLinks()}</nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-auto flex items-center">
            <span className="mr-4 text-sm font-medium">Rayan</span>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </Link>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  )

  function renderNavLinks() {
    return (
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${isActive ? "bg-[#2D2E83] hover:bg-[#2D2E83]/90" : ""}`}
                size="sm"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          )
        })}
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </Link>
      </div>
    )
  }
}
