import React, { useState } from 'react';
import {
  Smile,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
  Camera,
  Layers,
  Heart
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const GigiView: React.FC = () => {
  const { servicePackages, setBookingTarget, doctors } = useClinic();

  const dentalPackages = servicePackages.filter(p => p.category === 'gigi');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');

  const concerns = [
    { id: 'all', label: 'Semua Perawatan' },
    { id: 'karang', label: 'Plak & Karang Gigi (Scaling)' },
    { id: 'kuning', label: 'Gigi Kuning (Laser Bleaching)' },
    { id: 'berjejal', label: 'Gigi Renggang / Berjejal (Behel)' },
    { id: 'lubang', label: 'Gigi Berlubang (Tambal Estetik)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
            <Smile className="w-3.5 h-3.5" />
            <span>Klinik Gigi Digital & Estetika Senyum Modern</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Lavva Dental Care Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perawatan gigi komprehensif mulai dari pembersihan karang gigi (scaling ultrasound anti-ngilu), pemutihan gigi laser bleaching instan, pemasangan behel kawat gigi, hingga penambalan estetik sewarna gigi asli.
          </p>
        </div>
      </div>

      {/* Dental Features & Technology */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Kamera Intraoral 4K Realtime</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pasien dapat melihat langsung kondisi detail gigi dan gusi pada layar monitor sebelum dan sesudah tindakan.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Scaler Ultrasound Anti-Ngilu</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Getaran ultrasonik presisi menghancurkan kalkulus karang gigi tanpa merusak email maupun memicu rasa linu hebat.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Sterilisasi Autoclave Kelas Medis</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Instrumen dental dibungkus individual pouch steril dan disterilkan dengan standar operasional ruang bedah.
            </p>
          </div>
        </div>
      </div>

      {/* Dental Treatments Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
              Layanan Poli Gigi
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
              Paket Perawatan Gigi & Orthodontik
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dentalPackages.map(pkg => (
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
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-cyan-600 text-white shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{pkg.title}</h3>
                  <p className="text-xs font-semibold text-cyan-700 mt-1">{pkg.tagline}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Prosedur Termasuk:</span>
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
                  <span className="text-[10px] text-slate-400 block">Biaya Tindakan:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-slate-900">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        Rp {pkg.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setBookingTarget({ category: 'gigi', item: pkg })}
                  className="px-4 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Pilih Jadwal</span>
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
