import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  SlidersHorizontal,
  Mic
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VoiceInputButton } from './VoiceInputButton';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authModalTab === 'login') {
      if (!email) {
        setErrorMsg('Silakan masukkan email.');
        return;
      }
      login(email);
      setShowAuthModal(false);
    } else {
      if (!name || !email || !phone) {
        setErrorMsg('Lengkapi semua data pendaftaran.');
        return;
      }
      register(name, email, phone, password);
      setShowAuthModal(false);
    }
  };

  const handleQuickDemoLogin = (roleType: 'admin' | 'patient') => {
    if (roleType === 'admin') {
      login('admin@lavvaclinic.com', 'superadmin');
    } else {
      login('pasien@lavvaclinic.com', 'patient');
    }
    setShowAuthModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-800 text-white p-6 text-center relative">
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 p-1.5 text-teal-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-emerald-300 mb-2 border border-white/10">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold font-serif tracking-tight">
            LAVVA <span className="text-emerald-300 font-sans">CLINIC</span>
          </h3>
          <p className="text-xs text-teal-100 mt-0.5">
            Sistem Informasi Layanan Medis Terpadu & Super Admin
          </p>

          {/* Tab Switcher */}
          <div className="flex bg-teal-950/50 p-1 rounded-xl mt-4 border border-teal-700/50">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                authModalTab === 'login'
                  ? 'bg-white text-teal-950 shadow-xs'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              onClick={() => {
                setAuthModalTab('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                authModalTab === 'register'
                  ? 'bg-white text-teal-950 shadow-xs'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              Daftar Pasien Baru
            </button>
          </div>
        </div>

        {/* Content & Form */}
        <div className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalTab === 'register' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-600 font-semibold">Nama Lengkap Pasien</label>
                  <VoiceInputButton
                    onTranscript={(text) => setName(text)}
                    currentValue={name}
                    mode="replace"
                    size="sm"
                    tooltip="Dikte nama lengkap"
                  />
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-600 font-semibold">Alamat Email</label>
                <VoiceInputButton
                  onTranscript={(text) => {
                    // Clean up spoken email (e.g., "budi at gmail dot com" -> "budi@gmail.com")
                    const cleanEmail = text.toLowerCase()
                      .replace(/\s*at\s*/g, '@')
                      .replace(/\s*dot\s*/g, '.')
                      .replace(/\s+/g, '');
                    setEmail(cleanEmail);
                  }}
                  currentValue={email}
                  mode="replace"
                  size="sm"
                  tooltip="Dikte email"
                />
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                />
              </div>
            </div>

            {authModalTab === 'register' && (
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nomor WhatsApp / HP Aktif</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Kata Sandi (Password)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-600 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-md transition-all text-sm flex items-center justify-center space-x-2"
            >
              <span>{authModalTab === 'login' ? 'Masuk ke Akun' : 'Daftar Sekarang'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Logins */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-400 text-center font-medium">
              ⚡ Akses Cepat Demo (Pengujian Sistem):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Super Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('patient')}
                className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Pasien Demo</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
