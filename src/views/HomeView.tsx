import React, { useState } from 'react';
import {
  Stethoscope,
  Pill,
  HeartPulse,
  Syringe,
  Scissors,
  Smile,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Star,
  Users,
  CheckCircle2,
  PhoneCall,
  Calendar,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Check,
  ShieldAlert,
  Search,
  Mic,
  X
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';
import { VoiceInputButton } from '../components/VoiceInputButton';

export const HomeView: React.FC = () => {
  const { setActiveTab, doctors, setBookingTarget, clinicInfo } = useClinic();
  const { role, switchRole } = useAuth();
  const [voiceQuery, setVoiceQuery] = useState('');

  const handleVoiceSearch = (query: string) => {
    setVoiceQuery(query);
    const q = query.toLowerCase();
    
    // Smart voice routing based on natural spoken keywords
    if (q.includes('obat') || q.includes('apotek') || q.includes('vitamin') || q.includes('paracetamol') || q.includes('resep')) {
      setActiveTab('obat');
    } else if (q.includes('gigi') || q.includes('karang') || q.includes('scaling') || q.includes('behel') || q.includes('tambal')) {
      setActiveTab('gigi');
    } else if (q.includes('cantik') || q.includes('kulit') || q.includes('facial') || q.includes('acne') || q.includes('laser') || q.includes('jerawat')) {
      setActiveTab('kecantikan');
    } else if (q.includes('khitan') || q.includes('sunat') || q.includes('sealer') || q.includes('lem')) {
      setActiveTab('khitan');
    } else if (q.includes('vaksin') || q.includes('imunisasi') || q.includes('hpv') || q.includes('flu')) {
      setActiveTab('vaksin');
    } else if (q.includes('home') || q.includes('rumah') || q.includes('infus') || q.includes('rawat') || q.includes('lansia')) {
      setActiveTab('homecare');
    } else if (q.includes('admin') || q.includes('dashboard') || q.includes('laporan') || q.includes('inventaris')) {
      if (role !== 'superadmin') switchRole('superadmin');
      setActiveTab('admin');
    } else if (q.includes('tentang') || q.includes('alamat') || q.includes('jadwal') || q.includes('telepon') || q.includes('lokasi')) {
      setActiveTab('tentang');
    } else {
      // default to consultation doctor search
      setActiveTab('konsultasi');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Welcome & Notification Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-slate-900 font-serif">Selamat Datang di Portal LAVVA CLINIC</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Pelayanan Terpadu Aktif
              </span>
            </div>
            <p className="text-xs text-slate-500">Akses telemedisin 24 jam, apotek online kurir 1 jam, khitan sealer & klinik spesialis.</p>
          </div>
        </div>

        {/* Voice Search Quick Bar */}
        <div className="relative w-full md:w-80 flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={voiceQuery}
            onChange={e => setVoiceQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && voiceQuery.trim()) {
                handleVoiceSearch(voiceQuery);
              }
            }}
            placeholder="Cari layanan, dokter, obat dengan suara..."
            className="w-full pl-9 pr-24 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-teal-600 shadow-2xs"
          />
          {voiceQuery && (
            <button
              type="button"
              onClick={() => setVoiceQuery('')}
              className="absolute right-12 text-slate-400 hover:text-slate-600 p-1 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="absolute right-1.5 top-1">
            <VoiceInputButton
              onTranscript={(text) => handleVoiceSearch(text)}
              currentValue={voiceQuery}
              mode="replace"
              size="sm"
              placeholderPrompt="Bicara apa yang Anda cari (contoh: 'Beli obat batuk', 'Dokter gigi')..."
              tooltip="Pencarian Suara Cepat (Voice to Text)"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN BENTO GRID (Theme Pattern from user request) */}
      {/* ========================================================================= */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          
          {/* BENTO 1: Large Featured Hero (Konsultasi Online - Col 2, Row 2 on desktop) */}
          <div
            onClick={() => setActiveTab('konsultasi')}
            className="sm:col-span-2 md:col-span-2 sm:row-span-2 bg-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between group shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-teal-800"
          >
            <div className="z-10 space-y-3">
              <div className="inline-flex items-center space-x-2 bg-teal-400/20 text-teal-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-300/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Prioritas Utama • 24 Jam Siaga</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif mt-2 leading-tight tracking-tight">
                Konsultasi Online<br />Tanpa Antre.
              </h2>
              <p className="text-teal-100/80 max-w-sm text-xs sm:text-sm leading-relaxed">
                Hubungi dokter spesialis kami kapan saja melalui video call atau chat terenkripsi. Dapatkan diagnosa dan E-Resep resmi langsung dari dokter.
              </p>
            </div>

            <div className="z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('konsultasi');
                }}
                className="bg-white text-teal-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 hover:bg-teal-50 transition-colors shadow-md group-hover:scale-105 transition-transform"
              >
                <span>Mulai Konsultasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-teal-200/90 bg-teal-950/60 px-3 py-2 rounded-xl border border-teal-700/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dokter Ber-SIP Resmi</span>
              </div>
            </div>

            {/* Ambient Background Circle Effect */}
            <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-teal-800 rounded-full opacity-40 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
            <div className="absolute right-6 top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          {/* BENTO 2: Estetika & Kulit (Col 1, Row 2) */}
          <div
            onClick={() => setActiveTab('kecantikan')}
            className="sm:col-span-1 sm:row-span-2 bg-rose-50 border border-rose-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 bg-rose-200 rounded-2xl flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                Dermatologi Medis
              </span>
              <h3 className="text-xl font-bold text-rose-950 mt-1.5">Kecantikan & Kulit</h3>
              <p className="text-rose-800/70 text-xs mt-2 leading-relaxed">
                Pico laser, Korean glass skin facial, DNA Salmon booster, acne care & botox.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-rose-700 font-bold">
                  <span>Glass Skin & Pico Laser</span>
                  <span>98% Puas</span>
                </div>
                <div className="h-1.5 w-full bg-rose-200 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-rose-500 rounded-full"></div>
                </div>
                <span className="text-[10px] text-rose-500 font-extrabold uppercase tracking-wider block pt-0.5">
                  Best Seller 2024
                </span>
              </div>

              <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs font-bold text-rose-800 group-hover:text-rose-950">
                <span>Reservasi Treatment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* BENTO 3: Beli Obat (Apotek) (Col 1, Row 1) */}
          <div
            onClick={() => setActiveTab('obat')}
            className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-teal-400 transition-all duration-300 cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Farmasi Resmi</span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5 group-hover:text-teal-700 transition-colors">
                    Beli Obat
                  </h3>
                </div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Pill className="w-5 h-5" />
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Apotek online siap antar 24 jam, obat resep, vitamin & alkes medis.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md">Kurir 1 Jam</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BENTO 4: Kesehatan Gigi (Col 1, Row 1) */}
          <div
            onClick={() => setActiveTab('gigi')}
            className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-cyan-400 transition-all duration-300 cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">Dental Care</span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5 group-hover:text-cyan-700 transition-colors">
                    Kesehatan Gigi
                  </h3>
                </div>
                <div className="w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                  <Smile className="w-5 h-5" />
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Scaling ultrasound anti-ngilu, laser bleaching & pasang behel.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
              <span className="text-[11px] bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md">Kamera 4K</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BENTO 5: Home Care (Col 1, Row 1) */}
          <div
            onClick={() => setActiveTab('homecare')}
            className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">Home Care</h4>
              <p className="text-[11px] text-emerald-700/80 mt-1 leading-snug">
                Perawat & dokter kunjungan ke rumah pasien.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-3">
              Luka, Infus & Lansia
            </span>
          </div>

          {/* BENTO 6: Vaksinasi (Col 1, Row 1) */}
          <div
            onClick={() => setActiveTab('vaksin')}
            className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">Vaksinasi</h4>
              <p className="text-[11px] text-amber-700/80 mt-1 leading-snug">
                Imunisasi Anak IDAI, HPV Gardasil & Influenza.
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full mt-3">
              Cold-Chain 2°C - 8°C
            </span>
          </div>

          {/* BENTO 7: Khitan Modern (Col 1, Row 1) */}
          <div
            onClick={() => setActiveTab('khitan')}
            className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-indigo-950">Khitan Modern</h4>
              <p className="text-[11px] text-indigo-700/80 mt-1 leading-snug">
                Metode Sealer Lem Bedah tanpa jahit & ring.
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded-full mt-3">
              Bebas Langsung Mandi
            </span>
          </div>

          {/* BENTO 8: Super Admin Control Tile (Col 1, Row 1) */}
          <div
            onClick={() => {
              if (role !== 'superadmin') switchRole('superadmin');
              setActiveTab('admin');
            }}
            className="bg-slate-900 rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-800 shadow-md"
          >
            <div className="text-slate-400 group-hover:text-amber-400 transition-colors mt-1">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Super Admin</h4>
              <p className="text-[10px] text-slate-400 mt-1">Management System</p>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
              {role === 'superadmin' ? 'Sedang Aktif' : 'Buka Dashboard'}
            </span>
          </div>

          {/* BENTO 9: Wide Clinic Accreditation & Profile Strip */}
          <div
            onClick={() => setActiveTab('tentang')}
            className="sm:col-span-2 md:col-span-4 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:border-teal-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold font-serif text-white">Akreditasi Kemenkes RI & Legalitas Pelayanan</h3>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-400/40 px-2 py-0.5 rounded-full">
                    Paripurna
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  LAVVA CLINIC menerapkan standar sterilisasi autoclave medis tingkat tinggi dengan 100% dokter spesialis dan dokter umum berlisensi SIP resmi.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center space-x-1.5">
                <span>Profil & Fasilitas Lengkap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED DOCTORS SPOTLIGHT (Bento Cards Layout) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
              Jadwal Siaga
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
              Tim Dokter Spesialis & Konsultasi Online
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('konsultasi')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            <span>Lihat Semua Dokter ({doctors.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.slice(0, 4).map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-44">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white shadow-xs">
                    Online Siaga
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({doc.reviewsCount})</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs mt-1 line-clamp-1">{doc.name}</h3>
                  <p className="text-[11px] text-teal-700 font-semibold">{doc.specialty}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Tarif:</span>
                  <span className="text-xs font-black text-slate-900">
                    Rp {doc.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() => setBookingTarget({ category: 'konsultasi', item: doc })}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Konsultasi
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3 STATS PILLS (Bento Footing) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center space-x-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900">{clinicInfo.stats?.patientsServed || '38,500+'}</span>
            <p className="text-xs text-slate-500">Pasien Terlayani Puas</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center space-x-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900">{clinicInfo.stats?.expertDoctors || '28+ Dokter Spesialis'}</span>
            <p className="text-xs text-slate-500">Dokter Spesialis & Umum Ber-SIP</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center space-x-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900">{clinicInfo.stats?.satisfactionRate || '99.4%'}</span>
            <p className="text-xs text-slate-500">Skor Rating Pengalaman Medis</p>
          </div>
        </div>
      </section>

    </div>
  );
};
