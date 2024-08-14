import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";
import "./Login.css"


export const Account: React.FC = () => {
  //TODO: change this to UserInterface(after lunch)
  //set state (will consist of the user's input)
  const [user, setUser] = useState({
    firstName: store.loggedInUser.firstName,
    lastName: store.loggedInUser.lastName,
    username: store.loggedInUser.username,
    email: store.loggedInUser.email,
    role: store.loggedInUser.role,
  })

  //useNavigate to let us go back to login
  const navigate = useNavigate();

  //function to store the user input values
  const storeValues = (input: any) => {
    //if the input that has changed is the input with name "username", change username in the state object
    if(input.target.value){
    if (input.target.name === "lastName") {
      setUser((user) => ({ ...user, lastName: input.target.value }))
    } else if (input.target.name === "email") {
      setUser((user) => ({ ...user, email: input.target.value }))
    }
  }else{
    if (input.target.name === "lastName") {
      setUser((user) => ({ ...user, lastName: store.loggedInUser.lastName }))
    } else if (input.target.name === "email") {
      setUser((user) => ({ ...user, email: store.loggedInUser.email }))
    }
  }

  }

  //Function to send a POST request with our user state data to register a user in the backend
  //Remember!!!! The @CrossOrigin annotation
  const update = async () => {
    //TODO: check the the username and password are present

    //POST REQUEST - send this new user info to the backend
    const response = await axios
      .patch("http://localhost:8080/users/user=" + store.loggedInUser.userId, user)
      .then((response) => {
        store.loggedInUser.lastName = user.lastName
        store.loggedInUser.email = user.email
        navigate("/"); //send the user back to login after successful register
      })
      .catch((error) => {
        //NOTE: if you send back an error message from the back end, you could use that instead
      });
  };

  return (
    <div>
      <div className="popup-container" >
        <h3>Manage Account</h3>
        <div className="input-container">
        <label className="inputLabel">First Name</label>
        <div className="left">{store.loggedInUser.firstName}</div>
        </div>
        <div className="input-container">
        <label className="inputLabel">Last Name</label>
          <input
            type="text"
            placeholder={store.loggedInUser.lastName}
            name="lastName"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
        <label className="inputLabel">Username</label>
        <div className="left">{store.loggedInUser.username}</div>
        </div>
        <div className="input-container">
        <label className="inputLabel">Email</label>
          <input
            type="text"
            placeholder={store.loggedInUser.email}
            name="email"
            onChange={storeValues}
          />
        </div>

        <button className="login-button" onClick={update}>
          Save
        </button>

      </div>
    </div>
  )
}
