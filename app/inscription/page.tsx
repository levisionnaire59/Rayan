"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  User,
  Home,
  Briefcase,
  Target,
  Search,
  Heart,
  Accessibility,
} from "lucide-react"

export default function InscriptionPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Informations générales
    date: new Date().toISOString().split("T")[0],
    referent: "",

    // Identité
    nom: "",
    dateNaissance: "",
    lieuNaissance: "",
    email: "chapenwolf@gmail.com", // Prérempli
    telephone: "",
    contactUrgence: "",

    // Situation personnelle
    maitriseLangue: "",
    situationCivique: "",
    situationFamiliale: "",
    finances: "",
    logement: "",
    mobilite: "",
    sante: "",

    // Parcours scolaire / Formations
    niveauScolaire: "",
    formationsPro: "",

    // Expériences professionnelles
    experiencesPro: "",
    finDernierContrat: "",

    // Projet professionnel
    projetPro: "",
    passions: "",

    // Démarche de recherche d'emploi
    demarchesRecherche: "",
    cvRealise: false,
    cvAJour: false,
    lmRealisee: false,
    lmAJour: false,

    // Motivations
    attentesFormation: "",
    motivationsProjet: "",

    // Handicap
    locauxAdaptes: "",
    pmr: "",
    typeHandicap: "",
    troublesDys: "",
    adaptationsNecessaires: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulaire soumis:", formData)
    // Redirection vers le tableau de bord stagiaire
    router.push("/stagiaire/dashboard")
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step === i
                    ? "bg-[#2D2E83] text-white"
                    : step > i
                      ? "bg-[#67A182] text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i ? <Check className="h-4 w-4" /> : i}
              </div>
              {i < 8 && <div className={`h-1 w-6 ${step > i ? "bg-[#67A182]" : "bg-gray-200"}`}></div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-[#FEE185]/30 to-white">
        <Link
          href="/login?role=stagiaire"
          className="absolute top-4 left-4 flex items-center text-[#2D2E83] hover:text-[#E94E1B] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Link>

        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-[#2D2E83] mb-2">Entretien d'inscription</h1>
          <h2 className="text-xl text-center text-[#E94E1B] mb-8">Diagnostic & Analyse des Besoins</h2>

          {renderStepIndicator()}

          <Card className="w-full">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Informations générales
                    </CardTitle>
                    <CardDescription>Informations de base pour votre inscription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date du jour</Label>
                      <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referent">Référent</Label>
                      <Input
                        id="referent"
                        name="referent"
                        placeholder="Nom du référent"
                        value={formData.referent}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Identité
                    </CardTitle>
                    <CardDescription>Vos informations personnelles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom et prénom</Label>
                      <Input
                        id="nom"
                        name="nom"
                        placeholder="Votre nom complet"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateNaissance">Date de naissance</Label>
                      <Input
                        id="dateNaissance"
                        name="dateNaissance"
                        type="date"
                        value={formData.dateNaissance}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                      <Input
                        id="lieuNaissance"
                        name="lieuNaissance"
                        placeholder="Ville, Pays"
                        value={formData.lieuNaissance}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Numéro de téléphone</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        placeholder="06 XX XX XX XX"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactUrgence">Personne à contacter en cas d'absence ou d'urgence</Label>
                      <Textarea
                        id="contactUrgence"
                        name="contactUrgence"
                        placeholder="Nom + téléphone"
                        value={formData.contactUrgence}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Situation personnelle
                    </CardTitle>
                    <CardDescription>Informations sur votre situation actuelle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="maitriseLangue">Maîtrise de la langue française</Label>
                      <Textarea
                        id="maitriseLangue"
                        name="maitriseLangue"
                        placeholder="Décrivez votre niveau"
                        value={formData.maitriseLangue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="situationCivique">
                        Situation civique (nationalité, titre de séjour, casier judiciaire…)
                      </Label>
                      <Textarea
                        id="situationCivique"
                        name="situationCivique"
                        placeholder="Décrivez votre situation"
                        value={formData.situationCivique}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="situationFamiliale">
                        Situation familiale (marié·e ? divorcé·e ? enfants ? âge ?)
                      </Label>
                      <Textarea
                        id="situationFamiliale"
                        name="situationFamiliale"
                        placeholder="Décrivez votre situation"
                        value={formData.situationFamiliale}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finances">Finances (aides ? dettes ?)</Label>
                      <Textarea
                        id="finances"
                        name="finances"
                        placeholder="Décrivez votre situation"
                        value={formData.finances}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logement">Logement (APL ? zone géographique ? avec qui ?)</Label>
                      <Textarea
                        id="logement"
                        name="logement"
                        placeholder="Décrivez votre situation"
                        value={formData.logement}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobilite">Mobilité (transports ? permis B ? véhicule ?)</Label>
                      <Textarea
                        id="mobilite"
                        name="mobilite"
                        placeholder="Décrivez votre situation"
                        value={formData.mobilite}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sante">Santé (physique, psychologique, nutrition, hygiène, addictions…)</Label>
                      <Textarea
                        id="sante"
                        name="sante"
                        placeholder="Décrivez votre situation"
                        value={formData.sante}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 4 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Parcours scolaire / Formations
                    </CardTitle>
                    <CardDescription>Informations sur votre parcours éducatif</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="niveauScolaire">Niveau scolaire / Diplômes (dates, lieux…)</Label>
                      <Textarea
                        id="niveauScolaire"
                        name="niveauScolaire"
                        placeholder="Décrivez votre parcours"
                        value={formData.niveauScolaire}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formationsPro">
                        Formations professionnelles continues (dates, lieux, organismes…)
                      </Label>
                      <Textarea
                        id="formationsPro"
                        name="formationsPro"
                        placeholder="Décrivez vos formations"
                        value={formData.formationsPro}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 5 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Expériences professionnelles
                    </CardTitle>
                    <CardDescription>Informations sur votre parcours professionnel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="experiencesPro">
                        Expériences professionnelles (dates, lieux, entreprises, types de contrats…)
                      </Label>
                      <Textarea
                        id="experiencesPro"
                        name="experiencesPro"
                        placeholder="Décrivez vos expériences"
                        value={formData.experiencesPro}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finDernierContrat">Raison de la fin du dernier contrat</Label>
                      <Textarea
                        id="finDernierContrat"
                        name="finDernierContrat"
                        placeholder="Expliquez les circonstances"
                        value={formData.finDernierContrat}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 6 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Projet professionnel
                    </CardTitle>
                    <CardDescription>Informations sur vos objectifs professionnels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projetPro">Projet défini ? Pistes envisagées ?</Label>
                      <Textarea
                        id="projetPro"
                        name="projetPro"
                        placeholder="Décrivez votre projet"
                        value={formData.projetPro}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passions">Passions, hobbies</Label>
                      <Textarea
                        id="passions"
                        name="passions"
                        placeholder="Décrivez vos centres d'intérêt"
                        value={formData.passions}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {step === 7 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Démarche de recherche d'emploi
                    </CardTitle>
                    <CardDescription>Informations sur vos démarches actuelles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="demarchesRecherche">
                        Quelles démarches de recherche d'emploi ont été faites ?
                      </Label>
                      <Textarea
                        id="demarchesRecherche"
                        name="demarchesRecherche"
                        placeholder="Décrivez vos démarches"
                        value={formData.demarchesRecherche}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CV et lettre de motivation réalisés ? Sont-ils à jour ?</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cvRealise"
                            checked={formData.cvRealise}
                            onCheckedChange={(checked) => handleCheckboxChange("cvRealise", checked as boolean)}
                          />
                          <Label htmlFor="cvRealise">CV réalisé</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cvAJour"
                            checked={formData.cvAJour}
                            onCheckedChange={(checked) => handleCheckboxChange("cvAJour", checked as boolean)}
                          />
                          <Label htmlFor="cvAJour">CV à jour</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lmRealisee"
                            checked={formData.lmRealisee}
                            onCheckedChange={(checked) => handleCheckboxChange("lmRealisee", checked as boolean)}
                          />
                          <Label htmlFor="lmRealisee">Lettre de motivation réalisée</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lmAJour"
                            checked={formData.lmAJour}
                            onCheckedChange={(checked) => handleCheckboxChange("lmAJour", checked as boolean)}
                          />
                          <Label htmlFor="lmAJour">Lettre de motivation à jour</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 8 && (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-[#2D2E83]" />
                      Motivations et handicap
                    </CardTitle>
                    <CardDescription>Vos motivations et besoins spécifiques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="attentesFormation">
                        Qu'attendez-vous de la formation ? Vos envies et besoins ?
                      </Label>
                      <Textarea
                        id="attentesFormation"
                        name="attentesFormation"
                        placeholder="Décrivez vos attentes"
                        value={formData.attentesFormation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivationsProjet">
                        Motivations pour votre projet professionnel (si existant)
                      </Label>
                      <Textarea
                        id="motivationsProjet"
                        name="motivationsProjet"
                        placeholder="Décrivez vos motivations"
                        value={formData.motivationsProjet}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <Accessibility className="h-5 w-5 mr-2 text-[#2D2E83]" />
                        Handicap (si concerné)
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="locauxAdaptes">Les locaux sont-ils adaptés à votre handicap ?</Label>
                          <RadioGroup
                            id="locauxAdaptes"
                            value={formData.locauxAdaptes}
                            onValueChange={(value) => handleRadioChange("locauxAdaptes", value)}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="oui" id="locaux-oui" />
                              <Label htmlFor="locaux-oui">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non" id="locaux-non" />
                              <Label htmlFor="locaux-non">Non</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="je-ne-sais-pas" id="locaux-nsp" />
                              <Label htmlFor="locaux-nsp">Je ne sais pas</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pmr">Êtes-vous une Personne à Mobilité Réduite (PMR) ?</Label>
                          <RadioGroup
                            id="pmr"
                            value={formData.pmr}
                            onValueChange={(value) => handleRadioChange("pmr", value)}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="oui" id="pmr-oui" />
                              <Label htmlFor="pmr-oui">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non" id="pmr-non" />
                              <Label htmlFor="pmr-non">Non</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="typeHandicap">
                            Quel est votre handicap (lecture, mémorisation, déplacement…) ?
                          </Label>
                          <Textarea
                            id="typeHandicap"
                            name="typeHandicap"
                            placeholder="Décrivez votre handicap si concerné"
                            value={formData.typeHandicap}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="troublesDys">Souffrez-vous de troubles "Dys" ? (dyslexie, dyspraxie…)</Label>
                          <Textarea
                            id="troublesDys"
                            name="troublesDys"
                            placeholder="Décrivez vos troubles si concerné"
                            value={formData.troublesDys}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="adaptationsNecessaires">
                            Besoin d'adaptations pédagogiques/matérielles ?
                          </Label>
                          <Textarea
                            id="adaptationsNecessaires"
                            name="adaptationsNecessaires"
                            placeholder="Décrivez vos besoins si concerné"
                            value={formData.adaptationsNecessaires}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Précédent
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 8 ? (
                  <Button type="button" className="bg-[#2D2E83] hover:bg-[#2D2E83]/90" onClick={nextStep}>
                    Suivant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-[#E94E1B] hover:bg-[#E94E1B]/90">
                    Terminer l'inscription
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
