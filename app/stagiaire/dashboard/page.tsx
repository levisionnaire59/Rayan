import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, FileText, PlayCircle } from "lucide-react"

export default function StagiaireDashboard() {
  // Données fictives pour la démonstration
  const stagiaireInfo = {
    name: "Rayan",
    formation: "Développement Web",
    startDate: "15/03/2023",
    endDate: "15/09/2023",
    progress: 65,
    completedModules: 4,
    totalModules: 8,
  }

  const modules = [
    { id: 1, name: "Introduction au développement web", status: "completed", progress: 100 },
    { id: 2, name: "HTML et CSS fondamentaux", status: "completed", progress: 100 },
    { id: 3, name: "JavaScript pour débutants", status: "completed", progress: 100 },
    { id: 4, name: "Responsive Design", status: "completed", progress: 100 },
    { id: 5, name: "Introduction à React.js", status: "in-progress", progress: 60 },
    { id: 6, name: "Bases de données et API", status: "not-started", progress: 0 },
    { id: 7, name: "Déploiement et hébergement", status: "not-started", progress: 0 },
    { id: 8, name: "Projet final", status: "not-started", progress: 0 },
  ]

  const upcomingEvents = [
    { id: 1, title: "Atelier pratique React", date: "12/06/2023", time: "14:00 - 16:00" },
    { id: 2, title: "Évaluation module 5", date: "20/06/2023", time: "10:00 - 12:00" },
    { id: 3, title: "Session de questions-réponses", date: "25/06/2023", time: "15:00 - 16:00" },
  ]

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Bonjour, {stagiaireInfo.name}</h1>
          <p className="text-gray-600">Bienvenue dans votre espace de formation</p>
        </div>

        {/* Carte de progression */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Votre progression</CardTitle>
            <CardDescription>Formation : {stagiaireInfo.formation}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progression globale</span>
                  <span className="text-sm font-medium">{stagiaireInfo.progress}%</span>
                </div>
                <Progress value={stagiaireInfo.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-[#67A182] mr-2" />
                    <span className="font-medium">Modules complétés</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {stagiaireInfo.completedModules} / {stagiaireInfo.totalModules}
                  </p>
                </div>

                <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-[#2D2E83] mr-2" />
                    <span className="font-medium">Date de début</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stagiaireInfo.startDate}</p>
                </div>

                <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-[#E94E1B] mr-2" />
                    <span className="font-medium">Date de fin prévue</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stagiaireInfo.endDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules de formation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Modules de formation</CardTitle>
                <CardDescription>Suivez votre progression par module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium">{module.name}</h3>
                          <Progress value={module.progress} className="h-2 mt-2" />
                        </div>
                        <Badge
                          className={
                            module.status === "completed"
                              ? "bg-[#67A182]"
                              : module.status === "in-progress"
                                ? "bg-[#FDC758] text-gray-800"
                                : "bg-gray-200 text-gray-800"
                          }
                        >
                          {module.status === "completed"
                            ? "Terminé"
                            : module.status === "in-progress"
                              ? "En cours"
                              : "À commencer"}
                        </Badge>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button
                          variant={module.status === "not-started" ? "outline" : "default"}
                          size="sm"
                          className={
                            module.status === "completed"
                              ? "bg-[#67A182] hover:bg-[#67A182]/90"
                              : module.status === "in-progress"
                                ? "bg-[#E94E1B] hover:bg-[#E94E1B]/90"
                                : "border-[#2D2E83] text-[#2D2E83]"
                          }
                        >
                          {module.status === "completed" ? (
                            <>
                              <FileText className="h-4 w-4 mr-2" />
                              Revoir
                            </>
                          ) : module.status === "in-progress" ? (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Continuer
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Commencer
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Événements à venir */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Vos prochains rendez-vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {event.date} | {event.time}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full border-[#2D2E83] text-[#2D2E83]">
                        Ajouter au calendrier
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StagiaireLayout>
  )
}
