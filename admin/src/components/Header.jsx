import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/");
    };
    return (
        <header className="w-full bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </header>
    );
};

export default Header;