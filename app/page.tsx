import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LucideUser, LucideUserCog } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-b from-[#FEE185]/30 to-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D2E83] mb-4">Bienvenue au centre de formation</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-[#E94E1B] mb-8">"Tous Ensemble"</h2>
          <p className="text-lg md:text-xl text-gray-600 italic">"Tous Ensemble pour mieux vivre ensemble..."</p>
        </div>

        <Card className="w-full max-w-3xl p-8 shadow-lg border-[#67A182]/20">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/login?role=stagiaire" className="flex-1">
              <Button className="w-full h-24 text-xl bg-[#2D2E83] hover:bg-[#2D2E83]/90 transition-all" size="lg">
                <LucideUser className="mr-2 h-6 w-6" />
                Stagiaire
              </Button>
            </Link>
            <Link href="/login?role=admin" className="flex-1">
              <Button className="w-full h-24 text-xl bg-[#E94E1B] hover:bg-[#E94E1B]/90 transition-all" size="lg">
                <LucideUserCog className="mr-2 h-6 w-6" />
                Administrateur
              </Button>
            </Link>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Accédez à votre espace personnel pour suivre votre parcours ou gérer les formations
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
