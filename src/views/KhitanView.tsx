import React from 'react';
import {
  Scissors,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  Smile,
  Sparkles,
  Droplets,
  HelpCircle,
  Flame
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const KhitanView: React.FC = () => {
  const { servicePackages, setBookingTarget } = useClinic();

  const khitanPackages = servicePackages.filter(p => p.category === 'khitan');

  const methodsComparison = [
    {
      feature: 'Teknologi Penutupan Luka',
      sealer: 'Lem Medis Bedah Khusus (Skin Adhesive)',
      ring: 'Klem Tabung Plastik Sekali Pakai',
      laser: 'Kauter Elektrik + Jahitan Terpilih'
    },
    {
      feature: 'Jarum Suntik Bius',
      sealer: 'Bius Semprot Jet-Injection (Tanpa Jarum)',
      ring: 'Bius Semprot / Jarum Mikro',
      laser: 'Bius Jarum Mikro'
    },
    {
      feature: 'Bisa Langsung Kena Air / Mandi',
      sealer: '✅ Ya, Bisa Langsung Mandi',
      ring: '⚠️ Boleh Mandi setelah 24 Jam',
      laser: '❌ Tunggu 3-5 Hari hingga Kering'
    },
    {
      feature: 'Pelepasan Alat Tambahan',
      sealer: '✅ Tidak Ada Alat Menempel',
      ring: 'Perlu Kontrol Buka Klem (Hari ke 5-7)',
      laser: 'Tidak Ada Pelepasan Alat'
    },
    {
      feature: 'Masa Pemulihan Rata-Rata',
      sealer: '3 - 5 Hari Sembuh Nyaman',
      ring: '5 - 7 Hari Pasca Lepas Klem',
      laser: '7 - 10 Hari'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Scissors className="w-3.5 h-3.5" />
            <span>Pusat Khitan Modern Anak, Remaja & Dewasa</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Poli Khitan Modern Lavva
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Metode sunat modern tanpa jarum suntik, tanpa jahitan (metode sealer lem), minim nyeri, dan anak bisa langsung mandi serta beraktivitas. Dikerjakan oleh dokter spesialis bedah dan dokter operator khitan berpengalaman.
          </p>
        </div>
      </div>

      {/* 3 Core Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Bius Ramah Anak (Needle-Free)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Menggunakan teknologi semprotan udara bertekanan tinggi tanpa jarum suntik konvensional sehingga anak tidak trauma.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Bisa Langsung Mandi</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dengan metode Sealer Lem Bedah tahan air, anak bebas mandi dan buang air kecil tanpa rasa perih.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Garansi Kontrol Sampai Sembuh</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Layanan konsultasi online dan kunjungan kontrol pasca khitan gratis hingga tuntas sembuh sempurna.
            </p>
          </div>
        </div>
      </div>

      {/* Method Comparison Table */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
            Panduan Edukasi Orang Tua
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-serif mt-1">
            Perbandingan Metode Khitan Modern
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <thead className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold">Karakteristik</th>
                <th className="p-3.5 font-bold text-amber-800 bg-amber-50">Metode Sealer Lem (Terlaris)</th>
                <th className="p-3.5 font-bold text-teal-800">Metode Smart Ring / Klamp</th>
                <th className="p-3.5 font-bold text-slate-700">Metode Laser Kauter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {methodsComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-semibold text-slate-900">{row.feature}</td>
                  <td className="p-3.5 font-bold text-amber-900 bg-amber-50/50">{row.sealer}</td>
                  <td className="p-3.5">{row.ring}</td>
                  <td className="p-3.5">{row.laser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Khitan Packages Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
            Paket Layanan Khitan
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Pilihan Paket Sunat Anak & Dewasa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {khitanPackages.map(pkg => (
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
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-500 text-slate-950 shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{pkg.title}</h3>
                  <p className="text-xs font-semibold text-amber-700 mt-1">{pkg.tagline}</p>
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
                  <span className="text-[10px] text-slate-400 block">Biaya All-in:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() => setBookingTarget({ category: 'khitan', item: pkg })}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Daftar Khitan</span>
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
