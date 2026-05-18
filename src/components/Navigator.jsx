import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Tanks from "../Pages/Tanks";
import TankDetails from "../Pages/TankDetails.jsx";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Generals from "../Pages/Generals";
import GeneralDetails from "../Pages/GeneralDetails";
import { useTokens } from "../stores/TokenStore";
import TankOfficers from "../Pages/TankOfficers";
import TankOfficerDetails from "../Pages/TankOfficerDetails";
import TankVideo from "../Pages/TankVideo";
import TankBattle from "../Pages/TankBattle";
import BattleVideo from "../Pages/BattleVideo";
import AdminTankVideos from "../Pages/AdminTankVideos";
import AdminPage from "../Pages/AdminPage";
import AdminTanks from "../Pages/AdminTanks";
import AdminGenerals from "../Pages/AdminGenerals";
import AdminTankOfficers from "../Pages/AdminTankOfficers";
import RequestsPage from "../Pages/RequestsPage";
import RequestEditPage from "../Pages/RequestEditPage";
import RequestEditTankPage from "../Pages/RequestEditTankPage";
import RequestEditTankOfficerPage from "../Pages/RequestEditTankOfficerPage";

const Navigator = () => {
  const accessToken = useTokens(state => state.accessToken);
  const role = useTokens(state => state.role);

  return (
<Routes>
  {/* Protected routes */}
<Route path="/" element={
  accessToken 
    ? (role === "Admin" 
        ? <Navigate to="/admin" replace /> 
        : <HomePage />)
    : <Navigate to="/login" replace />
} />

  <Route path="/tanks" element={
    accessToken 
      ? <Tanks /> 
      : <Navigate to="/login" replace />
  } />

  <Route path="/tank/:id" element={
    accessToken 
      ? <TankDetails /> 
      : <Navigate to="/login" replace />
  } />

<Route path="/generals/tank/:tankId" element={
  accessToken 
    ? <Generals /> 
    : <Navigate to="/login" replace />
} />

<Route path="/generals/:id" element={
  accessToken 
    ? <GeneralDetails /> 
    : <Navigate to="/login" replace />
} />

<Route path="/tankOfficers/tank/:tankId" element={
  accessToken 
    ? <TankOfficers /> 
    : <Navigate to="/login" replace />
} />

<Route path="/TankOfficers/:id" element={
  accessToken 
    ? <TankOfficerDetails /> 
    : <Navigate to="/login" replace />
} />


<Route 
  path="/request/general/:id" 
  element={accessToken ? <RequestEditPage /> : <Navigate to="/login" />} 
/>

<Route 
  path="/request/tank/:id" 
  element={accessToken ? <RequestEditTankPage /> : <Navigate to="/login" />} 
/>

<Route 
  path="/request/tankofficer/:id" 
  element={accessToken ? <RequestEditTankOfficerPage /> : <Navigate to="/login" />} 
/>

{/* Admin Panel*/}

<Route
  path="/admin"
  element={accessToken ? <AdminPage /> : <Navigate to="/login" />}
/>

<Route path="/admin/tanks" 
element={accessToken ? <AdminTanks /> : <Navigate to="/login" />} 
/>

<Route 
  path="/admin/generals/:tankId" 
  element={accessToken ? <AdminGenerals /> : <Navigate to="/login" />} 
/>

<Route 
path="/admin/officers/:tankId" 
element={ accessToken ? <AdminTankOfficers /> : <Navigate to="/login"/>} 
/>

<Route 
  path="/admin/requests" 
  element={accessToken && role === "Admin" 
    ? <RequestsPage /> 
    : <Navigate to="/login" />} 
/>


<Route path="/tank/:id/video" element={
  accessToken 
    ? <TankVideo /> 
    : <Navigate to="/login" replace />
} />


{/* Tank Video */}

<Route path="/battle" element={
  accessToken 
  ? <TankBattle />: 
  <Navigate to="/login" replace 
  />} />
<Route path="/battle/video" element={ 
  accessToken 
  ?<BattleVideo />: 
  <Navigate to="/login" replace />} />

<Route
  path="/admin/tank-videos"
  element={
    accessToken && role === "Admin"
      ? <AdminTankVideos />
      : <Navigate to="/login" />
  }
/>

  {/* Auth routes */}
  <Route path="/login" element={!accessToken ? <Login /> : <Navigate to="/" replace />} />

 <Route path="/register" element={
  !accessToken 
    ? <Register /> 
    : <Navigate to="/" replace />
} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
  );
};

export default Navigator;