import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { store } from "../../globalData/store";
import { AddReimbursement } from "../Reimbursement/AddReimbursement";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  //defining a state object for our user data
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //we need a useNavigate hook to allow us to navigate between components... no more manual URL changes!
  const navigate = useNavigate();

  //function to store input box values
  const storeValues = (input: any) => {
    //if the "username" input changed, set the value of username in the user state object

    if (input.target.name === "username") {
      setUser((user) => ({ ...user, username: input.target.value }));
    } else {
      setUser((user) => ({ ...user, password: input.target.value }));
    }

    //rememeber the "..." is known as the "spread operator"
    //it SPREADS across an entire object so we can do things like send a whole object to a child component
    //or in this case, we're spreading for only the useState hook so we change individual values
  };

  const login = async () => {
    //TODO: We should validate user input here AND on the backend

    //use the username/password in state to send a POST to the java server
    //NOTE: with credentials is what lets us send/save user session info
    const response = await axios
      .post("http://localhost:8080/auth", user, { withCredentials: true })
      .then((response) => {
        //print the data
        console.log(response.data);

        //Save the incoming user data in our global state (store.ts in the globalData folder)
        store.loggedInUser = response.data;


        setIsAuthenticated(true);

        //depending on the user's role value, send them to one of two components
        if (response.data.role === "User") {
          //use our useNavigate hook to switch views to the Car Container Component
          //navigate("/reimbursements");
        }

        if (response.data.role === "Admin") {
          //navigate("/reimbursements");
        }
      })
      .catch((error) => {
      });
  };

  return (
    <>
      <div className="login">
        <div className="text-container">
          <div>
            <h3>Log In to Manage Reimbursements</h3>

            <div className="input-container">
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={storeValues}
              />
            </div>

            <div className="input-container">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={storeValues}
              />
            </div>

            <button className="login-button" onClick={login}>
              Login
            </button>
            <button
              className="login-button"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
