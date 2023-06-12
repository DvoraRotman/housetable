import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HousetableHome from './components/HousetableHome';
import EditHousetable from './components/HousetableEdit';
import HousetableDetails from './components/HousetableDetails';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<HousetableHome />} />
        <Route exact path="/housetable/:houseID" element={<HousetableHome />} />
        <Route exact path="/housetableDetails/:houseID" element={<HousetableDetails />} />
      </Routes>
    </Router>
  );
}