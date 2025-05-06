"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Download, FileSpreadsheet, Search, UserPlus, Users, FileText } from "lucide-react"
import { DeleteDialog } from "@/components/delete-dialog"
import { useState } from "react"
import { EditStagiaireDialog } from "@/components/edit-stagiaire-dialog"

export default function AdminDashboard() {
  // Données fictives pour la démonstration
  const stats = {
    totalStagiaires: 124,
    activeStagiaires: 87,
    completedFormations: 42,
    pendingEvaluations: 15,
  }

  const [recentStagiaires, setRecentStagiaires] = useState([
    { id: 1, name: "Sophie Martin", status: "En cours", progress: 65, formation: "Développement Web" },
    { id: 2, name: "Thomas Dubois", status: "En attente", progress: 0, formation: "Bureautique Avancée" },
    { id: 3, name: "Amina Benali", status: "En cours", progress: 32, formation: "Communication Professionnelle" },
    { id: 4, name: "Lucas Moreau", status: "Terminé", progress: 100, formation: "Gestion de Projet" },
    { id: 5, name: "Emma Petit", status: "En cours", progress: 78, formation: "Anglais Professionnel" },
  ])

  const handleDeleteStagiaire = (id: number) => {
    setRecentStagiaires(recentStagiaires.filter((stagiaire) => stagiaire.id !== id))
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2E83]">Tableau de bord administrateur</h1>
            <p className="text-gray-600">Bienvenue, Rayan Lourabi - Gérez les stagiaires et suivez leur progression</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#67A182] hover:bg-[#67A182]/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un stagiaire
            </Button>
            <Button variant="outline" className="border-[#67A182] text-[#67A182]">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Total Stagiaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-[#2D2E83] mr-3" />
                <span className="text-3xl font-bold">{stats.totalStagiaires}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Stagiaires Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-[#E94E1B] mr-3" />
                <span className="text-3xl font-bold">{stats.activeStagiaires}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Formations Terminées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileSpreadsheet className="h-8 w-8 text-[#67A182] mr-3" />
                <span className="text-3xl font-bold">{stats.completedFormations}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-500">Évaluations en Attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileSpreadsheet className="h-8 w-8 text-[#FDC758] mr-3" />
                <span className="text-3xl font-bold">{stats.pendingEvaluations}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recherche et liste des stagiaires */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Liste des stagiaires</CardTitle>
            <CardDescription>Recherchez et filtrez les stagiaires</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Rechercher un stagiaire..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nom</th>
                    <th className="text-left py-3 px-4 font-medium">Formation</th>
                    <th className="text-left py-3 px-4 font-medium">Statut</th>
                    <th className="text-left py-3 px-4 font-medium">Progression</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStagiaires.map((stagiaire) => (
                    <tr key={stagiaire.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{stagiaire.name}</td>
                      <td className="py-3 px-4">{stagiaire.formation}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            stagiaire.status === "En cours"
                              ? "bg-[#67A182]"
                              : stagiaire.status === "Terminé"
                                ? "bg-[#2D2E83]"
                                : "bg-[#FDC758] text-gray-800"
                          }
                        >
                          {stagiaire.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              stagiaire.status === "Terminé"
                                ? "bg-[#2D2E83]"
                                : stagiaire.progress > 50
                                  ? "bg-[#67A182]"
                                  : "bg-[#E94E1B]"
                            }`}
                            style={{ width: `${stagiaire.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{stagiaire.progress}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-[#2D2E83]">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Voir détails</span>
                          </Button>
                          <EditStagiaireDialog
                            stagiaire={{
                              id: stagiaire.id,
                              name: stagiaire.name,
                              email: "",
                              tel: "",
                              status: stagiaire.status,
                              progress: stagiaire.progress,
                              formation: stagiaire.formation,
                              dateInscription: "",
                            }}
                            onSave={(updatedStagiaire) => {
                              setRecentStagiaires(
                                recentStagiaires.map((s) =>
                                  s.id === updatedStagiaire.id
                                    ? {
                                        id: updatedStagiaire.id,
                                        name: updatedStagiaire.name,
                                        status: updatedStagiaire.status,
                                        progress: updatedStagiaire.progress,
                                        formation: updatedStagiaire.formation,
                                      }
                                    : s,
                                ),
                              )
                            }}
                          />
                          <DeleteDialog
                            title="Supprimer le stagiaire"
                            description={`Êtes-vous sûr de vouloir supprimer ${stagiaire.name} ? Cette action est irréversible.`}
                            onDelete={() => handleDeleteStagiaire(stagiaire.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
