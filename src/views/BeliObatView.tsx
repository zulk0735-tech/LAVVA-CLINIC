import React, { useState } from 'react';
import {
  Pill,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Upload,
  Info,
  Filter,
  Star,
  X,
  Truck,
  Mic
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Medicine } from '../types';
import { VoiceInputButton } from '../components/VoiceInputButton';

export const BeliObatView: React.FC = () => {
  const { medicines, addToCart, setIsCartOpen } = useClinic();

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const categories = [
    'Semua',
    'Obat Bebas',
    'Obat Keras & Resep',
    'Vitamin & Suplemen',
    'Skincare Medis',
    'Alat Kesehatan'
  ];

  const filteredMedicines = medicines.filter(med => {
    const matchCategory = selectedCategory === 'Semua' || med.category === selectedCategory;
    const matchSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.composition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Apotek Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>Farmasi Resmi Berizin BPOM & Kurir Instant 1 Jam</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Apotek Online & Farmasi Lavva
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Penyedia obat bebas, obat resep dokter, vitamin imunitas, peralatan kesehatan steril, dan produk perawatan kulit medis. Dikirim aman langsung ke alamat Anda.
          </p>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-[450px] flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari obat, vitamin, keluhan (demam, flu, batuk)..."
              className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-teal-600 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-12 text-slate-400 hover:text-slate-600 p-1 text-xs"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="absolute right-2 top-1.5 flex items-center gap-1">
              <VoiceInputButton
                onTranscript={(text) => setSearchQuery(text)}
                currentValue={searchQuery}
                mode="replace"
                size="sm"
                placeholderPrompt="Contoh: 'Paracetamol sirup', 'Obat batuk flu'..."
                tooltip="Cari obat dengan suara (Voice Search)"
              />
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buka Keranjang Obat</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMedicines.map(med => (
          <div
            key={med.id}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 h-44 border border-slate-100 flex items-center justify-center">
                <img
                  src={med.image}
                  alt={med.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {med.requiresPrescription && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold rounded-md bg-rose-600 text-white shadow-xs">
                    Wajib Resep
                  </span>
                )}
                {med.originalPrice && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-bold rounded-md bg-amber-500 text-slate-950 shadow-xs">
                    Hemat {Math.round(((med.originalPrice - med.price) / med.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider block">
                  {med.category} • {med.form}
                </span>
                <h3
                  onClick={() => setSelectedMedicine(med)}
                  className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-2 hover:text-teal-700 cursor-pointer"
                >
                  {med.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {med.indication}
                </p>
              </div>

              <div className="flex items-center space-x-1 text-amber-500 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{med.rating}</span>
                <span className="text-[10px] text-slate-400">({med.soldCount} terjual)</span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-sm font-black text-slate-900">
                  Rp {med.price.toLocaleString('id-ID')}
                </span>
                {med.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through">
                    Rp {med.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMedicine(med)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Detail
                </button>
                <button
                  onClick={() => addToCart(med, 1)}
                  className="p-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition-colors shadow-xs"
                  title="Tambah ke Keranjang"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Medicine Detail Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-4">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex space-x-4">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-28 h-28 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  {selectedMedicine.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">{selectedMedicine.name}</h3>
                <div className="text-base font-black text-slate-900 mt-1">
                  Rp {selectedMedicine.price.toLocaleString('id-ID')}
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Tersedia: {selectedMedicine.stock} {selectedMedicine.form}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="font-bold block text-slate-900">Deskripsi:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedMedicine.description}</p>
              </div>
              <div>
                <span className="font-bold block text-slate-900">Indikasi Medis:</span>
                <p className="text-slate-600 mt-0.5">{selectedMedicine.indication}</p>
              </div>
              <div>
                <span className="font-bold block text-slate-900">Komposisi:</span>
                <p className="text-slate-600 mt-0.5">{selectedMedicine.composition}</p>
              </div>
              <div>
                <span className="font-bold block text-slate-900">Aturan & Dosis Pakai:</span>
                <p className="text-teal-800 font-semibold mt-0.5">{selectedMedicine.dosage}</p>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedMedicine, 1);
                setSelectedMedicine(null);
                setIsCartOpen(true);
              }}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-md text-xs transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tambah ke Keranjang & Beli</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
