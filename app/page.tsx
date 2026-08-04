import Link from "next/link";
import { Lock, Flame, CheckCircle, Sparkles } from "lucide-react";
import { tyaags } from "../data/tyaags";

export default function Home() {
  const today = new Date().getDate();
  const currentDay = Math.min(today, 31);

  const progress = Math.round((currentDay / 31) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-white to-[#fef3c7] text-gray-900">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tyaag Logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="font-bold text-xl text-orange-700">
              त्याग की छतरी
            </h1>
            <p className="text-xs text-gray-500">
              31 Days • 31 Tyaag
            </p>
          </div>
        </div>
     </nav>
      {/* HERO */}
      <section className="px-6 pt-10 pb-16 text-center">

        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-xl p-5 rounded-full shadow-xl animate-pulse">
            <img
              src="/logo.png"
              alt="Tyaag"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-orange-600">
          त्याग की छतरी
        </h1>
        <p className="mt-5 text-xl md:text-2xl font-semibold text-gray-800">
          Small sacrifices. Bigger growth.
        </p>
        <p className="mt-4 max-w-xl mx-auto text-gray-600 text-lg leading-relaxed">
          हर दिन एक छोटा त्याग,
          <br />
          हर दिन आत्मविकास की ओर एक कदम।
        </p>
      </section>
      {/* PROGRESS CARD */}
      <section className="max-w-xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100 p-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Current Progress
              </p>
              <h2 className="text-3xl font-bold mt-1">
                Day {currentDay} / 31
              </h2>
            </div>
            <div className="bg-orange-100 p-4 rounded-2xl">
              <Flame className="text-orange-600" size={32}/>
            </div>
          </div>
          <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-700"
              style={{
                width:`${progress}%`
              }}
            />
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {progress}% completed
          </p>
        </div>
      </section>
      {/* TODAY CARD */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="relative overflow-hidden bg-white rounded-[2rem] shadow-2xl border border-orange-100 p-10 text-center">
          <Sparkles
            className="absolute top-6 right-6 text-yellow-400"
            size={30}
          />
          <p className="uppercase tracking-[0.3em] text-orange-500 font-bold text-sm">
            Today's Tyaag
          </p>
          <h2 className="mt-5 text-4xl font-black">
            {tyaags[currentDay-1]?.title}
          </h2>


          <p className="mt-3 text-gray-500">
            {tyaags[currentDay-1]?.date}
          </p>


          <Link
            href={`/day/${currentDay}`}
            className="inline-block mt-8 px-10 py-4 rounded-full bg-orange-600 text-white font-bold shadow-lg hover:scale-105 transition"
          >
            Begin Today's Tyaag →
          </Link>


        </div>

      </section>
      {/* JOURNEY */}

      <section className="text-center mt-24 px-6">

        <h2 className="text-4xl font-black">
          Your Tyaag Journey
        </h2>

        <p className="mt-3 text-gray-500">
          Complete one meaningful challenge every day.
        </p>

      </section>




      {/* CARDS */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">


        {tyaags.map((day)=>{

          const completed = day.id < currentDay;
          const active = day.id === currentDay;


          return (

            <Link
              key={day.id}
              href={completed || active ? `/day/${day.id}` : "#"}
              className={`
              group
              rounded-3xl
              p-7
              min-h-[230px]
              flex
              flex-col
              justify-between
              text-center
              border
              backdrop-blur-xl
              shadow-lg
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl

              ${
                completed
                ?
                "bg-green-50 border-green-200"
                :
                active
                ?
                "bg-orange-50 border-orange-300"
                :
                "bg-white/60 border-gray-200 opacity-70"
              }

              `}
            >


              <div>

                {
                  completed
                  ?
                  <CheckCircle
                    className="mx-auto text-green-600"
                    size={45}
                  />
                  :
                  active
                  ?
                  <Flame
                    className="mx-auto text-orange-600"
                    size={45}
                  />
                  :
                  <Lock
                    className="mx-auto text-gray-400"
                    size={45}
                  />
                }


              </div>



              <div>

                <h3 className="text-2xl font-bold mt-5">
                  Day {day.id}
                </h3>


                <p className="mt-3 font-semibold text-gray-700">
                  {day.title}
                </p>

              </div>



              <p className="text-sm text-gray-500">
                {
                  completed
                  ?
                  "Completed ✓"
                  :
                  active
                  ?
                  "Start Now →"
                  :
                  "Locked"
                }
              </p>


            </Link>

          )

        })}


        </div>

      </section>




      {/* FOOTER */}

      <footer className="border-t border-orange-100 py-10 text-center">

        <img
          src="/logo.png"
          alt="logo"
          className="w-16 h-16 mx-auto"
        />

        <p className="mt-3 font-bold text-orange-700">
          त्याग की छतरी
        </p>

        <p className="text-sm text-gray-500 mt-2">
          © 2026 All Rights Reserved
        </p>

      </footer>


    </main>
  );
}