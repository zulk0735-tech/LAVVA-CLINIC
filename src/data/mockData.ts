import { Doctor, Medicine, ServicePackage, Facility, User, Appointment, Order, ClinicInfo, WebAnnouncement } from '../types';

export const CLINIC_INFO: ClinicInfo = {
  name: 'LAVVA CLINIC',
  tagline: 'Solusi Kesehatan Modern & Estetika Terpercaya Keluarga Anda',
  subheading: 'Pusat Layanan Kesehatan Terintegrasi: Konsultasi Dokter, Apotek Online, Home Care, Poli Khitan Modern, Poli Gigi, Poli Vaksinasi & Estetika Kecantikan.',
  address: 'Jl. Boulevard Raya Blok LC No. 18-20, Kelapa Gading, Jakarta Utara 14240',
  city: 'DKI Jakarta, Indonesia',
  phone: '+62 21 4589 7788',
  whatsapp: '+62 812-8899-7700',
  emergencyHotline: '1500-880 (24 Jam)',
  email: 'care@lavvaclinic.com',
  workingHours: {
    poliUmum: 'Senin - Minggu: 24 Jam (IGD & Rawat Jalan)',
    spesialis: 'Senin - Sabtu: 08.00 - 21.00 WIB',
    apotek: '24 Jam Non-Stop',
    homecare: 'Senin - Minggu: 07.00 - 20.00 WIB',
  },
  accreditation: 'Terakreditasi PARIPURNA oleh Kemenkes RI No. YM.02.02/VI.2/5541/2024',
  stats: {
    patientsServed: '38,500+',
    expertDoctors: '28+ Dokter Spesialis',
    servicesCompleted: '95,000+',
    satisfactionRate: '99.4%',
  }
};

export const INITIAL_ANNOUNCEMENTS: WebAnnouncement[] = [
  {
    id: 'ann-1',
    text: '🎉 Promo Merdeka Sehat: Diskon 25% Khitan Sealer Modern & Perawatan Gigi hingga 31 Agustus!',
    type: 'promo',
    isActive: true,
    linkTab: 'khitan',
    createdAt: '2026-08-15'
  },
  {
    id: 'ann-2',
    text: '🛡️ Layanan Home Care & Apotek 24 Jam siap siaga melayani area Jabodetabek dengan gratis antar obat resep.',
    type: 'info',
    isActive: true,
    linkTab: 'homecare',
    createdAt: '2026-08-16'
  }
];


