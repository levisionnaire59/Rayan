import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin-layout"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Lock, Bell, User, Shield, Database } from "lucide-react"

export default function AdminParametres() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Paramètres</h1>
          <p className="text-gray-600">Configurez les paramètres de l'application</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="database">Base de données</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Paramètres généraux
                </CardTitle>
                <CardDescription>Configurez les paramètres généraux de l'application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nom du site</Label>
                  <Input id="site-name" defaultValue="Tous Ensemble" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">Description du site</Label>
                  <Textarea
                    id="site-description"
                    defaultValue="Tous Ensemble participe à la réflexion et à l'évolution des adhérents au niveau linguistique, culturel, caritatif et éducatif."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de contact</Label>
                  <Input id="contact-email" type="email" defaultValue="direction.tousensemble@gmail.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Téléphone de contact</Label>
                  <Input id="contact-phone" defaultValue="09 50 31 33 16" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea id="address" defaultValue="17 Rue de l'Epidème, 59200 Tourcoing" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                    <p className="text-sm text-gray-500">Activer le mode maintenance du site</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Paramètres de sécurité
                </CardTitle>
                <CardDescription>Configurez les paramètres de sécurité de l'application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Politique de mot de passe</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Sélectionner une politique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basique (min. 8 caractères)</SelectItem>
                      <SelectItem value="medium">Moyenne (min. 8 caractères, 1 majuscule, 1 chiffre)</SelectItem>
                      <SelectItem value="strong">
                        Forte (min. 10 caractères, majuscule, chiffre, caractère spécial)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">
                      Exiger l'authentification à deux facteurs pour les administrateurs
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Expiration de session</Label>
                    <p className="text-sm text-gray-500">Déconnecter automatiquement après inactivité</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-duration">Durée de session (minutes)</Label>
                  <Input id="session-duration" type="number" defaultValue="30" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Paramètres de notifications
                </CardTitle>
                <CardDescription>Configurez les paramètres de notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notifications par email</Label>
                    <p className="text-sm text-gray-500">Envoyer des notifications par email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-stagiaire">Nouvel inscrit</Label>
                    <p className="text-sm text-gray-500">Notification lors d'une nouvelle inscription</p>
                  </div>
                  <Switch id="new-stagiaire" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="formation-complete">Formation terminée</Label>
                    <p className="text-sm text-gray-500">Notification lorsqu'un stagiaire termine une formation</p>
                  </div>
                  <Switch id="formation-complete" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inactivity-alert">Alerte d'inactivité</Label>
                    <p className="text-sm text-gray-500">
                      Notification lorsqu'un stagiaire est inactif pendant une période prolongée
                    </p>
                  </div>
                  <Switch id="inactivity-alert" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inactivity-days">Jours d'inactivité avant alerte</Label>
                  <Input id="inactivity-days" type="number" defaultValue="14" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Paramètres utilisateurs
                </CardTitle>
                <CardDescription>Configurez les paramètres liés aux utilisateurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="self-registration">Auto-inscription</Label>
                    <p className="text-sm text-gray-500">Permettre aux utilisateurs de s'inscrire eux-mêmes</p>
                  </div>
                  <Switch id="self-registration" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-verification">Vérification d'email</Label>
                    <p className="text-sm text-gray-500">Exiger la vérification de l'email lors de l'inscription</p>
                  </div>
                  <Switch id="email-verification" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admin-approval">Approbation administrateur</Label>
                    <p className="text-sm text-gray-500">
                      Exiger l'approbation d'un administrateur pour les nouveaux comptes
                    </p>
                  </div>
                  <Switch id="admin-approval" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-role">Rôle par défaut</Label>
                  <Select defaultValue="stagiaire">
                    <SelectTrigger id="default-role">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stagiaire">Stagiaire</SelectItem>
                      <SelectItem value="formateur">Formateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Confidentialité
                </CardTitle>
                <CardDescription>Configurez les paramètres de confidentialité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="privacy-policy">Politique de confidentialité</Label>
                  <Textarea
                    id="privacy-policy"
                    rows={8}
                    defaultValue="Tous Ensemble s'engage à protéger la confidentialité des données personnelles de ses utilisateurs conformément au RGPD..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cookie-consent">Consentement aux cookies</Label>
                    <p className="text-sm text-gray-500">Exiger le consentement pour les cookies non essentiels</p>
                  </div>
                  <Switch id="cookie-consent" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-retention">Conservation des données</Label>
                    <p className="text-sm text-gray-500">Supprimer automatiquement les données inactives</p>
                  </div>
                  <Switch id="data-retention" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention-period">Période de conservation (mois)</Label>
                  <Input id="retention-period" type="number" defaultValue="24" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Base de données
                </CardTitle>
                <CardDescription>Configurez les paramètres de la base de données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Hôte</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-name">Nom de la base de données</Label>
                  <Input id="db-name" defaultValue="tous_ensemble_db" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-user">Utilisateur</Label>
                  <Input id="db-user" defaultValue="admin" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="db-password">Mot de passe</Label>
                  <Input id="db-password" type="password" value="••••••••" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">Sauvegarde automatique</Label>
                    <p className="text-sm text-gray-500">
                      Effectuer des sauvegardes automatiques de la base de données
                    </p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Fréquence de sauvegarde</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Sélectionner une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Tester la connexion</Button>
                <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
