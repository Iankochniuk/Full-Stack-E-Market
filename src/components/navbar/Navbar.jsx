import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ cartCount, toggleCart }) {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        <Link to="/">E-Market</Link>
      </h2>

      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Inicio
          </Link>
        </li>

        <li>
          <Link to="/" className="hover:text-blue-400">
            Productos
          </Link>
        </li>

        <li>
          <Link to="/orders" className="hover:text-blue-400">
            Pedidos
          </Link>
        </li>

        <li onClick={toggleCart} className="cursor-pointer hover:text-blue-400">
          🛒 Carrito ({cartCount})
        </li>

        {user ? (
          <li className="flex items-center gap-3">
            <span>👋 {user.nombre}</span>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
            >
              Salir
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
