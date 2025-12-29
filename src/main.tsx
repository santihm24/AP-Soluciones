import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
