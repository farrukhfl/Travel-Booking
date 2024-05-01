"use client";

import { usePathname } from "next/navigation";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {pathname !== "/login" && pathname !== "/signup" && <Navbar />}
        {children}
        {pathname !== "/login" && pathname !== "/signup" && <Footer />}
      </QueryClientProvider>
    </>
  );
};

export default LayoutProvider;
