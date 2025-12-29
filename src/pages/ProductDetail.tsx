import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, FileText, Phone, ArrowLeft } from "lucide-react";
import productosData from "../productos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail: React.FC = () => {
  // El parámetro debe llamarse 'sku' para coincidir con App.tsx
  const { sku } = useParams<{ sku: string }>();

  // Buscador corregido para encontrar el producto en cualquier categoría
  const producto = productosData.categorias
    .flatMap(c => [
      ...(c.productos || []),
      ...(c.subcategorias?.flatMap(s => s.productos || []) || [])
    ])
    .find(p => p.sku === sku);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 font-bold text-xl">Producto no encontrado</p>
          <Link to="/productos" className="text-blue-600 underline">Volver al catálogo</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 w-full">
        <Link to="/productos" className="flex items-center text-gray-500 mb-8 hover:text-blue-600 transition-colors uppercase text-xs font-bold tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex justify-center shadow-sm">
            <img src={producto.url} alt={producto.nombre_producto} className="max-h-[450px] object-contain" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-black text-gray-900 mb-2">{producto.nombre_producto}</h1>
            <p className="text-gray-400 font-mono text-sm mb-6 uppercase tracking-widest">SKU: {producto.sku}</p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{producto.descripcion_producto}</p>

            <div className="flex flex-wrap gap-4 relative z-50">
              {/* ESTE LINK AHORA FUNCIONARÁ PORQUE LA RUTA /cotizar/:sku EXISTE EN APP.TSX */}
              <Link
                to={`/cotizar/${producto.sku}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg no-underline transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Cotizar producto
              </Link>
              <a
                href={`/docs/${producto.sku}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all no-underline cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                Ficha técnica
              </a>


              <Link
                to="/contacto"
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 no-underline transition-all"
              >
                <Phone className="w-5 h-5" />
                Contactar asesor
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Descripción detallada</h3>
          <p className="text-gray-600 leading-loose text-lg whitespace-pre-line">
            {producto.descripcion_detallada || producto.descripcion_producto}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;