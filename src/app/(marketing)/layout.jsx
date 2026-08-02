import { Navbar, Footer, CustomCursor } from "../../components";

export default function MarketingLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <Navbar isReaderMode={false} />
      {children}
      <Footer />
    </>
  );
}
