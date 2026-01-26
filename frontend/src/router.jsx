import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Instructions from "./pages/Instructions";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/results" element={<Results />} />
      <Route path="/instructions" element={<Instructions />} />
    </Routes>
  );
}
