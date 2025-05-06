"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Download, Search, PlusCircle, Filter, FileText, Calendar, Users } from "lucide-react"
import { DeleteDialog } from "@/components/delete-dialog"
import { useState } from "react"
import { EditFormationDialog } from "@/components/edit-formation-dialog"

export default function AdminFormations() {
  // Données fictives pour la démonstration
  const [formations, setFormations] = useState([
    {
      id: 1,
      title: "Développement Web",
      description: "Formation complète aux technologies du web moderne",
      startDate: "15/03/2023",
      endDate: "15/09/2023",
      status: "En cours",
      participants: 12,
      maxParticipants: 15,
      formateur: "Jean Dupont",
    },
    {
      id: 2,
      title: "Bureautique Avancée",
      description: "Maîtrise des outils bureautiques professionnels",
      startDate: "22/04/2023",
      endDate: "22/07/2023",
      status: "En cours",
      participants: 8,
      maxParticipants: 10,
      formateur: "Marie Leroy",
    },
    {
      id: 3,
      title: "Communication Professionnelle",
      description: "Techniques de communication en milieu professionnel",
      startDate: "05/02/2023",
      endDate: "05/05/2023",
      status: "En cours",
      participants: 15,
      maxParticipants: 15,
      formateur: "Sophie Martin",
    },
    {
      id: 4,
      title: "Gestion de Projet",
      description: "Méthodologies et outils de gestion de projet",
      startDate: "10/01/2023",
      endDate: "10/04/2023",
      status: "Terminé",
      participants: 10,
      maxParticipants: 12,
      formateur: "Thomas Dubois",
    },
    {
      id: 5,
      title: "Anglais Professionnel",
      description: "Anglais des affaires et communication internationale",
      startDate: "18/03/2023",
      endDate: "18/06/2023",
      status: "En cours",
      participants: 9,
      maxParticipants: 12,
      formateur: "Emma Wilson",
    },
  ])

  const handleDeleteFormation = (id: number) => {
    setFormations(formations.filter((formation) => formation.id !== id))
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2E83]">Gestion des formations</h1>
            <p className="text-gray-600">Consultez et gérez les formations proposées</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#67A182] hover:bg-[#67A182]/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle formation
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
            <CardTitle>Liste des formations</CardTitle>
            <CardDescription>Recherchez et filtrez les formations</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Rechercher une formation..." className="pl-10" />
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
                    <th className="text-left py-3 px-4 font-medium">Titre</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Dates</th>
                    <th className="text-left py-3 px-4 font-medium">Statut</th>
                    <th className="text-left py-3 px-4 font-medium">Participants</th>
                    <th className="text-left py-3 px-4 font-medium">Formateur</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formations.map((formation) => (
                    <tr key={formation.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{formation.title}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{formation.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-[#2D2E83]" />
                          <span>
                            {formation.startDate} - {formation.endDate}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            formation.status === "En cours"
                              ? "bg-[#67A182]"
                              : formation.status === "Terminé"
                                ? "bg-[#2D2E83]"
                                : "bg-[#FDC758] text-gray-800"
                          }
                        >
                          {formation.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-[#E94E1B]" />
                          <span>
                            {formation.participants}/{formation.maxParticipants}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{formation.formateur}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-[#2D2E83]">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Voir détails</span>
                          </Button>
                          <EditFormationDialog
                            formation={formation}
                            onSave={(updatedFormation) => {
                              setFormations(
                                formations.map((f) => (f.id === updatedFormation.id ? updatedFormation : f)),
                              )
                            }}
                          />
                          <DeleteDialog
                            title="Supprimer la formation"
                            description={`Êtes-vous sûr de vouloir supprimer la formation "${formation.title}" ? Cette action est irréversible.`}
                            onDelete={() => handleDeleteFormation(formation.id)}
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
