"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

function HeaderPage() {
  const pathname = usePathname(); // ✅ current route

  // ✅ check dynamic route and hide header
  const hideHeader = pathname.startsWith("/allcase/");
  // ✅ check dynamic route and show header
  const showHeader = pathname.startsWith("/allcase/add");
  return (
    <>
      { !hideHeader || showHeader ? <Navbar /> : null}
    </>
  );
}

export default HeaderPage;
