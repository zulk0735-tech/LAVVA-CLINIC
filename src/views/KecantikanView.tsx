import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  Heart,
  Droplet,
  Sun,
  Flame
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const KecantikanView: React.FC = () => {
  const { servicePackages, setBookingTarget } = useClinic();

  const beautyPackages = servicePackages.filter(p => p.category === 'kecantikan');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');

  const skinConcerns = [
    { id: 'all', label: 'Semua Perawatan Estetika' },
    { id: 'glowing', label: 'Kulit Kusam & Dehidrasi (Glass Skin)' },
    { id: 'flek', label: 'Flek Melasma & Hiperpigmentasi (Pico Laser)' },
    { id: 'aging', label: 'Kerutan & Elastisitas (DNA Salmon)' },
    { id: 'acne', label: 'Jerawat & Pori-pori Besar' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-rose-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Klinik Dermatologi Medis & Estetika Bersertifikasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Lavva Aesthetic & Beauty Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dapatkan kulit sehat, cerah merata, dan awet muda dengan teknologi dermatologi medis terdepan: Pico Laser, DNA Salmon Skin Booster, Korean Glass Skin Facial, serta konsultasi dokter spesialis kulit (Sp.KK).
          </p>
        </div>
      </div>

      {/* 3 Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Ditangani Dokter Spesialis Kulit (Sp.KK)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Seluruh diagnosis tipe kulit, setting energi laser, dan tindakan injeksi dikerjakan langsung oleh dokter dermatologis.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Teknologi Pico Laser Medis Asli</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pikodetik laser terbukti klinis memudarkan flek hitam melasma dan merapatkan pori tanpa downtime panjang.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Bahan Original 100% BPOM Certified</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Semua serum pencerah, skin booster, botox dan filler tersegel resmi dan aman untuk jangka panjang.
            </p>
          </div>
        </div>
      </div>

      {/* Aesthetic Treatments Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
            Menu Treatment Estetika
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Paket Perawatan Kulit & Wajah Glowing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beautyPackages.map(pkg => (
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
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-rose-600 text-white shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{pkg.title}</h3>
                  <p className="text-xs font-semibold text-rose-700 mt-1">{pkg.tagline}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Rangkaian Treatment:</span>
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
                  <span className="text-[10px] text-slate-400 block">Biaya Treatment:</span>
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
                  onClick={() => setBookingTarget({ category: 'kecantikan', item: pkg })}
                  className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Reservasi Kulit</span>
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
