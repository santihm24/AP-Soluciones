import React, { useState } from "react";
import { Search, ChevronRight, PackageSearch, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import productosData from "../productos.json";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState("todos");

  // Categorías
  const categorias = [
    "todos",
    ...productosData.categorias.map((c) => c.nombre),
  ];

  // Productos con categoría y subcategoría
  const allProducts = productosData.categorias.flatMap((cat) => {
    const productosDirectos = (cat.productos || []).map((p) => ({
      ...p,
      categoria: cat.nombre,
      subcategoria: "Ninguna",
    }));

    const productosSubcats =
      cat.subcategorias?.flatMap((sub) =>
        (sub.productos || []).map((p) => ({
          ...p,
          categoria: cat.nombre,
          subcategoria: sub.nombre,
        }))
      ) || [];

    return [...productosDirectos, ...productosSubcats];
  });

  // Subcategorías dinámicas
  const subcategorias = [
    "todos",
    ...(
      productosData.categorias.find((c) => c.nombre === selectedCategory)
        ?.subcategorias || []
    ).map((s) => s.nombre),
  ];

  // Filtros
  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "todos" || p.categoria === selectedCategory;

    const matchesSubcategory =
      selectedSubcategory === "todos" || p.subcategoria === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITULO */}
        <div className="mb-10 flex flex-col gap-6">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Nuestro Catálogo
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Soluciones avanzadas en protección y seguridad.
          </p>

          {/* BUSCADOR + FILTROS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Buscador */}
            <div className="relative group w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              />
            </div>

            {/* Categoría */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl shadow-sm">
              <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("todos");
                }}
                className="bg-transparent outline-none text-gray-800 dark:text-gray-200 font-medium w-full"
              >
                {categorias.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-white dark:bg-gray-800"
                  >
                    {cat === "todos" ? "Todas las categorías" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategoría */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl shadow-sm">
              <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="bg-transparent outline-none text-gray-800 dark:text-gray-200 font-medium w-full"
                disabled={selectedCategory === "todos"}
              >
                {subcategorias.map((sub) => (
                  <option
                    key={sub}
                    value={sub}
                    className="bg-white dark:bg-gray-800"
                  >
                    {sub === "todos"
                      ? "Todas las subcategorías"
                      : sub}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* RESULTADOS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <Link
                key={p.sku}
                to={`/productos/${p.sku}`}
                className="group no-underline"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">

                  {/* Imagen */}
                  <div className="aspect-video bg-gray-50 p-6 flex items-center justify-center">
                    <img
                      src={p.url}
                      alt={p.nombre_producto}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit mb-3 uppercase tracking-wider">
                      SKU: {p.sku}
                    </span>

                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-lg mb-2">
                      {p.nombre_producto}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                      {p.descripcion_producto}
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(
                          `https://wa.me/573003001010?text=Hola,%20quiero%20información%20sobre:%20${encodeURIComponent(
                            p.nombre_producto
                          )}%20(SKU:%20${p.sku})`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg font-bold shadow transition-all mb-4 flex items-center justify-center gap-2"
                    >
                      {/* Ícono WhatsApp */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M16 2.9A13.1 13.1 0 0 0 3 16a13 13 0 0 0 2 6.8L3 29l6.4-2A13 13 0 0 0 16 29a13.1 13.1 0 0 0 0-26.1Zm0 23.2a10 10 0 0 1-5.1-1.4l-.4-.2-3.8 1.2 1.2-3.7-.2-.4A10.2 10.2 0 1 1 26.2 16 10.2 10.2 0 0 1 16 26.1Zm5.6-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.3-.7.1s-1.4-.5-2.7-1.7a10.1 10.1 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6c.2-.3.2-.5 0-.8s-.7-1.6-1-2.2-.5-.5-.8-.5h-.7c-.3 0-.8.2-1 .5s-1 1-1 2.6 1 3 1.2 3.2l.2.3a15 15 0 0 0 6.4 5.2c3 .8 3.8.7 4.5.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.2-.2-.3-.5-.5Z" />
                      </svg>

                      Consultar por WhatsApp
                    </button>



                    <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between text-blue-600 font-bold text-xs uppercase tracking-widest">
                      Ver ficha técnica
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <PackageSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              No encontramos productos
            </h2>
            <p className="text-gray-400 dark:text-gray-500 mt-1">
              Intenta cambiar los filtros o la palabra clave.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