export const INITIAL_USERS: User[] = [
  {
    id: 'user-patient-1',
    name: 'Budi Santoso, S.Kom',
    email: 'pasien@lavvaclinic.com',
    phone: '081234567890',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    address: 'Jl. Anggrek Cendrawasih No. 12, Kebon Jeruk, Jakarta Barat',
    birthDate: '1992-05-14',
    gender: 'Laki-laki',
    bloodType: 'O+'
  },
  {
    id: 'user-admin-1',
    name: 'dr. Lavva Amanda, Sp.KK (Super Admin)',
    email: 'admin@lavvaclinic.com',
    phone: '081198765432',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1594824813589-3831846b4129?auto=format&fit=crop&w=200&q=80',
    address: 'Lavva Clinic Central Office, Jakarta',
    birthDate: '1985-11-20',
    gender: 'Perempuan',
    bloodType: 'A+'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'dr. Amanda Putri, Sp.KK, FINSDV',
    specialty: 'Spesialis Kulit, Kelamin & Estetika Medis',
    category: 'estetika',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 342,
    strNumber: 'STR.31.2.1.100.2.19.004821',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    price: 150000,
    isAvailable: true,
    schedule: ['Senin - Jumat: 10:00 - 17:00', 'Sabtu: 09:00 - 14:00'],
    education: 'Spesialis Dermatologi & Venereologi Universitas Indonesia',
    hospitalAffiliation: 'Ketua Tim Estetika Lavva Clinic'
  },
  {
    id: 'doc-2',
    name: 'dr. Dimas Surya Nugraha, Sp.A',
    specialty: 'Spesialis Kesehatan Anak (Pediatri)',
    category: 'anak',
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 420,
    strNumber: 'STR.31.2.1.200.2.18.009123',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    price: 135000,
    isAvailable: true,
    schedule: ['Senin - Kamis: 08:30 - 15:00', 'Sabtu: 08:30 - 13:00'],
    education: 'Spesialis Ilmu Kesehatan Anak FK Universitas Airlangga',
    hospitalAffiliation: 'Konsultan Tumbuh Kembang & Vaksinasi Anak'
  },
  {
    id: 'doc-3',
    name: 'drg. Stefanie Clarissa, Sp.KG',
    specialty: 'Spesialis Konservasi Gigi & Estetika Dental',
    category: 'gigi',
    experienceYears: 8,
    rating: 4.8,
    reviewsCount: 289,
    strNumber: 'STR.31.1.2.300.1.20.007652',
    photo: 'https://images.unsplash.com/photo-1594824813589-3831846b4129?auto=format&fit=crop&w=400&q=80',
    price: 120000,
    isAvailable: true,
    schedule: ['Senin - Sabtu: 11:00 - 20:00'],
    education: 'Pendidikan Dokter Gigi Spesialis Konservasi FKG UI',
    hospitalAffiliation: 'Kepala Poli Gigi & Bedah Mulut Lavva Dental'
  },
  {
    id: 'doc-4',
    name: 'dr. Farhan Malik, Sp.B (Khitan Specialist)',
    specialty: 'Spesialis Bedah Umum & Khitan Modern',
    category: 'bedah_khitan',
    experienceYears: 14,
    rating: 5.0,
    reviewsCount: 512,
    strNumber: 'STR.31.2.1.100.1.15.003319',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    price: 180000,
    isAvailable: true,
    schedule: ['Rabu - Minggu: 09:00 - 17:00'],
    education: 'Spesialis Bedah Umum FK Universitas Padjadjaran',
    hospitalAffiliation: 'Pioneer Metode Khitan Ring & Sealer Lem'
  },
  {
    id: 'doc-5',
    name: 'dr. Reza Pramudya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam (Internis)',
    category: 'penyakit_dalam',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 310,
    strNumber: 'STR.31.2.1.400.2.16.002871',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    price: 145000,
    isAvailable: true,
    schedule: ['Senin - Jumat: 13:00 - 20:00'],
    education: 'Spesialis Ilmu Penyakit Dalam FK Universitas Indonesia',
    hospitalAffiliation: 'Konsultan Diabetes, Hipertensi & Imunologi'
  },
  {
    id: 'doc-6',
    name: 'dr. Nadia Kirana',
    specialty: 'Dokter Umum & Telemedisin Siaga 24 Jam',
    category: 'umum',
    experienceYears: 6,
    rating: 4.8,
    reviewsCount: 630,
    strNumber: 'STR.31.1.1.100.2.21.001928',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    price: 65000,
    isAvailable: true,
    schedule: ['Setiap Hari: 24 Jam Online via Lavva Live'],
    education: 'Profesi Dokter FK Universitas Gadjah Mada',
    hospitalAffiliation: 'Dokter Jaga IGD & Telemedisin Lavva'
  }
];

