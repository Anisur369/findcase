"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CaseForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    caseNumber: "",
    caseYear: "",
    caseType: "CR",
    trSession: "",
    filingDate: "",
    uploadDate: new Date().toISOString().split("T")[0],
    plaintiff: "",
    defendant: "",
    article: "",
    nextDateStatus: [{nextDate:"",nextStatus:""}],
    policeStation: "",
    note: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "nextDateStatus") {
      setFormData({ ...formData, nextDateStatus: [value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handlenextDateStatusChange = (index, field, value) => {
  const updatedDates = [...formData.nextDateStatus];

  updatedDates[index] = {
    ...updatedDates[index],
    [field]: value
  };

  setFormData({
    ...formData,
    nextDateStatus: updatedDates
  });
};

const addnextDateStatus = () => {
  setFormData({
    ...formData,
    nextDateStatus: [
      ...formData.nextDateStatus,
      {
        nextDate: "",
        nextStatus: ""
      }
    ]
  });
};

const removenextDateStatus = (index) => {
  const updatedDates = formData.nextDateStatus.filter(
    (_, i) => i !== index
  );

  setFormData({
    ...formData,
    nextDateStatus: updatedDates
  });
};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=b54f153db22576d333c445065d59f4f2`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();
    setFormData({ ...formData, image: data.data.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "caseNumber",
      "caseYear",
      "plaintiff",
      "defendant",
      "policeStation",
      "caseType"
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "সবগুলো প্রয়োজনীয় ফিল্ড পূরণ করুন ❗",
          confirmButtonColor: "#3085d6",
        });
        return;
      }
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_FETCH_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "মামলা সফলভাবে জমা হয়েছে!",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "ডাটা পাঠাতে সমস্যা হয়েছে ❗",
      });
    }
    router.push("/gazipurcr")
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="font-bold text-center">
          <div className="text-2xl flex items-center justify-center gap-2">
            <span>📁</span>
            <span>CR Case Entry Form</span>
          </div>
          <span>Date: {new Date().toLocaleDateString("bn-bd")}</span>
        </h2>

        <div className="flex items-center gap-4">
          <div>
            <label className="label font-medium">মামলা নম্বর * </label>
            <input type="text" name="caseNumber" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="label font-medium none opacity-0">.</label>
            <span style={{fontSize:26+"px"}}>/</span>
          </div>
          <div>
            <label className="label font-medium">সাল * </label>
            <select name="caseYear" className="select select-bordered" onChange={handleChange}>
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
          </div>
          <div>
            <label className="label font-medium">টি.আর/দায়রা</label>
            <input type="text" name="trSession" className="input input-bordered w-full" onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* <div>
            <label className="label font-medium">মামলার ধরণ</label>
            <input type="text" name="caseType" className="input input-bordered" onChange={handleChange} />
          </div> */}
          {/* <div>
            <label className="label font-medium">মামলার ধরণ *</label>
            <select name="caseType" className="select select-bordered" onChange={handleChange}>
              <option value="CR">CR</option>
            </select>
          </div> */}
          <div>
            <label className="label font-medium">থানা *</label>
            <select name="policeStation" className="select select-bordered" onChange={handleChange}>
              <option value="">Select</option>
              <option value="gazipur_sadar">গাজীপুর সদর</option>
              <option value="bason">বাসন</option>
              <option value="tongi_east">টঙ্গি পূর্ব</option>
              <option value="tongi_west">টঙ্গি পশ্চিম</option>
              <option value="konabari">কোনবাড়ি</option>
              <option value="kashempur">কাশেমপুর</option>
              <option value="pubail">পূবাইল</option>
              <option value="gacha">গাছা</option>
              <option value="joydebpur">জয়দেবপুর</option>
              <option value="sreepur">শ্রীপুর</option>
              <option value="kapashia">কাপাসিয়া</option>
              <option value="kaliakair">কালিয়াকৈর</option>
              <option value="kaliganj">কালীগঞ্জ</option>
            </select>
          </div>
          <div>
            <label className="label font-medium">ফাইলিং তারিখ</label>
            <input type="date" dateFormat="dd/MM/yyyy" name="filingDate" className="input input-bordered w-full" onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="label font-medium">বাদী পক্ষ*</label>
          <textarea name="plaintiff" className="textarea textarea-bordered w-full" rows={3} onChange={handleChange} />
        </div>

        <div>
          <label className="label font-medium">আসামী পক্ষ *</label>
          <textarea name="defendant" className="textarea textarea-bordered w-full" rows={3} onChange={handleChange} />
        </div>

        <div>
          <label className="label font-medium">ধারা</label>
          <textarea type="text" name="article" className="input input-bordered w-full" onChange={handleChange} />
        </div>



<div>
<label className="label font-medium">
পরবর্তী তারিখ ও অবস্থা
</label>

{formData.nextDateStatus.map((item, index) => (
<div key={index} className="space-y-2 flex gap-4 py-3 rounded-xl">

<div className="flex gap-2">
<input
type="date"
value={item.nextDate}
onChange={(e)=>
handlenextDateStatusChange(
index,
"nextDate",
e.target.value
)
}
className="input input-bordered w-full"
/>

{formData.nextDateStatus.length > 1 && (
<button
type="button"
onClick={()=>removenextDateStatus(index)}
className="btn btn-error btn-sm"
>
✕
</button>
)}

</div>

<input
type="text"
placeholder="মামলার অবস্থা"
value={item.nextStatus}
onChange={(e)=>
handlenextDateStatusChange(
index,
"nextStatus",
e.target.value
)
}
className="input input-bordered w-full"
/>

</div>
))}

<button
type="button"
onClick={addnextDateStatus}
className="btn btn-outline btn-sm mt-2"
>
+ Add Date
</button>

</div>







        <div>
          <label className="label font-medium">মন্তব্য</label>
          <textarea name="note" className="textarea textarea-bordered w-full" rows={2} onChange={handleChange} />
        </div>

        <div>
          <label className="label font-medium">ছবি আপলোড</label>
          <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleImageUpload} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer">
          🚀 Submit Case
        </button>
      </form>
    </div>
  );
}
