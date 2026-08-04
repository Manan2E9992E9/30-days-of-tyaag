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

  function exportCSV() {
    const headers = [
      "Day",
      "Name",
      "Phone",
      "Kshetra",
      "Submitted"
    ];

    const rows = submissions.map((row) => [
      row.day,
      row.full_name,
      row.phone,
      row.kshetra,
      new Date(row.created_at).toLocaleString()
    ]);

    const csv = [
      headers,
      ...rows
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tyaag-submissions.csv";
    a.click();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8ed] flex items-center justify-center">
        <p className="text-xl text-[#8b4513]">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] p-6 md:p-10">

      <div className="flex items-center gap-5 mb-10">

        <img
          src="/logo.png"
          alt="Tyaag Logo"
          className="w-20 h-20 object-contain"
        />

        <div>
          <h1 className="text-4xl font-bold text-[#8b4513]">
            Admin Dashboard
          </h1>

          <button
            onClick={exportCSV}
            className="bg-[#8b4513] text-white px-5 py-3 rounded-xl mt-4"
          >
            Export CSV
          </button>

          <p className="text-gray-500 mt-2">
            Manage Tyaag submissions
          </p>
        </div>

      </div>


      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

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

            {submissions.map((row)=>(
              <tr key={row.id} className="border-b">

                <td className="p-4">
                  {row.day}
                </td>

                <td className="p-4">
                  {row.full_name}
                </td>

                <td className="p-4">
                  {row.phone}
                </td>

                <td className="p-4">
                  {row.kshetra}
                </td>

                <td className="p-4">
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