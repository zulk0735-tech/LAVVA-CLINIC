import React from 'react';
import {
  HeartPulse,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Stethoscope,
  Pill,
  Syringe,
  Scissors,
  Smile,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Footer: React.FC = () => {
  const { setActiveTab, clinicInfo } = useClinic();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3 pr-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-xs">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-teal-950 font-serif">
                {clinicInfo.name.split(' ')[0] || 'LAVVA'} <span className="font-light text-slate-500 font-sans">{clinicInfo.name.split(' ').slice(1).join(' ') || 'CLINIC'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {clinicInfo.subheading}
            </p>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="flex items-center space-x-2 text-teal-800 font-bold">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>Akreditasi Fasilitas Pelayanan Kesehatan</span>
              </div>
              <p className="text-[11px] text-slate-500">{clinicInfo.accreditation}</p>
            </div>
          </div>

          {/* Layanan Medis */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">
              Layanan Medis
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('konsultasi')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>Konsultasi Dokter Online</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('obat')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  <span>Apotek & Beli Obat</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('homecare')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                  <span>Home Care ke Rumah</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('vaksin')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Syringe className="w-3.5 h-3.5 text-teal-600" />
                  <span>Poli Vaksinasi & Imunisasi</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Poli Khusus */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">
              Poli Khusus
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('khitan')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Scissors className="w-3.5 h-3.5 text-amber-600" />
                  <span>Khitan Modern (Sealer Lem)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gigi')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Smile className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Poli Gigi & Orthodontik</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kecantikan')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>Kecantikan & Dermatologi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tentang')}
                  className="hover:text-teal-700 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profil & Legalitas SIP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-2 text-xs">
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">
              Kontak & Operasional
            </h4>
            <p className="flex items-start space-x-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>{clinicInfo.address}</span>
            </p>
            <p className="flex items-center space-x-1.5 text-slate-500">
              <PhoneCall className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Hotline: {clinicInfo.phone}</span>
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              <span className="font-bold text-teal-900 block mb-0.5">Jam Buka:</span>
              <p>• IGD & Telemedisin: {clinicInfo.workingHours?.poliUmum || '24 Jam'}</p>
              <p>• Poli Spesialis: {clinicInfo.workingHours?.spesialis || '08:00 - 21:00 WIB'}</p>
            </div>
          </div>

        </div>

        {/* Bento Grid Sub-Footer Status Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <div className="flex flex-wrap gap-4">
            <span>&copy; {new Date().getFullYear()} LAVVA CLINIC Indonesia.</span>
            <span className="hover:text-teal-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-teal-600 cursor-pointer">Terms of Service</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Sistem Online</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Layanan Pelanggan: 0800-1-LAVVA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
