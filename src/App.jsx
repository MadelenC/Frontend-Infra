import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layouts/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./components/Protected/PortectedRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import UserHome from "./pages/UserList/UserHome";
import UserProfiles from "./pages/Entities/EntitiesHome";

import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";

import Calendar from "./pages/Trips/Calendar";
import Travelrol from "./pages/Travelrol/travelTables";
import FormElements from "./pages/Vehiculos/VehiculoHome";
import Combustible from "./pages/combustible/Combustible";
import Destinations from "./pages/Destinations/destinations";
import Maps from "./pages/Maps/Maps";
import Reservations from "./pages/Reservations/ReservationsHome";

import TripsHome from "./pages/Trips/TripsHome";
import CheckBudgetHome from "./pages/TravelBudget/CheckBudgetHome";
import CashBudgetHome from "./pages/TravelBudget/CashBudgetHome";
import DepartureHome from "./pages/DepartureAuthorization/DepartureHome";
import TripReportHome from "./pages/TripReport/TripReportHome";
import JobApplicationHome from "./pages/JobApplication/JobApplicationHome";

import ApplicationHome from "./pages/Maintenance/ApplicationHome";
import KardexHome from "./pages/Maintenance/KardexHome";

import MechanicHome from "./pages/MateriaOrder/MechanicHome";
import DesktopHome from "./pages/MateriaOrder/DesktopHome";

import RepaymentHome from "./pages/RepaymentOfMaterial/RepaymentHome";

import Home from "./pages/Home";
import PublicRoute from "./components/Protected/PublicRoute";

import Profile from "./pages/profile/Profile";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />

      <Routes>

       <Route 
          path="/" 
          element={
            <PublicRoute> 
              <Home />
            </PublicRoute>   
          } 
      />
       
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route 
        path="/signup"
        element={<SignUp />} 
         />

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute rolesAllowed={["supervisor","administrador","mecanico","mensajero","chofer","encargado"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
      
          <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador"]}>
              <UserHome/> 
            </ProtectedRoute>
          } />

          <Route 
          path="/travel-rol" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer",]}>
              <Travelrol />
            </ProtectedRoute>
          } 
          />
          <Route 
          path="/vehiculos" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer","mecanicos"]}>
              <FormElements />
            </ProtectedRoute>
          } />

          <Route 
          path="/destinos" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer"]}>
              <Destinations />
            </ProtectedRoute>
          } />

          <Route 
          path="/mapas" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer"]}>
              <Maps />
            </ProtectedRoute>
          } />

          <Route 
          path="/reservas" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","encargado"]}>
              <Reservations />
            </ProtectedRoute>
          } />

          <Route path="/viajes">
            <Route index 
            element={
              <ProtectedRoute   rolesAllowed={["supervisor","administrador","encargado","chofer"]}>
              <TripsHome />
              </ProtectedRoute>
            } />
            <Route 
            path="calendar" 
            element={
              <ProtectedRoute   rolesAllowed={["supervisor","administrador","encargado","chofer"]}>
                <Calendar />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/calendar" element={<Calendar />} />
        
          <Route path="/presupuestos">
            <Route index 
            element={
              <ProtectedRoute   rolesAllowed={["supervisor","administrador"]}>
                <CheckBudgetHome />
              </ProtectedRoute>
            } />
            <Route path="cheque"
             element={
              <ProtectedRoute   rolesAllowed={["supervisor","administrador"]}>
             <CheckBudgetHome />
             </ProtectedRoute>
             } />
            <Route path="caja" 
            element={
              <ProtectedRoute   rolesAllowed={["supervisor","administrador"]}>
                <CashBudgetHome />
              </ProtectedRoute>
            } />
          </Route>

          <Route 
          path="/autorizacion" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer"]}>
              <DepartureHome />
            </ProtectedRoute>
          } />

          <Route 
          path="/informe" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer"]}>
               <TripReportHome />
            </ProtectedRoute>
          } />

          <Route 
          path="/Solicitud_Trabajo" 
          element={
            <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer"]}>
              <JobApplicationHome />
            </ProtectedRoute>
          } />

      
          <Route path="/mantenimiento">
            <Route
              index
              element={
                   <ProtectedRoute   rolesAllowed={["supervisor","administrador","mecanico"]}>
                  <ApplicationHome />
                  </ProtectedRoute>
              }
            />
            <Route
              path="solicitudes"
              element={
                <ProtectedRoute   rolesAllowed={["supervisor","administrador","mecanico"]}>
                  <ApplicationHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="kardex"
              element={
                <ProtectedRoute   rolesAllowed={["supervisor","administrador","chofer","mecanico"]}>
                  <KardexHome />
                </ProtectedRoute>
              }
            />
          </Route>

        
          <Route path="/pedido">
            <Route
              index
              element={
                <ProtectedRoute rolesAllowed={["supervisor","administrador","mecanico","mensajero"]}>
                  <MechanicHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="mecanico"
              element={
                <ProtectedRoute rolesAllowed={["supervisor","administrador","mecanico","mensajero"]}>
                  <MechanicHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="escritorio"
              element={
                <ProtectedRoute rolesAllowed={["supervisor","administrador","mecanico","mensajero"]}>
                  <DesktopHome />
                </ProtectedRoute>
              }
            />
          </Route>

 
          <Route
            path="/devoluciones"
            element={
              <ProtectedRoute rolesAllowed={["supervisor","administrador","mecanico"]}>
                <RepaymentHome />
              </ProtectedRoute>
            }
          />

         
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

        </Route>

     
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}


