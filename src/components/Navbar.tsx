import React, { useState } from 'react';
import {
  HeartPulse,
  PhoneCall,
  ShoppingBag,
  Bell,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  Stethoscope,
  Pill,
  Home,
  Syringe,
  Scissors,
  Smile,
  Sparkles,
  Info,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartItemsCount,
    setIsCartOpen,
    notifications,
    markNotificationsAsRead,
    clinicInfo,
    announcements
  } = useClinic();

  const {
    currentUser,
    role,
    isLoggedIn,
    logout,
    switchRole,
    setShowAuthModal,
    setAuthModalTab
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const activePromo = announcements.find(a => a.isActive);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'konsultasi', label: 'Konsultasi Online', icon: Stethoscope, badge: 'Live' },
    { id: 'obat', label: 'Beli Obat', icon: Pill },
    { id: 'homecare', label: 'Home Care', icon: HeartPulse },
    { id: 'vaksin', label: 'Vaksin', icon: Syringe },
    { id: 'khitan', label: 'Khitan', icon: Scissors },
    { id: 'gigi', label: 'Gigi', icon: Smile },
    { id: 'kecantikan', label: 'Kecantikan', icon: Sparkles },
    { id: 'tentangkami', label: 'Tentang Kami', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Dynamic Announcement or Notice Bar */}
      {activePromo && (
        <div className={`text-xs py-1.5 px-4 text-center font-medium transition-all ${
          activePromo.type === 'emergency' 
            ? 'bg-rose-700 text-white' 
            : activePromo.type === 'promo'
              ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white shadow-xs'
              : 'bg-teal-800 text-teal-100'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <span className="truncate text-[11px] sm:text-xs mx-auto">
              {activePromo.text}
            </span>
            {activePromo.linkTab && (
              <button
                onClick={() => setActiveTab(activePromo.linkTab!)}
                className="underline hover:text-white shrink-0 text-[11px] font-bold"
              >
                Lihat Detail &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 mr-1.5 animate-pulse"></span>
              IGD & Telemedisin 24 Jam Siaga
            </span>
            <span className="hidden sm:inline text-teal-100/90 font-medium">
              Hotline Darurat: <strong className="text-white">{clinicInfo.emergencyHotline}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-teal-100">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp: <a href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="underline hover:text-white font-medium">{clinicInfo.whatsapp}</a></span>
            </div>

            {/* Quick Super Admin Switcher Pill */}
            <div className="flex items-center bg-teal-950/60 rounded-full px-2 py-0.5 border border-teal-700/50">
              <span className="text-[10px] text-teal-300 mr-1.5 hidden md:inline">Mode Akses:</span>
              <button
                id="btn-switch-role"
                onClick={() => switchRole(role === 'superadmin' ? 'patient' : 'superadmin')}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                  role === 'superadmin'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-teal-700 text-teal-100 hover:bg-teal-600'
                }`}
                title="Ganti peran instan untuk pengujian sistem"
              >
                <SlidersHorizontal className="w-2.5 h-2.5" />
                {role === 'superadmin' ? 'Super Admin Mode' : 'Mode Pasien'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-teal-700 transition-colors">
              L
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-teal-950 font-serif">
                  LAVVA <span className="font-light text-slate-500 font-sans">CLINIC</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 rounded hidden sm:inline-block">
                  Medis & Estetika
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Super Admin Direct Button (Always visible / highlighted) */}
            <button
              id="btn-nav-superadmin"
              onClick={() => {
                if (role !== 'superadmin') {
                  switchRole('superadmin');
                }
                setActiveTab('admin');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-teal-500/40'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 hover:border-amber-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Super Admin</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="btn-open-cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
              title="Keranjang Obat"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button
                id="btn-toggle-notifs"
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowUserDropdown(false);
                }}
                className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute 1.5 1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown Box */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-fadeIn">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold text-slate-900 text-sm">Notifikasi Klinik</span>
                    </div>
                    {unreadNotifs > 0 && (
                      <button
                        onClick={markNotificationsAsRead}
                        className="text-xs text-teal-700 hover:underline font-medium"
                      >
                        Tandai sudah dibaca
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        Tidak ada notifikasi baru
                      </div>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            if (notif.linkTab) setActiveTab(notif.linkTab);
                            setShowNotifDropdown(false);
                          }}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-teal-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                            <span className="text-[10px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {isLoggedIn && currentUser ? (
              <div className="relative">
                <button
                  id="btn-user-menu"
                  onClick={() => {
                    setShowUserDropdown(!showUserDropdown);
                    setShowNotifDropdown(false);
                  }}
                  className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-teal-600"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden md:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-100 text-teal-800 capitalize">
                        {role === 'superadmin' ? 'Super Admin Klinik' : 'Pasien Terdaftar'}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('my-appointments');
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 flex items-center space-x-2 font-medium"
                      >
                        <CalendarCheck className="w-4 h-4 text-teal-600" />
                        <span>Riwayat Janji & Pesanan</span>
                      </button>

                      {role === 'superadmin' && (
                        <button
                          onClick={() => {
                            setActiveTab('admin');
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-amber-50 flex items-center space-x-2 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>Panel Super Admin</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-medium"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Keluar (Sign Out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-login-trigger"
                onClick={() => {
                  setAuthModalTab('login');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center space-x-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk / Daftar</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-teal-700 xl:hidden rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveTab('my-appointments');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-teal-50 text-teal-800 font-semibold rounded-lg text-xs flex items-center justify-center space-x-2"
            >
              <CalendarCheck className="w-4 h-4 text-teal-600" />
              <span>Riwayat Janji & Transaksi Saya</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-amber-100 text-amber-950 font-bold rounded-lg text-xs flex items-center justify-center space-x-2 border border-amber-300"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Buka Dashboard Super Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
