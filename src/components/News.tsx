import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const API_KEY = "558ebbd933424ea3833c3c10cc215e7a";
const PAGE_SIZE = 8;

//  Proxy para evitar CORS
const BASE_URL = "https://corsproxy.io/?https://newsapi.org/v2/everything";

interface Article {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
}

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);

    try {
      //  Últimos 7 días
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const fromDate = lastWeek.toISOString().split("T")[0];

      const url = `${BASE_URL}?q=energy OR electricity OR power&language=es&sortBy=publishedAt&page=${page}&pageSize=${PAGE_SIZE}&from=${fromDate}&apiKey=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      //  Filtro extra: solo noticias realmente recientes
      const filtered = (data.articles || []).filter((a: Article) => {
        const published = new Date(a.publishedAt);
        const diffDays =
          (today.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });

      setArticles(filtered);
    } catch (err) {
      console.error("Error cargando noticias", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  return (
    <section id="noticias" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Noticias y Actualidad
          </h2>
          <p className="text-xl text-muted-foreground">
            Noticias recientes sobre energía y electricidad
          </p>
        </div>

        {loading && (
          <p className="text-center text-lg">Cargando noticias...</p>
        )}

        {!loading && articles.length === 0 && (
          <p className="text-center text-lg text-muted-foreground">
            No hay noticias recientes disponibles.
          </p>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((a, i) => (
              <Card key={i} className="hover:-translate-y-2 transition">
                <CardHeader>
                  {a.urlToImage && (
                    <img
                      src={a.urlToImage}
                      alt={a.title}
                      className="h-40 w-full object-cover rounded-md mb-4"
                    />
                  )}

                  <CardTitle className="text-lg line-clamp-2">
                    {a.title}
                  </CardTitle>

                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(a.publishedAt).toLocaleDateString("es-ES")}
                    <Badge variant="outline">{a.source.name}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">
                    {a.description}
                  </CardDescription>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(a.url, "_blank")}
                  >
                    Leer Más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* PAGINACIÓN */}
        <div className="flex justify-center gap-4 mt-12">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>

          <span className="font-semibold">Página {page}</span>

          <Button onClick={() => setPage(page + 1)}>
            Siguiente
          </Button>
        </div>

      </div>
    </section>
  );
};

export default News;