export const MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Lavva Skin Glow Serum Vit C 15% Medical Grade',
    category: 'Skincare Medis',
    price: 185000,
    originalPrice: 220000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    dosage: '3-4 tetes pagi & malam',
    form: 'Serum',
    description: 'Serum pencerah dan anti-oksidan klinis diformulasikan dokter kulit Lavva untuk menyamarkan flek hitam dan merangsang kolagen.',
    indication: 'Hiperpigmentasi, kulit kusam, penuaan dini',
    composition: 'Ethyl Ascorbic Acid 15%, Ferulic Acid 1%, Hyaluronic Acid 2%',
    stock: 48,
    requiresPrescription: false,
    soldCount: 428,
    rating: 4.9
  },
  {
    id: 'med-2',
    name: 'Paracetamol 500mg Lavva Farma (Strip 10 Kaplet)',
    category: 'Obat Bebas',
    price: 12000,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    dosage: 'Dewasa 1 kaplet 3-4 kali sehari sesudah makan',
    form: 'Tablet',
    description: 'Obat penurun demam dan pereda nyeri ringan hingga sedang seperti sakit kepala, sakit gigi, dan nyeri otot.',
    indication: 'Demam, sakit kepala, nyeri pasca vaksin',
    composition: 'Paracetamol 500 mg',
    stock: 250,
    requiresPrescription: false,
    soldCount: 1580,
    rating: 5.0
  },
  {
    id: 'med-3',
    name: 'Amoxicillin Trihydrate 500mg (Resep Dokter)',
    category: 'Obat Keras & Resep',
    price: 35000,
    originalPrice: 40000,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    dosage: 'Sesuai anjuran resep dokter (3x sehari tiap 8 jam harus dihabiskan)',
    form: 'Kapsul',
    description: 'Antibiotik spektrum luas untuk infeksi bakteri saluran pernapasan, gigi, dan saluran kemih.',
    indication: 'Infeksi saluran nafas, abses gigi, infeksi kulit',
    composition: 'Amoxicillin Trihydrate 500 mg',
    stock: 120,
    requiresPrescription: true,
    soldCount: 390,
    rating: 4.8
  },
  {
    id: 'med-4',
    name: 'ImmunoShield Vit D3 5000 IU + K2 Liposomal',
    category: 'Vitamin & Suplemen',
    price: 145000,
    originalPrice: 175000,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    dosage: '1 kapsul lunak per hari setelah makan pagi',
    form: 'Kapsul',
    description: 'Suplemen penguat imunitas tubuh, kesehatan tulang & jantung dengan penyerapan maksimal.',
    indication: 'Defisiensi vitamin D, pemulihan pasca sakit, booster imun',
    composition: 'Cholecalciferol 5000 IU, Menaquinone-7 100 mcg',
    stock: 85,
    requiresPrescription: false,
    soldCount: 710,
    rating: 4.9
  },
  {
    id: 'med-5',
    name: 'Lavva Acne Clear Gel Salicylic 2% + Niacinamide',
    category: 'Skincare Medis',
    price: 110000,
    originalPrice: 135000,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    dosage: 'Oleskan tipis pada jerawat meradang 2 kali sehari',
    form: 'Salep/Krim',
    description: 'Gel totol jerawat klinis yang mengempeskan jerawat dalam 24 jam tanpa meninggalkan noda hitam.',
    indication: 'Jerawat batu, papula, bruntusan meradang',
    composition: 'Salicylic Acid Encapsulated 2%, Niacinamide 4%, Zinc PCA 1%',
    stock: 62,
    requiresPrescription: false,
    soldCount: 540,
    rating: 4.9
  },
  {
    id: 'med-6',
    name: 'Paket Perawatan Pasca Khitan Lengkap (Kassa Steril + Salep + Celana Sunat)',
    category: 'Alat Kesehatan',
    price: 95000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
    dosage: 'Gunakan sesuai instruksi dokter bedah',
    form: 'Pcs',
    description: 'Paket higienis pasca khitan berisi 2 celana pelindung batok, 1 salep antibiotik luka, kassa steril, dan larutan NaCl.',
    indication: 'Perawatan luka sunat anak / dewasa',
    composition: 'Kit Medis Steril Lengkap',
    stock: 90,
    requiresPrescription: false,
    soldCount: 620,
    rating: 5.0
  },
  {
    id: 'med-7',
    name: 'Cataflam 50mg Pereda Sakit Gigi & Radang (Resep)',
    category: 'Obat Keras & Resep',
    price: 78000,
    originalPrice: 88000,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    dosage: '1 tablet 2-3 kali sehari sesudah makan',
    form: 'Tablet',
    description: 'Anti-inflamasi non-steroid untuk mengatasi nyeri hebat akibat sakit gigi, pasca cabut gigi, dan radang gusi.',
    indication: 'Nyeri akut odontogenik, dismenore, radang sendi',
    composition: 'Kalium Diklofenak 50 mg',
    stock: 70,
    requiresPrescription: true,
    soldCount: 290,
    rating: 4.7
  },
  {
    id: 'med-8',
    name: 'Tensi Darah Digital Medis Lavva Precision Pro',
    category: 'Alat Kesehatan',
    price: 340000,
    originalPrice: 420000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    dosage: 'Gunakan di lengan atas dalam kondisi tenang',
    form: 'Pcs',
    description: 'Tensimeter digital akurat dengan layar LCD backlit, pendeteksi aritmia jantung, dan memori 99 pembacaan.',
    indication: 'Monitoring tekanan darah mandiri di rumah',
    composition: 'Alat Kesehatan Sertifikasi Kemenkes AKL',
    stock: 35,
    requiresPrescription: false,
    soldCount: 185,
    rating: 4.9
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  // Home Care
  {
    id: 'hc-1',
    title: 'Perawatan Luka Diabetes & Pasca Operasi (Home Visit)',
    category: 'homecare',
    tagline: 'Perawat spesialis luka steril bersertifikasi datang ke rumah',
    description: 'Layanan pembersihan, debridemen ringan, penggantian balutan modern dressing steril, dan edukasi perawatan luka langsung di kediaman pasien.',
    features: [
      'Kunjungan Perawat Medis Spesialis Luka',
      'Termasuk Set Dressing Steril & Salep Medis Khusus',
      'Pemeriksaan Gula Darah & Tanda Vital',
      'Laporan Evaluasi Kesembuhan Digital'
    ],
    price: 320000,
    originalPrice: 400000,
    duration: '60 Menit / Kunjungan',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    badge: 'Paling Diminati',
    recommendedFor: 'Pasien diabetes, luka operasi, luka bakar, decubitus lansia'
  },
  {
    id: 'hc-2',
    title: 'Infus Vitamin Booster Premium & Immune Drip (Home Care)',
    category: 'homecare',
    tagline: 'Terapi infus multivitamin & antioksidan langsung di rumah',
    description: 'Kombinasi Vitamin C dosis tinggi, B-Complex, dan Gluthatione murni untuk memulihkan stamina cepat, anti-fatigue, dan mencerahkan kulit.',
    features: [
      'Dilakukan Dokter / Perawat Senior Ber-SIP',
      'Free Cek Tekanan Darah & SpO2',
      'Proses Nyaman & Bebas Antre',
      'Bahan Farmasi Original Tersegel'
    ],
    price: 450000,
    originalPrice: 550000,
    duration: '45 - 60 Menit',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    badge: 'Favorit Eksekutif',
    recommendedFor: 'Kelelahan kronis, persiapan travelling, pemulihan flu'
  },
  {
    id: 'hc-3',
    title: 'Pendampingan Fisioterapi & Perawatan Lansia di Rumah',
    category: 'homecare',
    tagline: 'Fisioterapis profesional untuk rehabilitasi geriatri & stroke',
    description: 'Terapi latihan motorik, pemulihan pasca stroke, latihan keseimbangan sendi, dan pendampingan fisik komprehensif bagi lansia tercinta.',
    features: [
      'Fisioterapis Bersertifikat Fisioterapi Indonesia',
      'Alat Modalitas Portabel (TENS / US)',
      'Program Latihan Bertahap di Rumah',
      'Konsultasi Dokter Rehab Medik Online Gratis'
    ],
    price: 380000,
    originalPrice: 480000,
    duration: '60 - 75 Menit',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Lansia, pasca stroke, nyeri punggung, radang sendi'
  },

  // Vaksin
  {
    id: 'vaksin-1',
    title: 'Vaksinasi Kanker Serviks HPV 9-Valen (Gardasil 9)',
    category: 'vaksin',
    tagline: 'Perlindungan maksimal 9 jenis virus penyebab kanker serviks & kutil kelamin',
    description: 'Vaksin HPV terlengkap generasi terbaru untuk wanita & pria usia 9-45 tahun. Melindungi dari 90% penyebab kanker serviks dan kutil kelamin.',
    features: [
      'Injeksi oleh Dokter Spesialis Kulit / Obgyn',
      'Sertifikat Vaksinasi Digital Resmi Lavva',
      'Konsultasi Pra-Vaksinasi Gratis',
      'Pengingat Otomatis Dosis Ke-2 & Ke-3'
    ],
    price: 2350000,
    originalPrice: 2600000,
    duration: '30 Menit',
    image: 'https://images.unsplash.com/photo-1632053002928-19fa6c95bf2e?auto=format&fit=crop&w=600&q=80',
    badge: 'Proteksi Wajib',
    recommendedFor: 'Remaja, wanita & pria dewasa aktif'
  },
  {
    id: 'vaksin-2',
    title: 'Vaksin Influenza Quadrivalent 2025/2026 (4 Strain)',
    category: 'vaksin',
    tagline: 'Kekebalan 1 tahun penuh dari serangan virus flu musiman berbahaya',
    description: 'Mencegah komplikasi flu berat, radang paru-paru, dan demam tinggi. Cocok untuk anak-anak, lansia, wanita hamil, dan travellers.',
    features: [
      'Formula Terbaru Rekomendasi WHO 2025',
      'Bisa untuk Anak mulai 6 Bulan hingga Lansia',
      'Proses Suntik Cepat & Minim Nyeri',
      'Buku Catatan Imunisasi'
    ],
    price: 375000,
    originalPrice: 450000,
    duration: '20 Menit',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    recommendedFor: 'Semua usia, calon jamaah umroh/haji, pekerja aktif'
  },
  {
    id: 'vaksin-3',
    title: 'Paket Vaksin Hepatitis B + Cek HBsAg & Anti-HBs',
    category: 'vaksin',
    tagline: 'Perlindungan menyeluruh organ hati dari infeksi Hepatitis B kronis',
    description: 'Termasuk tes laboratorium antibodi awal dan 1 dosis vaksin Hepatitis B rekombinan murni berstandar internasional.',
    features: [
      'Tes Laboratorium Darah HBsAg Cepat',
      'Suntik Vaksin Hepatitis B Dewasa',
      'Konsultasi Hasil Tes dengan Dokter Umum',
      'Vaksin Cold-Chain Bersuhu Terkontrol'
    ],
    price: 490000,
    originalPrice: 600000,
    duration: '30 Menit',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Tenaga kesehatan, pasangan pranikah, masyarakat umum'
  },

  // Khitan
  {
    id: 'khitan-1',
    title: 'Khitan Modern Metode Sealer Lem Bedah (Tanpa Jahit & Bebas Mandi)',
    category: 'khitan',
    tagline: 'Teknologi sunat paling modern tanpa jahitan, bisa langsung kena air',
    description: 'Menggunakan kombinasi alat pemotong canggih dan lem bedah medis (tissue adhesive). Tidak ada benang jahit yang mengganjal, hasil rapi dan pemulihan 2x lebih cepat.',
    features: [
      'Tanpa Jarum Suntik (Bius Semprot Needle-Free)',
      'Tanpa Benang Jahit & Tanpa Alat Menempel',
      'Bisa Langsung Mandi & Beraktivitas Ringan',
      'Free Celana Sunat + Paket Obat Pasca Sunat',
      'Kontrol Pasca Khitan Gratis sampai Sembuh Total'
    ],
    price: 1850000,
    originalPrice: 2200000,
    duration: '25 - 35 Menit',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80',
    badge: 'Rekomendasi Utama',
    recommendedFor: 'Anak balita, usia sekolah, dan dewasa yang ingin cepat aktif'
  },
  {
    id: 'khitan-2',
    title: 'Khitan Modern Metode Smart Klamp / Super Ring',
    category: 'khitan',
    tagline: 'Metode tabung klem higienis sekali pakai anti-pendarahan',
    description: 'Metode klem pelindung yang telah teruji secara global. Sangat aman, steril, tidak memerlukan perban basah, dan anak bisa langsung memakai celana biasa.',
    features: [
      'Alat Disposable 100% Sekali Pakai Steril',
      'Minim Pendarahan & Nyeri Terkontrol',
      'Tindakan oleh Dokter Bedah Berpengalaman',
      'Sertifikat & Hadiah Khitan Keren untuk Anak'
    ],
    price: 1450000,
    originalPrice: 1750000,
    duration: '20 Menit',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Bayi 0-1 tahun & anak usia sekolah dasar'
  },
  {
    id: 'khitan-3',
    title: 'Khitan Dewasa & Khitan Kasus Khusus (Phimosis / Gemuk)',
    category: 'khitan',
    tagline: 'Privasi terjamin, dikerjakan dokter spesialis bedah senior di ruang VIP',
    description: 'Penanganan khusus untuk dewasa dan anak dengan kondisi fimosis, parafimosis, atau tertimbun lemak perut (buried penis) dengan hasil estetik optimal.',
    features: [
      'Ruang Khusus VIP Menjaga Privasi Pasien',
      'Teknik Estetika Bedah Presisi Tinggi',
      'Bius Lokal Kuat & Nyaman',
      'Pendampingan Pasca Tindakan via Dokter Personal WhatsApp'
    ],
    price: 2450000,
    originalPrice: 2900000,
    duration: '40 - 50 Menit',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Pria dewasa, penderita fimosis, anak gemuk'
  },

  // Gigi (Lavva Dental)
  {
    id: 'gigi-1',
    title: 'Scaling Gigi Ultrasound & Polish Fluoride (Pembersihan Karang)',
    category: 'gigi',
    tagline: 'Gigi bersih bebas plak karang dan nafas segar seketika',
    description: 'Pembersihan karang gigi atas dan bawah secara mendalam menggunakan gelombang ultrasonik presisi yang nyaman, diakhiri dengan pemolesan pasta fluorida.',
    features: [
      'Scaling Lengkap Rahang Atas & Bawah',
      'Poles Penghilang Noda Kopi/Teh/Rokok',
      'Aplikasi Topical Fluoride Pencegah Gigi Berlubang',
      'Pemeriksaan Kamera Intraoral Beresolusi Tinggi'
    ],
    price: 299000,
    originalPrice: 450000,
    duration: '45 Menit',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    badge: 'Promo Spesial',
    recommendedFor: 'Rutin setiap 6 bulan sekali bagi semua orang'
  },
  {
    id: 'gigi-2',
    title: 'Paket Bleaching Gigi In-Office Laser Whitening (Putih 4-8 Shade)',
    category: 'gigi',
    tagline: 'Senyum percaya diri memukau dengan gigi putih alami dalam 1x kedatangan',
    description: 'Pemutihan gigi medis menggunakan gel peroksida premium diaktivasi sinar laser cool-light. Aman untuk email gigi dan diawasi dokter gigi spesialis.',
    features: [
      'Hasil Instan Terlihat Langsung (4 - 8 Tingkat Lebih Putih)',
      'Termasuk Free Scaling Pembersihan Karang',
      'Aplikasi Serum Anti-Sensitivitas Gigi',
      'Foto Before & After Standar Kedokteran Gigi'
    ],
    price: 1850000,
    originalPrice: 2500000,
    duration: '75 Menit',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    badge: 'Favorit Pasien',
    recommendedFor: 'Gigi menguning, persiapan pernikahan, interview kerja'
  },
  {
    id: 'gigi-3',
    title: 'Pemasangan Behel Kawat Gigi Metal / Keramik Estetik',
    category: 'gigi',
    tagline: 'Rapikan susunan gigi dengan bracket presisi standar orthodontist',
    description: 'Konsultasi, pencetakan rahang, pemasangan bracket kualitas internasional dengan pilihan bahan metal anti-karat atau keramik transparan estetis.',
    features: [
      'Bracket Original Ortho Berkualitas Tinggi',
      'Termasuk Cetak Model Rahang & Rontgen Gigi Analysis',
      'Pilihan Warna Karet Bebas Ganti Tiap Kontrol',
      'Rencana Perawatan Digital Presisi'
    ],
    price: 3900000,
    originalPrice: 5500000,
    duration: '90 Menit',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Gigi berjejal, renggang, maju/tonggos, crossbite'
  },

  // Kecantikan (Lavva Aesthetic)
  {
    id: 'beauty-1',
    title: 'Korean Glass Skin Facial & Hydro-Microdermabrasion',
    category: 'kecantikan',
    tagline: 'Kulit glowing bersinar, pori-pori bersih tuntas, dan kenyal terhidrasi',
    description: 'Deep cleansing 7 langkah menggunakan vortex suction medis, ekstraksi komedo minim rasa sakit, serum infusion hyaluronic acid, dan masker kolagen dingin.',
    features: [
      'Pembersihan Komedo Tuntas Tanpa Bekas Merah Berat',
      'Oxygen Spray Infusion & Cold Hammer Therapy',
      'Masker Kolagen & LED Light Therapy Photodynamic',
      'Pijat Relaksasi Wajah, Leher & Pundak'
    ],
    price: 385000,
    originalPrice: 550000,
    duration: '75 Menit',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    badge: 'Treatment Populer',
    recommendedFor: 'Kulit kusam, komedo menumpuk, tekstur kasar'
  },
  {
    id: 'beauty-2',
    title: 'Laser Pico Glow Rejuvenation & Melasma Eraser',
    category: 'kecantikan',
    tagline: 'Pikodetik laser tercanggih untuk pudarkan flek hitam, bekas jerawat & pori besar',
    description: 'Laser berkecepatan pikodetik memecah pigmen melanin berlebih tanpa melukai lapisan atas kulit. Waktu pemulihan (downtime) sangat minimal.',
    features: [
      'Dikerjakan Langsung oleh dr. Spesialis Dermatologi (Sp.KK)',
      'Menstimulasi Kolagen & Elastin Alami Kulit',
      'Mencerahkan Kulit Wajah & Meratakan Warna Kulit',
      'Termasuk Krim Anti-Iritasi & Soothing Mask'
    ],
    price: 990000,
    originalPrice: 1500000,
    duration: '60 Menit',
    image: 'https://images.unsplash.com/photo-1512290900672-1f4a9b6c0c26?auto=format&fit=crop&w=600&q=80',
    badge: 'Teknologi Terbaik',
    recommendedFor: 'Flek hitam, melasma, bopeng jerawat ringan, pori-pori lebar'
  },
  {
    id: 'beauty-3',
    title: 'Skin Booster DNA Salmon & Pure Hyaluronic Injection',
    category: 'kecantikan',
    tagline: 'Regenerasi sel kulit mendalam agar tampak 5 tahun lebih muda & kenyal',
    description: 'Injeksi mikro Polydeoxyribonucleotide (PDRN) ekstrak sperma salmon murni yang terbukti klinis memperbaiki struktur kulit rusak dan mengembalikan elastisitas.',
    features: [
      'Bahan 100% Original BPOM Certified',
      'Bius Krim Topikal Kuat Nyaman',
      'Memperbaiki Skin Barrier Rusak & Kerutan Halus',
      'Glowing Alami Tahan Hingga 6-9 Bulan'
    ],
    price: 1950000,
    originalPrice: 2800000,
    duration: '60 Menit',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    recommendedFor: 'Kulit dehidrasi, penuaan dini, bopeng/scar jerawat membandel'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Ruang Tindakan Bedah Minor & Khitan Steril',
    description: 'Dilengkapi HEPA filter udara bertekanan positif, meja operasi hidrolik, dan peralatan sterilisasi autoclave kelas medis.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80',
    iconName: 'ShieldCheck'
  },
  {
    id: 'fac-2',
    name: 'Studio Estetika & Laser Dermatologi VIP',
    description: 'Ruang perawatan privat yang elegan dan higienis dengan teknologi Pico Laser, HIFU 7D, dan Hydro-facial station.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=500&q=80',
    iconName: 'Sparkles'
  },
  {
    id: 'fac-3',
    name: 'Lavva Dental Suite Berteknologi Digital',
    description: 'Kursi dental ergonomis dengan kamera intraoral 4K, scaler ultrasonik anti-ngilu, dan sistem disinfeksi otomatis.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=80',
    iconName: 'Smile'
  },
  {
    id: 'fac-4',
    name: 'Laboratorium Diagnostik & Farmasi 24 Jam',
    description: 'Pemeriksaan hematologi, tes darah rutin, glukosa, kolesterol instan serta apotek farmasi obat berstandar BPOM.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=500&q=80',
    iconName: 'FlaskConical'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-LV-8821',
    patientId: 'user-patient-1',
    patientName: 'Budi Santoso, S.Kom',
    patientPhone: '081234567890',
    patientEmail: 'pasien@lavvaclinic.com',
    serviceCategory: 'khitan',
    serviceName: 'Khitan Modern Metode Sealer Lem Bedah',
    doctorId: 'doc-4',
    doctorName: 'dr. Farhan Malik, Sp.B (Khitan Specialist)',
    date: '2026-08-22',
    time: '10:00 WIB',
    status: 'Dikonfirmasi',
    totalPrice: 1850000,
    notes: 'Anak usia 8 tahun, mohon dengan bius ramah anak tanpa jarum.',
    createdAt: '2026-08-17 14:20',
    paymentMethod: 'QRIS Lavva Pay',
    qrCodeId: 'QR-LV-8821'
  },
  {
    id: 'APT-LV-8822',
    patientId: 'user-patient-1',
    patientName: 'Budi Santoso, S.Kom',
    patientPhone: '081234567890',
    patientEmail: 'pasien@lavvaclinic.com',
    serviceCategory: 'gigi',
    serviceName: 'Scaling Gigi Ultrasound & Polish Fluoride',
    doctorId: 'doc-3',
    doctorName: 'drg. Stefanie Clarissa, Sp.KG',
    date: '2026-08-25',
    time: '14:30 WIB',
    status: 'Menunggu Pembayaran',
    totalPrice: 299000,
    notes: 'Pembersihan rutin karang gigi belakang.',
    createdAt: '2026-08-17 16:45',
    paymentMethod: 'Transfer Bank BCA',
    qrCodeId: 'QR-LV-8822'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-LAV-9910',
    patientId: 'user-patient-1',
    patientName: 'Budi Santoso, S.Kom',
    patientPhone: '081234567890',
    patientAddress: 'Jl. Anggrek Cendrawasih No. 12, Kebon Jeruk, Jakarta Barat',
    items: [
      {
        medicineId: 'med-1',
        medicineName: 'Lavva Skin Glow Serum Vit C 15% Medical Grade',
        price: 185000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
      },
      {
        medicineId: 'med-4',
        medicineName: 'ImmunoShield Vit D3 5000 IU + K2 Liposomal',
        price: 145000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalPrice: 330000,
    deliveryFee: 15000,
    status: 'Diproses Apotek',
    paymentMethod: 'GoPay / E-Wallet',
    createdAt: '2026-08-17 11:30'
  }
];
