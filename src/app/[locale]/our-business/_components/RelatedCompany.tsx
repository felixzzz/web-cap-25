import { Button } from "@/components/ui/button"
import { imgTempCompanyLogo } from "@/data/images"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function RelatedComponents() {
  return (
    <>
      <div className="relative py-12">
        <div className="container">
          <h2 className="mb-4 text-xl font-bold">Related Company</h2>

          <div className="grid">
            <div className="flex items-center gap-4 rounded-2xl bg-dark-cornflower-blue p-6">
              <div>
                <Image src={imgTempCompanyLogo} alt="img-temp" width={284} />
              </div>
              <div className="text-white">
                <h3 className="mb-1 text-lg font-bold">
                  To Become Leading Energy and Business Company in Indonesia
                </h3>
                <p className="text-sm opacity-70">
                  Increase reliability and become a competitive energy company.
                  That is the mission that PT Krakatau Chandra Energi has always
                  emphasized in running its business.
                </p>
              </div>
              <div>
                <Button variant={"link"} className="text-white">
                  Learn More
                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                    className="relative left-1 transition-all duration-300 group-hover:left-2"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
