"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

function HeaderPage() {

const pathname = usePathname();

const hideHeader =
 pathname.startsWith("/gazipurcr/") ||
 pathname.startsWith("/gazipurgr/") ||
 pathname.startsWith("/allcase/");

return (
<>
{!hideHeader && <Navbar />}
</>
);

}

export default HeaderPage;