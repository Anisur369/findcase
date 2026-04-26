import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

const gazipurData = [
  {
    name: "গাজীপুর সদর",
    base: "gazipursadar",
  },
  {
    name: "বাসন",
    base: "bason",
  },
  {
    name: "টঙ্গি পূর্ব",
    base: "tongieast",
  },
  {
    name: "টঙ্গি পশ্চিম",
    base: "tongiwest",
  },
  {
    name: "কোনাবাড়ি",
    base: "konabari",
  },
  {
    name: "কাশেমপুর",
    base: "kashempur",
  },
  {
    name: "পূবাইল",
    base: "pubail",
  },  
  {
    name: "গাছা",
    base: "gacha",
  },
  {
    name: "জয়দেবপুর",
    base: "joydebpur",
  },
  {
    name: "শ্রীপুর",
    base: "sreepur",
  },
  {
    name: "কাপাশিয়া",
    base: "kapashia",
  },
  {
    name: "কালিয়াকৈর",
    base: "kaliakair",
  },
  {
    name: "কালীগঞ্জ",
    base: "kaliganj",
  },
];

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);


function DropdownMenu({ url, title, basePath }) {
  return (
    <li className="relative group">
      <Link href={`${url}`} className="cursor-pointer">{title}</Link>

      <ul className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-200 bg-base-100 shadow rounded w-50 z-50 p-0 m-0">

        {gazipurData.map((item) => (
          <li key={item.base} className="relative group/sub">
            <Link
              href={`/${basePath}/${item.base}`}
              className="flex justify-between pl-4 py-2 hover:bg-red-500 hover:text-white"
            >
              <span>{item.name}</span>
              <IoMdArrowDropright className="text-red-500 text-[16px]" />
            </Link>

            {/* Sub menu */}
            {/* <ul className="absolute top-0 left-50 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 delay-200 bg-base-100 shadow rounded w-40 p-0 m-0">

              {years.map((year) => (
                <li key={year}>
                  <Link
                    href={`allcase/${basePath}/${item.base}/${year}`}
                    className="block px-4 py-2 hover:bg-red-500 hover:text-white"
                  >
                    {year}
                  </Link>
                </li>
              ))}

            </ul> */}
          </li>
        ))}

      </ul>
    </li>
  );
}

export default DropdownMenu;