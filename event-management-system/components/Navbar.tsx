"use client"
import Link from "next/link";
import { redirect,useRouter} from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar()
{
    const [currentUserName,setCurrentUserName] = useState("")
    const router = useRouter();
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      const currentUserName = storedUser ? JSON.parse(storedUser).name : "";
      setCurrentUserName(currentUserName);
      router.refresh()
    },[])
 
  
  async function handleSubmitLogout(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("user","");
    router.refresh();
    redirect('/')
  }
return(
<div className="bg-sky-950 flex items-center gap-200 h-20 p-4 shadow-xl ">
  <div><a href="/" className="text-white">Home</a></div>
  
{currentUserName?

  (<>
  <div className="justify-end p-4 flex items-center gap-10 ">
    <div><a href="/MyEvents" className="text-white"><button>My Event</button></a></div>
  <div><Link href="/CreateEvents" className="text-white"><button>Create Event</button></Link></div>

    <div><a href="/" className="text-white"><button>{currentUserName}</button></a></div>
    <form onSubmit={handleSubmitLogout}>
    <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
    </form>
    </div>
  </>
  ) :<>
  <div className="justify-end p-4 flex items-center gap-20 ">
  <div><a href="/login" className="text-white"><button>Login/</button></a>/<a href="/signup" className="text-white"><button>SignUp</button></a></div>

  </div>
 
  </>}

  
</div>


    );
}