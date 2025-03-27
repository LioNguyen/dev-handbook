import { createRoot } from "react-dom/client";

import App from "@/App.tsx";
import "@/global.css";
import "@/shared/locale";

createRoot(document.getElementById("root")!).render(<App />);
