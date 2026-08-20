import React, { useState } from 'react';
import {
  ShieldCheck,
  CalendarCheck,
  ShoppingBag,
  Pill,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Edit3,
  Plus,
  Search,
  Filter,
  Printer,
  ChevronRight,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Stethoscope,
  Scissors,
  Smile,
  Sparkles,
  HeartPulse,
  Syringe,
  X,
  Mic,
  Settings,
  Megaphone,
  UserPlus,
  Trash2,
  Save,
  RotateCcw,
  Building,
  PhoneCall,
  Mail,
  MapPin,
  Award,
  Star,
  Layers,
  Check
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';
import {
  Appointment,
  Order,
  Medicine,
  Doctor,
  ServicePackage,
  WebAnnouncement,
  User,
  ServiceCategory,
  AppointmentStatus,
  ClinicInfo,
  Role
} from '../types';
import { VoiceInputButton } from '../components/VoiceInputButton';

type AdminTab =
  | 'overview'
  | 'appointments'
  | 'orders'
  | 'inventory'
  | 'services'
  | 'doctors'
  | 'profile'
  | 'announcements'
  | 'users';

export const SuperAdminView: React.FC = () => {
  const {
    appointments,
    orders,
    medicines,
    doctors,
    servicePackages,
    clinicInfo,
    announcements,
    users,
    updateAppointmentStatus,
    deleteAppointment,
    updateOrderStatus,
    deleteOrder,
    updateMedicineStock,
    updateMedicinePrice,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    toggleDoctorAvailability,
    addServicePackage,
    updateServicePackage,
    deleteServicePackage,
    updateClinicInfo,
    resetClinicInfo,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleAnnouncement,
    addUser,
    updateUserRole,
    deleteUser,
    setActiveReceipt
  } = useClinic();

  const { role, switchRole } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');

  // Filters & Search
  const [appointmentFilter, setAppointmentFilter] = useState<string>('all');
  const [appointmentSearch, setAppointmentSearch] = useState<string>('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [inventorySearch, setInventorySearch] = useState<string>('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>('all');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('all');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [doctorSearch, setDoctorSearch] = useState<string>('');

  // Modals state
  const [showAddMedModal, setShowAddMedModal] = useState(false);
  const [editingMed, setEditingMed] = useState<Medicine | null>(null);

  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Doctor | null>(null);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);

  const [showAddAnnModal, setShowAddAnnModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState<WebAnnouncement | null>(null);

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<ClinicInfo>(clinicInfo);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Synchronize profile form if clinicInfo updates externally
  React.useEffect(() => {
    setProfileForm(clinicInfo);
  }, [clinicInfo]);

  // Financial Stats Calculation
  const totalAppointmentRevenue = appointments
    .filter(a => a.status !== 'Dibatalkan')
    .reduce((sum, a) => sum + a.totalPrice, 0);

  const totalOrderRevenue = orders
    .filter(o => o.status !== 'Dibatalkan')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalRevenue = totalAppointmentRevenue + totalOrderRevenue;

  // Breakdown revenue per poli
  const poliRevenues: Record<string, number> = {
    khitan: 0,
    gigi: 0,
    kecantikan: 0,
    konsultasi: 0,
    homecare: 0,
    vaksin: 0,
    obat: totalOrderRevenue
  };

  appointments
    .filter(a => a.status !== 'Dibatalkan')
    .forEach(a => {
      if (poliRevenues[a.serviceCategory] !== undefined) {
        poliRevenues[a.serviceCategory] += a.totalPrice;
      }
    });

  // Filtered Lists
  const filteredAppointments = appointments.filter(apt => {
    const matchStatus = appointmentFilter === 'all' || apt.status === appointmentFilter;
    const matchSearch =
      apt.patientName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      apt.id.toLowerCase().includes(appointmentSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredOrders = orders.filter(ord => {
    const matchStatus = orderFilter === 'all' || ord.status === orderFilter;
    const matchSearch =
      ord.patientName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.patientPhone.includes(orderSearch);
    return matchStatus && matchSearch;
  });

  const filteredMedicines = medicines.filter(m => {
    const matchCat = inventoryCategoryFilter === 'all' || m.category === inventoryCategoryFilter;
    const matchSearch =
      m.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      m.category.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      m.dosage.toLowerCase().includes(inventorySearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredServices = servicePackages.filter(p => {
    const matchCat = serviceCategoryFilter === 'all' || p.category === serviceCategoryFilter;
    const matchSearch =
      p.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(serviceSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.specialty.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.category.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'konsultasi': return Stethoscope;
      case 'homecare': return HeartPulse;
      case 'vaksin': return Syringe;
      case 'khitan': return Scissors;
      case 'gigi': return Smile;
      case 'kecantikan': return Sparkles;
      default: return CalendarCheck;
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicInfo(profileForm);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Super Admin Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black font-serif text-white">
                Dashboard Manajemen Super Admin
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Akses Penuh Website & Operasional
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Kendali penuh atas seluruh poliklinik, reservasi, apotek, dokter, paket layanan, profil website, banner, dan pengguna.
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Rekap Laporan</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Ribbon */}
      <div className="flex border-b border-slate-200 space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'overview', label: 'Ringkasan & Keuangan', icon: TrendingUp },
          { id: 'appointments', label: 'Janji Temu Medis', icon: CalendarCheck, count: appointments.length },
          { id: 'orders', label: 'Pesanan Obat', icon: ShoppingBag, count: orders.length },
          { id: 'inventory', label: 'Apotek & Stok Obat', icon: Pill, count: medicines.length },
          { id: 'services', label: 'Paket Treatment & Poli', icon: Layers, count: servicePackages.length },
          { id: 'doctors', label: 'Dokter & Tenaga Medis', icon: Stethoscope, count: doctors.length },
          { id: 'profile', label: 'Profil & Info Website', icon: Settings },
          { id: 'announcements', label: 'Banner & Promo Beranda', icon: Megaphone, count: announcements.length },
          { id: 'users', label: 'Pasien & Pengguna', icon: Users, count: users.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as AdminTab)}
              className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-2xl transition-all flex items-center space-x-2 whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-teal-700 text-teal-900 bg-teal-50/70 shadow-2xs font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                  isActive ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {/* ========================================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Pendapatan Terpadu
                </span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% performa klinik
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Reservasi Janji Temu
                </span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {appointments.length} Booking
                </span>
                <span className="text-[10px] text-teal-600 font-bold mt-1 block">
                  {appointments.filter(a => a.status === 'Dikonfirmasi' || a.status === 'Sedang Berlangsung').length} Aktif / Sedang Dilayani
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Transaksi Apotek
                </span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {orders.length} Transaksi
                </span>
                <span className="text-[10px] text-purple-600 font-bold mt-1 block">
                  Rp {totalOrderRevenue.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Dokter & Tenaga Medis
                </span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {doctors.length} Dokter
                </span>
                <span className="text-[10px] text-amber-600 font-bold mt-1 block">
                  {doctors.filter(d => d.isAvailable).length} Siaga Online & Praktik
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Revenue Breakdown by Poliklinik */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Distribusi Pendapatan per Poliklinik & Layanan
                </h3>
                <p className="text-xs text-slate-500">
                  Perhitungan otomatis dari seluruh transaksi janji temu dan pesanan obat yang berhasil.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Semua Poli Terpantau
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {[
                { name: 'Poli Khitan Modern', category: 'khitan', icon: Scissors, color: 'text-amber-700 bg-amber-50' },
                { name: 'Poli Gigi & Orthodontik', category: 'gigi', icon: Smile, color: 'text-sky-700 bg-sky-50' },
                { name: 'Poli Kecantikan & Kulit', category: 'kecantikan', icon: Sparkles, color: 'text-rose-700 bg-rose-50' },
                { name: 'Apotek & Obat Online', category: 'obat', icon: Pill, color: 'text-purple-700 bg-purple-50' },
                { name: 'Konsultasi Online', category: 'konsultasi', icon: Stethoscope, color: 'text-teal-700 bg-teal-50' },
                { name: 'Home Care Kunjungan', category: 'homecare', icon: HeartPulse, color: 'text-emerald-700 bg-emerald-50' },
                { name: 'Poli Vaksinasi', category: 'vaksin', icon: Syringe, color: 'text-indigo-700 bg-indigo-50' },
              ].map(item => {
                const Icon = item.icon;
                const rev = poliRevenues[item.category] || 0;
                const percentage = totalRevenue > 0 ? Math.round((rev / totalRevenue) * 100) : 0;
                return (
                  <div key={item.category} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{percentage}%</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                      <p className="text-sm font-black text-slate-900 mt-0.5">Rp {rev.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(4, percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Management Short-cuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveAdminTab('services')}
              className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-5 rounded-3xl border border-teal-800 shadow-xs cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-teal-300" />
                </div>
                <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-bold font-serif">Kelola Paket & Layanan</h4>
              <p className="text-[11px] text-teal-200/80 mt-1">
                Tambah atau ubah harga paket Khitan, Gigi, Estetika, Vaksin & Home Care.
              </p>
            </div>

            <div
              onClick={() => setActiveAdminTab('profile')}
              className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-3xl border border-slate-800 shadow-xs cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center">
                  <Building className="w-5 h-5 text-indigo-300" />
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-bold font-serif">Pengaturan Profil Klinik</h4>
              <p className="text-[11px] text-indigo-200/80 mt-1">
                Ubah nama, alamat, jam buka, hotline WhatsApp & teks akreditasi Kemenkes.
              </p>
            </div>

            <div
              onClick={() => setActiveAdminTab('announcements')}
              className="bg-gradient-to-br from-rose-950 to-slate-900 text-white p-5 rounded-3xl border border-rose-900 shadow-xs cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-900 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-rose-300" />
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-bold font-serif">Banner & Promo Beranda</h4>
              <p className="text-[11px] text-rose-200/80 mt-1">
                Aktifkan pengumuman diskon berjalan atau status darurat di bagian atas web.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: JANJI TEMU MEDIS (APPOINTMENTS) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Status:</span>
                <select
                  value={appointmentFilter}
                  onChange={e => setAppointmentFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-teal-600"
                >
                  <option value="all">Semua Status</option>
                  <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                  <option value="Dikonfirmasi">Dikonfirmasi</option>
                  <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

              <div className="relative flex items-center w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={appointmentSearch}
                  onChange={e => setAppointmentSearch(e.target.value)}
                  placeholder="Cari pasien / layanan..."
                  className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <div className="absolute right-1">
                  <VoiceInputButton
                    onTranscript={t => setAppointmentSearch(t)}
                    currentValue={appointmentSearch}
                    mode="replace"
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredAppointments.length} dari {appointments.length} booking
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">ID & Waktu Booking</th>
                    <th className="p-4">Pasien & Kontak</th>
                    <th className="p-4">Layanan / Poli</th>
                    <th className="p-4">Dokter Bertugas</th>
                    <th className="p-4">Biaya & Pembayaran</th>
                    <th className="p-4">Status Layanan</th>
                    <th className="p-4 text-center">Aksi Manajemen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        Tidak ada janji temu yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map(apt => {
                      const Icon = getCategoryIcon(apt.serviceCategory);
                      return (
                        <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-slate-900 block">{apt.id}</span>
                            <span className="text-[11px] text-slate-400">{apt.createdAt}</span>
                            <div className="text-[10px] text-teal-700 font-semibold mt-1">
                              📅 {apt.date} • {apt.time}
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                            <span className="text-[11px] text-slate-500">{apt.patientPhone}</span>
                            {apt.address && (
                              <span className="text-[10px] text-slate-400 line-clamp-1 block mt-0.5">
                                📍 {apt.address}
                              </span>
                            )}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center space-x-1.5">
                              <Icon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span className="font-bold text-slate-800 line-clamp-1">{apt.serviceName}</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                              Poli {apt.serviceCategory}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="text-slate-800 font-medium">{apt.doctorName || 'Tim Medis Poli'}</span>
                          </td>

                          <td className="p-4">
                            <span className="font-black text-slate-900 block">
                              Rp {apt.totalPrice.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {apt.paymentMethod}
                            </span>
                          </td>

                          <td className="p-4">
                            <select
                              value={apt.status}
                              onChange={e => updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none ${
                                apt.status === 'Dikonfirmasi'
                                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                                  : apt.status === 'Sedang Berlangsung'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : apt.status === 'Selesai'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : apt.status === 'Dibatalkan'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                              <option value="Dikonfirmasi">Dikonfirmasi</option>
                              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                              <option value="Selesai">Selesai</option>
                              <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1.5">
                              <button
                                onClick={() => setActiveReceipt(apt)}
                                className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                                title="Lihat E-Tiket / Invoice"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus data janji temu ${apt.id}?`)) {
                                    deleteAppointment(apt.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                title="Hapus Data Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PESANAN OBAT (ORDERS) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Status:</span>
                <select
                  value={orderFilter}
                  onChange={e => setOrderFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-teal-600"
                >
                  <option value="all">Semua Pesanan</option>
                  <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                  <option value="Diproses Apotek">Diproses Apotek</option>
                  <option value="Dikirim">Dikirim Kurir</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

              <div className="relative flex items-center w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Cari nama pasien / ID order..."
                  className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <div className="absolute right-1">
                  <VoiceInputButton
                    onTranscript={t => setOrderSearch(t)}
                    currentValue={orderSearch}
                    mode="replace"
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredOrders.length} dari {orders.length} transaksi farmasi
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">ID & Waktu Pesanan</th>
                    <th className="p-4">Penerima & Alamat Kirim</th>
                    <th className="p-4">Daftar Obat & Qty</th>
                    <th className="p-4">Total Biaya</th>
                    <th className="p-4">Status Pengiriman</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        Tidak ada pesanan obat yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-slate-900 block">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
                          <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">
                            💳 {ord.paymentMethod}
                          </span>
                        </td>

                        <td className="p-4 max-w-xs">
                          <span className="font-bold text-slate-900 block">{ord.patientName}</span>
                          <span className="text-[11px] text-slate-500 block">{ord.patientPhone}</span>
                          <span className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                            📍 {ord.patientAddress}
                          </span>
                        </td>

                        <td className="p-4 max-w-xs">
                          <div className="space-y-1">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
                                <span className="font-bold text-teal-800">{item.quantity}x</span>
                                <span className="text-slate-800 line-clamp-1">{item.medicineName}</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="font-black text-slate-900 block">
                            Rp {(ord.totalPrice + ord.deliveryFee).toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (Ongkir: Rp {ord.deliveryFee.toLocaleString('id-ID')})
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={e => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none ${
                              ord.status === 'Diproses Apotek'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : ord.status === 'Dikirim'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : ord.status === 'Selesai'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : ord.status === 'Dibatalkan'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-slate-50 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                            <option value="Diproses Apotek">Diproses Apotek</option>
                            <option value="Dikirim">Dikirim Kurir</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                          </select>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => setActiveReceipt(ord)}
                              className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                              title="Lihat Invoice Resep"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus pesanan ${ord.id}?`)) {
                                  deleteOrder(ord.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Hapus Data Pesanan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: APOTEK & INVENTARIS OBAT (INVENTORY) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex items-center w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={e => setInventorySearch(e.target.value)}
                  placeholder="Cari obat, kategori, dosis..."
                  className="w-full pl-9 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                />
                <div className="absolute right-1">
                  <VoiceInputButton
                    onTranscript={t => setInventorySearch(t)}
                    currentValue={inventorySearch}
                    mode="replace"
                    size="sm"
                  />
                </div>
              </div>

              <select
                value={inventoryCategoryFilter}
                onChange={e => setInventoryCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-teal-600"
              >
                <option value="all">Semua Kategori Farmasi</option>
                <option value="Obat Bebas">Obat Bebas</option>
                <option value="Obat Keras & Resep">Obat Keras & Resep</option>
                <option value="Vitamin & Suplemen">Vitamin & Suplemen</option>
                <option value="Skincare Medis">Skincare Medis</option>
                <option value="Alat Kesehatan">Alat Kesehatan</option>
                <option value="Ibu & Anak">Ibu & Anak</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingMed(null);
                setShowAddMedModal(true);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Obat Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">Produk Farmasi</th>
                    <th className="p-4">Kategori & Bentuk</th>
                    <th className="p-4">Harga Jual</th>
                    <th className="p-4">Stok Saat Ini</th>
                    <th className="p-4">Status Resep</th>
                    <th className="p-4 text-center">Kelola</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMedicines.map(med => (
                    <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={med.image}
                            alt={med.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">{med.name}</span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">{med.dosage}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                          {med.category}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{med.form}</span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-slate-400 text-xs">Rp</span>
                          <input
                            type="number"
                            value={med.price}
                            onChange={e => updateMedicinePrice(med.id, Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                            step={1000}
                          />
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center space-x-1.5">
                          <input
                            type="number"
                            value={med.stock}
                            onChange={e => updateMedicineStock(med.id, Number(e.target.value))}
                            className={`w-20 px-2 py-1 rounded-lg text-xs font-bold border ${
                              med.stock <= 5
                                ? 'bg-rose-50 border-rose-300 text-rose-800'
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                            }`}
                          />
                          {med.stock <= 5 && (
                            <span className="text-[10px] font-bold text-rose-600">Kritis</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        {med.requiresPrescription ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            Wajib Resep (Rx)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Bebas
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => {
                              setEditingMed(med);
                              setShowAddMedModal(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                            title="Edit Produk Lengkap"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus obat "${med.name}" dari apotek?`)) {
                                deleteMedicine(med.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SEMUA LAYANAN & PAKET POLIKLINIK (SERVICES) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'services' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={serviceCategoryFilter}
                onChange={e => setServiceCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-teal-600"
              >
                <option value="all">Semua Poliklinik</option>
                <option value="khitan">Poli Khitan Modern</option>
                <option value="gigi">Poli Gigi & Orthodontik</option>
                <option value="kecantikan">Poli Kecantikan & Kulit</option>
                <option value="homecare">Layanan Home Care</option>
                <option value="vaksin">Poli Vaksinasi</option>
                <option value="konsultasi">Konsultasi Online</option>
              </select>

              <div className="relative flex items-center w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={e => setServiceSearch(e.target.value)}
                  placeholder="Cari nama paket/treatment..."
                  className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <div className="absolute right-1">
                  <VoiceInputButton
                    onTranscript={t => setServiceSearch(t)}
                    currentValue={serviceSearch}
                    mode="replace"
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingService(null);
                setShowAddServiceModal(true);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Paket Layanan Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map(pkg => {
              const Icon = getCategoryIcon(pkg.category);
              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                          Poli {pkg.category}
                        </span>
                      </div>
                      {pkg.badge && (
                        <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-rose-500 text-white">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{pkg.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{pkg.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-baseline space-x-2">
                      <span className="text-base font-black text-slate-900">
                        Rp {pkg.price.toLocaleString('id-ID')}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          Rp {pkg.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 ml-auto">⏱️ {pkg.duration}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fitur & Manfaat:</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {pkg.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingService(pkg);
                        setShowAddServiceModal(true);
                      }}
                      className="px-3 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Paket</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus paket "${pkg.title}"?`)) {
                          deleteServicePackage(pkg.id);
                        }
                      }}
                      className="px-3 py-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: DOKTER & TENAGA MEDIS (DOCTORS) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'doctors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="relative flex items-center w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={doctorSearch}
                onChange={e => setDoctorSearch(e.target.value)}
                placeholder="Cari dokter, spesialisasi, poli..."
                className="w-full pl-9 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
              />
              <div className="absolute right-1">
                <VoiceInputButton
                  onTranscript={t => setDoctorSearch(t)}
                  currentValue={doctorSearch}
                  mode="replace"
                  size="sm"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setEditingDoc(null);
                setShowAddDocModal(true);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Dokter / Spesialis Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDoctors.map(doc => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</h4>
                      <p className="text-[11px] text-teal-700 font-semibold line-clamp-1">{doc.specialty}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">STR: {doc.strNumber}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Tarif Telekonsultasi:</span>
                      <strong className="text-slate-900">Rp {doc.price.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Pengalaman Medis:</span>
                      <strong className="text-slate-900">{doc.experienceYears} Tahun</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Jadwal Praktik:
                    </span>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {doc.schedule.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleDoctorAvailability(doc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      doc.isAvailable
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${doc.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span>{doc.isAvailable ? 'Siaga Online' : 'Sedang Istirahat'}</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => {
                        setEditingDoc(doc);
                        setShowAddDocModal(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                      title="Edit Data Dokter"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus dokter "${doc.name}" dari sistem?`)) {
                          deleteDoctor(doc.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Hapus Dokter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: PROFIL & PENGATURAN INFORMASI WEBSITE (PROFILE) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Profil Resmi & Informasi Publik Website LAVVA CLINIC
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Perubahan pada form ini akan langsung diperbarui di Beranda, Navbar, Footer, dan Halaman Tentang Kami.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Kembalikan semua profil ke pengaturan default klinik?')) {
                    resetClinicInfo();
                  }
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan Web</span>
              </button>
            </div>
          </div>

          {profileSavedToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pengaturan profil website klinik berhasil disimpan dan langsung aktif!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nama Klinik:</label>
              <div className="relative">
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-teal-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tagline Utama:</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Subheading / Ringkasan Deskripsi:</label>
              <textarea
                value={profileForm.subheading}
                onChange={e => setProfileForm({ ...profileForm, subheading: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Lengkap:</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Kota / Provinsi:</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nomor Telepon Hotline:</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Resmi:</label>
              <input
                type="text"
                value={profileForm.whatsapp}
                onChange={e => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Emergency Hotline 24 Jam:</label>
              <input
                type="text"
                value={profileForm.emergencyHotline}
                onChange={e => setProfileForm({ ...profileForm, emergencyHotline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Resmi:</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Teks Akreditasi Kemenkes RI:</label>
              <input
                type="text"
                value={profileForm.accreditation}
                onChange={e => setProfileForm({ ...profileForm, accreditation: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-teal-600"
                required
              />
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Konfigurasi Jam Operasional Pelayanan:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Poli Umum & IGD:</label>
                <input
                  type="text"
                  value={profileForm.workingHours?.poliUmum || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    workingHours: { ...profileForm.workingHours, poliUmum: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Poli Spesialis:</label>
                <input
                  type="text"
                  value={profileForm.workingHours?.spesialis || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    workingHours: { ...profileForm.workingHours, spesialis: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Apotek Farmasi:</label>
                <input
                  type="text"
                  value={profileForm.workingHours?.apotek || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    workingHours: { ...profileForm.workingHours, apotek: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Layanan Home Care:</label>
                <input
                  type="text"
                  value={profileForm.workingHours?.homecare || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    workingHours: { ...profileForm.workingHours, homecare: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Statistik Publik */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Statistik Publik (Tampil di Beranda):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pasien Terlayani:</label>
                <input
                  type="text"
                  value={profileForm.stats?.patientsServed || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, patientsServed: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Dokter Spesialis:</label>
                <input
                  type="text"
                  value={profileForm.stats?.expertDoctors || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, expertDoctors: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Layanan Selesai:</label>
                <input
                  type="text"
                  value={profileForm.stats?.servicesCompleted || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, servicesCompleted: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Tingkat Kepuasan:</label>
                <input
                  type="text"
                  value={profileForm.stats?.satisfactionRate || ''}
                  onChange={e => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, satisfactionRate: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: BANNER & PENGUMUMAN PROMO (ANNOUNCEMENTS) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pengumuman & Promo Berjalan</h3>
              <p className="text-xs text-slate-500">Banner ini akan tampil di bagian atas seluruh halaman website.</p>
            </div>

            <button
              onClick={() => {
                setEditingAnn(null);
                setShowAddAnnModal(true);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pengumuman / Promo Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  ann.isActive
                    ? 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    ann.type === 'emergency'
                      ? 'bg-rose-100 text-rose-700'
                      : ann.type === 'promo'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-teal-100 text-teal-700'
                  }`}>
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                        ann.type === 'emergency'
                          ? 'bg-rose-100 text-rose-800'
                          : ann.type === 'promo'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}>
                        {ann.type}
                      </span>
                      <span className="text-[10px] text-slate-400">Dibuat: {ann.createdAt}</span>
                      {ann.linkTab && (
                        <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 rounded">
                          Link Poli: {ann.linkTab}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-1">{ann.text}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAnnouncement(ann.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      ann.isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {ann.isActive ? '✅ Sedang Tampil' : '⏸️ Nonaktif'}
                  </button>

                  <button
                    onClick={() => {
                      setEditingAnn(ann);
                      setShowAddAnnModal(true);
                    }}
                    className="p-1.5 text-slate-500 hover:text-teal-700 rounded-lg hover:bg-slate-100"
                    title="Edit Teks"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Hapus pengumuman ini?')) {
                        deleteAnnouncement(ann.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 9: PENGGUNA & PASIEN (USERS) */}
      {/* ========================================================================= */}
      {activeAdminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Manajemen Pengguna & Pasien Terdaftar</h3>
              <p className="text-xs text-slate-500">Atur hak akses pengguna klinik, peran super admin, dan biodata rekam medis.</p>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Pengguna / Pasien Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">Nama & Foto</th>
                    <th className="p-4">Email & Kontak</th>
                    <th className="p-4">Alamat & Golongan Darah</th>
                    <th className="p-4">Hak Akses (Role)</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{u.name}</span>
                            <span className="text-[10px] text-slate-400">{u.gender || 'Pasien'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-slate-800 block">{u.email}</span>
                        <span className="text-[11px] text-slate-500">{u.phone}</span>
                      </td>

                      <td className="p-4">
                        <span className="text-slate-700 line-clamp-1 block">{u.address || '-'}</span>
                        <span className="text-[10px] text-slate-400">Golongan Darah: {u.bloodType || '-'}</span>
                      </td>

                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={e => updateUserRole(u.id, e.target.value as Role)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none ${
                            u.role === 'superadmin'
                              ? 'bg-amber-50 text-amber-900 border-amber-300 font-extrabold'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}
                        >
                          <option value="patient">Pasien Reguler</option>
                          <option value="superadmin">Super Admin (Akses Penuh)</option>
                        </select>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            if (confirm(`Hapus akun ${u.name}?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT OBAT */}
      {/* ========================================================================= */}
      {showAddMedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingMed ? 'Edit Produk Farmasi' : 'Tambah Obat Baru ke Apotek'}
              </h3>
              <button
                onClick={() => {
                  setShowAddMedModal(false);
                  setEditingMed(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                const medData: Medicine = {
                  id: editingMed ? editingMed.id : `med-${Date.now()}`,
                  name: fd.get('name') as string,
                  category: fd.get('category') as Medicine['category'],
                  price: Number(fd.get('price')),
                  originalPrice: fd.get('originalPrice') ? Number(fd.get('originalPrice')) : undefined,
                  dosage: fd.get('dosage') as string,
                  form: fd.get('form') as Medicine['form'],
                  stock: Number(fd.get('stock')),
                  requiresPrescription: fd.get('requiresPrescription') === 'true',
                  image: (fd.get('image') as string) || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
                  description: fd.get('description') as string,
                  indication: fd.get('indication') as string,
                  composition: fd.get('composition') as string,
                  soldCount: editingMed ? editingMed.soldCount : 0,
                  rating: editingMed ? editingMed.rating : 5.0
                };

                if (editingMed) {
                  updateMedicine(editingMed.id, medData);
                } else {
                  addMedicine(medData);
                }

                setShowAddMedModal(false);
                setEditingMed(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Produk Farmasi:</label>
                <input
                  name="name"
                  defaultValue={editingMed?.name || ''}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori Farmasi:</label>
                  <select
                    name="category"
                    defaultValue={editingMed?.category || 'Obat Bebas'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="Obat Bebas">Obat Bebas</option>
                    <option value="Obat Keras & Resep">Obat Keras & Resep</option>
                    <option value="Vitamin & Suplemen">Vitamin & Suplemen</option>
                    <option value="Skincare Medis">Skincare Medis</option>
                    <option value="Alat Kesehatan">Alat Kesehatan</option>
                    <option value="Ibu & Anak">Ibu & Anak</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bentuk Obat:</label>
                  <select
                    name="form"
                    defaultValue={editingMed?.form || 'Tablet'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Kapsul">Kapsul</option>
                    <option value="Sirup">Sirup</option>
                    <option value="Salep/Krim">Salep/Krim</option>
                    <option value="Drop">Drop</option>
                    <option value="Serum">Serum</option>
                    <option value="Suntik/Ampul">Suntik/Ampul</option>
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga (Rp):</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingMed?.price || 25000}
                    required
                    step={1000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Coret (Diskon):</label>
                  <input
                    type="number"
                    name="originalPrice"
                    defaultValue={editingMed?.originalPrice || ''}
                    step={1000}
                    placeholder="Opsional"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stok Awal:</label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={editingMed?.stock ?? 50}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Aturan Pakai & Dosis:</label>
                <input
                  name="dosage"
                  defaultValue={editingMed?.dosage || '3x1 sehari sesudah makan'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL Foto Produk:</label>
                <input
                  name="image"
                  defaultValue={editingMed?.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Indikasi Klinis:</label>
                <input
                  name="indication"
                  defaultValue={editingMed?.indication || 'Meredakan gejala peradangan dan nyeri'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Komposisi & Zat Aktif:</label>
                <input
                  name="composition"
                  defaultValue={editingMed?.composition || 'Bahan aktif terstandar BPOM'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Lengkap:</label>
                <textarea
                  name="description"
                  defaultValue={editingMed?.description || 'Produk farmasi berlisensi resmi Lavva Clinic.'}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Resep Dokter:</label>
                <select
                  name="requiresPrescription"
                  defaultValue={editingMed?.requiresPrescription ? 'true' : 'false'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="false">Obat Bebas / Non-Resep</option>
                  <option value="true">Wajib E-Resep Dokter (Rx)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMedModal(false);
                    setEditingMed(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {editingMed ? 'Simpan Perubahan' : 'Tambahkan ke Apotek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT PAKET LAYANAN */}
      {/* ========================================================================= */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingService ? 'Edit Paket Treatment Poli' : 'Tambah Paket Treatment Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddServiceModal(false);
                  setEditingService(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                const featuresList = (fd.get('features') as string)
                  .split('\n')
                  .map(f => f.trim())
                  .filter(Boolean);

                const pkgData: ServicePackage = {
                  id: editingService ? editingService.id : `pkg-${Date.now()}`,
                  title: fd.get('title') as string,
                  category: fd.get('category') as ServiceCategory,
                  tagline: fd.get('tagline') as string,
                  description: fd.get('description') as string,
                  features: featuresList.length > 0 ? featuresList : ['Konsultasi dokter spesialis', 'Tindakan medis steril', 'Kontrol pasca tindakan'],
                  price: Number(fd.get('price')),
                  originalPrice: fd.get('originalPrice') ? Number(fd.get('originalPrice')) : undefined,
                  duration: fd.get('duration') as string,
                  image: (fd.get('image') as string) || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
                  badge: fd.get('badge') ? (fd.get('badge') as string) : undefined
                };

                if (editingService) {
                  updateServicePackage(editingService.id, pkgData);
                } else {
                  addServicePackage(pkgData);
                }

                setShowAddServiceModal(false);
                setEditingService(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Paket / Treatment:</label>
                <input
                  name="title"
                  defaultValue={editingService?.title || ''}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Poliklinik Tujuan:</label>
                  <select
                    name="category"
                    defaultValue={editingService?.category || 'khitan'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="khitan">Poli Khitan Modern</option>
                    <option value="gigi">Poli Gigi & Orthodontik</option>
                    <option value="kecantikan">Poli Kecantikan & Kulit</option>
                    <option value="homecare">Layanan Home Care</option>
                    <option value="vaksin">Poli Vaksinasi</option>
                    <option value="konsultasi">Konsultasi Online</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimasi Durasi:</label>
                  <input
                    name="duration"
                    defaultValue={editingService?.duration || '45 - 60 Menit'}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline Ringkas:</label>
                <input
                  name="tagline"
                  defaultValue={editingService?.tagline || 'Teknologi modern, minim nyeri & nyaman.'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Paket (Rp):</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingService?.price || 500000}
                    required
                    step={10000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Coret (Promo):</label>
                  <input
                    type="number"
                    name="originalPrice"
                    defaultValue={editingService?.originalPrice || ''}
                    step={10000}
                    placeholder="Opsional"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Label (Opsional):</label>
                  <input
                    name="badge"
                    defaultValue={editingService?.badge || ''}
                    placeholder="Contoh: Terpopuler, Diskon 20%"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fitur & Layanan Termasuk (1 per baris):</label>
                <textarea
                  name="features"
                  defaultValue={editingService?.features?.join('\n') || 'Tindakan oleh Dokter Spesialis\nSterilisasi standar medis paripurna\nGratis konsultasi kontrol pasca tindakan'}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Lengkap Paket:</label>
                <textarea
                  name="description"
                  defaultValue={editingService?.description || 'Pelayanan medis terpadu berstandar resmi Lavva Clinic.'}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL Gambar Ilustrasi:</label>
                <input
                  name="image"
                  defaultValue={editingService?.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddServiceModal(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {editingService ? 'Simpan Perubahan' : 'Terbitkan Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT DOKTER */}
      {/* ========================================================================= */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingDoc ? 'Edit Data Dokter' : 'Daftarkan Dokter / Spesialis Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddDocModal(false);
                  setEditingDoc(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                const scheduleList = (fd.get('schedule') as string)
                  .split('\n')
                  .map(s => s.trim())
                  .filter(Boolean);

                const docData: Doctor = {
                  id: editingDoc ? editingDoc.id : `doc-${Date.now()}`,
                  name: fd.get('name') as string,
                  specialty: fd.get('specialty') as string,
                  category: fd.get('category') as Doctor['category'],
                  experienceYears: Number(fd.get('experienceYears')),
                  rating: editingDoc ? editingDoc.rating : 5.0,
                  reviewsCount: editingDoc ? editingDoc.reviewsCount : 1,
                  strNumber: fd.get('strNumber') as string,
                  photo: (fd.get('photo') as string) || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
                  price: Number(fd.get('price')),
                  isAvailable: true,
                  schedule: scheduleList.length > 0 ? scheduleList : ['Senin - Jumat: 09:00 - 17:00'],
                  education: fd.get('education') as string,
                  hospitalAffiliation: fd.get('hospitalAffiliation') as string
                };

                if (editingDoc) {
                  updateDoctor(editingDoc.id, docData);
                } else {
                  addDoctor(docData);
                }

                setShowAddDocModal(false);
                setEditingDoc(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar:</label>
                <input
                  name="name"
                  defaultValue={editingDoc?.name || ''}
                  placeholder="Contoh: dr. Amanda Putri, Sp.KK, FINSDV"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori Spesialisasi:</label>
                  <select
                    name="category"
                    defaultValue={editingDoc?.category || 'umum'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="umum">Dokter Umum</option>
                    <option value="anak">Spesialis Anak (Pediatri)</option>
                    <option value="kulit_kelamin">Kulit & Kelamin</option>
                    <option value="estetika">Estetika Medis & Dermatologi</option>
                    <option value="gigi">Dokter Gigi & Bedah Mulut</option>
                    <option value="penyakit_dalam">Spesialis Penyakit Dalam</option>
                    <option value="bedah_khitan">Dokter Bedah & Khitan Modern</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Spesialisasi Lengkap:</label>
                  <input
                    name="specialty"
                    defaultValue={editingDoc?.specialty || ''}
                    placeholder="Contoh: Spesialis Kulit & Estetika"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor STR Kemenkes:</label>
                  <input
                    name="strNumber"
                    defaultValue={editingDoc?.strNumber || 'STR.31.2.1.100.2.20.009988'}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pengalaman (Tahun):</label>
                  <input
                    type="number"
                    name="experienceYears"
                    defaultValue={editingDoc?.experienceYears || 5}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tarif Konsultasi (Rp):</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingDoc?.price || 120000}
                    required
                    step={5000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Dokter:</label>
                  <input
                    name="photo"
                    defaultValue={editingDoc?.photo || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jadwal Praktik (1 per baris):</label>
                <textarea
                  name="schedule"
                  defaultValue={editingDoc?.schedule?.join('\n') || 'Senin - Jumat: 09:00 - 16:00\nSabtu: 09:00 - 13:00'}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Riwayat Pendidikan:</label>
                <input
                  name="education"
                  defaultValue={editingDoc?.education || 'Fakultas Kedokteran Universitas Indonesia'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Afiliasi / Posisi:</label>
                <input
                  name="hospitalAffiliation"
                  defaultValue={editingDoc?.hospitalAffiliation || 'Dokter Spesialis Lavva Clinic'}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDocModal(false);
                    setEditingDoc(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {editingDoc ? 'Simpan Perubahan' : 'Daftarkan Dokter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH / EDIT PENGUMUMAN & BANNER */}
      {/* ========================================================================= */}
      {showAddAnnModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingAnn ? 'Edit Pengumuman' : 'Buat Banner Promo Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddAnnModal(false);
                  setEditingAnn(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                const text = fd.get('text') as string;
                const type = fd.get('type') as WebAnnouncement['type'];
                const linkTab = fd.get('linkTab') as string;

                if (editingAnn) {
                  updateAnnouncement(editingAnn.id, { text, type, linkTab: linkTab || undefined });
                } else {
                  addAnnouncement({
                    text,
                    type,
                    isActive: true,
                    linkTab: linkTab || undefined
                  });
                }

                setShowAddAnnModal(false);
                setEditingAnn(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Teks Pengumuman / Promo:</label>
                <textarea
                  name="text"
                  defaultValue={editingAnn?.text || ''}
                  placeholder="Contoh: 🎉 Diskon 25% Khitan Modern & Gigi hingga akhir bulan!"
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Banner:</label>
                  <select
                    name="type"
                    defaultValue={editingAnn?.type || 'promo'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="promo">Promo & Diskon (Amber)</option>
                    <option value="info">Informasi Umum (Teal)</option>
                    <option value="emergency">Siaga / Darurat (Merah)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tautan Halaman / Tab:</label>
                  <select
                    name="linkTab"
                    defaultValue={editingAnn?.linkTab || ''}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="">Tanpa Tautan</option>
                    <option value="khitan">Poli Khitan</option>
                    <option value="gigi">Poli Gigi</option>
                    <option value="kecantikan">Kecantikan</option>
                    <option value="obat">Apotek Obat</option>
                    <option value="homecare">Home Care</option>
                    <option value="vaksin">Poli Vaksin</option>
                    <option value="konsultasi">Konsultasi Dokter</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAnnModal(false);
                    setEditingAnn(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {editingAnn ? 'Simpan Perubahan' : 'Terbitkan Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH USER / PASIEN */}
      {/* ========================================================================= */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Tambah Pengguna / Pasien Baru
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                const newUser: User = {
                  id: `user-${Date.now()}`,
                  name: fd.get('name') as string,
                  email: fd.get('email') as string,
                  phone: fd.get('phone') as string,
                  role: fd.get('role') as Role,
                  address: fd.get('address') as string,
                  gender: fd.get('gender') as 'Laki-laki' | 'Perempuan',
                  bloodType: fd.get('bloodType') as string,
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
                };

                addUser(newUser);
                setShowAddUserModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Pasien / Pengguna:</label>
                <input
                  name="name"
                  required
                  placeholder="Contoh: Rina Maharani, S.Pd"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="pasien@email.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. WhatsApp / HP:</label>
                  <input
                    name="phone"
                    required
                    placeholder="08123456789"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin:</label>
                  <select
                    name="gender"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Golongan Darah:</label>
                  <select
                    name="bloodType"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Alamat Domisili:</label>
                <input
                  name="address"
                  placeholder="Jl. Melati No. 45, Jakarta"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hak Akses (Role):</label>
                <select
                  name="role"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="patient">Pasien Reguler</option>
                  <option value="superadmin">Super Admin (Akses Penuh)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
