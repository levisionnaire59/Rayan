"use client"

import type React from "react"

import { useState } from "react"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, Mail, MapPin, Phone, User, Edit, Save, Clock, Award, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StagiaireProfil() {
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Données fictives pour la démonstration
  const [profileData, setProfileData] = useState({
    name: "Rayan",
    email: "chapenwolf@gmail.com",
    phone: "06 67 89 01 23",
    address: "123 Rue de la Formation, 59200 Tourcoing",
    dateNaissance: "15/05/1995",
    formation: "Développement Web",
    startDate: "15/03/2023",
    endDate: "15/09/2023",
    referent: "Marie Dubois",
    bio: "Passionné par le développement web et les nouvelles technologies. Je souhaite me reconvertir dans ce domaine après plusieurs années d'expérience dans le commerce.",
    skills: ["HTML/CSS", "JavaScript", "React", "Responsive Design"],
    progress: 65,
  })

  const activities = [
    { id: 1, type: "formation", title: "Module 5 complété", date: "10/06/2023", icon: Award },
    { id: 2, type: "document", title: "CV mis à jour", date: "05/06/2023", icon: FileText },
    { id: 3, type: "message", title: "Message de Marie Dubois", date: "01/06/2023", icon: Mail },
    { id: 4, type: "formation", title: "Module 4 complété", date: "25/05/2023", icon: Award },
    { id: 5, type: "calendar", title: "Atelier pratique React", date: "20/05/2023", icon: Calendar },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Mon profil</h1>
          <p className="text-gray-600">Consultez et modifiez vos informations personnelles</p>
        </div>

        {showSuccessAlert && (
          <Alert className="mb-6 bg-[#67A182]/20 border-[#67A182]">
            <Check className="h-4 w-4 text-[#67A182]" />
            <AlertTitle>Profil mis à jour</AlertTitle>
            <AlertDescription>Vos informations ont été enregistrées avec succès.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne de gauche - Informations personnelles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Vos informations de contact et détails personnels</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  className={isEditing ? "bg-[#67A182] text-white hover:bg-[#67A182]/90" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center md:items-start">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profileData.name} />
                        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="text-sm">
                          Changer la photo
                        </Button>
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          ) : (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{profileData.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{profileData.email}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{profileData.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateNaissance">Date de naissance</Label>
                          {isEditing ? (
                            <Input
                              id="dateNaissance"
                              name="dateNaissance"
                              value={profileData.dateNaissance}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{profileData.dateNaissance}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          {isEditing ? (
                            <Input
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                          ) : (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{profileData.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Label htmlFor="bio">À propos de moi</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="mt-2"
                        rows={4}
                      />
                    ) : (
                      <p className="mt-2 text-gray-700">{profileData.bio}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <Label>Compétences</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} className="bg-[#2D2E83]">
                          {skill}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6 text-xs">
                          + Ajouter
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Formation actuelle</CardTitle>
                <CardDescription>Détails de votre formation en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{profileData.formation}</h3>
                      <p className="text-gray-500 text-sm">
                        Du {profileData.startDate} au {profileData.endDate}
                      </p>
                    </div>
                    <Badge className="bg-[#67A182]">En cours</Badge>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progression globale</span>
                      <span className="text-sm font-medium">{profileData.progress}%</span>
                    </div>
                    <Progress value={profileData.progress} className="h-2" />
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Référent :</span> {profileData.referent}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Voir les détails de la formation
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Colonne de droite - Activités récentes */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
                <CardDescription>Vos dernières activités sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                      <div
                        className={`rounded-full p-2 ${
                          activity.type === "formation"
                            ? "bg-[#2D2E83]/10 text-[#2D2E83]"
                            : activity.type === "document"
                              ? "bg-[#E94E1B]/10 text-[#E94E1B]"
                              : activity.type === "message"
                                ? "bg-[#67A182]/10 text-[#67A182]"
                                : "bg-[#FDC758]/10 text-[#FDC758]"
                        }`}
                      >
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{activity.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir toutes les activités
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </StagiaireLayout>
  )
}
