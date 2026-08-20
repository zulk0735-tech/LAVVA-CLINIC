export type Role = 'patient' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
  address?: string;
  birthDate?: string;
  gender?: 'Laki-laki' | 'Perempuan';
  bloodType?: string;
}

export type ServiceCategory = 
  | 'konsultasi'
  | 'obat'
  | 'homecare'
  | 'vaksin'
  | 'khitan'
  | 'gigi'
  | 'kecantikan';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  category: 'umum' | 'anak' | 'kulit_kelamin' | 'gigi' | 'penyakit_dalam' | 'estetika' | 'bedah_khitan';
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  strNumber: string; // Surat Tanda Registrasi
  photo: string;
  price: number;
  isAvailable: boolean;
  schedule: string[];
  education: string;
  hospitalAffiliation: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: 'Obat Bebas' | 'Obat Keras & Resep' | 'Vitamin & Suplemen' | 'Skincare Medis' | 'Alat Kesehatan' | 'Ibu & Anak';
  price: number;
  originalPrice?: number;
  image: string;
  dosage: string;
  form: 'Tablet' | 'Kapsul' | 'Sirup' | 'Salep/Krim' | 'Drop' | 'Serum' | 'Suntik/Ampul' | 'Pcs';
  description: string;
  indication: string;
  composition: string;
  stock: number;
  requiresPrescription: boolean;
  soldCount: number;
  rating: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  duration: string;
  image: string;
  recommendedFor?: string;
  badge?: string;
}

export type AppointmentStatus = 'Menunggu Pembayaran' | 'Dikonfirmasi' | 'Sedang Berlangsung' | 'Selesai' | 'Dibatalkan';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  totalPrice: number;
  notes?: string;
  address?: string; // For home care
  method?: string; // For khitan/dental/aesthetic
  createdAt: string;
  paymentMethod: string;
  qrCodeId?: string;
}

export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  items: {
    medicineId: string;
    medicineName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalPrice: number;
  deliveryFee: number;
  status: 'Menunggu Konfirmasi' | 'Diproses Apotek' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  paymentMethod: string;
  prescriptionImage?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isPrescription?: boolean;
  prescriptionData?: {
    medicines: string[];
    dosageInfo: string;
    doctorSignature: string;
  };
}

export interface ConsultationSession {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorPhoto: string;
  status: 'active' | 'finished';
  messages: ChatMessage[];
  startedAt: string;
  complaint: string;
}

export interface ClinicNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'order' | 'promo' | 'system';
  linkTab?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  iconName: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  subheading: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  emergencyHotline: string;
  email: string;
  workingHours: {
    poliUmum: string;
    spesialis: string;
    apotek: string;
    homecare: string;
  };
  accreditation: string;
  stats: {
    patientsServed: string;
    expertDoctors: string;
    servicesCompleted: string;
    satisfactionRate: string;
  };
}

export interface WebAnnouncement {
  id: string;
  text: string;
  type: 'info' | 'promo' | 'emergency';
  isActive: boolean;
  linkTab?: string;
  createdAt: string;
}

