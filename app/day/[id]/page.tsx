"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { tyaags } from "../../../data/tyaags";
import { supabase } from "../../../lib/supabase";

export default function DayPage() {

  const params = useParams();
  const dayId = Number(params.id);

  const tyaag = tyaags[dayId - 1];

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kshetra, setKshetra] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const startDate = new Date(2026, 7, 1); // 1 August 2026
const today = new Date();

startDate.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

const daysPassed = Math.floor(
  (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
);

const currentDay = Math.max(1, Math.min(daysPassed + 1, 31));

const isUnlocked = dayId <= currentDay;

const challengeDate = new Date(startDate);
challengeDate.setDate(startDate.getDate() + (dayId - 1));

const formattedDate = challengeDate.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});


  if (!tyaag) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Tyaag not found
      </main>
    );
  }
  if (!isUnlocked) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">🔒 Challenge Locked</h1>

        <p>This challenge unlocks on {formattedDate}.</p>

        <Link
          href="/"
          className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-xl"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}


  async function submitTyaag(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    const { error } = await supabase
      .from("submissions")
      .insert([
        {
          day: tyaag.id,
          full_name: name,
          phone: phone,
          kshetra: kshetra
        }
      ]);


    setLoading(false);


    if (error) {
      setMessage("❌ Submission failed. Please try again.");
      return;
    }


    setMessage("✅ Your Tyaag has been completed successfully 🙏");

    setName("");
    setPhone("");
    setKshetra("");

  }



  return (

    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">


      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500"
      >
        <ArrowLeft size={20}/>
        Back Home
      </Link>
      


      <div className="max-w-3xl mx-auto mt-10">

        <div className="
          bg-white
          rounded-[2rem]
          shadow-xl
          border
          border-orange-100
          p-10
          text-center
        ">


          <div className="flex justify-center">

            <div className="bg-orange-100 p-4 rounded-2xl">

              <Sparkles
                className="text-orange-600"
                size={35}
              />

            </div>

          </div>



          <p className="mt-8 text-orange-600 font-bold uppercase tracking-widest">
            Day {tyaag.id}
          </p>



          <h1 className="text-5xl font-black mt-4">
            {tyaag.title}
          </h1>



          <p className="mt-4 text-gray-500">
            {formattedDate}
          </p>



          <button
            onClick={() => {
  if (isUnlocked) {
    setShowForm(true);
  }
}}
disabled={!isUnlocked}
className={`
  mt-10
  w-full
  py-4
  rounded-2xl
  font-bold
  text-lg
  ${
    isUnlocked
      ? "bg-orange-600 text-white"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }
`}
          >

            <span className="flex justify-center gap-2 items-center">

              <CheckCircle size={24}/>

              Complete Today's Tyaag

            </span>

          </button>


        </div>

      </div>




      {showForm && (

        <div className="
          fixed inset-0
          bg-black/40
          flex items-center justify-center
          px-5
        ">


          <form
            onSubmit={submitTyaag}
            className="
              bg-white
              rounded-3xl
              p-8
              w-full
              max-w-md
            "
          >


            <h2 className="text-2xl font-bold mb-6 text-center">
              Complete Tyaag
            </h2>



            <input
              required
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />



            <input
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />



            <input
              required
              placeholder="Kshetra"
              value={kshetra}
              onChange={(e)=>setKshetra(e.target.value)}
              className="w-full border p-3 rounded-xl mb-6"
            />



            <button
              disabled={loading}
              className="
                w-full
                bg-orange-600
                text-white
                py-3
                rounded-xl
                font-bold
              "
            >

              {loading ? "Submitting..." : "Submit"}

            </button>



           {message && (

              <p className="mt-4 text-center font-semibold">
                {message}
              </p>
            )}
          </form>
        </div>
      )}
    </main>
  );
}