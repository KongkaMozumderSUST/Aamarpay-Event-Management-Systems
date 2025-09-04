"use client"
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar()
{
    const [currentUserName,setCurrentUserName] = useState("")
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      const currentUserName = storedUser ? JSON.parse(storedUser).name : "";
      setCurrentUserName(currentUserName);
    },[])
 
  
  async function handleSubmitLogout(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("user","");
    redirect('/')
  }
return(
<div className="bg-sky-950 flex items-center gap-100 h-20 p-4 shadow-xl">
  <div><a href="/" className="text-white">Home</a></div>
  <div className="justify-end p-4 flex items-center gap-4">
{currentUserName?
  (<><div><a href="/MyEvents" className="text-white"><button>My Event</button></a></div>
  <div><Link href="/CreateEvents" className="text-white"><button>Create Event</button></Link></div>
  <div>
    <div><a href="/" className="text-white"><button>{currentUserName}</button></a></div>
    <form onSubmit={handleSubmitLogout}>
    <button type="submit" className="text-white" >Logout</button>
    </form>
    </div>
    
  </>
  ) :<>
  <div><a href="/login" className="text-white"><button>Login</button></a></div>
  <div><a href="/signup" className="text-white"><button>SignUp</button></a></div>
  </>}

  
</div>

</div>
    );
}