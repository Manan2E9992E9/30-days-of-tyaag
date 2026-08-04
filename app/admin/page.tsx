"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setSubmissions(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      router.push("/admin/login");
      return;
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8ed] flex items-center justify-center">
        <p className="text-xl text-[#8b4513] font-semibold">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] p-6 md:p-10">

      {/* Header */}
      <div className="flex items-center gap-5 mb-10">

        <img
          src="logo.png"
          alt="Tyaag Logo"
          className="w-20 h-20 object-contain"
        />

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#8b4513]">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Tyaag submissions
          </p>
        </div>

      </div>


      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">

        <table className="w-full">

          <thead className="bg-[#8b4513] text-white">

            <tr>
              <th className="p-4 text-left">Day</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Kshetra</th>
              <th className="p-4 text-left">Submitted</th>
            </tr>

          </thead>


          <tbody>

            {submissions.map((row) => (

              <tr
                key={row.id}
                className="border-b hover:bg-[#fff7ed] transition"
              >

                <td className="p-4">
                  {row.day}
                </td>

                <td className="p-4 font-medium">
                  {row.full_name}
                </td>

                <td className="p-4">
                  {row.phone}
                </td>

                <td className="p-4">
                  {row.kshetra}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(row.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}