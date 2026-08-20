import React, { useState } from 'react';
import {
  HeartPulse,
  Award,
  ShieldCheck,
  Building,
  MapPin,
  PhoneCall,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Users,
  Sparkles,
  Stethoscope,
  Smile,
  ExternalLink
} from 'lucide-react';
import { FACILITIES } from '../data/mockData';
import { useClinic } from '../context/ClinicContext';

export const TentangKamiView: React.FC = () => {
  const { clinicInfo, doctors } = useClinic();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah seluruh dokter di Lavva Clinic memiliki SIP dan STR resmi?',
      a: 'Ya, 100% dokter umum, dokter gigi, dan dokter spesialis di Lavva Clinic memiliki Surat Tanda Registrasi (STR) aktif dari Konsil Kedokteran Indonesia (KKI) serta Surat Izin Praktik (SIP) resmi yang diterbitkan oleh Dinas Kesehatan.'
    },
    {
      q: 'Bagaimana cara melakukan konsultasi online dan mendapatkan resep obat?',
      a: 'Anda dapat memilih menu "Konsultasi Online", pilih dokter yang sedang online, dan jelaskan keluhan Anda. Dokter akan memberikan diagnosa via chat/video serta menerbitkan E-Resep resmi yang dapat langsung ditebus ke Apotek Lavva dan dikirim ke rumah Anda.'
    },
    {
      q: 'Mengapa metode Khitan Sealer Lem di Lavva Clinic bisa langsung kena air / mandi?',
      a: 'Metode Sealer Lem menggunakan lem bedah khusus (tissue adhesive biocompatible) yang menutup luka secara rapat kedap air (waterproof). Hal ini mencegah masuknya bakteri dan cairan, sehingga anak bisa langsung mandi setelah tindakan tanpa perban basah.'
    },
    {
      q: 'Berapa lama estimasi pengiriman obat dari Apotek Lavva Clinic?',
      a: 'Untuk area jangkauan Jabodetabek dengan pilihan Kurir Instant, obat tiba dalam waktu 1 jam. Untuk pengiriman reguler, obat tiba dalam 1-2 hari kerja.'
    },
    {
      q: 'Apakah layanan Home Care tersedia untuk hari libur atau akhir pekan?',
      a: 'Ya, layanan Home Care beroperasi setiap hari Senin hingga Minggu dari pukul 07.00 - 20.00 WIB untuk perawatan luka, infus vitamin, fisioterapi, dan pendampingan lansia.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Profil Resmi & Legalitas Fasilitas Pelayanan Kesehatan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Tentang LAVVA CLINIC
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pusat pelayanan kesehatan dan estetika modern terpadu yang memadukan keahlian dokter spesialis berlisensi, teknologi medis termutakhir, serta kenyamanan pelayanan kelas prima bagi seluruh anggota keluarga Anda.
          </p>
        </div>
      </div>

      {/* Visi & Misi Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Visi Kami</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Menjadi pusat layanan kesehatan holistik dan estetika medis pilihan utama keluarga Indonesia yang terdepan dalam inovasi teknologi medis, standar sterilisasi paripurna, dan keramahan pelayanan terintegrasi secara digital.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Misi Kami</h3>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Menyediakan akses telekonsultasi dokter 24 jam dan apotek online yang cepat & terpercaya.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Menghadirkan layanan bedah minor khitan tanpa jahit dan klinik dental berteknologi 4K intraoral.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Menjamin keamanan pasien (patient safety) dengan sterilisasi autoclave kelas medis di semua tindakan.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Facilities Showcase */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Fasilitas Modern
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Fasilitas & Ruang Tindakan Medis Berstandar Tinggi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACILITIES.map(fac => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs">{fac.name}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{fac.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Hours & Location */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-2.5 py-0.5 rounded border border-teal-700">
            Lokasi & Jam Operasional
          </span>
          <h3 className="text-2xl font-bold font-serif">Kunjungi Klinik Utama Lavva</h3>
          
          <div className="space-y-3 text-xs text-slate-300 pt-2">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span>{clinicInfo.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneCall className="w-5 h-5 text-teal-400 shrink-0" />
              <span>Hotline: {clinicInfo.phone} | WA: {clinicInfo.whatsapp}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-teal-400 shrink-0" />
              <span>Email Resmi: {clinicInfo.email}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-xs space-y-1.5">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>Jadwal Operasional Pelayanan:</span>
            </div>
            <p className="text-slate-300">• {clinicInfo.workingHours?.poliUmum || '24 Jam'}</p>
            <p className="text-slate-300">• Poli Spesialis: {clinicInfo.workingHours?.spesialis || '08:00 - 21:00 WIB'}</p>
            <p className="text-slate-300">• Apotek Farmasi: {clinicInfo.workingHours?.apotek || '24 Jam Non-Stop'}</p>
            <p className="text-slate-300">• Layanan Home Care: {clinicInfo.workingHours?.homecare || '07.00 - 20.00 WIB'}</p>
          </div>
        </div>

        {/* Map Location Illustration Container */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 relative h-72 shadow-lg flex flex-col justify-between p-4">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')` }}></div>
          <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 max-w-xs">
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>LAVVA CLINIC CENTRAL</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">Kelapa Gading, Jakarta Utara (Akses Parkir VIP & Ambulans)</p>
          </div>

          <div className="relative z-10 flex justify-end">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5 transition-colors"
            >
              <span>Petunjuk Arah Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-serif">Pertanyaan yang Sering Diajukan (FAQ)</h3>
          <p className="text-xs text-slate-500 mt-0.5">Informasi praktis seputar reservasi, rekam medis, dan metode pembayaran</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 hover:text-teal-700"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openFaq === index && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
