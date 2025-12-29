import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Phone } from "lucide-react";
import productosData from "../productos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Importaciones necesarias para el botón mejorado
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetailModificadoEdison: React.FC = () => {
  // Cambiamos 'id' por 'sku' para que coincida con la ruta de App.tsx
  const { sku } = useParams<{ sku: string }>();

  // Buscamos el producto en el JSON usando el parámetro sku
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 font-bold text-xl">Producto no encontrado</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Añadimos padding superior (pt-32) para que el Header no tape el contenido */}
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen del Producto */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex justify-center shadow-sm">
            <img
              src={producto.url}
              alt={producto.nombre_producto}
              className="max-h-[450px] object-contain"
            />
          </div>

          {/* Información y Botones */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {producto.nombre_producto}
            </h1>
            <p className="text-gray-400 font-mono text-sm mb-6 uppercase tracking-widest">
              SKU: {producto.sku}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {producto.descripcion_producto}
            </p>

            <div className="flex flex-wrap gap-4">
              {/* BOTÓN COTIZAR */}
              <Link
                to={`/cotizar/${producto.sku}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all no-underline"
              >
                <ShoppingCart className="w-5 h-5" />
                Cotizar producto
              </Link>

              {/* BOTÓN FICHA TÉCNICA MEJORADO */}
              <motion.div
                whileHover={{ scale: producto.ficha_tecnica ? 1.03 : 1 }}
                whileTap={{ scale: producto.ficha_tecnica ? 0.97 : 1 }}
              >
                <Button
                  onClick={() => {
                    if (!producto.ficha_tecnica) return;

                    const link = document.createElement("a");
                    link.href = producto.ficha_tecnica;
                    link.download = `${producto.sku}-ficha-tecnica.pdf`;
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                  disabled={!producto.ficha_tecnica}
                  variant="outline"
                  className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl"
                >
                  <FileDown className="w-5 h-5" />
                  {producto.ficha_tecnica ? "Ficha técnica" : "No disponible"}
                </Button>
              </motion.div>

              {/* BOTÓN CONTACTO */}
              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all no-underline"
              >
                <Phone className="w-5 h-5" />
                Contactar asesor
              </Link>
            </div>
          </div>
        </div>

        {/* Descripción Detallada */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            Descripción detallada
          </h3>
          <p className="text-gray-600 leading-loose text-lg">
            {producto.descripcion_detallada || producto.descripcion_producto}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailModificadoEdison;
