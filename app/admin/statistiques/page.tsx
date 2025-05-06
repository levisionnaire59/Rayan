import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "@/components/admin-layout"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminStatistiques() {
  // Données fictives pour les graphiques
  const inscriptionsData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Inscriptions 2023",
        data: [12, 19, 15, 8, 22, 14, 11, 5, 18, 21, 17, 9],
        backgroundColor: "#2D2E83",
      },
    ],
  }

  const completionData = {
    labels: ["Terminé", "En cours", "Abandonné"],
    datasets: [
      {
        label: "Statut des formations",
        data: [42, 87, 15],
        backgroundColor: ["#2D2E83", "#67A182", "#E94E1B"],
      },
    ],
  }

  const progressionData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
    datasets: [
      {
        label: "Développement Web",
        data: [10, 25, 35, 50, 65, 75, 85, 95],
        borderColor: "#2D2E83",
        backgroundColor: "rgba(45, 46, 131, 0.1)",
      },
      {
        label: "Bureautique",
        data: [5, 15, 30, 45, 60, 70, 80, 90],
        borderColor: "#67A182",
        backgroundColor: "rgba(103, 161, 130, 0.1)",
      },
      {
        label: "Communication",
        data: [15, 30, 40, 55, 65, 80, 90, 100],
        borderColor: "#E94E1B",
        backgroundColor: "rgba(233, 78, 27, 0.1)",
      },
    ],
  }

  const formationsData = {
    labels: ["Développement Web", "Bureautique", "Communication", "Gestion de Projet", "Anglais"],
    datasets: [
      {
        label: "Nombre de stagiaires",
        data: [25, 18, 15, 12, 20],
        backgroundColor: "#FDC758",
      },
    ],
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Statistiques</h1>
          <p className="text-gray-600">Analysez les données et suivez les performances</p>
        </div>

        <div className="flex justify-end mb-4">
          <Select defaultValue="2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="inscriptions" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inscriptions">Inscriptions</TabsTrigger>
            <TabsTrigger value="completion">Taux de complétion</TabsTrigger>
            <TabsTrigger value="progression">Progression</TabsTrigger>
            <TabsTrigger value="formations">Formations</TabsTrigger>
          </TabsList>

          <TabsContent value="inscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Inscriptions mensuelles</CardTitle>
                <CardDescription>Nombre d'inscriptions par mois</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <BarChart
                  data={inscriptionsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completion">
            <Card>
              <CardHeader>
                <CardTitle>Taux de complétion</CardTitle>
                <CardDescription>Statut des formations des stagiaires</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex justify-center">
                <div className="w-[400px]">
                  <PieChart
                    data={completionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progression">
            <Card>
              <CardHeader>
                <CardTitle>Progression moyenne</CardTitle>
                <CardDescription>Progression moyenne des stagiaires par formation</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <LineChart
                  data={progressionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formations">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par formation</CardTitle>
                <CardDescription>Nombre de stagiaires par formation</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <BarChart
                  data={formationsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques générales</CardTitle>
              <CardDescription>Aperçu global des performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Taux de réussite global</span>
                  <span className="font-bold text-[#67A182]">78%</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Taux d'abandon</span>
                  <span className="font-bold text-[#E94E1B]">12%</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Satisfaction moyenne</span>
                  <span className="font-bold text-[#2D2E83]">4.2/5</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Durée moyenne de formation</span>
                  <span className="font-bold">3.5 mois</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Taux d'insertion professionnelle</span>
                  <span className="font-bold text-[#67A182]">65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performances par référent</CardTitle>
              <CardDescription>Statistiques par référent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Marie Dubois</span>
                    <span className="font-bold text-[#67A182]">45 stagiaires</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#67A182] h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Taux de réussite: 85%</span>
                    <span>Satisfaction: 4.5/5</span>
                  </div>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Jean Leroy</span>
                    <span className="font-bold text-[#2D2E83]">38 stagiaires</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#2D2E83] h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Taux de réussite: 78%</span>
                    <span>Satisfaction: 4.2/5</span>
                  </div>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Paul Martin</span>
                    <span className="font-bold text-[#E94E1B]">32 stagiaires</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#E94E1B] h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Taux de réussite: 72%</span>
                    <span>Satisfaction: 3.9/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
