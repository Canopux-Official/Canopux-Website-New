import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyDetail from "./pages/CaseStudyDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App