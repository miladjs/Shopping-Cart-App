import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mainLayout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
