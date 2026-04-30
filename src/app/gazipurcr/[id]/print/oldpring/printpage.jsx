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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="print-container p-6 text-sm">
      
      <h1 className="text-xl font-bold text-center mb-4">
        মামলার বিস্তারিত তথ্য
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <p><strong>মামলা নম্বর:</strong> {data.caseNumber}/{data.caseYear?.slice(2)}</p>
        <p><strong>সাল:</strong> {data.caseYear}</p>
        <p><strong>থানা:</strong> {data.policeStation}</p>
        <p><strong>ফাইলিং তারিখ:</strong> {data.filingDate}</p>
        <p><strong>কোর্ট:</strong> {data.trSession || "N/A"}</p>
      </div>

      <div className="mt-4">
        <p><strong>বাদী:</strong> {data.plaintiff}</p>
        <p><strong>বিবাদী:</strong> {data.defendant}</p>
        <p><strong>ধারা:</strong> {data.article}</p>
      </div>

      <div className="mt-4">
        <strong>পরবর্তী তারিখ ও স্ট্যাটাস:</strong>

        <table className="w-full border mt-2">
          <thead>
            <tr className="border">
              <th className="border p-2">তারিখ</th>
              <th className="border p-2">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {data.nextDateStatus?.map((item, i) => (
              <tr key={i}>
                <td className="border p-2">{item.nextDate}</td>
                <td className="border p-2">{item.nextStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p><strong>মন্তব্য:</strong> {data.note}</p>
      </div>

    </div>
  );
}