import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import SplashScreen from '@/components/public/SplashScreen';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SplashScreen />
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
