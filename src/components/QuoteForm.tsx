import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // ⬅ IMPORTANTE

const WHATSAPP_NUMBER = "573053989308";
const FORMSPREE_URL = "https://formspree.io/f/xpwzaevz";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  // Leer producto desde query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productQuery = params.get("product");

    if (productQuery) {
      setFormData((prev) => ({ ...prev, product: productQuery }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ------------------------------------------------
  // 🔍 VALIDACIONES AVANZADAS
  // ------------------------------------------------
  const validateForm = (): string | null => {
    // Nombre mínimo 3 letras
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{3,}$/.test(formData.name))
      return "Ingrese un nombre válido (mínimo 3 letras).";

    // Email válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Ingrese un correo electrónico válido.";

    // Teléfono colombiano o internacional válido
    if (!/^\+?\d{7,15}$/.test(formData.phone))
      return "Ingrese un número de teléfono válido.";

    // Producto obligatorio
    if (!formData.product.trim())
      return "Debe indicar el producto o servicio de interés.";

    // Mensaje mínimo
    if (formData.message.trim().length < 10)
      return "El mensaje debe tener al menos 10 caracteres.";

    return null;
  };

  // ------------------------------------------------
  // 📤 Enviar a WhatsApp
  // ------------------------------------------------
  const sendToWhatsApp = () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const text = `
*Solicitud de Cotización*

*Nombre:* ${formData.name}
*Empresa:* ${formData.company}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Producto:* ${formData.product}
*Mensaje:* ${formData.message}
    `;

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

    window.open(url, "_blank");

    toast.success("Solicitud enviada por WhatsApp");
  };

  // ------------------------------------------------
  // 📧 Enviar a correo (Formspree)
  // ------------------------------------------------
  const sendToEmail = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Solicitud enviada correctamente al correo");
      } else {
        toast.error("Hubo un error al enviar la solicitud");
      }
    } catch (error) {
      toast.error("No se pudo conectar con el servidor");
    }
  };

  return (
    <section id="cotizar" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-md border bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Solicitar Cotización
            </CardTitle>
            <CardDescription>
              Complete el formulario y un asesor lo contactará.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
              />
            </div>

            {/* Empresa */}
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@empresa.com"
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+57 300 0000000"
              />
            </div>

            {/* Producto */}
            <div className="space-y-2">
              <Label htmlFor="product">Producto de Interés *</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="UPS, Pararrayos, Tablero..."
              />
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describa sus necesidades"
              />
            </div>

            {/* Botones */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={sendToWhatsApp}
                className="w-full text-lg py-5 bg-green-600 hover:bg-green-700"
              >
                Enviar por WhatsApp
              </Button>

              <Button
                onClick={sendToEmail}
                className="w-full text-lg py-5 bg-primary hover:bg-primary/80"
              >
                Enviar por Correo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteForm;
