"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ ADD THIS
import Swal from "sweetalert2";
import CaseDetailsSkeleton from "@/components/skeletons/CaseDetailsSkeleton";

export default function CaseDetailsCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const params = useParams(); // ✅ এখান থেকে params নাও
  const id = params?.id;
  const router=useRouter(); // ✅ router add
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null); // better null

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/${id}`)
      .then(res => res.json())
      .then(singleData => {
      setData(singleData);
      setFormData({
        ...singleData,
        nextDateStatus:
            singleData.nextDateStatus || []
      });
      setLoading(false);
      });
  }, [id]); // ✅ dependency add

  const handlePrint = () => {
    window.print();
  };


  

  const handleDeleteCase = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "আপনি কি মামলা মুছেটি ফেলাতে চাচ্ছেন!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No",
  });

  // যদি user Yes দেয়
  if (result.isConfirmed) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "মামলাটি সফলভাবে মুছে ফেলা হয়েছে.",
      });
      // router.push("/allcase");
      router.back(-1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete case.",
      });
    }
  }
};



  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // if(name === "nextDateStatus") {
    //   const updatedDates = formData.nextDateStatus ? [...formData.nextDateStatus] : [];
    //   updatedDates.push(value);
    //   setFormData(prev => ({
    //     ...prev,
    //     nextDateStatus: updatedDates
    //   }));
    // } else {
    //   setFormData(prev => ({
    //     ...prev,
    //     [name]: value
    //   }));
    // }
  };

const handleDateChange = (index, field, value) => {
  const updatedDates = [...(formData.nextDateStatus || [])];

  updatedDates[index] = {
    ...updatedDates[index],
    [field]: value
  };

  setFormData(prev => ({
    ...prev,
    nextDateStatus: updatedDates
  }));
};

const handleAddDate = () => {
  setFormData(prev => ({
    ...prev,
    nextDateStatus: [
      ...(prev.nextDateStatus || []),
      {
        nextDate: "",
        nextStatus: ""
      }
    ]
  }));
};

const handleDeleteDate = (index) => {
  const updatedDates = formData.nextDateStatus.filter(
    (_, i) => i !== index
  );

  setFormData(prev => ({
    ...prev,
    nextDateStatus: updatedDates
  }));
};


  const handleUpdate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}/${id}`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const updated = await res.json();
    setData(updated);
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Case updated successfully.",
      confirmButtonColor: "#3085d6",
    });
  };
  if (loading) return <CaseDetailsSkeleton />;
  console.log(data);
  if (!data) return <div className="w-full m-auto text-center items-center">আপনার কোন Case নেই</div>; // ✅ loading handle
  if (data.message=='All case not found') return <div className="w-full m-auto text-center items-center">আপনার কোন Case নেই</div>; // ✅ loading handle

