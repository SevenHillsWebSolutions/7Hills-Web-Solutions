import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import SplashScreen from '@/components/public/SplashScreen';
import WhatsAppButton from '@/components/public/WhatsAppButton';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#07111F] text-[#F8FAFC]">
      <SplashScreen />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
