import { createRoot } from "react-dom/client";

import App from "@/App.tsx";
import "@/global.css";
import "@core/i18n";

createRoot(document.getElementById("root")!).render(<App />);
