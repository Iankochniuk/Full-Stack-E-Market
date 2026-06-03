function Navbar({ cartCount }) {
  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">E-Market</h2>

      <ul className="flex gap-6 items-center">
        <li className="cursor-pointer hover:text-blue-400">Inicio</li>

        <li className="cursor-pointer hover:text-blue-400">Productos</li>

        <li className="cursor-pointer hover:text-blue-400">
          🛒 Carrito ({cartCount})
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
