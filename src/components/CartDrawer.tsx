import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Upload,
  CheckCircle2,
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';
import { VoiceInputButton } from './VoiceInputButton';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    createOrder,
    setActiveReceipt
  } = useClinic();

  const { currentUser, isLoggedIn, setShowAuthModal } = useAuth();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [deliveryMethod, setDeliveryMethod] = useState<'instant' | 'pickup' | 'regular'>('instant');
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS Lavva Pay');
  const [recipientName, setRecipientName] = useState(currentUser?.name || 'Pasien Lavva');
  const [recipientPhone, setRecipientPhone] = useState(currentUser?.phone || '081234567890');
  const [recipientAddress, setRecipientAddress] = useState(currentUser?.address || 'Jl. Boulevard Raya Blok LC No. 18, Jakarta');
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [uploadedPrescription, setUploadedPrescription] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isCartOpen) return null;

  const deliveryFee = deliveryMethod === 'pickup' ? 0 : deliveryMethod === 'instant' ? 20000 : 12000;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const newOrder = createOrder({
      patientId: currentUser?.id || 'guest-1',
      patientName: recipientName,
      patientPhone: recipientPhone,
      patientAddress: deliveryMethod === 'pickup' ? 'Ambil Langsung di Apotek Lavva Clinic' : recipientAddress,
      items: cart.map(item => ({
        medicineId: item.medicine.id,
        medicineName: item.medicine.name,
        price: item.medicine.price,
        quantity: item.quantity,
        image: item.medicine.image
      })),
      totalPrice: grandTotal,
      deliveryFee,
      paymentMethod,
      prescriptionImage: uploadedPrescription || undefined
    });

    setLastOrder(newOrder);
    setStep('success');

    // Trigger confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPrescription(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {step === 'cart' && 'Keranjang Apotek Lavva'}
                {step === 'checkout' && 'Konfirmasi Pengiriman & Pembayaran'}
                {step === 'success' && 'Pesanan Berhasil Dibuat!'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'cart' ? `${cart.length} Jenis Produk Medis` : 'Pengiriman Farmasi Cepat & Aman'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setStep('cart');
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Keranjang Obat Masih Kosong</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Pilih obat, vitamin, alat kesehatan, atau skincare medis dari katalog kami.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div
                      key={item.medicine.id}
                      className="flex items-center space-x-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-slate-900 truncate pr-2">
                            {item.medicine.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.medicine.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-teal-700 font-semibold mt-0.5">
                          Rp {item.medicine.price.toLocaleString('id-ID')}
                        </p>
                        {item.medicine.requiresPrescription && (
                          <span className="inline-block text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 mt-1">
                            Wajib Resep Dokter
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 bg-white rounded-lg border border-slate-200 px-2 py-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.medicine.id, item.quantity - 1)}
                              className="text-slate-500 hover:text-teal-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.medicine.id, item.quantity + 1)}
                              className="text-slate-500 hover:text-teal-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Rp {(item.medicine.price * item.quantity).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Prescription Prompt if needed */}
                  {cart.some(c => c.medicine.requiresPrescription) && (
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>Verifikasi Resep Dokter Diperlukan</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Keranjang berisi obat keras yang memerlukan resep dokter. Anda dapat mengunggah foto resep pada langkah berikutnya.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              {/* Recipient Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-teal-600" />
                  <span>Data Pengiriman Obat</span>
                </h4>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-600 font-medium">Nama Pasien / Penerima</label>
                    <VoiceInputButton
                      onTranscript={(text) => setRecipientName(text)}
                      currentValue={recipientName}
                      mode="replace"
                      size="sm"
                      tooltip="Dikte nama penerima"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-teal-600 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">No. WhatsApp / HP</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={e => setRecipientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-teal-600 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Metode Pengiriman</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('instant')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        deliveryMethod === 'instant'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="block font-bold">Kurir 1 Jam</span>
                      <span className="text-[10px] text-teal-700">Rp 20.000</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('regular')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        deliveryMethod === 'regular'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="block font-bold">Reguler</span>
                      <span className="text-[10px] text-teal-700">Rp 12.000</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        deliveryMethod === 'pickup'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="block font-bold">Ambil Klinik</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Gratis</span>
                    </button>
                  </div>
                </div>

                {deliveryMethod !== 'pickup' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-600 font-medium">Alamat Lengkap Pengantaran</label>
                      <VoiceInputButton
                        onTranscript={(text) => setRecipientAddress(text)}
                        currentValue={recipientAddress}
                        mode="append"
                        size="sm"
                        iconOnly={false}
                        placeholderPrompt="Contoh: Jl. Anggrek No. 12, Kelapa Gading..."
                        tooltip="Dikte alamat pengiriman dengan suara"
                      />
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={recipientAddress}
                      onChange={e => setRecipientAddress(e.target.value)}
                      placeholder="Contoh: Jl. Anggrek No. 12, Kelapa Gading..."
                      className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-teal-600 text-xs font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Upload Prescription (Optional or Required) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <Upload className="w-4 h-4 text-teal-600" />
                  <span>Unggah Foto Resep Dokter (Jika Ada)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-100 file:text-teal-800 hover:file:bg-teal-200 cursor-pointer"
                />
                {uploadedPrescription && (
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 text-[11px] flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Foto Resep Berhasil Terlampir</span>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-teal-600" />
                  <span>Metode Pembayaran</span>
                </h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'QRIS Lavva Pay', label: 'QRIS Lavva Pay (BCA, Mandiri, Gopay, OVO, Dana)', icon: QrCode },
                    { id: 'Transfer Bank BCA / Mandiri', label: 'Transfer Virtual Account (BCA / Mandiri / BNI)', icon: Building },
                    { id: 'Bayar di Tempat (COD / Di Klinik)', label: 'Bayar Tunai di Tempat / Saat Ambil', icon: CreditCard }
                  ].map(m => (
                    <label
                      key={m.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <m.icon className="w-4 h-4 text-teal-600" />
                        <span className="text-xs">{m.label}</span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-md text-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Bayar & Proses Pesanan (Rp {grandTotal.toLocaleString('id-ID')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'success' && lastOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pesanan Berhasil Diproses!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Nomor Pesanan: <span className="font-mono font-bold text-slate-800">{lastOrder.id}</span>
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Farmasi Lavva Clinic sedang menyiapkan obat Anda. Kurir akan menghubungi via WhatsApp {lastOrder.patientPhone}.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Penerima:</span>
                  <span className="font-bold text-slate-800">{lastOrder.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Pembayaran:</span>
                  <span className="font-bold text-teal-700">Rp {lastOrder.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode:</span>
                  <span className="font-semibold text-slate-700">{lastOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActiveReceipt(lastOrder);
                    setIsCartOpen(false);
                    setStep('cart');
                  }}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  Cetak / Unduh Bukti Struk Transaksi
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setStep('cart');
                  }}
                  className="w-full py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
                >
                  Tutup & Kembali ke Menu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions for step 'cart' */}
        {step === 'cart' && cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">Subtotal Obat ({cartItemsCount} item):</span>
              <span className="font-extrabold text-slate-900 text-base">
                Rp {cartTotal.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={() => setStep('checkout')}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-md text-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>Lanjut ke Pengiriman</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
