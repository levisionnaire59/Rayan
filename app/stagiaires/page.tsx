"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Download, Search, UserPlus, Filter, FileText } from "lucide-react"
import { DeleteDialog } from "@/components/delete-dialog"
import { useState } from "react"
import { EditStagiaireDialog } from "@/components/edit-stagiaire-dialog"

export default function AdminStagiaires() {
  // Données fictives pour la démonstration
  const [stagiaires, setStagiaires] = useState([
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@email.com",
      tel: "06 12 34 56 78",
      status: "En cours",
      progress: 65,
      formation: "Développement Web",
      dateInscription: "15/03/2023",
      referent: "Marie Dubois",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      email: "thomas.dubois@email.com",
      tel: "06 23 45 67 89",
      status: "En attente",
      progress: 0,
      formation: "Bureautique Avancée",
      dateInscription: "22/04/2023",
      referent: "Jean Leroy",
    },
    {
      id: 3,
      name: "Amina Benali",
      email: "amina.benali@email.com",
      tel: "06 34 56 78 90",
      status: "En cours",
      progress: 32,
      formation: "Communication Professionnelle",
      dateInscription: "05/02/2023",
      referent: "Marie Dubois",
    },
    {
      id: 4,
      name: "Lucas Moreau",
      email: "lucas.moreau@email.com",
      tel: "06 45 67 89 01",
      status: "Terminé",
      progress: 100,
      formation: "Gestion de Projet",
      dateInscription: "10/01/2023",
      referent: "Paul Martin",
    },
    {
      id: 5,
      name: "Emma Petit",
      email: "emma.petit@email.com",
      tel: "06 56 78 90 12",
      status: "En cours",
      progress: 78,
      formation: "Anglais Professionnel",
      dateInscription: "18/03/2023",
      referent: "Jean Leroy",
    },
    {
      id: 6,
      name: "Rayan",
      email: "chapenwolf@gmail.com",
      tel: "06 67 89 01 23",
      status: "En cours",
      progress: 65,
      formation: "Développement Web",
      dateInscription: "15/03/2023",
      referent: "Marie Dubois",
    },
  ])

  const handleDeleteStagiaire = (id: number) => {
    setStagiaires(stagiaires.filter((stagiaire) => stagiaire.id !== id))
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2E83]">Gestion des stagiaires</h1>
            <p className="text-gray-600">Consultez et gérez les informations des stagiaires</p>
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

        {/* Recherche et filtres */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Liste des stagiaires</CardTitle>
            <CardDescription>Recherchez et filtrez les stagiaires</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Rechercher un stagiaire..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nom</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Téléphone</th>
                    <th className="text-left py-3 px-4 font-medium">Formation</th>
                    <th className="text-left py-3 px-4 font-medium">Statut</th>
                    <th className="text-left py-3 px-4 font-medium">Progression</th>
                    <th className="text-left py-3 px-4 font-medium">Date d'inscription</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stagiaires.map((stagiaire) => (
                    <tr key={stagiaire.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{stagiaire.name}</td>
                      <td className="py-3 px-4">{stagiaire.email}</td>
                      <td className="py-3 px-4">{stagiaire.tel}</td>
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
                      <td className="py-3 px-4">{stagiaire.dateInscription}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-[#2D2E83]">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Voir détails</span>
                          </Button>
                          <EditStagiaireDialog
                            stagiaire={stagiaire}
                            onSave={(updatedStagiaire) => {
                              setStagiaires(
                                stagiaires.map((s) => (s.id === updatedStagiaire.id ? updatedStagiaire : s)),
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
