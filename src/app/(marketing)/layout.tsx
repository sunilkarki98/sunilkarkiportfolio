import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar isReaderMode={false} />
      {children}
      <Footer />
    </>
  );
}
