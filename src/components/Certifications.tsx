import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, FileCheck, Camera, ExternalLink, Download, Trash2, ZoomIn } from "lucide-react";
import certificationsImg from "@/assets/certifications.jpg";
import installationImg from "@/assets/installation-1.jpg";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Certifications = () => {

  /* ============================== */
  /*   ESTADOS PARA GALERÍA        */
  /* ============================== */

  const [selectedImages, setSelectedImages] = useState<{ [key: number]: string }>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImages((prev) => ({
        ...prev,
        [index]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  /* ===================================== */

  const certifications = [
    {
      name: "Certificación SENA - Puesta en Funcionamiento UPS",
      description: "Certificación del SENA para puesta en funcionamiento de sistemas UPS",
      fileName: "CERTIFICACION  DEL SENA PUESTA FUNCIONAMIENTO UPS.pdf",
      type: "PDF",
      icon: Award,
      color: "bg-blue-600"
    },
    {
      name: "Certificación AP - Busscar",
      description: "Certificación de servicios para Busscar - Documento 2",
      fileName: "CERTIFICACION AP-.BUSSCAR 2.pdf",
      type: "PDF",
      icon: Shield,
      color: "bg-primary"
    },
    {
      name: "Certificación Busscar AP",
      description: "Certificación de servicios para Busscar - Documento 3",
      fileName: "CERTIFICACION BUSSCAR  AP-3.pdf",
      type: "PDF",
      icon: Award,
      color: "bg-accent"
    },
    {
      name: "Certificado Comdata Group",
      description: "Certificado de servicios para Comdata Group",
      fileName: "CERTIFICADO COMDATA   GROUP.docx",
      type: "DOCX",
      icon: FileCheck,
      color: "bg-green-600"
    },
    {
      name: "Certificado Incendios Comdata Group",
      description: "Certificado de sistemas contra incendios para Comdata Group",
      fileName: "CERTIFICADO INCENDIOS COMDATA - GROUP.pdf",
      type: "PDF",
      icon: Shield,
      color: "bg-purple-600"
    },
    {
      name: "Certificado Louis Dreyfus Company",
      description: "Certificado de servicios para Louis Dreyfus Company Colombia SAS",
      fileName: "Certificado LUIIS DREYFUS COMPANY COLOMBIA SAS.pdf",
      type: "PDF",
      icon: FileCheck,
      color: "bg-orange-600"
    }
  ];

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/certificados/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clientCertifications = [
    { client: "Refinería del Magdalena", certification: "ISO 45001 - Seguridad y Salud", date: "2024" },
    { client: "Datacenter Solutions", certification: "Instalación Certificada DPS", date: "2024" },
    { client: "Hospital Central del Valle", certification: "Sistema de Emergencias", date: "2023" }
  ];

  const installations = [
    { title: "Sistema DPS Industrial", location: "Complejo Petroquímico", description: "Instalación completa de protección contra sobretensiones" },
    { title: "Puesta a Tierra Hospitalaria", location: "Centro Médico", description: "Sistema SPT especializado para equipos médicos críticos" },
    { title: "Blindaje Electromagnético", location: "Datacenter Tier III", description: "Jaula de Faraday y apantallamiento completo" }
  ];

  return (
    <section id="certificaciones" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">

        {/* TÍTULO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Certificaciones y Garantías</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AP Soluciones Integradas S.A.S. cuenta con certificaciones internacionales que garantizan la calidad y seguridad.
          </p>
        </div>

        {/* CERTIFICACIONES */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <Card key={index} className="shadow-large hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
              <CardHeader>
                <div className={`w-20 h-20 ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <cert.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{cert.name}</CardTitle>
                <Badge className="bg-accent text-accent-foreground">{cert.type}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">{cert.description}</CardDescription>
                <Button onClick={() => handleDownload(cert.fileName)} className="w-full bg-gradient-primary">
                  <Download className="h-4 w-4 mr-2" /> Descargar Certificado
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* IMAGEN CENTRAL */}
        <div className="text-center mb-16">
          <Card className="max-w-4xl mx-auto shadow-large">
            <CardContent className="p-8">
              <img src={certificationsImg} className="w-full h-64 object-cover rounded-lg mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">Certificaciones Oficiales</h3>
              <p className="text-muted-foreground mb-6">
                Respaldo de instituciones reconocidas como el SENA y empresas líderes del sector.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CERTIFICADO DE CLIENTES */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary mb-8 text-center">Certificaciones de Clientes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {clientCertifications.map((cert, index) => (
              <Card key={index} className="shadow-medium hover:shadow-large transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{cert.client}</CardTitle>
                  <Badge variant="outline">{cert.date}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{cert.certification}</CardDescription>
                  <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Certificado
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* GALERÍA INSTALACIONES */}
        <div>
          <h3 className="text-3xl font-bold text-primary mb-8 text-center">Galería de Instalaciones</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {installations.map((installation, index) => (
              <Card key={index} className="shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden group">
                
                <div className="relative">
                  
                  <img
                    src={selectedImages[index] || installationImg}
                    alt={installation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Subir */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`upload-install-${index}`)?.click();
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2"
                  >
                    <Camera className="h-4 w-4 text-gray-700" />
                  </button>

                  <input
                    id={`upload-install-${index}`}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                  />

                  {/* Opciones extra */}
                  {selectedImages[index] && (
                    <div className="absolute bottom-3 right-3 flex gap-2">

                      <button
                        onClick={() => setPreviewImage(selectedImages[index]!)}
                        className="bg-white/90 hover:bg-white shadow rounded-full p-2"
                      >
                        <ZoomIn className="h-4 w-4 text-gray-700" />
                      </button>

                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="bg-red-500 hover:bg-red-600 text-white shadow rounded-full p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>
                  )}

                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{installation.title}</CardTitle>
                  <Badge variant="outline">{installation.location}</Badge>
                </CardHeader>

                <CardContent>
                  <CardDescription>{installation.description}</CardDescription>
                </CardContent>

              </Card>
            ))}
          </div>

          {/* DIALOG PARA PREVIEW */}
          <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
            <DialogContent className="p-0 max-w-3xl">
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-full h-auto rounded-lg" />
              )}
            </DialogContent>
          </Dialog>

        </div>

      </div>
    </section>
  );
};

export default Certifications;
