import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ShoppingCart } from "lucide-react";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Servicios", href: "/servicios" },
    { name: "Noticias", href: "/noticias" },
    { name: "Clientes", href: "/clientes" },
    { name: "Certificaciones", href: "/certificaciones" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-soft">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 text-primary-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+57 300 5582156</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>gerencia@apsoluciones.com</span>
              </div>
            </div>

            {/* Toggle visible también arriba (opcional) */}
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo/logo.png"
              alt="Apsoluciones - Protección Eléctrica Profesional"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-[180px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Toggle aquí para escritorio */}
            <DarkModeToggle />

            <Link to="/cotizar/general">
              <Button size="sm" variant="gradient">
                Cotizar
              </Button>
            </Link>

          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-foreground hover:bg-secondary hover:text-primary transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Toggle también en menú móvil */}
              <div className="px-4 pt-2">
                <DarkModeToggle />
              </div>

              <Link
                to="/cotizar/general"
                className="flex items-center gap-2 px-4 py-2 font-medium text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cotizar</span>
              </Link>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
