import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#2D2E83] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tous Ensemble</h3>
            <p className="text-sm mb-2">Organisation à but non lucratif d'insertion professionnelle</p>
            <p className="text-sm">
              Tous Ensemble participe à la réflexion et à l'évolution des adhérents au niveau linguistique, culturel,
              caritatif et éducatif.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm">
              <li>Développement professionnel</li>
              <li>Coaching</li>
              <li>Formation</li>
              <li>Accompagnement individuel</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                09 50 31 33 16
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:direction.tousensemble@gmail.com">direction.tousensemble@gmail.com</a>
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                17 Rue de l'Epidème, 59200 Tourcoing
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Réseaux sociaux</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/tousensembletourcoing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 hover:text-[#FDC758] transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/assotousensemble/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 hover:text-[#FDC758] transition-colors" />
                </a>
                <a
                  href="https://fr.linkedin.com/company/tous-ensemble-59"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 hover:text-[#FDC758] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/20 text-center text-sm">
          <p>© {new Date().getFullYear()} Tous Ensemble. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
