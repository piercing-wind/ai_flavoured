import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
  <>
  <div>

  <div className="">

      <main>{children}</main>
    </div>
  </div>

  </>  
)}
