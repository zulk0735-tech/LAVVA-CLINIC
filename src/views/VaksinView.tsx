import React from 'react';
import {
  Syringe,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  ArrowRight,
  Thermometer,
  FileCheck2,
  Sparkles,
  Users
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const VaksinView: React.FC = () => {
  const { servicePackages, setBookingTarget } = useClinic();

  const vaccinePackages = servicePackages.filter(p => p.category === 'vaksin');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
            <Syringe className="w-3.5 h-3.5" />
            <span>Poli Vaksinasi & Imunisasi Standar Internasional</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Pusat Vaksinasi Lengkap Lavva
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perlindungan imunitas spesifik keluarga dari penyakit menular berbahaya. Vaksin HPV Kanker Serviks, Influenza Quadrivalent, Hepatitis B, Imunisasi Anak IDAI, serta Vaksin Internasional Umroh/Travel.
          </p>
        </div>
      </div>

      {/* Cold Chain & Safety Guarantee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Cold-Chain Temperature 2°C - 8°C</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Vaksin tersimpan di lemari pendingin medis bersensor digital 24 jam untuk menjamin potensi vaksin 100% aktif.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Injeksi Dokter Berpengalaman</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Penyuntikan dilakukan dokter spesialis atau dokter umum terlatih dengan jarum ultra-fine minim rasa sakit.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Sertifikat Vaksinasi Digital</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Penerbitan buku imunisasi digital resmi dan pengingat otomatis untuk jadwal dosis lanjutan.
            </p>
          </div>
        </div>
      </div>

      {/* Vaccine Packages Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Daftar Vaksinasi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Pilihan Vaksinasi & Imunisasi Keluarga
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaccinePackages.map(pkg => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-48 border border-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  {pkg.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-600 text-white shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{pkg.title}</h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">{pkg.tagline}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Keunggulan Paket:</span>
                  {pkg.features.map((ft, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Biaya Vaksinasi:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() => setBookingTarget({ category: 'vaksin', item: pkg })}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Daftar Vaksin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
