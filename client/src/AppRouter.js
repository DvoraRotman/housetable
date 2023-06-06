import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HousetableHome from './components/HousetableHome';
import EditHousetable from './components/HousetableEdit';
import HousetableDetails from './components/HousetableDetails';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Navigate to="/housetable/home" />} />
        <Route exact path="/housetable/home" element={<HousetableHome />} />
        <Route exact path="/housetable" element={<EditHousetable />} />
        <Route exact path="/housetable/details" element={<HousetableDetails />} />
      </Routes>
    </Router>
  );
}
