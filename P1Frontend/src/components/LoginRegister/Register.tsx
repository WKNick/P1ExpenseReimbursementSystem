import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  //TODO: change this to UserInterface(after lunch)
  //set state (will consist of the user's input)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "User", //we want role to be user by default
  });

  //useNavigate to let us go back to login
  const navigate = useNavigate();

  //function to store the user input values
  const storeValues = (input: any) => {
    //if the input that has changed is the input with name "username", change username in the state object
    if (input.target.name === "firstName") {
      setUser((user) => ({ ...user, firstName: input.target.value }));
    } else if (input.target.name === "lastName") {
      setUser((user) => ({ ...user, lastName: input.target.value }));
    } else if (input.target.name === "username") {
      setUser((user) => ({ ...user, username: input.target.value }));
    } else if (input.target.name === "email") {
      setUser((user) => ({ ...user, email: input.target.value }));
    } else if (input.target.name === "password") {
      setUser((user) => ({ ...user, password: input.target.value }));
    }
    /*NOTE: what if I have like 5 inputs? do I do if, else if, else if, else if, else??

        You definitiely could and it'd be fine. You could have each input be its own variable,
        instead of having it as a state object from the start.
        You would then just need to create an object at POST time with all the individual variables */
  };

  //Function to send a POST request with our user state data to register a user in the backend
  //Remember!!!! The @CrossOrigin annotation
  const register = async () => {
    //TODO: check the the username and password are present

    //POST REQUEST - send this new user info to the backend
    const response = await axios
      .post("http://localhost:8080/users", user)
      .then((response) => {
        console.log(response.data);
        navigate("/"); //send the user back to login after successful register
      })
      .catch((error) => {
        //NOTE: if you send back an error message from the back end, you could use that instead
      });
  };

  return (
    <div>
      <div className="text-container">
        <h3>Create an account</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="firstName"
            name="firstName"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="lastName"
            name="lastName"
            onChange={storeValues}
          />
        </div>
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
            type="text"
            placeholder="email"
            name="email"
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

        <button className="login-button" onClick={register}>
          Submit
        </button>
        <button className="login-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};
