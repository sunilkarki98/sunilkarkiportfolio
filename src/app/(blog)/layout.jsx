import { Navbar, Footer } from "../../components";

export default function BlogLayout({ children }) {
  return (
    <>
      <Navbar isReaderMode={true} />
      {children}
      <Footer />
    </>
  );
}
