"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"

interface Stagiaire {
  id: number
  name: string
  email: string
  tel: string
  status: string
  progress: number
  formation: string
  dateInscription: string
  referent?: string
}

interface EditStagiaireDialogProps {
  stagiaire: Stagiaire
  onSave: (stagiaire: Stagiaire) => void
  trigger?: React.ReactNode
}

export function EditStagiaireDialog({ stagiaire, onSave, trigger }: EditStagiaireDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Stagiaire>({ ...stagiaire })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setFormData((prev) => ({ ...prev, progress: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-[#67A182]">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le stagiaire</DialogTitle>
            <DialogDescription>Modifiez les informations du stagiaire</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tel" className="text-right">
                Téléphone
              </Label>
              <Input id="tel" name="tel" value={formData.tel} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="formation" className="text-right">
                Formation
              </Label>
              <Input
                id="formation"
                name="formation"
                value={formData.formation}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right">
                Progression (%)
              </Label>
              <Input
                id="progress"
                name="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleProgressChange}
                className="col-span-3"
                required
              />
            </div>
            {formData.referent && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="referent" className="text-right">
                  Référent
                </Label>
                <Input
                  id="referent"
                  name="referent"
                  value={formData.referent}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
