"use client"

import type React from "react"

import { useState } from "react"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, MapPin, Plus, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function StagiaireCalendrier() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false)

  // Données fictives pour la démonstration
  const events = [
    {
      id: 1,
      title: "Atelier pratique React",
      date: "2023-06-12",
      startTime: "14:00",
      endTime: "16:00",
      location: "Salle 103",
      description: "Atelier pratique sur les composants React et les hooks.",
      type: "formation",
      instructor: "Jean Dupont",
    },
    {
      id: 2,
      title: "Évaluation module 5",
      date: "2023-06-20",
      startTime: "10:00",
      endTime: "12:00",
      location: "Salle 101",
      description: "Évaluation sur React.js et les concepts avancés.",
      type: "evaluation",
      instructor: "Marie Dubois",
    },
    {
      id: 3,
      title: "Session de questions-réponses",
      date: "2023-06-25",
      startTime: "15:00",
      endTime: "16:00",
      location: "Salle 102",
      description: "Session ouverte pour répondre à vos questions sur les modules précédents.",
      type: "formation",
      instructor: "Jean Dupont",
    },
    {
      id: 4,
      title: "Rendez-vous avec référent",
      date: "2023-06-15",
      startTime: "11:00",
      endTime: "12:00",
      location: "Bureau 203",
      description: "Point d'étape sur votre progression et vos objectifs.",
      type: "rendez-vous",
      instructor: "Marie Dubois",
    },
    {
      id: 5,
      title: "Présentation projet personnel",
      date: "2023-06-30",
      startTime: "14:00",
      endTime: "15:30",
      location: "Salle 105",
      description: "Présentation de votre projet personnel devant le groupe.",
      type: "presentation",
      instructor: "Jean Dupont",
    },
  ]

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    description: "",
    type: "personnel",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEvent = () => {
    console.log("Nouvel événement:", newEvent)
    setAddEventDialogOpen(false)
    // Réinitialiser le formulaire
    setNewEvent({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "10:00",
      location: "",
      description: "",
      type: "personnel",
    })
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setEventDetailsOpen(true)
  }

  const getEventsForDate = (dateStr: string) => {
    return events.filter((event) => event.date === dateStr)
  }

  const currentDateEvents = date ? getEventsForDate(format(date, "yyyy-MM-dd")) : []

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "formation":
        return "bg-[#2D2E83]"
      case "evaluation":
        return "bg-[#E94E1B]"
      case "rendez-vous":
        return "bg-[#67A182]"
      case "presentation":
        return "bg-[#FDC758] text-gray-800"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Calendrier</h1>
          <p className="text-gray-600">Consultez et gérez vos événements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendrier */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
              <CardDescription>Sélectionnez une date pour voir les événements</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" locale={fr} />
            </CardContent>
            <CardFooter>
              <Dialog open={addEventDialogOpen} onOpenChange={setAddEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#2D2E83] hover:bg-[#2D2E83]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un événement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ajouter un événement</DialogTitle>
                    <DialogDescription>Créez un nouvel événement dans votre calendrier</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        placeholder="Titre de l'événement"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !newEvent.date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newEvent.date
                                ? format(new Date(newEvent.date), "PPP", { locale: fr })
                                : "Sélectionner une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newEvent.date ? new Date(newEvent.date) : undefined}
                              onSelect={(date) =>
                                setNewEvent((prev) => ({
                                  ...prev,
                                  date: date ? format(date, "yyyy-MM-dd") : prev.date,
                                }))
                              }
                              initialFocus
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={newEvent.type}
                          onValueChange={(value) => setNewEvent((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Type d'événement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personnel">Personnel</SelectItem>
                            <SelectItem value="formation">Formation</SelectItem>
                            <SelectItem value="rendez-vous">Rendez-vous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startTime">Heure de début</Label>
                        <Input
                          id="startTime"
                          name="startTime"
                          type="time"
                          value={newEvent.startTime}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">Heure de fin</Label>
                        <Input
                          id="endTime"
                          name="endTime"
                          type="time"
                          value={newEvent.endTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Lieu</Label>
                      <Input
                        id="location"
                        name="location"
                        value={newEvent.location}
                        onChange={handleInputChange}
                        placeholder="Lieu de l'événement"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder="Description de l'événement"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddEventDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddEvent} className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">
                      Ajouter
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Événements du jour */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Événements du {date ? format(date, "d MMMM yyyy", { locale: fr }) : "jour"}</CardTitle>
              <CardDescription>
                {currentDateEvents.length
                  ? `${currentDateEvents.length} événement${currentDateEvents.length > 1 ? "s" : ""}`
                  : "Aucun événement prévu pour cette date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDateEvents.length > 0 ? (
                  currentDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <div className="flex items-center text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          {event.instructor && (
                            <div className="flex items-center text-gray-500 mt-1">
                              <User className="h-4 w-4 mr-1" />
                              <span>{event.instructor}</span>
                            </div>
                          )}
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type === "formation"
                            ? "Formation"
                            : event.type === "evaluation"
                              ? "Évaluation"
                              : event.type === "rendez-vous"
                                ? "Rendez-vous"
                                : event.type === "presentation"
                                  ? "Présentation"
                                  : "Personnel"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun événement prévu pour cette date</p>
                    <Button
                      className="mt-4 bg-[#2D2E83] hover:bg-[#2D2E83]/90"
                      onClick={() => setAddEventDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un événement
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialogue de détails d'événement */}
        <Dialog open={eventDetailsOpen} onOpenChange={setEventDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>
                {selectedEvent?.date ? format(new Date(selectedEvent.date), "EEEE d MMMM yyyy", { locale: fr }) : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {selectedEvent?.startTime} - {selectedEvent?.endTime}
                  </span>
                </div>
                <Badge className={selectedEvent ? getEventTypeColor(selectedEvent.type) : ""}>
                  {selectedEvent?.type === "formation"
                    ? "Formation"
                    : selectedEvent?.type === "evaluation"
                      ? "Évaluation"
                      : selectedEvent?.type === "rendez-vous"
                        ? "Rendez-vous"
                        : selectedEvent?.type === "presentation"
                          ? "Présentation"
                          : "Personnel"}
                </Badge>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{selectedEvent?.location}</span>
              </div>
              {selectedEvent?.instructor && (
                <div className="flex items-center text-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  <span>Intervenant: {selectedEvent.instructor}</span>
                </div>
              )}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-700">{selectedEvent?.description}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEventDetailsOpen(false)}>
                Fermer
              </Button>
              <Button className="bg-[#2D2E83] hover:bg-[#2D2E83]/90">Ajouter à mon calendrier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </StagiaireLayout>
  )
}
