import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout jest parent route — renderuje Navbar raz dla wszystkich stron.
            Outlet w Layout.tsx to miejsce gdzie wchodzi aktywna strona. */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          {/* :slug to parametr dynamiczny — dopasowuje dowolny segment URL.
              Wartość dostępna przez useParams() w komponencie ProjectDetail. */}
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Wildcard — wszystkie nieznane ścieżki wracają na stronę główną */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