const policeStationMap = {
  gazipur_sadar: "গাজীপুর সদর",
  bason: "বাসন",
  tongi_east: "টঙ্গি পূর্ব",
  tongi_west: "টঙ্গি পশ্চিম",
  konabari: "কোনাবাড়ি",
  kashempur: "কাশেমপুর",
  pubail: "পূবাইল",
  gacha: "গাছা",
  joydebpur: "জয়দেবপুর",
  sreepur: "শ্রীপুর",
  kapashia: "কাপাসিয়া",
  kaliakair: "কালিয়াকৈর",
  kaliganj: "কালীগঞ্জ",
};

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => router.back()} className="text-white mb-4 inline-block border border-blue-200 px-3 py-1 rounded-lg bg-green-600 hover:bg-blue-200 transition text-center items-center cursor-pointer">
        &larr; Back to page
      </button>
      <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">মামলার সম্পর্কে বিস্তারিত তথ্য</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm border border-blue-600">
            কেস ধরন: {
              data.caseType || "No Status"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>মামলা নম্বর:</strong>{" "}
            {isEditing ? (
              <input
                name="caseNumber"
                value={formData.caseNumber || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              `${data.caseNumber}/${data.caseYear.slice(2)}`
            )}
          </p>
          <p>
            <strong>কত সালের মামলা</strong>{" "}
{
  isEditing ? (
    <select
      name="caseYear"
      value={formData.caseYear || ""}
      className="select select-bordered"
      onChange={handleChange}
    >
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
      <option value="2033">2033</option>
      <option value="2034">2034</option>
      <option value="2035">2035</option>
      <option value="2036">2036</option>
      <option value="2037">2037</option>
      <option value="2038">2038</option>
      <option value="2039">2039</option>
      <option value="2040">2040</option>
    </select>
  ) : (
    <span>
      {data.caseYear}
    </span>
  )
}
          </p>
          <p>
            <strong>বদলী কোট:</strong>{" "}
            {isEditing ? (
                <input
                  name="trSession"
                  value={formData.trSession || ""}
                  className="select select-bordered"
                  onChange={handleChange}
                />                
            ) : (
              data.trSession || "N/A"
            )}
          </p>
          <p>
            <strong>ফাইলিং তারিখ:</strong>{" "}
            {isEditing ? (
              <input
                name="filingDate"
                type="date"
                value={formData.filingDate || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              data.filingDate
            )}
          </p>
          {/* <p>
            <strong>আপলোড তারিখ:</strong>{" "}
            {isEditing ? (
              <input
                name="uploadDate"
                value={formData.uploadDate || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              data.uploadDate
            )}
          </p> */}
          {/* <p>
            <strong>কোর্ট নং:</strong>{" "}
            {isEditing ? (
              <input
                name="courtNo"
                value={formData.courtNo || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              data.courtNo
            )}
          </p> */}
          <p>
            <strong>থানা:</strong>{" "}
            {
              isEditing ? (
                <select
                  name="policeStation"
                  value={formData.policeStation || ""}
                  className="select select-bordered"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="gazipur_sadar">গাজীপুর সদর</option>
                  <option value="bason">বাসন</option>
                  <option value="tongi_east">টঙ্গি পূর্ব</option>
                  <option value="tongi_west">টঙ্গি পশ্চিম</option>
                  <option value="kona_bari">কোনাবাড়ি</option>
                  <option value="kashempur">কাশেমপুর</option>
                  <option value="pubail">পূবাইল</option>
                  <option value="gacha">গাছা</option>
                  <option value="joydebpur">জয়দেবপুর</option>
                  <option value="sreepur">শ্রীপুর</option>
                  <option value="kapashia">কাপাসিয়া</option>
                  <option value="kaliakair">কালিয়াকৈর</option>
                  <option value="kaliganj">কালীগঞ্জ</option>
                </select>
              ) : (
                <span>
                  {policeStationMap[data.policeStation] || data.policeStation}
                </span>
              )
            }
          </p>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <p>
            <strong>বাদী:</strong>{" "}
            {isEditing ? (
              <textarea
                name="plaintiff"
                value={formData.plaintiff || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              data.plaintiff
            )}
          </p>
          <p>
            <strong>বিবাদী:</strong>{" "}
            {isEditing ? (
              <textarea
                name="defendant"
                value={formData.defendant || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              data.defendant
            )}
          </p>
          <p>
            <strong>ধারা:</strong>{" "}
            {isEditing ? (
              <textarea
                name="article"
                value={formData.article || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              data.article
            )}
          </p>

 






<p>
<strong>পরবর্তী তারিখ ও স্ট্যাটাস:</strong>

{isEditing ? (
<div className="space-y-4 mt-2">

{formData.nextDateStatus?.map((item,index)=>(
<div
key={index}
className="border dark:bg-base-200 text-base-content rounded p-3 space-y-2"
>

<input
type="date"
value={item.nextDate || ""}
onChange={(e)=>
handleDateChange(
index,
"nextDate",
e.target.value
)
}
className="border px-2 py-1 rounded w-full"
/>

<textarea
placeholder="Status"
value={item.nextStatus || ""}
onChange={(e)=>
handleDateChange(
index,
"nextStatus",
e.target.value
)
}
className="border px-2 py-1 rounded w-full"
/>

<button
onClick={()=>handleDeleteDate(index)}
className="px-3 py-1 bg-red-500 text-white rounded"
>
Delete
</button>

</div>
))}

<button
onClick={handleAddDate}
className="px-4 py-2 bg-blue-600 text-white rounded"
>
+ নতুন তারিখ যোগ করুন
</button>

</div>
) : (

<div className="space-y-3 mt-2">
{data.nextDateStatus?.map((item,index)=>(
<div
key={index}
className="
rounded-xl
p-4
bg-base-100
dark:bg-neutral
border border-primary/20
shadow-md
"
>
<p>
<strong>তারিখ:</strong> {item.nextDate}
</p>

<p>
<strong>স্ট্যাটাস:</strong>{" "}
{item.nextStatus || "N/A"}
</p>
</div>
))}
</div>

)}

</p>










          
          <p>
            <strong>মন্তব্য:</strong>{""}
            {isEditing ? (
              <textarea
                name="note"
                value={formData.note || ""}
                onChange={handleChange}
                className="border w-full px-2 py-1 rounded"
              />
            ) : (
              data.note
            )}
          </p>
        </div>

        <div className="flex gap-3 mt-6 print:hidden">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-red-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer hover:bg-red-700"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-red-700"
              >
                Edit
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-red-700"
              >
                Print
              </button>
              <button onClick={handleDeleteCase} className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700">
                Delete
              </button>
            </>
          )}
        </div>


      </div>
    </div>
  );
}