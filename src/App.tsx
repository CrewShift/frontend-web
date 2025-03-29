import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/(home)/Page";
import Schedule from "./pages/(schedule)/Page";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
