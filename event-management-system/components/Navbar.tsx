"use client"
import Link from "next/link";
import { redirect,useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function Navbar()
{
   const { user, setUser, logout } = useUser();
return(
<div className="bg-sky-950 flex items-center gap-200 h-20 p-4 shadow-xl ">
  <div><Link href="/" className="text-white">Home</Link></div>
  
{user?.name?

  (<>
  <div className="justify-end p-4 flex items-center gap-10 ">
    <div><Link href="/MyEvents" className="text-white"><button>My Event</button></Link></div>
  <div><Link href="/CreateEvents" className="text-white"><button>Create Event</button></Link></div>

    <div><Link href="/" className="text-white"><button>{user.name}</button></Link></div>
    <form onSubmit={logout}>
    <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
    </form>
    </div>
  </>
  ) :<>
  <div className="justify-end p-4 flex items-center gap-20 ">
  <div><Link href="/login" className="text-white"><button>Login/</button></Link>/<Link href="/signup" className="text-white"><button>SignUp</button></Link></div>

  </div>
 
  </>}

  
</div>


    );
}