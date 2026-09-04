import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Art } from "@/pages/Art";
import { Learn } from "@/pages/Learn";
import { Participate } from "@/pages/Participate";
import { Support } from "@/pages/Support";
import { Donate } from "@/pages/Donate";
import { Share } from "@/pages/Share";
import { Privacy, Terms } from "@/pages/Legal";
import { AdminApp } from "@/pages/admin/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<About />} />
          <Route path="/arte-e-historias" element={<Art />} />
          <Route path="/aprender" element={<Learn />} />
          <Route path="/participar" element={<Participate />} />
          <Route path="/apoio" element={<Support />} />
          <Route path="/doar" element={<Donate />} />
          <Route path="/partilhar" element={<Share />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
