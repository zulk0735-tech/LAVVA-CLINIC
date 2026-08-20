import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BookingModal } from './components/BookingModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AuthModal } from './components/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { KonsultasiView } from './views/KonsultasiView';
import { BeliObatView } from './views/BeliObatView';
import { HomeCareView } from './views/HomeCareView';
import { VaksinView } from './views/VaksinView';
import { KhitanView } from './views/KhitanView';
import { GigiView } from './views/GigiView';
import { KecantikanView } from './views/KecantikanView';
import { TentangKamiView } from './views/TentangKamiView';
import { SuperAdminView } from './views/SuperAdminView';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useClinic();

  // Scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
      case 'beranda':
        return <HomeView />;
      case 'konsultasi':
        return <KonsultasiView />;
      case 'obat':
        return <BeliObatView />;
      case 'homecare':
        return <HomeCareView />;
      case 'vaksin':
        return <VaksinView />;
      case 'khitan':
        return <KhitanView />;
      case 'gigi':
        return <GigiView />;
      case 'kecantikan':
        return <KecantikanView />;
      case 'tentang':
      case 'tentangkami':
        return <TentangKamiView />;
      case 'admin':
        return <SuperAdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 antialiased font-sans">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main View Display */}
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals and Drawers */}
      <CartDrawer />
      <BookingModal />
      <ReceiptModal />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ClinicProvider>
        <MainAppContent />
      </ClinicProvider>
    </AuthProvider>
  );
}

export default App;
