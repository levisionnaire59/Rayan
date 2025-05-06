"use client"

import { useState } from "react"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  Search,
  Star,
  Video,
  User,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function StagiaireFormations() {
  const [openModuleDialog, setOpenModuleDialog] = useState(false)
  const [selectedModule, setSelectedModule] = useState<any>(null)

  // Données fictives pour la démonstration
  const currentFormation = {
    id: 1,
    title: "Développement Web",
    description:
      "Formation complète aux technologies du web moderne, incluant HTML, CSS, JavaScript, et les frameworks populaires.",
    startDate: "15/03/2023",
    endDate: "15/09/2023",
    progress: 65,
    status: "En cours",
    formateur: "Jean Dupont",
    completedModules: 4,
    totalModules: 8,
  }

  const modules = [
    {
      id: 1,
      name: "Introduction au développement web",
      description:
        "Découvrez les bases du développement web, les différents langages et technologies utilisés, et le fonctionnement d'un site web.",
      status: "completed",
      progress: 100,
      duration: "5h",
      lessons: [
        { id: 1, title: "Qu'est-ce que le développement web ?", type: "video", duration: "30min", completed: true },
        {
          id: 2,
          title: "Les langages du web : HTML, CSS, JavaScript",
          type: "video",
          duration: "45min",
          completed: true,
        },
        { id: 3, title: "Comment fonctionne un site web ?", type: "video", duration: "40min", completed: true },
        { id: 4, title: "Les outils du développeur web", type: "video", duration: "35min", completed: true },
        { id: 5, title: "Quiz - Introduction au développement web", type: "quiz", duration: "20min", completed: true },
      ],
    },
    {
      id: 2,
      name: "HTML et CSS fondamentaux",
      description:
        "Apprenez à structurer une page web avec HTML et à la styliser avec CSS. Créez votre première page web responsive.",
      status: "completed",
      progress: 100,
      duration: "8h",
      lessons: [
        { id: 1, title: "Structure de base d'une page HTML", type: "video", duration: "40min", completed: true },
        { id: 2, title: "Les balises HTML essentielles", type: "video", duration: "50min", completed: true },
        { id: 3, title: "Introduction à CSS", type: "video", duration: "45min", completed: true },
        { id: 4, title: "Mise en page avec CSS", type: "video", duration: "55min", completed: true },
        { id: 5, title: "TP - Créer une page web simple", type: "exercise", duration: "2h", completed: true },
        { id: 6, title: "Quiz - HTML et CSS", type: "quiz", duration: "30min", completed: true },
      ],
    },
    {
      id: 3,
      name: "JavaScript pour débutants",
      description:
        "Initiez-vous à JavaScript, le langage de programmation du web. Apprenez à rendre vos pages interactives.",
      status: "completed",
      progress: 100,
      duration: "10h",
      lessons: [
        { id: 1, title: "Introduction à JavaScript", type: "video", duration: "45min", completed: true },
        { id: 2, title: "Variables et types de données", type: "video", duration: "40min", completed: true },
        { id: 3, title: "Fonctions et événements", type: "video", duration: "50min", completed: true },
        { id: 4, title: "Manipuler le DOM", type: "video", duration: "55min", completed: true },
        { id: 5, title: "TP - Créer une application simple", type: "exercise", duration: "3h", completed: true },
        { id: 6, title: "Quiz - JavaScript", type: "quiz", duration: "30min", completed: true },
      ],
    },
    {
      id: 4,
      name: "Responsive Design",
      description:
        "Apprenez à créer des sites web qui s'adaptent à tous les appareils, des ordinateurs de bureau aux smartphones.",
      status: "completed",
      progress: 100,
      duration: "6h",
      lessons: [
        { id: 1, title: "Principes du Responsive Design", type: "video", duration: "40min", completed: true },
        { id: 2, title: "Media Queries", type: "video", duration: "45min", completed: true },
        { id: 3, title: "Flexbox et Grid", type: "video", duration: "50min", completed: true },
        { id: 4, title: "TP - Site web responsive", type: "exercise", duration: "2h", completed: true },
        { id: 5, title: "Quiz - Responsive Design", type: "quiz", duration: "25min", completed: true },
      ],
    },
    {
      id: 5,
      name: "Introduction à React.js",
      description:
        "Découvrez React.js, la bibliothèque JavaScript pour créer des interfaces utilisateur dynamiques et réactives.",
      status: "in-progress",
      progress: 60,
      duration: "12h",
      lessons: [
        { id: 1, title: "Introduction à React", type: "video", duration: "45min", completed: true },
        { id: 2, title: "Composants et props", type: "video", duration: "50min", completed: true },
        { id: 3, title: "État et cycle de vie", type: "video", duration: "55min", completed: true },
        { id: 4, title: "Gestion des événements", type: "video", duration: "40min", completed: false },
        { id: 5, title: "TP - Créer une application React", type: "exercise", duration: "4h", completed: false },
        { id: 6, title: "Quiz - React.js", type: "quiz", duration: "30min", completed: false },
      ],
    },
    {
      id: 6,
      name: "Bases de données et API",
      description:
        "Apprenez à connecter votre application front-end à une base de données et à communiquer avec des API.",
      status: "not-started",
      progress: 0,
      duration: "10h",
      lessons: [
        { id: 1, title: "Introduction aux bases de données", type: "video", duration: "45min", completed: false },
        { id: 2, title: "SQL vs NoSQL", type: "video", duration: "40min", completed: false },
        { id: 3, title: "Créer et interroger une base de données", type: "video", duration: "55min", completed: false },
        { id: 4, title: "API REST", type: "video", duration: "50min", completed: false },
        { id: 5, title: "TP - Créer une API simple", type: "exercise", duration: "3h", completed: false },
        { id: 6, title: "Quiz - Bases de données et API", type: "quiz", duration: "30min", completed: false },
      ],
    },
    {
      id: 7,
      name: "Déploiement et hébergement",
      description: "Apprenez à déployer votre application web sur internet et à la rendre accessible à tous.",
      status: "not-started",
      progress: 0,
      duration: "5h",
      lessons: [
        { id: 1, title: "Introduction au déploiement", type: "video", duration: "35min", completed: false },
        { id: 2, title: "Options d'hébergement", type: "video", duration: "40min", completed: false },
        { id: 3, title: "Déploiement sur Vercel", type: "video", duration: "45min", completed: false },
        { id: 4, title: "Noms de domaine et DNS", type: "video", duration: "40min", completed: false },
        { id: 5, title: "TP - Déployer votre application", type: "exercise", duration: "1h30", completed: false },
        { id: 6, title: "Quiz - Déploiement", type: "quiz", duration: "20min", completed: false },
      ],
    },
    {
      id: 8,
      name: "Projet final",
      description:
        "Mettez en pratique toutes les compétences acquises en réalisant un projet complet de développement web.",
      status: "not-started",
      progress: 0,
      duration: "20h",
      lessons: [
        { id: 1, title: "Définition du projet", type: "video", duration: "30min", completed: false },
        { id: 2, title: "Conception et maquettage", type: "exercise", duration: "3h", completed: false },
        { id: 3, title: "Développement front-end", type: "exercise", duration: "8h", completed: false },
        { id: 4, title: "Développement back-end", type: "exercise", duration: "6h", completed: false },
        { id: 5, title: "Tests et déploiement", type: "exercise", duration: "2h", completed: false },
        { id: 6, title: "Présentation du projet", type: "exercise", duration: "30min", completed: false },
      ],
    },
  ]

  const availableFormations = [
    {
      id: 2,
      title: "Bureautique Avancée",
      description: "Maîtrise des outils bureautiques professionnels (Word, Excel, PowerPoint, etc.)",
      duration: "3 mois",
      level: "Intermédiaire",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Communication Professionnelle",
      description: "Techniques de communication efficace en milieu professionnel",
      duration: "2 mois",
      level: "Débutant",
      rating: 4.5,
    },
    {
      id: 4,
      title: "Anglais Professionnel",
      description: "Améliorer votre anglais pour le monde du travail",
      duration: "4 mois",
      level: "Tous niveaux",
      rating: 4.8,
    },
  ]

  const certifications = [
    {
      id: 1,
      title: "HTML5 & CSS3",
      issuer: "Tous Ensemble",
      date: "15/04/2023",
      status: "completed",
    },
    {
      id: 2,
      title: "JavaScript Fondamentaux",
      issuer: "Tous Ensemble",
      date: "10/05/2023",
      status: "completed",
    },
  ]

  const openModule = (module: any) => {
    setSelectedModule(module)
    setOpenModuleDialog(true)
  }

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Mes formations</h1>
          <p className="text-gray-600">Suivez vos formations et votre progression</p>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Formation en cours</TabsTrigger>
            <TabsTrigger value="available">Formations disponibles</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">{currentFormation.title}</CardTitle>
                    <CardDescription className="mt-2">{currentFormation.description}</CardDescription>
                  </div>
                  <Badge className="self-start md:self-auto bg-[#67A182] text-white">{currentFormation.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-[#2D2E83] mr-2" />
                        <span className="font-medium">Période</span>
                      </div>
                      <p className="text-sm mt-2">
                        Du {currentFormation.startDate} au {currentFormation.endDate}
                      </p>
                    </div>

                    <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-[#E94E1B] mr-2" />
                        <span className="font-medium">Modules</span>
                      </div>
                      <p className="text-sm mt-2">
                        {currentFormation.completedModules} / {currentFormation.totalModules} modules complétés
                      </p>
                    </div>

                    <div className="bg-[#FEE185]/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-[#67A182] mr-2" />
                        <span className="font-medium">Formateur</span>
                      </div>
                      <p className="text-sm mt-2">{currentFormation.formateur}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progression globale</span>
                      <span className="text-sm font-medium">{currentFormation.progress}%</span>
                    </div>
                    <Progress value={currentFormation.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2D2E83]">Modules de formation</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Rechercher un module..." className="pl-10" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <div className="border-l-4 border-l-transparent hover:border-l-[#2D2E83] transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium text-lg">{module.name}</h3>
                              <Badge
                                className={`ml-3 ${
                                  module.status === "completed"
                                    ? "bg-[#67A182]"
                                    : module.status === "in-progress"
                                      ? "bg-[#FDC758] text-gray-800"
                                      : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {module.status === "completed"
                                  ? "Terminé"
                                  : module.status === "in-progress"
                                    ? "En cours"
                                    : "À commencer"}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mt-2">{module.description}</p>
                            <div className="flex items-center mt-3 text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Durée: {module.duration}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="w-20 h-20 rounded-full border-4 border-[#E94E1B] flex items-center justify-center mb-2">
                              <span className="text-xl font-bold">{module.progress}%</span>
                            </div>
                            <Button
                              onClick={() => openModule(module)}
                              className={
                                module.status === "completed"
                                  ? "bg-[#67A182] hover:bg-[#67A182]/90"
                                  : module.status === "in-progress"
                                    ? "bg-[#E94E1B] hover:bg-[#E94E1B]/90"
                                    : "bg-[#2D2E83] hover:bg-[#2D2E83]/90"
                              }
                            >
                              {module.status === "completed" ? (
                                <>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Revoir
                                </>
                              ) : module.status === "in-progress" ? (
                                <>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Continuer
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Commencer
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="mb-6">
              <div className="relative w-full max-w-md mx-auto mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Rechercher une formation..." className="pl-10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableFormations.map((formation) => (
                  <Card key={formation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle>{formation.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{formation.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{formation.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{formation.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(formation.rating) ? "text-[#FDC758] fill-[#FDC758]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{formation.rating}/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-[#2D2E83] hover:bg-[#2D2E83]/90">Voir les détails</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <Card key={certification.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle>{certification.title}</CardTitle>
                      <Award className="h-6 w-6 text-[#FDC758]" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Émetteur:</span>
                        <span className="font-medium">{certification.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date d'obtention:</span>
                        <span className="font-medium">{certification.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Statut:</span>
                        <Badge className="bg-[#67A182]">Obtenu</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Télécharger le certificat
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="overflow-hidden border-dashed border-2 flex flex-col items-center justify-center p-6">
                <div className="text-center space-y-4">
                  <Award className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="font-medium text-lg">Obtenez plus de certifications</h3>
                  <p className="text-gray-500 text-sm">
                    Complétez vos formations pour obtenir des certifications reconnues
                  </p>
                  <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Explorer les formations</Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialogue de module */}
        <Dialog open={openModuleDialog} onOpenChange={setOpenModuleDialog}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedModule?.name}</DialogTitle>
              <DialogDescription>{selectedModule?.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge
                    className={`${
                      selectedModule?.status === "completed"
                        ? "bg-[#67A182]"
                        : selectedModule?.status === "in-progress"
                          ? "bg-[#FDC758] text-gray-800"
                          : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {selectedModule?.status === "completed"
                      ? "Terminé"
                      : selectedModule?.status === "in-progress"
                        ? "En cours"
                        : "À commencer"}
                  </Badge>
                  <span className="ml-3 text-sm text-gray-500">
                    <Clock className="inline-block h-4 w-4 mr-1" />
                    Durée: {selectedModule?.duration}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Progression: </span>
                  <span className="font-bold">{selectedModule?.progress}%</span>
                </div>
              </div>

              <Progress value={selectedModule?.progress} className="h-2" />

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Leçon</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Durée</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Statut</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedModule?.lessons.map((lesson: any) => (
                      <tr key={lesson.id} className="border-t">
                        <td className="py-3 px-4">{lesson.title}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {lesson.type === "video" ? (
                              <Video className="h-4 w-4 mr-2 text-[#E94E1B]" />
                            ) : lesson.type === "quiz" ? (
                              <FileText className="h-4 w-4 mr-2 text-[#2D2E83]" />
                            ) : (
                              <BookOpen className="h-4 w-4 mr-2 text-[#67A182]" />
                            )}
                            <span>
                              {lesson.type === "video" ? "Vidéo" : lesson.type === "quiz" ? "Quiz" : "Exercice"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{lesson.duration}</td>
                        <td className="py-3 px-4">
                          {lesson.completed ? (
                            <div className="flex items-center text-[#67A182]">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              <span>Terminé</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">À faire</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            className={
                              lesson.completed
                                ? "bg-[#67A182] hover:bg-[#67A182]/90"
                                : "bg-[#E94E1B] hover:bg-[#E94E1B]/90"
                            }
                          >
                            {lesson.completed ? "Revoir" : "Commencer"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StagiaireLayout>
  )
}
