"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CasePrintPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [data]);


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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="overflow-auto max-h-[93vh] rounded-xl border border-gray-200">
        <table className="table table-zebra table-sm">
          
          <thead className="sticky top-0 z-30 bg-gray-100 text-gray-800 text-sm uppercase">
            <tr>
              <th className="px-1 w-5">No.</th>
              <th className="px-0 w-16">
                <span>মামল নং</span>
              </th>
              <th className="w-26 px-1.5">ফাইলিং তারিখ</th>
              <th className="w-50 xl:w-80">বাদী</th>
              <th className="w-50 xl:w-80">আসামী</th>
              <th className="w-32 xl:w-40">ধারা</th>
              <th className="w-50">তারিখ / মামলা অবস্থা</th>
              <th className="text-center w-50 block sm:w-full">মন্তব্য</th>
            </tr>

          </thead>

          <tbody className="text-sm">

              <tr>
                <th className="px-2 text-center bg-gray-400">{1}</th>
                <td className="px-1">
                  <div>
                    {gazipurData.find(v => v.base === data.policeStation)?.name || data.policeStation}
                  </div>
                  <div>
                    <span>{data.caseType}</span>{" "}
                    <span>
                      {Number(data.caseNumber).toLocaleString('bn-BD')}/
                      {Number(data.caseYear.slice(2)).toLocaleString('bn-BD')}
                    </span>
                  </div>
                  <div>{data.trSession}</div>
                </td>
                <td>{data.filingDate?new Date(data.filingDate).toLocaleDateString("bn-bd"):""}</td>
                <td className="whitespace-pre-line">
                  {data.plaintiff}
                </td>
                <td className="whitespace-pre-line">
                  {data.defendant}
                </td>
                <td className="whitespace-pre-line">
                  {data.article}
                </td>                
                <td>
                {data.nextDateStatus?.map((item, idx)=>(
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
                <td className="text-center">{data.note}</td>
              </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}