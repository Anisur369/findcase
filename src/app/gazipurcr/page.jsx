"use client";
import SkeletonRow from "@/components/skeletons/SkeletonRowSection";
import Link from "next/link";
import { useState, useEffect } from "react";

const GazipurCR = () => {
  const [loading, setLoading] = useState(true);
  const [allCaseData, setAllCaseData] = useState([]);
  const [search, setSearch] = useState({
    caseNumber:"",
    caseYear:"",
    filingDate:"",
    plaintiff:"",
    defendant:"",
    article:"",
    nextDate:"",
    nextStatus:""
  });

useEffect(() => {
   fetch(`${process.env.NEXT_PUBLIC_FETCH_API}`)
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

const filteredData = allCaseData.filter((item) => {
 if(item.caseType !== "CR") return false;

 return (
   item.caseNumber.toLowerCase().includes(search.caseNumber.toLowerCase()) &&
   item.caseYear.includes(search.caseYear) &&
   item.filingDate.includes(search.filingDate) &&
   item.plaintiff.toLowerCase().includes(search.plaintiff.toLowerCase()) &&
   item.defendant.toLowerCase().includes(search.defendant.toLowerCase()) &&
   item.article.toLowerCase().includes(search.article.toLowerCase()) &&

   item.nextDateStatus?.some(
     row =>
      row.nextDate?.includes(search.nextDate) &&
      row.nextStatus?.toLowerCase()
        .includes(search.nextStatus.toLowerCase())
   )
 );
}).sort((a,b)=>{
 if(a.caseYear !== b.caseYear){
   return a.caseYear - b.caseYear
 }

 return a.caseNumber - b.caseNumber
})

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
    <div className="">
      <div className="overflow-auto max-h-[80vh] rounded-xl shadow-lg border border-gray-200">
        <table className="table table-zebra table-sm">
          
          <thead className="sticky top-0 z-30 bg-gray-100 text-gray-800 text-sm uppercase">
            <tr>
              <th className="px-1 w-5">No.</th>
              <th className="px-0 w-26">
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
              <th className="w-26 px-1.5">ফাইলিং তারিখ</th>
              <th className="w-50 xl:w-80">বাদী</th>
              <th className="w-50 xl:w-80">আসামী</th>
              <th className="w-32 xl:w-40">ধারা</th>
              <th className="w-50">তারিখ / মামলা অবস্থা</th>
              {/* <th>মামলা অবস্থা</th> */}
              {/* <th>আদালত নং</th> */}
              <th className="text-center w-50 block sm:w-full">মন্তব্য</th>
              <th className="w-34 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="sticky top-[37px] bg-gray-400 z-20 shadow-sm">
              <td className="bg-gray-400"></td>
              <td className="font-semibold px-0.5 md:px-1">
                <input
                  type="search"
                  name="caseNumber"
                  onChange={handleSearchChange}
                  placeholder="মামল নম্বর খুঁজুন"
                  className="input input-sm w-full px-1 input-bordered rounded-lg"
                />
              </td>
              <td className="px-0.5 md:px-1 w-26">
                <input
                  type="date"
                  name="filingDate"
                  onChange={handleSearchChange}
                  placeholder="তারিখ খুঁজুন"
                  className="w-full px-0 input input-sm input-bordered rounded-lg"
                />
              </td>
              <td className="px-0.5 md:px-1">
                <input
                  type="search"
                  name="plaintiff"
                  onChange={handleSearchChange}
                  placeholder="বাদী খুঁজুন"
                  className="input input-sm px-2 input-bordered w-40 sm:w-full rounded-lg"
                />              
              </td>
              <td className="px-0.5 md:px-1">
                <input
                  type="search"
                  name="defendant"
                  onChange={handleSearchChange}
                  placeholder="আসামী খুঁজুন"
                  className="input input-sm px-2 input-bordered w-40 sm:w-full rounded-lg"
                />
              </td>
              <td className="font-medium px-0.5 md:px-1">  
                <input
                  type="search"
                  name="article"
                  onChange={handleSearchChange}
                  placeholder="ধারা খুঁজুন"
                  className="input input-sm input-bordered w-26 sm:w-full rounded-lg"
                />              
              </td>



<td className="space-y-2 flex flex-row px-0.5 md:px-1">
<input
type="date"
name="nextDate"
onChange={handleSearchChange}
className="input input-sm input-bordered rounded-lg w-45 sm:w-full"
/>

{/* <input
type="search"
name="nextStatus"
placeholder="অবস্থা"
onChange={handleSearchChange}
className="input input-sm input-bordered rounded-lg"
/> */}
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
            caseItem.caseType === "CR" && (
              <tr key={caseItem._id} className="">
                <th className="px-2 text-center bg-gray-400">{index + 1}</th>
                <td className="">
                  <div>
                    {gazipurData.find(v => v.base === caseItem.policeStation)?.name || caseItem.policeStation}
                  </div>
                  <div>
                    <span>{caseItem.caseType}</span>{" "}
                    <span>
                      {Number(caseItem.caseNumber).toLocaleString('bn-BD')}/
                      {Number(caseItem.caseYear.slice(2)).toLocaleString('bn-BD')}
                    </span>
                  </div>
                  <div>{caseItem.trSession}</div>
                </td>
                <td>{caseItem.filingDate?new Date(caseItem.filingDate).toLocaleDateString("bn-bd"):""}</td>
                <td className="whitespace-pre-line">
                  {caseItem.plaintiff}
                </td>
                <td className="whitespace-pre-line">
                  {caseItem.defendant}
                </td>
                <td className="whitespace-pre-line">
                  {caseItem.article}
                </td>


                
<td>
{caseItem.nextDateStatus?.map((item, idx)=>(
  <div
    key={idx}
    className="flex flex-row gap-2"
  >
    <div>
      {item.nextDate
       ? new Date(item.nextDate).toLocaleDateString("bn-bd")
       : ""}
    </div>

    <div className="font-medium text-blue-600">
      {item.nextStatus}
    </div>
  </div>
))}
</td>




                <td className="text-center">{caseItem.note}</td>
                {/* 🔥 Action Buttons */}
                <td className="flex gap-2 flex-col items-center justify-end border-0">
                  <div className="flex gap-2">
                    <Link href={`/gazipurcr/${caseItem._id}`} className="btn btn-xs btn-info text-white w-28">
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

export default GazipurCR;