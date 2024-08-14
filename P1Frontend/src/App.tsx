import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/LoginRegister/Login";
import { Register } from "./components/LoginRegister/Register";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS globally
import { UserContainer } from "./components/User/UserContainer";
import { AddReimbursement } from "./components/Reimbursement/AddReimbursement";
import { ReimbursementContainer } from "./components/Reimbursement/ReimbursementContainer";
import { Sidebar } from "./components/SideBar/Sidebar";
import { AdminReimbursementContainer } from "./components/Reimbursement/AdminReimbursementContainer";
import { store } from "./globalData/store";
import { Account } from "./components/LoginRegister/Account";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
        <div className="content">
          <Routes>
            <Route
              path=""
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Account/>
                )
              } 
            />
            <Route path="/register" element={
                    !isAuthenticated ? (
                      <Register />
                    ) : (
                      <div></div>
                    )
                  } />
            {isAuthenticated && (
              <>
                
                
                <Route
                  path="/reimbursements"
                  element={<ReimbursementContainer />}
                />
                <Route
                  path="/adminreimbursements"
                  element={
                    store.loggedInUser.role === "Admin" ? (
                      <AdminReimbursementContainer />
                    ) : (
                      <div></div>
                    )
                  }
                />
                <Route path="/users" element={<UserContainer />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
