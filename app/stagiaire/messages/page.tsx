"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { StagiaireLayout } from "@/components/stagiaire-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Paperclip, User, Phone, Video, MoreHorizontal, Check, CheckCheck } from "lucide-react"

export default function StagiaireMessages() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Données fictives pour la démonstration
  const contacts = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Référente",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Bonjour Rayan, comment avancez-vous sur le module 5 ?",
      lastMessageTime: "10:30",
      unread: 1,
    },
    {
      id: 2,
      name: "Jean Dupont",
      role: "Formateur",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "N'oubliez pas de terminer l'exercice pour demain.",
      lastMessageTime: "Hier",
      unread: 0,
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Administration",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Votre dossier a bien été mis à jour.",
      lastMessageTime: "Lun",
      unread: 0,
    },
    {
      id: 4,
      name: "Thomas Leroy",
      role: "Stagiaire",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Est-ce que tu as compris l'exercice sur React ?",
      lastMessageTime: "Dim",
      unread: 0,
    },
    {
      id: 5,
      name: "Emma Petit",
      role: "Stagiaire",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "On se retrouve demain pour travailler sur le projet ?",
      lastMessageTime: "Ven",
      unread: 0,
    },
  ]

  const conversations = [
    {
      id: 1,
      contact: contacts.find((c) => c.id === 1),
      messages: [
        {
          id: 1,
          sender: "contact",
          text: "Bonjour Rayan, j'espère que vous allez bien.",
          time: "10:15",
          status: "read",
        },
        {
          id: 2,
          sender: "contact",
          text: "Comment avancez-vous sur le module 5 ?",
          time: "10:16",
          status: "read",
        },
        {
          id: 3,
          sender: "me",
          text: "Bonjour Marie, je vais bien merci. J'ai terminé les 3 premières leçons du module 5.",
          time: "10:20",
          status: "read",
        },
        {
          id: 4,
          sender: "contact",
          text: "C'est très bien ! Avez-vous rencontré des difficultés particulières ?",
          time: "10:25",
          status: "read",
        },
        {
          id: 5,
          sender: "me",
          text: "J'ai eu quelques difficultés avec les hooks React, mais j'ai relu la documentation et je pense avoir compris.",
          time: "10:28",
          status: "read",
        },
        {
          id: 6,
          sender: "contact",
          text: "Parfait. N'hésitez pas à me poser des questions si vous avez besoin d'aide. Nous pourrons en discuter lors de notre prochain rendez-vous.",
          time: "10:30",
          status: "unread",
        },
      ],
    },
    {
      id: 2,
      contact: contacts.find((c) => c.id === 2),
      messages: [
        {
          id: 1,
          sender: "contact",
          text: "Bonjour Rayan, j'ai corrigé votre exercice sur JavaScript.",
          time: "Hier, 14:30",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Bonjour Jean, merci. Quel est le résultat ?",
          time: "Hier, 15:00",
          status: "read",
        },
        {
          id: 3,
          sender: "contact",
          text: "Vous avez obtenu 16/20. C'est un très bon résultat, mais il y a quelques points à améliorer sur la gestion des erreurs.",
          time: "Hier, 15:15",
          status: "read",
        },
        {
          id: 4,
          sender: "me",
          text: "Super ! Je vais travailler sur la gestion des erreurs.",
          time: "Hier, 15:20",
          status: "read",
        },
        {
          id: 5,
          sender: "contact",
          text: "N'oubliez pas de terminer l'exercice pour demain.",
          time: "Hier, 16:45",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      contact: contacts.find((c) => c.id === 3),
      messages: [
        {
          id: 1,
          sender: "contact",
          text: "Bonjour Rayan, je vous informe que nous avons bien reçu votre attestation de domicile.",
          time: "Lundi, 09:30",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Bonjour Sophie, merci pour l'information.",
          time: "Lundi, 10:00",
          status: "read",
        },
        {
          id: 3,
          sender: "contact",
          text: "Votre dossier a bien été mis à jour.",
          time: "Lundi, 10:15",
          status: "read",
        },
      ],
    },
    {
      id: 4,
      contact: contacts.find((c) => c.id === 4),
      messages: [
        {
          id: 1,
          sender: "contact",
          text: "Salut Rayan, comment ça va ?",
          time: "Dimanche, 11:30",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Salut Thomas, ça va bien et toi ?",
          time: "Dimanche, 12:00",
          status: "read",
        },
        {
          id: 3,
          sender: "contact",
          text: "Bien aussi. Est-ce que tu as compris l'exercice sur React ?",
          time: "Dimanche, 12:15",
          status: "read",
        },
        {
          id: 4,
          sender: "me",
          text: "Oui, c'est assez clair. Tu as besoin d'aide ?",
          time: "Dimanche, 12:30",
          status: "read",
        },
      ],
    },
    {
      id: 5,
      contact: contacts.find((c) => c.id === 5),
      messages: [
        {
          id: 1,
          sender: "contact",
          text: "Salut Rayan, tu es disponible pour travailler sur le projet de groupe ?",
          time: "Vendredi, 14:30",
          status: "read",
        },
        {
          id: 2,
          sender: "me",
          text: "Salut Emma, oui je suis disponible. Quand veux-tu qu'on se retrouve ?",
          time: "Vendredi, 15:00",
          status: "read",
        },
        {
          id: 3,
          sender: "contact",
          text: "On se retrouve demain pour travailler sur le projet ?",
          time: "Vendredi, 15:15",
          status: "read",
        },
      ],
    },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const activeConversationData = conversations.find((conv) => conv.id === activeConversation)

  const handleSendMessage = () => {
    if (message.trim() === "") return

    console.log("Message envoyé:", message)
    // Dans une application réelle, vous enverriez le message au serveur ici
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation])

  return (
    <StagiaireLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2E83]">Messages</h1>
          <p className="text-gray-600">Communiquez avec vos formateurs et autres stagiaires</p>
        </div>

        <Card className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Liste des contacts */}
            <div className="border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="unread">Non lus</TabsTrigger>
                    <TabsTrigger value="staff">Équipe</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="m-0">
                  <ScrollArea className="h-[calc(100vh-16rem)]">
                    <div className="space-y-1 p-2">
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                              activeConversation === contact.id ? "bg-[#2D2E83]/10" : "hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveConversation(contact.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span
                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                                  contact.status === "online" ? "bg-green-500" : "bg-gray-300"
                                }`}
                              ></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium truncate">{contact.name}</h3>
                                <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && <Badge className="bg-[#E94E1B]">{contact.unread}</Badge>}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          Aucun contact ne correspond à votre recherche
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="unread" className="m-0">
                  <ScrollArea className="h-[calc(100vh-16rem)]">
                    <div className="space-y-1 p-2">
                      {filteredContacts.filter((c) => c.unread > 0).length > 0 ? (
                        filteredContacts
                          .filter((c) => c.unread > 0)
                          .map((contact) => (
                            <div
                              key={contact.id}
                              className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                                activeConversation === contact.id ? "bg-[#2D2E83]/10" : "hover:bg-gray-100"
                              }`}
                              onClick={() => setActiveConversation(contact.id)}
                            >
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span
                                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                                    contact.status === "online" ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                ></span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium truncate">{contact.name}</h3>
                                  <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                              </div>
                              <Badge className="bg-[#E94E1B]">{contact.unread}</Badge>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">Aucun message non lu</div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="staff" className="m-0">
                  <ScrollArea className="h-[calc(100vh-16rem)]">
                    <div className="space-y-1 p-2">
                      {filteredContacts.filter((c) => c.role !== "Stagiaire").length > 0 ? (
                        filteredContacts
                          .filter((c) => c.role !== "Stagiaire")
                          .map((contact) => (
                            <div
                              key={contact.id}
                              className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                                activeConversation === contact.id ? "bg-[#2D2E83]/10" : "hover:bg-gray-100"
                              }`}
                              onClick={() => setActiveConversation(contact.id)}
                            >
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span
                                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                                    contact.status === "online" ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                ></span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium truncate">{contact.name}</h3>
                                  <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.role}</p>
                              </div>
                              {contact.unread > 0 && <Badge className="bg-[#E94E1B]">{contact.unread}</Badge>}
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">Aucun membre de l'équipe trouvé</div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            {/* Zone de conversation */}
            <div className="col-span-2 flex flex-col h-full">
              {activeConversationData ? (
                <>
                  {/* En-tête de la conversation */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={activeConversationData.contact?.avatar || "/placeholder.svg"}
                          alt={activeConversationData.contact?.name}
                        />
                        <AvatarFallback>{activeConversationData.contact?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{activeConversationData.contact?.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${
                              activeConversationData.contact?.status === "online" ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          <span>{activeConversationData.contact?.status === "online" ? "En ligne" : "Hors ligne"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeConversationData.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                          {msg.sender === "contact" && (
                            <Avatar className="mr-2 mt-1">
                              <AvatarImage
                                src={activeConversationData.contact?.avatar || "/placeholder.svg"}
                                alt={activeConversationData.contact?.name}
                              />
                              <AvatarFallback>{activeConversationData.contact?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.sender === "me" ? "bg-[#2D2E83] text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div
                              className={`flex items-center text-xs mt-1 ${
                                msg.sender === "me" ? "text-white/70 justify-end" : "text-gray-500"
                              }`}
                            >
                              <span>{msg.time}</span>
                              {msg.sender === "me" && (
                                <span className="ml-1">
                                  {msg.status === "sent" ? (
                                    <Check className="h-3 w-3" />
                                  ) : msg.status === "delivered" ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <CheckCheck className="h-3 w-3 text-blue-400" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Zone de saisie */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Textarea
                        placeholder="Écrivez votre message..."
                        className="flex-1 min-h-[2.5rem] max-h-[10rem]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <Button
                        className="bg-[#2D2E83] hover:bg-[#2D2E83]/90 rounded-full h-10 w-10 p-0"
                        onClick={handleSendMessage}
                        disabled={message.trim() === ""}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <User className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Sélectionnez une conversation</h3>
                  <p className="text-gray-500 max-w-md">
                    Choisissez un contact dans la liste pour commencer à discuter ou pour voir vos messages précédents.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </StagiaireLayout>
  )
}
