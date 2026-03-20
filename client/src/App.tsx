import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import "@xyflow/react/dist/style.css";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
    </>
  )
}

export default App