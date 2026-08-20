import React, { useState } from 'react';
import {
  Stethoscope,
  Send,
  Video,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  Pill,
  X,
  FileText,
  MessageSquare,
  AlertCircle,
  VideoOff,
  Mic,
  MicOff
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';
import { Doctor } from '../types';
import { VoiceInputButton } from '../components/VoiceInputButton';

export const KonsultasiView: React.FC = () => {
  const {
    doctors,
    activeConsultation,
    startConsultation,
    sendChatMessage,
    endConsultation,
    addToCart,
    medicines,
    setIsCartOpen
  } = useClinic();

  const { currentUser, isLoggedIn, setShowAuthModal } = useAuth();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [complaintText, setComplaintText] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Spesialis' },
    { id: 'umum', label: 'Dokter Umum 24 Jam' },
    { id: 'anak', label: 'Spesialis Anak (Sp.A)' },
    { id: 'estetika', label: 'Kulit & Estetika (Sp.KK)' },
    { id: 'gigi', label: 'Dokter Gigi (Sp.KG)' },
    { id: 'penyakit_dalam', label: 'Penyakit Dalam (Sp.PD)' },
    { id: 'bedah_khitan', label: 'Bedah & Khitan (Sp.B)' },
  ];

  const filteredDoctors = doctors.filter(doc => {
    if (selectedSpecialty === 'all') return true;
    return doc.category === selectedSpecialty;
  });

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    if (!selectedDoctor || !complaintText) return;

    startConsultation(
      selectedDoctor,
      currentUser?.id || 'p-1',
      currentUser?.name || 'Pasien',
      complaintText
    );

    setSelectedDoctor(null);
    setComplaintText('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleRedeemPrescription = (medName: string) => {
    // Find closest medicine in catalog
    const matched = medicines.find(m =>
      medName.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]) ||
      m.name.toLowerCase().includes(medName.toLowerCase().split(' ')[0])
    ) || medicines[0];

    addToCart(matched, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Telemedisin & E-Resep Resmi 24 Jam</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Konsultasi Dokter Online Lavva
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Terhubung langsung dengan dokter spesialis berpengalaman secara realtime via chat & video. Dapatkan diagnosa klinis, anjuran medis, dan resep digital terverifikasi.
          </p>
        </div>
      </div>

      {/* ACTIVE CONSULTATION CHAT ROOM (If user has ongoing consultation) */}
      {activeConsultation && (
        <div className="bg-white rounded-3xl border border-teal-200 shadow-2xl overflow-hidden animate-fadeIn">
          {/* Chat Room Header */}
          <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={activeConsultation.doctorPhoto}
                alt={activeConsultation.doctorName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-400"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">{activeConsultation.doctorName}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-xs text-teal-200">{activeConsultation.doctorSpecialty}</p>
                <p className="text-[10px] text-slate-300">Pasien: {activeConsultation.patientName} | Keluhan: "{activeConsultation.complaint}"</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsVideoCallActive(!isVideoCallActive)}
                className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
                  isVideoCallActive ? 'bg-rose-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Panggilan Video"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">{isVideoCallActive ? 'Tutup Video' : 'Video Call'}</span>
              </button>

              <button
                onClick={endConsultation}
                className="px-3 py-2 bg-rose-500/20 hover:bg-rose-600 border border-rose-400/40 text-white rounded-xl text-xs font-bold transition-all"
              >
                Selesai Konsultasi
              </button>
            </div>
          </div>

          {/* Video Call Simulation Overlay */}
          {isVideoCallActive && (
            <div className="bg-slate-950 p-4 sm:p-6 border-b border-slate-800 text-white relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 h-56 flex items-center justify-center">
                  <img
                    src={activeConsultation.doctorPhoto}
                    alt={activeConsultation.doctorName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{activeConsultation.doctorName}</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 h-56 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center text-xl font-bold mb-2">
                    {currentUser?.name ? currentUser.name.charAt(0) : 'P'}
                  </div>
                  <span className="text-xs text-slate-300">Kamera Pasien (Aktif)</span>
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-lg text-xs font-bold text-white">
                    {currentUser?.name || 'Anda (Pasien)'}
                  </div>
                </div>
              </div>

              {/* Video Call Controls */}
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${isMuted ? 'bg-rose-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                  {isMuted ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={() => setIsVideoCallActive(false)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 rounded-full text-xs font-bold flex items-center gap-1.5"
                >
                  <VideoOff className="w-4 h-4" />
                  <span>Akhiri Video</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
            {activeConsultation.messages.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="text-center py-2">
                    <div className="inline-block bg-teal-100/70 border border-teal-300/60 text-teal-900 text-[11px] font-medium px-4 py-1.5 rounded-full shadow-2xs">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              const isDoctor = msg.sender === 'doctor';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-lg rounded-2xl p-4 space-y-2 shadow-xs ${
                      isDoctor
                        ? 'bg-white text-slate-800 border border-slate-200'
                        : 'bg-teal-700 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 border-b pb-1">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Digital Prescription Box */}
                    {msg.isPrescription && msg.prescriptionData && (
                      <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded flex items-center gap-1">
                            <FileText className="w-3 h-3 text-emerald-700" />
                            <span>E-Resep Digital Lavva Clinic</span>
                          </span>
                          <span className="text-[9px] text-slate-400">R/ Resmi</span>
                        </div>

                        <div className="space-y-1">
                          {msg.prescriptionData.medicines.map((m, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-emerald-100/60">
                              <span className="font-semibold text-slate-900">{m}</span>
                              <button
                                onClick={() => handleRedeemPrescription(m)}
                                className="px-2 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <Pill className="w-3 h-3" />
                                <span>Tebus Obat</span>
                              </button>
                            </div>
                          ))}
                        </div>

                        <p className="text-[10px] text-slate-600 italic">
                          Anjuran: {msg.prescriptionData.dosageInfo}
                        </p>
                        <p className="text-[9px] text-emerald-900 font-bold text-right pt-1">
                          Tertanda: {msg.prescriptionData.doctorSignature}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Tulis pesan atau tanyakan keluhan kepada dokter..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-teal-600 shadow-2xs"
              />
              <div className="absolute right-2 top-2">
                <VoiceInputButton
                  onTranscript={(text) => setInputMessage(text)}
                  currentValue={inputMessage}
                  mode="append"
                  size="sm"
                  placeholderPrompt="Bicara untuk mendikte pesan ke dokter..."
                  tooltip="Bicara pesan (Voice to Text)"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-5 py-3 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 shrink-0"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Specialty Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedSpecialty(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedSpecialty === cat.id
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Doctor Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div
            key={doctor.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="relative shrink-0">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-22 h-22 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white shadow-xs">
                    Online
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-[10px] text-slate-400">({doctor.reviewsCount} review)</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{doctor.name}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{doctor.specialty}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Pengalaman: {doctor.experienceYears} Tahun</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
                <p className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{doctor.strNumber}</span>
                </p>
                <p className="text-slate-500 line-clamp-1">{doctor.hospitalAffiliation}</p>
                <div className="text-[10px] text-emerald-800 font-medium pt-1">
                  Jadwal: {doctor.schedule.join(' | ')}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Biaya Telekonsultasi:</span>
                <span className="text-sm font-extrabold text-slate-900">
                  Rp {doctor.price.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mulai Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Prompt Keluhan Pra-Konsultasi */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative space-y-4">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{selectedDoctor.name}</h3>
                <p className="text-xs text-teal-700 font-semibold">{selectedDoctor.specialty}</p>
                <span className="text-xs font-bold text-slate-800">
                  Biaya: Rp {selectedDoctor.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <form onSubmit={handleStartConsultation} className="space-y-3.5 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-700 font-semibold">
                    Ceritakan Gejala atau Keluhan Utama Anda:
                  </label>
                  <VoiceInputButton
                    onTranscript={(text) => setComplaintText(text)}
                    currentValue={complaintText}
                    mode="append"
                    size="sm"
                    iconOnly={false}
                    placeholderPrompt="Contoh: Sakit kepala sejak 2 hari, mual..."
                    tooltip="Dikte keluhan dengan suara"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={complaintText}
                  onChange={e => setComplaintText(e.target.value)}
                  placeholder="Contoh: Demam sejak kemarin, sakit kepala, dan tenggorokan sakit saat menelan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium text-xs shadow-2xs"
                />
              </div>

              <div className="p-3 bg-teal-50 rounded-xl text-[11px] text-teal-900 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Konsultasi bersifat privat dan terenkripsi. Dokter akan langsung merespons setelah sesi dibuka.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-md text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>Mulai Sesi Telekonsultasi Sekarang</span>
                <Stethoscope className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
