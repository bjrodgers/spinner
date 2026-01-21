import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./ui/App.tsx";

// Render the App
createRoot(document.getElementById("root")!).render(<App />);
