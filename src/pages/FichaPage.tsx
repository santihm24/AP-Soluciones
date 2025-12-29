import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FichaPage = () => {
  const { sku } = useParams<{ sku: string }>();

  useEffect(() => {
    if (sku) {
      const pdfUrl = `/docs/${sku}.pdf`;
      console.log("Abriendo:", pdfUrl);
      window.location.href = pdfUrl;
    }
  }, [sku]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Abriendo ficha técnica...
    </div>
  );
};

export default FichaPage;
