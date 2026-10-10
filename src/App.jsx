import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard/dashboard.jsx";
import Profile from "./user/Profile.jsx";
import Auth from "./auth/Auth.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;