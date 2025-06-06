import { Toaster } from "react-hot-toast";


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";




export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <div className="min-h-screen flex flex-col">
        
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-right" />
      </div>
   
  );
}
