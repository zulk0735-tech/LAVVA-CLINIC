import React from 'react';
import {
  HeartPulse,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const HomeCareView: React.FC = () => {
  const { servicePackages, setBookingTarget } = useClinic();

  const homeCarePackages = servicePackages.filter(p => p.category === 'homecare');

  const steps = [
    {
      step: '01',
      title: 'Pilih Layanan & Waktu',
      desc: 'Tentukan jenis perawatan medis dan jadwal kunjungan yang diinginkan.'
    },
    {
      step: '02',
      title: 'Konfirmasi Alamat',
      desc: 'Input alamat rumah pasien dan keluhan kondisi medis yang perlu disiapkan.'
    },
    {
      step: '03',
      title: 'Tenaga Medis Tiba',
      desc: 'Dokter atau perawat berlisensi SIP tiba dengan perlengkapan medis steril.'
    },
    {
      step: '04',
      title: 'Evaluasi & Laporan Medis',
      desc: 'Hasil pemeriksaan dan catatan rekam medis dicatat secara digital.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-rose-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Layanan Medis Langsung di Kediaman Pasien</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Lavva Home Care Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Perawatan medis profesional dan terpercaya tanpa perlu keluar rumah. Cocok untuk pasien pasca operasi, luka diabetes, fisioterapi lansia, hingga infus multivitamin booster.
          </p>
        </div>
      </div>

      {/* How It Works Flow */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-lg font-bold text-slate-900 font-serif">Prosedur Kunjungan Home Care</h3>
          <p className="text-xs text-slate-500 mt-1">4 Langkah praktis mendapatkan penanganan medis di rumah Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 relative shadow-2xs">
              <span className="text-2xl font-black text-rose-500/20 block mb-2 font-mono">
                {st.step}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">{st.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
            Pilihan Paket Kunjungan
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Paket Perawatan Medis Home Visit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCarePackages.map(pkg => (
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
                  <span className="font-bold text-slate-800 block text-[11px]">Fasilitas Termasuk:</span>
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
                  <span className="text-[10px] text-slate-400 block">Biaya Kunjungan:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() => setBookingTarget({ category: 'homecare', item: pkg })}
                  className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Pesan Sekarang</span>
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
