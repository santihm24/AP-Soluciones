import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Globe,
} from "lucide-react";

const Contact = () => {
  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* TÍTULO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contáctenos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos listos para brindarle la mejor solución en protección eléctrica
          </p>
        </div>

        {/* INFORMACIÓN DE CONTACTO */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* INFORMACIÓN PRINCIPAL */}
          <Card className="shadow-md border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2 text-foreground">
                <Building2 className="h-6 w-6 text-primary" />
                <span>AP Soluciones Integradas S.A.S.</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Oficina Principal</p>
                  <p className="text-muted-foreground">
                    Centro Comercial Pasarela, Local 33 <br />
                    Calle 16 No. 6-34 - Piso 2 <br />
                    Pereira, Risaralda - Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Teléfonos</p>
                  <p className="text-muted-foreground">
                    <a href="tel:+5763171805" className="hover:underline">
                      Tel/Fax: (+57)(6) 3171805
                    </a>
                    <br />
                    <a href="tel:+5768853052" className="hover:underline">
                      Tel: 8853052
                    </a>
                    <br />
                    <a href="tel:+573005582156" className="hover:underline">
                      Celular: +57 300 5582156
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Correos</p>
                  <p className="text-muted-foreground">
                    <a href="mailto:gerencia@apsolucionesintegradas.com" className="hover:underline">
                      gerencia@apsolucionesintegradas.com
                    </a>
                    <br />
                    <a href="mailto:ventas@apsolucionesintegradas.com" className="hover:underline">
                      ventas@apsolucionesintegradas.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 7:00 AM - 6:00 PM <br />
                    Sábados: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Sitio Web</p>
                  <a
                    href="https://www.apsolucionesintegradas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    www.apsolucionesintegradas.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Persona de Contacto</p>
                  <p className="text-muted-foreground">
                    Luis Fernando Angel Tobón <br />
                    Gerente General
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OFICINA ADICIONAL */}
          <Card className="shadow-md border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Oficina Adicional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-primary">Manizales</p>
              <p className="text-sm text-muted-foreground">
                Carrera 23 No 57-50 <br />
                Manizales, Caldas - Colombia
              </p>
            </CardContent>
          </Card>

          {/* EMERGENCIAS */}
          <Card className="shadow-md border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-accent">Emergencias 24/7</CardTitle>
              <CardDescription>Servicio técnico de emergencia disponible las 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent mb-4">
                  +57 (1) 999-0000
                </p>
                <Button className="bg-accent hover:bg-accent/90 w-full" asChild>
                  <a href="tel:+5719990000">Llamar Emergencias</a>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Contact;
