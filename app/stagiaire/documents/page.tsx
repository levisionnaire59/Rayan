"use client"

import type React from "react"

import { useState } from "react"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Download,
  Eye,
  File,
  FileText,
  Filter,
  Folder,
  ImageIcon,
  Paperclip,
  Plus,
  Search,
  Share2,
  Upload,
  X,
} from "lucide-react"

export default function StagiaireDocuments() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadCategory, setUploadCategory] = useState("administratif")
  const [searchQuery, setSearchQuery] = useState("")

  // Données fictives pour la démonstration
  const documents = [
    {
      id: 1,
      name: "Contrat de formation.pdf",
      category: "administratif",
      type: "pdf",
      size: "1.2 MB",
      uploadedBy: "Marie Dubois",
      date: "15/03/2023",
      status: "important",
    },
    {
      id: 2,
      name: "Règlement intérieur.pdf",
      category: "administratif",
      type: "pdf",
      size: "0.8 MB",
      uploadedBy: "Marie Dubois",
      date: "15/03/2023",
      status: "important",
    },
    {
      id: 3,
      name: "Planning des cours.xlsx",
      category: "formation",
      type: "excel",
      size: "0.5 MB",
      uploadedBy: "Jean Dupont",
      date: "20/03/2023",
      status: "normal",
    },
    {
      id: 4,
      name: "Support de cours - HTML.pdf",
      category: "formation",
      type: "pdf",
      size: "3.5 MB",
      uploadedBy: "Jean Dupont",
      date: "25/03/2023",
      status: "normal",
    },
    {
      id: 5,
      name: "Support de cours - CSS.pdf",
      category: "formation",
      type: "pdf",
      size: "2.8 MB",
      uploadedBy: "Jean Dupont",
      date: "01/04/2023",
      status: "normal",
    },
    {
      id: 6,
      name: "Exercices - JavaScript.pdf",
      category: "formation",
      type: "pdf",
      size: "1.5 MB",
      uploadedBy: "Jean Dupont",
      date: "10/04/2023",
      status: "normal",
    },
    {
      id: 7,
      name: "CV - Rayan.pdf",
      category: "personnel",
      type: "pdf",
      size: "0.7 MB",
      uploadedBy: "Rayan",
      date: "05/04/2023",
      status: "normal",
    },
    {
      id: 8,
      name: "Lettre de motivation.docx",
      category: "personnel",
      type: "word",
      size: "0.3 MB",
      uploadedBy: "Rayan",
      date: "05/04/2023",
      status: "normal",
    },
    {
      id: 9,
      name: "Photo d'identité.jpg",
      category: "personnel",
      type: "image",
      size: "1.1 MB",
      uploadedBy: "Rayan",
      date: "05/04/2023",
      status: "normal",
    },
  ]

  const getIconForFileType = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-[#E94E1B]" />
      case "word":
        return <FileText className="h-6 w-6 text-[#2D2E83]" />
      case "excel":
        return <FileText className="h-6 w-6 text-[#67A182]" />
      case "image":
        return <ImageIcon className="h-6 w-6 text-[#FDC758]" />
      default:
        return <File className="h-6 w-6 text-gray-400" />
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    // Logique d'upload fictive
    console.log("Uploading file:", selectedFile?.name, "to category:", uploadCategory)
    setUploadDialogOpen(false)
    setSelectedFile(null)
  }

  const filteredDocuments = (category: string) => {
    return documents
      .filter((doc) => doc.category === category)
      .filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Mes documents</h1>
          <p className="text-gray-600">Consultez et gérez vos documents</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un document..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#67A182] hover:bg-[#67A182]/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Importer un document</DialogTitle>
                  <DialogDescription>Sélectionnez un fichier à importer dans votre espace documents</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file-upload">Fichier</Label>
                    <div className="flex items-center gap-2">
                      <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-1" />
                    </div>
                    {selectedFile && (
                      <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                        <span className="text-sm truncate">{selectedFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 ml-auto"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={uploadCategory} onValueChange={setUploadCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administratif">Documents administratifs</SelectItem>
                        <SelectItem value="formation">Documents de formation</SelectItem>
                        <SelectItem value="personnel">Documents personnels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className="bg-[#67A182] hover:bg-[#67A182]/90"
                  >
                    Importer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="administratif" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="administratif">Administratif</TabsTrigger>
            <TabsTrigger value="formation">Formation</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
          </TabsList>

          {["administratif", "formation", "personnel"].map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Folder className="h-5 w-5 mr-2 text-[#2D2E83]" />
                    {category === "administratif"
                      ? "Documents administratifs"
                      : category === "formation"
                        ? "Documents de formation"
                        : "Documents personnels"}
                  </CardTitle>
                  <CardDescription>
                    {category === "administratif"
                      ? "Documents officiels liés à votre formation"
                      : category === "formation"
                        ? "Supports de cours et exercices"
                        : "Vos documents personnels"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Nom</th>
                          <th className="text-left py-3 px-4 font-medium">Taille</th>
                          <th className="text-left py-3 px-4 font-medium">Ajouté par</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments(category).length > 0 ? (
                          filteredDocuments(category).map((document) => (
                            <tr key={document.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {getIconForFileType(document.type)}
                                  <div className="ml-3">
                                    <div className="font-medium">{document.name}</div>
                                    {document.status === "important" && (
                                      <Badge className="mt-1 bg-[#E94E1B]">Important</Badge>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-gray-500">{document.size}</td>
                              <td className="py-3 px-4">{document.uploadedBy}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {document.date}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="text-[#2D2E83]">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Voir</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-[#67A182]">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Télécharger</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-[#E94E1B]">
                                    <Share2 className="h-4 w-4" />
                                    <span className="sr-only">Partager</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500">
                              {searchQuery
                                ? "Aucun document ne correspond à votre recherche"
                                : "Aucun document dans cette catégorie"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                {category === "personnel" && (
                  <CardFooter>
                    <Button
                      className="w-full bg-[#2D2E83] hover:bg-[#2D2E83]/90"
                      onClick={() => setUploadDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un document personnel
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </StagiaireLayout>
  )
}
