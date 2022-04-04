import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LandingPage from "./_components/views/LandingPage/LandingPage";
import LoginPage from "./_components/views/LoginPage/LoginPage";
import RegisterPage from "./_components/views/RegisterPage/RegisterPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;