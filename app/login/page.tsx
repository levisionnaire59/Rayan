"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get("role") || "stagiaire"
  const [showPassword, setShowPassword] = useState(false)

  // Mettre à jour les états initiaux pour les formulaires de connexion
  const [loginData, setLoginData] = useState({
    email: role === "admin" ? "rayanlou17nord@gmail.com" : "chapenwolf@gmail.com",
    password: "@Raraeic14",
  })

  // Mettre à jour le formulaire d'inscription pour les stagiaires
  const [registerData, setRegisterData] = useState({
    name: "Rayan",
    email: "chapenwolf@gmail.com",
    password: "@Raraeic14",
    confirmPassword: "@Raraeic14",
  })

  // Ajouter une fonction pour vérifier les identifiants
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Vérification des identifiants
    if (role === "admin") {
      if (loginData.email === "rayanlou17nord@gmail.com" && loginData.password === "@Raraeic14") {
        router.push("/admin/dashboard")
      } else {
        alert("Identifiants administrateur incorrects")
      }
    } else {
      if (loginData.email === "chapenwolf@gmail.com" && loginData.password === "@Raraeic14") {
        router.push("/stagiaire/dashboard")
      } else {
        alert("Identifiants stagiaire incorrects")
      }
    }
  }

  // Mettre à jour la fonction d'inscription
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Rediriger vers le formulaire d'inscription complet
    router.push("/inscription")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-[#FEE185]/30 to-white">
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center text-[#2D2E83] hover:text-[#E94E1B] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-[#2D2E83]">
              {role === "admin" ? "Espace Administrateur" : "Espace Stagiaire"}
            </CardTitle>
            <CardDescription className="text-center">
              {role === "admin"
                ? "Connectez-vous pour accéder à votre espace administrateur"
                : "Connectez-vous ou inscrivez-vous pour accéder à votre espace stagiaire"}
            </CardDescription>
          </CardHeader>

          {role === "stagiaire" ? (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#2D2E83] hover:bg-[#2D2E83]/90">
                      Se connecter
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        required
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Mot de passe</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#E94E1B] hover:bg-[#E94E1B]/90">
                      S'inscrire
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@tousensemble.org"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-[#E94E1B] hover:bg-[#E94E1B]/90">
                  Se connecter
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  )
}
