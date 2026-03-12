import React from "react"
import { Mail, Phone, Archive } from "lucide-react"

interface WhistleblowerChannelsProps {
  hotline_email: string
  hotline_phones: { phone: string }[] | undefined
  dropbox_locations: { location_name: string; address: string }[] | undefined
}

export default function WhistleblowerChannels({
  hotline_email,
  hotline_phones,
  dropbox_locations,
}: WhistleblowerChannelsProps) {
  return (
    <div className="w-full max-w-[520px] font-sans text-gray-900 mt-10 mb-6">
      {/* --- Bagian Tabs Atas --- */}
      <div className="flex items-end">
        {/* Tab Aktif (Kiri) */}
        <div className="bg-[#E4EEF8] rounded-t-xl px-6 py-3 relative z-30">
          <h2 className="text-xl md:text-[20px] font-bold text-gray-900">
            Whistleblower Channels
          </h2>
        </div>

        {/* Tab Tengah (Biru Tua) */}
        <div className="bg-[#337ABC] rounded-t-xl h-[40px] w-16 -ml-3 relative z-20"></div>

        {/* Tab Kanan (Biru Muda/Cyan) */}
        <div className="bg-[#53C3D9] rounded-t-xl h-[40px] w-16 -ml-3 relative z-10"></div>
      </div>

      {/* --- Kontainer Utama --- */}
      {/* -mt-[1px] digunakan untuk menghilangkan gap/garis putih antara tab dan container */}
      <div className="bg-[#E4EEF8] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 relative z-30 -mt-[1px]">
        <div className="flex flex-col gap-y-8">
          {/* Email Item */}
          {hotline_email && (
            <div className="flex items-start gap-x-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#337ABC] rounded-full flex items-center justify-center text-white mt-1">
                <Mail size={20} className="fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold">Hotline Email</h3>
                <p className="text-gray-800 text-sm mt-1">{hotline_email}</p>
              </div>
            </div>
          )}

          {/* Phone Item */}
          {hotline_phones && hotline_phones.length > 0 && (
            <div className="flex items-start gap-x-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#337ABC] rounded-full flex items-center justify-center text-white mt-1">
                <Phone size={20} className="fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold">Hotline Phone</h3>
                <ul className="list-disc ml-5 mt-1 text-gray-800 text-sm space-y-1">
                  {hotline_phones.map((item, idx) => (
                    <li key={`phone-${idx}`}>{item.phone}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Dropbox Item */}
          {dropbox_locations && dropbox_locations.length > 0 && (
            <div className="flex items-start gap-x-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#337ABC] rounded-full flex items-center justify-center text-white mt-1 relative">
                <Archive size={20} className="fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold mb-3">Dropbox at:</h3>

                <div className="flex flex-col gap-y-4 text-gray-800 text-sm">
                  {dropbox_locations.map((loc, idx) => (
                    <div key={`loc-${idx}`}>
                      <h4 className="font-bold text-gray-900">
                        {loc.location_name}
                      </h4>
                      <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: loc.address }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
