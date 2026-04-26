import Link from "next/link";
import DropdownMenu from "./DropdownMenu";



function Navbar() {

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link href="/">Home</Link></li>
            {/* <li>              
              <Link href={"/gazipurcr"}>GazipurCR</Link>
              <ul className="p-2">
                <li><Link href="/gazipurcr/gazipursadar">গাজীপুর সদর</Link></li>
                <li><Link href="/gazipurcr/bason">বাসন</Link></li>
                <li><Link href="/gazipurcr/tongieast">টঙ্গি পূর্ব</Link></li>
                <li><Link href="/gazipurcr/tongiwest">টঙ্গি পশ্চিম</Link></li>
                <li><Link href="/gazipurcr/konabari">কোনবাড়ি</Link></li>
                <li><Link href="/gazipurcr/kashempur">কাশেমপুর</Link></li>
                <li><Link href="/gazipurcr/pubail">পূবাইল</Link></li>
                <li><Link href="/gazipurcr/gacha">গাছা</Link></li>
                <li><Link href="/gazipurcr/joydebpur">জয়দেবপুর</Link></li>
                <li><Link href="/gazipurcr/sreepur">শ্রীপুর</Link></li>
                <li><Link href="/gazipurcr/kapashia">কাপাসিয়া</Link></li>
                <li><Link href="/gazipurcr/kaliakair">কালিয়াকৈর</Link></li>
                <li><Link href="/gazipurcr/kaliganj">কালীগঞ্জ</Link></li>
              </ul>
            </li> */}
            <li>
              <details id="case-add-dropdown">
                <summary><Link href={"/gazipurcr"}>Gazipur CR</Link></summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li><Link href={"/gazipurcr/gazipursadar"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>গাজীপুর সদর</Link></li>
                  <li><Link href={"/gazipurcr/bason"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>বাসন</Link></li>
                  <li><Link href={"/gazipurcr/tongieast"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>টঙ্গি পূর্ব</Link></li>
                  <li><Link href={"/gazipurcr/tongiwest"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>টঙ্গি পশ্চিম</Link></li>
                  <li><Link href={"/gazipurcr/konabari"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কোনবাড়ি</Link></li>
                  <li><Link href={"/gazipurcr/kashempur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কাশেমপুর</Link></li>
                  <li><Link href={"/gazipurcr/pubail"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>পূবাইল</Link></li>
                  <li><Link href={"/gazipurcr/gacha"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>গাছা</Link></li>
                  <li><Link href={"/gazipurcr/joydebpur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>জয়দেবপুর</Link></li>
                  <li><Link href={"/gazipurcr/sreepur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>শ্রীপুর</Link></li>
                  <li><Link href={"/gazipurcr/kapashia"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কাপাসিয়া</Link></li>
                  <li><Link href={"/gazipurcr/kaliakair"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কালিয়াকৈর</Link></li>
                  <li><Link href={"/gazipurcr/kaliganj"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কালীগঞ্জ</Link></li>
                </ul>
              </details>
            </li>
            {/* <li>              
              <Link href={"/gazipurgr"}>GazipurGR</Link>
              <ul className="p-2">
                <li><Link href="/gazipurgr/gazipursadar">গাজীপুর সদর</Link></li>
                <li><Link href="/gazipurgr/bason">বাসন</Link></li>
                <li><Link href="/gazipurgr/tongieast">টঙ্গি পূর্ব</Link></li>
                <li><Link href="/gazipurgr/tongiwest">টঙ্গি পশ্চিম</Link></li>
                <li><Link href="/gazipurgr/konabari">কোনবাড়ি</Link></li>
                <li><Link href="/gazipurgr/kashempur">কাশেমপুর</Link></li>
                <li><Link href="/gazipurgr/pubail">পূবাইল</Link></li>
                <li><Link href="/gazipurgr/gacha">গাছা</Link></li>
                <li><Link href="/gazipurgr/joydebpur">জয়দেবপুর</Link></li>
                <li><Link href="/gazipurgr/sreepur">শ্রীপুর</Link></li>
                <li><Link href="/gazipurgr/kapashia">কাপাসিয়া</Link></li>
                <li><Link href="/gazipurgr/kaliakair">কালিয়াকৈর</Link></li>
                <li><Link href="/gazipurgr/kaliganj">কালীগঞ্জ</Link></li>
              </ul>
            </li> */}
            <li>
              <details id="case-add-dropdown">
                <summary><Link href={"/gazipurgr"}>Gazipur GR</Link></summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li><Link href={"/gazipurgr/gazipursadar"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>গাজীপুর সদর</Link></li>
                  <li><Link href={"/gazipurgr/bason"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>বাসন</Link></li>
                  <li><Link href={"/gazipurgr/tongieast"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>টঙ্গি পূর্ব</Link></li>
                  <li><Link href={"/gazipurgr/tongiwest"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>টঙ্গি পশ্চিম</Link></li>
                  <li><Link href={"/gazipurgr/konabari"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কোনবাড়ি</Link></li>
                  <li><Link href={"/gazipurgr/kashempur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কাশেমপুর</Link></li>
                  <li><Link href={"/gazipurgr/pubail"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>পূবাইল</Link></li>
                  <li><Link href={"/gazipurgr/gacha"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>গাছা</Link></li>
                  <li><Link href={"/gazipurgr/joydebpur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>জয়দেবপুর</Link></li>
                  <li><Link href={"/gazipurgr/sreepur"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>শ্রীপুর</Link></li>
                  <li><Link href={"/gazipurgr/kapashia"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কাপাসিয়া</Link></li>
                  <li><Link href={"/gazipurgr/kaliakair"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কালিয়াকৈর</Link></li>
                  <li><Link href={"/gazipurgr/kaliganj"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>কালীগঞ্জ</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <details id="case-add-dropdown">
                <summary>Case Add</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li><Link href={"/add/addcr"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>Add CR</Link></li>
                  <li><Link href={"/add/addgr"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>Add GR</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Gazipur-CR-GR
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">

          <li><Link href="/">Home</Link></li>
          {/* <li><Link href="/allcase">All Case</Link></li> */}

          {/* 🔴 GAZIPUR CR */}
            <DropdownMenu url="/gazipurcr" title="Gazipur CR" basePath="gazipurcr" />

          {/* 🔵 GAZIPUR GR */}
          <DropdownMenu  url="/gazipurgr" title="Gazipur GR" basePath="gazipurgr" />



          <li>
            <details id="case-add-dropdown">
              <summary>Case Add</summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                <li><Link href={"/add/addcr"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>Add CR</Link></li>
                <li><Link href={"/add/addgr"} onClick={() => {document.getElementById("case-add-dropdown")?.removeAttribute("open");}}>Add GR</Link></li>
              </ul>
            </details>
          </li>

        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
            <span className="badge badge-xs badge-primary indicator-item">1</span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/anis.jpg" />
            </div>
          </div>
          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded w-52">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Navbar;