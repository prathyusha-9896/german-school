import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Contact from './Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PopUp from './components/PopUp';
import LeadsTable from './components/LeadsTable';
function App() {
  return (
    <>
    <PopUp />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact_us" element={<Contact />} />
        <Route path="/leads" element={<LeadsTable />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    <FloatingWhatsApp />
    </>
  );
}

export default App;
