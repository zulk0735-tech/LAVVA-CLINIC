import React from 'react';
import {
  X,
  Printer,
  Download,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  HeartPulse,
  PhoneCall,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { CLINIC_INFO } from '../data/mockData';
import { Appointment, Order } from '../types';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt } = useClinic();

  if (!activeReceipt) return null;

  const isAppointment = 'serviceCategory' in activeReceipt;
  const item = activeReceipt as (Appointment | Order);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative my-6 print:shadow-none print:border-none print:m-0 print:max-w-full">
        
        {/* Action Header - Hidden when printing */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold flex items-center gap-1.5 text-teal-400">
            <ShieldCheck className="w-4 h-4" /> Bukti Pelayanan Medis Resmi
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 text-xs flex items-center gap-1 font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button
              onClick={() => setActiveReceipt(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Area */}
        <div className="p-6 text-slate-800 space-y-4">
          {/* Clinic Header */}
          <div className="text-center border-b border-dashed border-slate-300 pb-4 space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight font-serif text-slate-900">
                LAVVA <span className="text-teal-700 font-sans">CLINIC</span>
              </h2>
            </div>
            <p className="text-[10px] text-slate-500 max-w-xs mx-auto">{CLINIC_INFO.address}</p>
            <p className="text-[10px] text-slate-500 font-medium">Hotline: {CLINIC_INFO.phone} | WA: {CLINIC_INFO.whatsapp}</p>
          </div>

          {/* Ticket Type & QR Barcode simulation */}
          <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-100 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-teal-700 bg-teal-200/60 px-1.5 py-0.5 rounded">
                {isAppointment ? 'VOUCHER ANTRIAN MEDIS' : 'INVOICE APOTEK FARMASI'}
              </span>
              <p className="text-sm font-black font-mono text-slate-900 mt-1">{item.id}</p>
              <span className="text-[10px] text-slate-500">{item.createdAt}</span>
            </div>
            <div className="w-16 h-16 bg-white p-1.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
              <QrCode className="w-10 h-10 text-slate-800" />
              <span className="text-[8px] font-mono font-bold text-slate-500 mt-0.5">SCAN-IN</span>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Nama Pasien:</span>
              <span className="font-bold text-slate-900">{item.patientName}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">No. Kontak:</span>
              <span className="font-medium text-slate-800">{item.patientPhone}</span>
            </div>

            {isAppointment ? (
              <>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Layanan Medis:</span>
                  <span className="font-bold text-teal-800 text-right max-w-[200px]">
                    {(item as Appointment).serviceName}
                  </span>
                </div>
                {(item as Appointment).doctorName && (
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Dokter Penanggung Jawab:</span>
                    <span className="font-semibold text-slate-800 text-right">
                      {(item as Appointment).doctorName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Jadwal Kedatangan:</span>
                  <span className="font-bold text-slate-900">
                    {(item as Appointment).date} | {(item as Appointment).time}
                  </span>
                </div>
              </>
            ) : (
              <div className="pt-2 space-y-1.5">
                <span className="text-slate-500 font-semibold block text-[11px]">Rincian Obat Farmasi:</span>
                {(item as Order).items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-slate-700">
                    <span className="truncate max-w-[180px]">{it.quantity}x {it.medicineName}</span>
                    <span className="font-medium">Rp {(it.price * it.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Metode Pembayaran:</span>
              <span className="font-medium text-slate-800">{item.paymentMethod}</span>
            </div>

            <div className="flex justify-between pt-2 text-sm font-extrabold text-slate-900 bg-slate-50 p-2.5 rounded-xl">
              <span>Total Biaya:</span>
              <span className="text-teal-800">Rp {item.totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Verification Footnote & Stamp */}
          <div className="border-t border-dashed border-slate-300 pt-3 text-center space-y-1.5">
            <div className="flex items-center justify-center space-x-1 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TERVALIDASI SISTEM KLINIK LAVVA</span>
            </div>
            <p className="text-[9px] text-slate-400">
              Tunjukkan barcode / QR ini pada resepsionis atau petugas medis saat kedatangan.
            </p>
          </div>
        </div>

        {/* Modal footer for closing */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={() => setActiveReceipt(null)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            Selesai & Simpan Bukti
          </button>
        </div>

      </div>
    </div>
  );
};
