import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloating = () => {
  // Cambia por tu número de WhatsApp en formato internacional
  const phoneNumber = "573001234567";

  // Mensaje por defecto (puedes modificarlo)
  const defaultMessage = encodeURIComponent(
    "Hola, quisiera más información sobre este producto."
  );

  // Enlace normal a WhatsApp
  const waLink = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  // 🔥 Enviar imagen automáticamente (requiere WhatsApp Business API)
  // Reemplaza esta URL con tu imagen real
  const imageUrl =
    "https://tuservidor.com/imagenes/producto.jpg";

  const waImageLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${defaultMessage}&media=${encodeURIComponent(
    imageUrl
  )}`;

  return (
    <div>
      {/* Botón flotante */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}
      >
        <FaWhatsapp size={32} />
      </a>

      {/* Botón opcional (enviar imagen) */}
      {/* Si lo quieres mostrar: descomenta */}
      {/*
      <a
        href={waImageLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          backgroundColor: "#128C7E",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}
      >
        <FaWhatsapp size={28} />
      </a>
      */}
    </div>
  );
};

export default WhatsAppFloating;
