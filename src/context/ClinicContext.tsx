import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  Medicine,
  ServicePackage,
  Appointment,
  Order,
  CartItem,
  ConsultationSession,
  ClinicNotification,
  ServiceCategory,
  AppointmentStatus,
  ClinicInfo,
  WebAnnouncement,
  User,
  Role
} from '../types';
import {
  CLINIC_INFO,
  DOCTORS,
  MEDICINES,
  SERVICE_PACKAGES,
  INITIAL_APPOINTMENTS,
  INITIAL_ORDERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_USERS
} from '../data/mockData';

interface ClinicContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Website General Info & Profile
  clinicInfo: ClinicInfo;
  updateClinicInfo: (info: Partial<ClinicInfo>) => void;
  resetClinicInfo: () => void;

  // Web Announcements & Promos
  announcements: WebAnnouncement[];
  addAnnouncement: (ann: Omit<WebAnnouncement, 'id' | 'createdAt'>) => void;
  updateAnnouncement: (id: string, ann: Partial<WebAnnouncement>) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncement: (id: string) => void;

  // Doctors / Medical Staff
  doctors: Doctor[];
  addDoctor: (doc: Doctor) => void;
  updateDoctor: (doctorId: string, doc: Partial<Doctor>) => void;
  deleteDoctor: (doctorId: string) => void;
  toggleDoctorAvailability: (doctorId: string) => void;

  // Service Packages / Poliklinik treatments
  servicePackages: ServicePackage[];
  addServicePackage: (pkg: ServicePackage) => void;
  updateServicePackage: (pkgId: string, pkg: Partial<ServicePackage>) => void;
  deleteServicePackage: (pkgId: string) => void;

  // Medicines & Pharmacy
  medicines: Medicine[];
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (medicineId: string, updated: Partial<Medicine>) => void;
  deleteMedicine: (medicineId: string) => void;
  updateMedicineStock: (medicineId: string, newStock: number) => void;
  updateMedicinePrice: (medicineId: string, newPrice: number) => void;

  // Patient Appointments
  appointments: Appointment[];
  createAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'qrCodeId'>) => Appointment;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  deleteAppointment: (appointmentId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  // Users & Patients
  users: User[];
  addUser: (user: User) => void;
  updateUserRole: (userId: string, role: Role) => void;
  deleteUser: (userId: string) => void;

  // Notifications
  notifications: ClinicNotification[];
  addNotification: (title: string, message: string, type?: ClinicNotification['type'], linkTab?: string) => void;
  markNotificationsAsRead: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (medicine: Medicine, qty?: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateCartQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Teleconsultation
  activeConsultation: ConsultationSession | null;
  startConsultation: (doctor: Doctor, patientId: string, patientName: string, complaint: string) => void;
  sendChatMessage: (text: string) => void;
  endConsultation: () => void;

  // Booking Modal Trigger Helper
  bookingTarget: {
    category: ServiceCategory;
    item?: ServicePackage | Doctor;
  } | null;
  setBookingTarget: (target: { category: ServiceCategory; item?: ServicePackage | Doctor } | null) => void;

  // Receipt modal
  activeReceipt: Appointment | Order | null;
  setActiveReceipt: (item: Appointment | Order | null) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [bookingTarget, setBookingTarget] = useState<{ category: ServiceCategory; item?: ServicePackage | Doctor } | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<Appointment | Order | null>(null);

  // Clinic Info / Profile
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => {
    const saved = localStorage.getItem('lavva_clinic_info');
    return saved ? JSON.parse(saved) : CLINIC_INFO;
  });

  // Announcements
  const [announcements, setAnnouncements] = useState<WebAnnouncement[]>(() => {
    const saved = localStorage.getItem('lavva_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Doctors
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('lavva_doctors');
    return saved ? JSON.parse(saved) : DOCTORS;
  });

  // Medicines
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('lavva_medicines');
    return saved ? JSON.parse(saved) : MEDICINES;
  });

  // Services
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>(() => {
    const saved = localStorage.getItem('lavva_service_packages');
    return saved ? JSON.parse(saved) : SERVICE_PACKAGES;
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('lavva_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lavva_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Users
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('lavva_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lavva_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Notifications
  const [notifications, setNotifications] = useState<ClinicNotification[]>([
    {
      id: 'notif-1',
      title: 'Selamat Datang di Lavva Clinic!',
      message: 'Dapatkan diskon 20% untuk poli Gigi & Estetika Kecantikan bulan ini.',
      time: 'Baru saja',
      read: false,
      type: 'promo',
      linkTab: 'gigi'
    },
    {
      id: 'notif-2',
      title: 'Poli Khitan Modern Buka Setiap Hari',
      message: 'Metode Sealer Lem Bedah tanpa jahit & bebas mandi kini tersedia.',
      time: '1 jam lalu',
      read: false,
      type: 'system',
      linkTab: 'khitan'
    }
  ]);

  // Active Consultation Chat
  const [activeConsultation, setActiveConsultation] = useState<ConsultationSession | null>(() => {
    const saved = localStorage.getItem('lavva_active_consultation');
    return saved ? JSON.parse(saved) : null;
  });

  // LocalStorage Synchronization
  useEffect(() => {
    localStorage.setItem('lavva_clinic_info', JSON.stringify(clinicInfo));
  }, [clinicInfo]);

  useEffect(() => {
    localStorage.setItem('lavva_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('lavva_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('lavva_service_packages', JSON.stringify(servicePackages));
  }, [servicePackages]);

  useEffect(() => {
    localStorage.setItem('lavva_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('lavva_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('lavva_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lavva_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lavva_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (activeConsultation) {
      localStorage.setItem('lavva_active_consultation', JSON.stringify(activeConsultation));
    } else {
      localStorage.removeItem('lavva_active_consultation');
    }
  }, [activeConsultation]);

  // Clinic Info Management
  const updateClinicInfo = (info: Partial<ClinicInfo>) => {
    setClinicInfo(prev => ({
      ...prev,
      ...info,
      workingHours: {
        ...prev.workingHours,
        ...(info.workingHours || {})
      },
      stats: {
        ...prev.stats,
        ...(info.stats || {})
      }
    }));
    addNotification('Pengaturan Website Diperbarui', 'Data profil & informasi klinik berhasil disimpan.', 'system');
  };

  const resetClinicInfo = () => {
    setClinicInfo(CLINIC_INFO);
    addNotification('Pengaturan Direset', 'Profil klinik dikembalikan ke konfigurasi awal.', 'system');
  };

  // Announcements Management
  const addAnnouncement = (ann: Omit<WebAnnouncement, 'id' | 'createdAt'>) => {
    const newAnn: WebAnnouncement = {
      ...ann,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10)
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addNotification('Pengumuman Baru Diterbitkan', 'Banner promo/pengumuman kini tampil di website.', 'promo');
  };

  const updateAnnouncement = (id: string, updated: Partial<WebAnnouncement>) => {
    setAnnouncements(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => (a.id === id ? { ...a, isActive: !a.isActive } : a)));
  };

  // Doctors Management
  const addDoctor = (doc: Doctor) => {
    setDoctors(prev => [doc, ...prev]);
    addNotification('Dokter Baru Terdaftar', `${doc.name} telah ditambahkan ke sistem jadwal klinik.`, 'system', 'konsultasi');
  };

  const updateDoctor = (doctorId: string, updated: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => (d.id === doctorId ? { ...d, ...updated } : d)));
    addNotification('Data Dokter Diperbarui', `Informasi dokter berhasil disimpan.`, 'system');
  };

  const deleteDoctor = (doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId));
    addNotification('Dokter Dihapus', 'Data dokter telah dihapus dari sistem.', 'system');
  };

  const toggleDoctorAvailability = (doctorId: string) => {
    setDoctors(prev =>
      prev.map(d => (d.id === doctorId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  // Service Packages Management
  const addServicePackage = (pkg: ServicePackage) => {
    setServicePackages(prev => [pkg, ...prev]);
    addNotification('Layanan/Paket Baru Ditambahkan', `${pkg.title} berhasil didaftarkan ke poli ${pkg.category}.`, 'system', pkg.category);
  };

  const updateServicePackage = (pkgId: string, updated: Partial<ServicePackage>) => {
    setServicePackages(prev => prev.map(p => (p.id === pkgId ? { ...p, ...updated } : p)));
    addNotification('Layanan Diperbarui', 'Detail paket treatment berhasil disimpan.', 'system');
  };

  const deleteServicePackage = (pkgId: string) => {
    setServicePackages(prev => prev.filter(p => p.id !== pkgId));
    addNotification('Layanan Dihapus', 'Paket treatment telah dihapus dari katalog.', 'system');
  };

  // Medicines Management
  const addMedicine = (med: Medicine) => {
    setMedicines(prev => [med, ...prev]);
    addNotification('Produk Baru Ditambahkan', `${med.name} telah terdaftar di Apotek Lavva.`, 'system', 'obat');
  };

  const updateMedicine = (medicineId: string, updated: Partial<Medicine>) => {
    setMedicines(prev => prev.map(m => (m.id === medicineId ? { ...m, ...updated } : m)));
    addNotification('Obat Diperbarui', 'Data produk farmasi berhasil disimpan.', 'system');
  };

  const deleteMedicine = (medicineId: string) => {
    setMedicines(prev => prev.filter(m => m.id !== medicineId));
    addNotification('Obat Dihapus', 'Produk telah dihapus dari apotek.', 'system');
  };

  const updateMedicineStock = (medicineId: string, newStock: number) => {
    setMedicines(prev =>
      prev.map(m => (m.id === medicineId ? { ...m, stock: Math.max(0, newStock) } : m))
    );
  };

  const updateMedicinePrice = (medicineId: string, newPrice: number) => {
    setMedicines(prev =>
      prev.map(m => (m.id === medicineId ? { ...m, price: Math.max(1000, newPrice) } : m))
    );
  };

  // User Management
  const addUser = (user: User) => {
    setUsers(prev => [user, ...prev]);
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    addNotification('Role Pengguna Diubah', `Hak akses pengguna berhasil diperbarui ke ${newRole}.`, 'system');
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  // Appointments
  const createAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'qrCodeId'>): Appointment => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `APT-LV-${randomNum}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      qrCodeId: `QR-LV-${randomNum}`
    };

    setAppointments(prev => [newAppointment, ...prev]);
    addNotification(
      'Janji Temu Berhasil Dibuat!',
      `Booking untuk ${newAppointment.serviceName} tanggal ${newAppointment.date} pukul ${newAppointment.time} telah terdaftar.`,
      'appointment',
      'my-appointments'
    );
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === appointmentId ? { ...apt, status } : apt))
    );
    addNotification(
      'Status Janji Temu Diperbarui',
      `Janji temu ${appointmentId} kini berstatus: ${status}`,
      'appointment'
    );
  };

  const deleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(a => a.id !== appointmentId));
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ORD-LAV-${randomNum}`,
      status: 'Diproses Apotek',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addNotification(
      'Pesanan Obat Diterima Apotek!',
      `Pesanan ${newOrder.id} sedang disiapkan oleh tim farmasi Lavva Clinic.`,
      'order',
      'my-appointments'
    );
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addNotification('Status Pengiriman Obat', `Pesanan obat ${orderId} diubah ke: ${status}`, 'order');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Cart Operations
  const addToCart = (medicine: Medicine, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { medicine, quantity: qty }];
    });
    addNotification('Ditambahkan ke Keranjang', `${medicine.name} telah masuk ke keranjang belanja apotek.`, 'order', 'obat');
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const updateCartQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Teleconsultation
  const startConsultation = (
    doctor: Doctor,
    patientId: string,
    patientName: string,
    complaint: string
  ) => {
    const initialSession: ConsultationSession = {
      id: `CONS-${Date.now()}`,
      patientId,
      patientName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorPhoto: doctor.photo,
      status: 'active',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      complaint,
      messages: [
        {
          id: 'm-1',
          sender: 'system',
          senderName: 'Lavva Telemedicine System',
          text: `Sesi Telekonsultasi Online terhubung dengan ${doctor.name} (${doctor.specialty}). Keluhan awal: "${complaint}". Ruang konsultasi ini dienkripsi secara medis.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 'm-2',
          sender: 'doctor',
          senderName: doctor.name,
          text: `Halo ${patientName}, salam sehat dari Lavva Clinic. Saya ${doctor.name}. Saya sudah membaca keluhan Anda mengenai "${complaint}". Boleh diceritakan sudah berapa lama gejala ini dirasakan dan apakah ada riwayat alergi obat?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setActiveConsultation(initialSession);
    setActiveTab('konsultasi');
  };

  const sendChatMessage = (text: string) => {
    if (!activeConsultation) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'patient' as const,
      senderName: activeConsultation.patientName,
      text,
      timestamp: timeNow
    };

    const updatedMessages = [...activeConsultation.messages, userMsg];
    setActiveConsultation({
      ...activeConsultation,
      messages: updatedMessages
    });

    // Realistic Doctor Clinical Response Simulation
    setTimeout(() => {
      const docReplies = [
        `Baik, terima kasih penjelasannya. Dari gejala yang Anda sampaikan, kemungkinan ada peradangan ringan. Saya sarankan istirahat cukup, perbanyak minum air hangat, dan saya akan buatkan e-resep pendukung untuk meredakan gejalanya.`,
        `Baik, untuk kondisi tersebut kami anjurkan terapi pendukung. Hindari makanan pencetus atau paparan polutan terlebih dahulu. Saya terbitkan anjuran resep resmi Lavva Clinic ya.`,
        `Dipahami. Gejala tersebut tergolong dapat ditangani rawat jalan. Jaga sanitasi dan kebersihan area terkait, lalu konsumsi obat sesuai aturan pakai pada resep berikut.`
      ];
      const randomReply = docReplies[Math.floor(Math.random() * docReplies.length)];

      const doctorReplyMsg = {
        id: `msg-doc-${Date.now()}`,
        sender: 'doctor' as const,
        senderName: activeConsultation.doctorName,
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPrescription: true,
        prescriptionData: {
          medicines: [
            'Paracetamol 500mg Lavva (3x1 sesudah makan)',
            'ImmunoShield Vit D3 5000 IU (1x1)',
            'Lavva Skin/Oral Soothing Formula'
          ],
          dosageInfo: 'Diminum teratur selama 3-5 hari. Jika demam > 3 hari segera kunjungi IGD Lavva Clinic.',
          doctorSignature: `${activeConsultation.doctorName} (SIP Terverifikasi Kemenkes)`
        }
      };

      setActiveConsultation(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, doctorReplyMsg]
        };
      });
    }, 1800);
  };

  const endConsultation = () => {
    if (activeConsultation) {
      setActiveConsultation(prev => (prev ? { ...prev, status: 'finished' } : null));
      addNotification(
        'Konsultasi Online Selesai',
        `Sesi dengan ${activeConsultation.doctorName} telah selesai. Resep dan ringkasan medis tersimpan.`,
        'system'
      );
    }
  };

  const addNotification = (
    title: string,
    message: string,
    type: ClinicNotification['type'] = 'system',
    linkTab?: string
  ) => {
    const newNotif: ClinicNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Baru saja',
      read: false,
      type,
      linkTab
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <ClinicContext.Provider
      value={{
        activeTab,
        setActiveTab,
        clinicInfo,
        updateClinicInfo,
        resetClinicInfo,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        toggleAnnouncement,
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        toggleDoctorAvailability,
        servicePackages,
        addServicePackage,
        updateServicePackage,
        deleteServicePackage,
        medicines,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        updateMedicineStock,
        updateMedicinePrice,
        appointments,
        createAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        users,
        addUser,
        updateUserRole,
        deleteUser,
        notifications,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        activeConsultation,
        startConsultation,
        sendChatMessage,
        endConsultation,
        bookingTarget,
        setBookingTarget,
        addNotification,
        markNotificationsAsRead,
        activeReceipt,
        setActiveReceipt
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};

