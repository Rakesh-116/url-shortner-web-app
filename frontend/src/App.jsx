import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Navbar from "./Components/Navbar/Navbar";
import UrlShortener from "./Pages/UrlShortener/UrlShortener";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import MyUrlsPage from "./Pages/User/MyUrlsPage";
import ProfilePage from "./Pages/User/Profile";
import NotFound from "./Components/NotFound/NotFound";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/url/shortener" element={<UrlShortener />} />
          <Route path="/url/list" element={<MyUrlsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
