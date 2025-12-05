import {  BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Orders from "./pages/Orders"
import Header from "./components/shared/Header"
import Tables from "./pages/Tables"
import Menu from "./pages/Menu"
import { useSelector } from "react-redux"
import useLoadData from "../hooks/useLocalData"
import FullScreenLoder from "./components/shared/FullScreenLoder"
import DashBoard from "./pages/DashBoard"

function Layout () {

  const isLoading = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector( state => state.user);

  if( isLoading) return <FullScreenLoder/>

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
      <Routes>
        <Route path="/" element={
          <ProtectRoutes>
            <Home/>
          </ProtectRoutes>
        } />

        <Route path="/auth" element={isAuth ? <Navigate to="/"/> : <Auth/>} />

        <Route path="/orders" element={
          <ProtectRoutes>
            <Orders/>
          </ProtectRoutes>
        } />
        <Route path="/tables" element={
          <ProtectRoutes>
            <Tables/>
          </ProtectRoutes>
        } />
        <Route path="/menu" element={
          <ProtectRoutes>
            <Menu/>
          </ProtectRoutes>
        } />          
        <Route path="/dashboard" element={
          <ProtectRoutes>
            <DashBoard/>
          </ProtectRoutes>
        } />    

        <Route path="*" element={<div>Not Found</div>} />   

      </Routes>
    </>
  )
}


 function ProtectRoutes ({children}) {

   const { isAuth } = useSelector( state => state.user);

   if(!isAuth){
    return <Navigate to="/auth"  />
   }

   return children;
 }

function App() {

  return (
      <Router>
       <Layout/>
      </Router>
  )
}

export default App
