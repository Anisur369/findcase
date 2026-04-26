"use client";
import SkeletonRow from "@/components/skeletons/SkeletonRowSection";
import Link from "next/link";
import { useState, useEffect } from "react";

const GazipurGR = () => {
  const [loading, setLoading] = useState(true);
  const [allCaseData, setAllCaseData] = useState([]);
  const [search, setSearch] = useState({
    caseNumber: "",
    caseYear: "",
    filingDate: "",
    plaintiff: "",
    defendant: "",
    article: "",
    nextDateStatus: "",
  });

useEffect(() => {
   fetch(`${process.env.NEXT_PUBLIC_FETCH_API_TWO}`)
    .then(res => res.json())
    .then(data => {
      setAllCaseData(data);
      setLoading(false);
    });
}, []);

  const handleSearchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });    
  };

const parseCaseNumber = (caseNumber) => {
  const match = caseNumber.match(/(\d+)\((\d+)\)(\d+)/);

  if (!match) return { num: 0, month: 0, year: 0 };

  return {
    num: Number(match[1]),
    month: Number(match[2]),
    year: Number(match[3]),
  };
};


const filteredData = allCaseData.filter((item) => {
  console.log(item.policeStation);
  if (item.caseType !== "GR") return false;
  if (item.policeStation !== "tongi_east") return false;
  if(!item.caseYear){
    item.caseYear=""
  }
  return (
    item.caseNumber.toLowerCase().includes(search.caseNumber.toLowerCase()) &&
    item.caseYear.includes(search.caseYear.toLowerCase()) &&
    item.filingDate.includes(search.filingDate) &&
    item.plaintiff.toLowerCase().includes(search.plaintiff.toLowerCase()) &&
    item.defendant.toLowerCase().includes(search.defendant.toLowerCase()) &&
    item.article.toLowerCase().includes(search.article.toLowerCase()) &&
    item.nextDateStatus.some(date => date.includes(search.nextDateStatus))
  );
}).sort((a, b) => {
    const A = parseCaseNumber(a.caseNumber);
    const B = parseCaseNumber(b.caseNumber);

    // 👉 আগে year দিয়ে sort
    if (A.year !== B.year) return A.year - B.year;

    // 👉 তারপর month
    if (A.month !== B.month) return A.month - B.month;

    // 👉 শেষে number
    return A.num - B.num;
});

const handleDownload = async (caseItem) => {
  const response = await fetch(caseItem.image);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "case-image.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

const gazipurData = [
  {
    name: "গাজীপুর সদর",
    base: "gazipur_sadar",
  },
  {
    name: "বাসন",
    base: "bason",
  },
  {
    name: "টঙ্গি পূর্ব",
    base: "tongi_east",
  },
  {
    name: "টঙ্গি পশ্চিম",
    base: "tongi_west",
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

  return (
    <div className="py-2 sm:p-2">
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="table table-zebra table-sm">
          
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase">
            <tr>
              <th>No.</th>
              <th>
                <span>মামল নং</span>
                <select name="caseYear" className="" onChange={handleSearchChange}>
                  <option value="">Select</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                </select>
              </th>
              <th>ফাইলিং তারিখ</th>
              <th>বাদী</th>
              <th>আসামী</th>
              <th>ধারা</th>
              <th>তারিখ / মামলা অবস্থা</th>
              {/* <th>মামলা অবস্থা</th> */}
              {/* <th>আদালত নং</th> */}
              <th>মন্তব্য</th>
              <th className="flex justify-end">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="">
              <td></td>
              <td className="font-semibold">
                <input
                  type="search"
                  name="caseNumber"
                  onChange={handleSearchChange}
                  placeholder="মামল নম্বর খুঁজুন"
                  className="input input-sm input-bordered rounded-lg"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="filingDate"
                  onChange={handleSearchChange}
                  placeholder="তারিখ খুঁজুন"
                  className="w-29 input input-sm input-bordered rounded-lg"
                />
              </td>
              <td className="whitespace-normal">
                <input
                  type="search"
                  name="plaintiff"
                  onChange={handleSearchChange}
                  placeholder="বাদী খুঁজুন"
                  className="input input-sm input-bordered w-full rounded-lg"
                />              
              </td>
              <td className="max-w-xs whitespace-normal">
                <input
                  type="search"
                  name="defendant"
                  onChange={handleSearchChange}
                  placeholder="আসামী খুঁজুন"
                  className="input input-sm input-bordered w-full rounded-lg"
                />
              </td>
              <td className="text-red-600 font-medium">  
                <input
                  type="search"
                  name="article"
                  onChange={handleSearchChange}
                  placeholder="ধারা খুঁজুন"
                  className="input input-sm input-bordered w-full rounded-lg"
                />              
              </td>
              <td>
                <input
                  type="date"
                  name="nextDateStatus"
                  onChange={handleSearchChange}
                  placeholder="তারিখ খুঁজুন" 
                  className="input input-sm input-bordered rounded-lg"
                />
              </td>
              <td></td>
              {/* <td></td> */}
              {/* 🔥 Action Buttons */}
              <td className="flex gap-2 justify-end">
              </td>
            </tr>


            {loading
            ? Array.from({ length: 16 }).map((_, i) => <SkeletonRow key={i} />)
            :filteredData.length === 0 ? 
              <tr>
                <td colSpan="10" className="text-center py-6 text-red-500 font-semibold">
                  কোনো তথ্য জমা যায়নি (Item not found)
                </td>
              </tr>
            :filteredData.map((caseItem, index) => (
            caseItem.caseType === "GR" && (
              <tr key={caseItem._id} className="">
                <th className="bg-gray-200">{index + 1}</th>
                <td className="">
                  <div>
                    {gazipurData.find(v => v.base === caseItem.policeStation)?.name || caseItem.policeStation}
                  </div>
                  <div>
                    <span>{caseItem.caseType}</span>{" "}
                    <span>
                      {Number(caseItem.caseNumber).toLocaleString('bn-BD')}
                      ({Number(caseItem.caseMonth).toLocaleString('bn-BD')})
                      {Number(caseItem.caseYear.slice(2)).toLocaleString('bn-BD')}
                    </span>
                  </div>
                </td>
                <td>{caseItem.filingDate?new Date(caseItem.filingDate).toLocaleDateString("bn-bd"):""}</td>
                <td className="">
                  {caseItem.plaintiff}
                </td>
                <td className="">
                  {caseItem.defendant}
                </td>
                <td className="">
                  {caseItem.article}
                </td>
                <td className="flex items-center gap-2">
                  <div>
                  {caseItem.nextDateStatus.map((date, idx) => (
                    <div key={idx}>{date?new Date(date).toLocaleDateString("bn-bd"):""}</div>
                  ))}
                  </div>
                  <div>{caseItem.caseStatus}</div>
                </td>
                {/* <td>{caseItem.caseStatus}</td> */}
                {/* <td>{caseItem.courtNo}</td> */}
                <td>{caseItem.note}</td>
                {/* 🔥 Action Buttons */}
                <td className="flex gap-2 flex-col items-center justify-end">
                  <div className="flex gap-2">
                    <Link href={`/gazipurgr/${caseItem._id}`} className="btn btn-xs btn-info text-white w-28">
                      বিস্তারিত দেখুন
                    </Link>

                  </div>

                  <div>
                    {caseItem.image ? (
                      <button onClick={() => handleDownload(caseItem)} className="btn btn-xs btn-success text-white w-28">
                        Download Image
                      </button>
                    ) : null}
                  </div>

                </td>
              </tr>
            )))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GazipurGR;