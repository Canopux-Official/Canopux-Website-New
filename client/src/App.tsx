import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import "@xyflow/react/dist/style.css";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>
    </>
  )
}

export default App