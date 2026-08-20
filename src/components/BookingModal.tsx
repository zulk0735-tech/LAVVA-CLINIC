import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  FileText,
  AlertCircle,
  Sparkles,
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';
import { Doctor, ServicePackage } from '../types';
import { VoiceInputButton } from './VoiceInputButton';

export const BookingModal: React.FC = () => {
  const {
    bookingTarget,
    setBookingTarget,
    createAppointment,
    doctors,
    setActiveReceipt
  } = useClinic();

  const { currentUser, isLoggedIn, setShowAuthModal } = useAuth();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 WIB');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS Lavva Pay');
  const [createdAppointment, setCreatedAppointment] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setPatientName(currentUser.name);
      setPatientPhone(currentUser.phone);
      setPatientEmail(currentUser.email);
      setAddress(currentUser.address || '');
    }
    // Set default tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [currentUser, bookingTarget]);

  if (!bookingTarget) return null;

  const isDoctorTarget = 'specialty' in (bookingTarget.item || {});
  const targetItem = bookingTarget.item as (ServicePackage | Doctor | undefined);

  const title = targetItem
    ? isDoctorTarget
      ? `Buat Janji dengan ${(targetItem as Doctor).name}`
      : `Pendaftaran ${(targetItem as ServicePackage).title}`
    : `Pendaftaran Pelayanan ${bookingTarget.category.toUpperCase()}`;

  const price = targetItem?.price || 150000;
  const isHomeCare = bookingTarget.category === 'homecare';

  const timeSlots = [
    '08:30 WIB',
    '10:00 WIB',
    '11:30 WIB',
    '13:30 WIB',
    '15:00 WIB',
    '16:30 WIB',
    '19:00 WIB'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    let doctorName = isDoctorTarget ? (targetItem as Doctor).name : undefined;
    let doctorId = isDoctorTarget ? (targetItem as Doctor).id : selectedDoctorId;

    if (!doctorName && selectedDoctorId) {
      const doc = doctors.find(d => d.id === selectedDoctorId);
      if (doc) doctorName = doc.name;
    }

    const appointment = createAppointment({
      patientId: currentUser?.id || 'guest-1',
      patientName,
      patientPhone,
      patientEmail,
      serviceCategory: bookingTarget.category,
      serviceName: isDoctorTarget ? `Konsultasi ${(targetItem as Doctor).specialty}` : (targetItem as ServicePackage)?.title || `Layanan ${bookingTarget.category}`,
      doctorId,
      doctorName,
      date,
      time,
      status: 'Dikonfirmasi',
      totalPrice: price,
      notes: notes || undefined,
      address: isHomeCare ? address : undefined,
      paymentMethod
    });

    setCreatedAppointment(appointment);
    setIsSuccess(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleClose = () => {
    setBookingTarget(null);
    setIsSuccess(false);
    setCreatedAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base line-clamp-1">{title}</h3>
              <p className="text-xs text-teal-100">Lavva Clinic Verified Appointment System</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Summary Card */}
              <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-200/60 px-2 py-0.5 rounded">
                    {bookingTarget.category.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs mt-1">
                    {targetItem ? ('title' in targetItem ? targetItem.title : targetItem.name) : 'Pelayanan Medis'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Biaya Layanan:</span>
                  <span className="text-sm font-extrabold text-teal-800">
                    Rp {price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Patient Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-600 font-semibold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-teal-600" /> Nama Pasien
                    </label>
                    <VoiceInputButton
                      onTranscript={(text) => setPatientName(text)}
                      currentValue={patientName}
                      mode="replace"
                      size="sm"
                      tooltip="Dikte nama pasien"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    placeholder="Nama Lengkap Pasien"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-600" /> No. WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={e => setPatientPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
              </div>

              {/* Date & Time Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" /> Tanggal Kunjungan
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> Pilihan Sesi Waktu
                  </label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Picker (if not preselected) */}
              {!isDoctorTarget && (
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Pilih Tenaga Medis / Dokter Pendamping (Opsional)</label>
                  <select
                    value={selectedDoctorId}
                    onChange={e => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  >
                    <option value="">-- Rekomendasi Tim Dokter Lavva Clinic Terjadwal --</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Home Care Address */}
              {isHomeCare && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-600 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" /> Alamat Lengkap Kunjungan Home Care
                    </label>
                    <VoiceInputButton
                      onTranscript={(text) => setAddress(text)}
                      currentValue={address}
                      mode="append"
                      size="sm"
                      iconOnly={false}
                      placeholderPrompt="Contoh: Jl. Melati No. 12, Patokan dekat Masjid..."
                      tooltip="Dikte alamat rumah dengan suara"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Tuliskan alamat lengkap beserta patokan rumah untuk perawat..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-600 font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-teal-600" /> Keluhan Utama / Catatan Khusus Medis
                  </label>
                  <VoiceInputButton
                    onTranscript={(text) => setNotes(text)}
                    currentValue={notes}
                    mode="append"
                    size="sm"
                    tooltip="Dikte keluhan / catatan khusus"
                  />
                </div>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Contoh: Takut jarum suntik, ada alergi penisilin, dll."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1.5 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-teal-600" /> Metode Pembayaran
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'QRIS Lavva Pay', label: 'QRIS Lavva Pay (BCA, Gopay, OVO, ShopeePay)', icon: QrCode },
                    { id: 'Transfer Bank BCA', label: 'Transfer Bank BCA / Mandiri Virtual Account', icon: Building },
                    { id: 'Bayar di Kasir Klinik', label: 'Bayar di Kasir Klinik / Saat Perawat Tiba', icon: CreditCard }
                  ].map(pm => (
                    <label
                      key={pm.id}
                      className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer text-xs ${
                        paymentMethod === pm.id
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <pm.icon className="w-4 h-4 text-teal-600" />
                        <span>{pm.label}</span>
                      </div>
                      <input
                        type="radio"
                        name="bookingPayment"
                        checked={paymentMethod === pm.id}
                        onChange={() => setPaymentMethod(pm.id)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white rounded-xl font-bold shadow-md text-sm transition-all"
                >
                  Konfirmasi & Terbitkan Voucher Janji Temu
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Janji Temu Berhasil Didaftarkan!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Nomor Registrasi: <span className="font-mono font-bold text-slate-800">{createdAppointment?.id}</span>
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Notifikasi konfirmasi dan pengingat jadwal telah dikirimkan ke WhatsApp {createdAppointment?.patientPhone}.
                </p>
              </div>

              {/* Card Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Layanan:</span>
                  <span className="font-bold text-slate-800">{createdAppointment?.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jadwal:</span>
                  <span className="font-bold text-teal-800">{createdAppointment?.date} | {createdAppointment?.time}</span>
                </div>
                {createdAppointment?.doctorName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dokter:</span>
                    <span className="font-semibold text-slate-800">{createdAppointment.doctorName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {createdAppointment?.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActiveReceipt(createdAppointment);
                    handleClose();
                  }}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  Cetak / Simpan Tiket Antrean & Barcode
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
                >
                  Tutup & Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
