import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  let navigate = useNavigate()

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white fixed w-full z-10">
      <button 
        className="p-2 rounded focus:outline-none text-white bg-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" alt="Menu" className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold"> Welcome Admin</h1>
      <nav
        className={`absolute left-0 top-16 bg-gray-900 w-[300px] h-screen  p-4 transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul>
          <li onClick={()=>navigate('/admin')}  className="py-2 border-y bg-gray-900"><a>All users</a></li>
          <li  onClick={()=>navigate('/admin/alltheaters')} className="py-2 border-b bg-gray-900"><a>All theaters</a></li>
          <li  onClick={()=>navigate('/admin/requests')} className="py-2 border-b"><a>Requests</a></li>
          <li  onClick={()=>navigate('/admin/allmovies')} className="py-2 border-b"><a>All Movies</a></li>
        </ul>
      </nav>
    </header>
  );
}
