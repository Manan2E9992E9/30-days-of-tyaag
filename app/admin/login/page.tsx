"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  function login(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);


    if(password === "TYAAG2025") {

      localStorage.setItem("admin","true");

      router.push("/admin");

    } 
    else {

      alert("Wrong Password");

    }


    setLoading(false);

  }



return (

<main className="
min-h-screen
bg-gradient-to-br
from-orange-50
via-white
to-yellow-50
flex
items-center
justify-center
px-6
">


<div className="
absolute
top-10
left-10
w-40
h-40
bg-orange-200
rounded-full
blur-3xl
opacity-40
">
</div>


<form

onSubmit={login}

className="
relative
bg-white
w-full
max-w-md
rounded-[32px]
shadow-2xl
border
border-orange-100
p-10
"

>



<div className="
flex
justify-center
mb-6
">

<img

src="/logo.png"

alt="Tyaag Logo"

className="
w-28
h-28
object-contain
"

/>

</div>



<h1 className="
text-4xl
font-black
text-center
text-orange-700
">

Admin Login

</h1>



<p className="
text-center
text-gray-500
mt-3
mb-8
">

🌂 Tyaag Dashboard

</p>




<input

type="password"

placeholder="Enter admin password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-gray-200
bg-gray-50
p-4
outline-none
focus:ring-2
focus:ring-orange-400
transition
"

/>




<button

disabled={loading}

className="
w-full
mt-6
bg-orange-600
hover:bg-orange-700
text-white
py-4
rounded-xl
font-bold
transition
shadow-lg
"

>

{
loading
?
"Logging in..."
:
"Login →"
}


</button>



<p className="
text-center
text-xs
text-gray-400
mt-8
">

Tyaag Admin Portal © 2026

</p>



</form>


</main>

);

}