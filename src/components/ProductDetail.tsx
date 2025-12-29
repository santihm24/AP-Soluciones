import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, FileText, Phone, ChevronLeft } from "lucide-react";
import productosData from "../productos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();

  // Buscar producto
  const producto = productosData.categorias
    .flatMap((c) => [
      ...(c.productos || []),
      ...(c.subcategorias?.flatMap((s) => s.productos || []) || []),
    ])
    .find((p) => p.sku === sku);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300 font-bold text-xl">
            Producto no encontrado
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 w-full">

        {/* VOLVER */}
        <Link
          to="/productos"
          className="flex items-center gap-2 mb-10 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Imagen */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 flex justify-center shadow-sm">
            <img
              src={producto.url}
              alt={producto.nombre_producto}
              className="max-h-[450px] object-contain"
            />
          </div>

          {/* Información del producto */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              {producto.nombre_producto}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mb-6 uppercase tracking-widest">
              SKU: {producto.sku}
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {producto.descripcion_producto}
            </p>

            {/* BOTONES */}
            <div className="flex flex-wrap gap-4">

              {/* Cotizar */}
              <Link
                to={`/cotizar/${producto.sku}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all no-underline"
              >
                <ShoppingCart className="w-5 h-5" />
                Cotizar producto
              </Link>

              {/* Ficha Técnica */}
              <Link
                to={`/ficha/${producto.sku}`}
                className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all no-underline"
              >
                <FileText className="w-5 h-5" />
                Ficha técnica
              </Link>

              {/* Contactar asesor por WhatsApp - NUEVO */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    `https://wa.me/573193866951?text=Hola, quiero información del producto ${encodeURIComponent(
                      producto.nombre_producto
                    )} (SKU: ${producto.sku}).`,
                    "_blank"
                  );
                }}
                className="flex items-center justify-center gap-2 border border-green-500 text-green-600 dark:text-green-400 px-8 py-4 rounded-xl font-bold hover:bg-green-100 dark:hover:bg-green-900/30 transition-all no-underline"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </button>


            </div>
          </div>
        </div>

        {/* DESCRIPCIÓN DETALLADA */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            Descripción detallada
          </h3>

          <p className="text-gray-700 dark:text-gray-300 leading-loose text-lg">
            {producto.descripcion_detallada || producto.descripcion_producto}
          </p>
        </div>

        {/* PRODUCTOS RELACIONADOS */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Productos relacionados
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {productosData.categorias
              .flatMap((c) => [
                ...(c.productos || []),
                ...(c.subcategorias?.flatMap((s) => s.productos || []) || []),
              ])
              .filter((p) => p.sku !== producto.sku)
              .slice(0, 4)
              .map((item) => (
                <Link
                  to={`/productos/${item.sku}`}
                  key={item.sku}
                  className="block bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-all"
                >
                  <img
                    src={item.url}
                    alt={item.nombre_producto}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {item.nombre_producto}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SKU: {item.sku}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
