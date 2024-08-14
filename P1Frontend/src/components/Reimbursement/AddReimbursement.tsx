import { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./AddReimbursement.css";
import axios from "axios";
import { store } from "../../globalData/store";
import { useNavigate } from "react-router-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}

export const AddReimbursement: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  onCallback,
}) => {
  const [reimbursement, setReimbursement] = useState({
    description: "",
    amount: 0,
    status: "Pending",
    userID: 0,
  });

  const navigate = useNavigate();

  const storeValues = (input: any) => {
    //if the "username" input changed, set the value of username in the user state object

    if (input.target.name === "description") {
      setReimbursement((reimbursement) => ({
        ...reimbursement,
        description: input.target.value,
      }));
    } else if (input.target.name === "amount") {
      setReimbursement((reimbursement) => ({
        ...reimbursement,
        amount: input.target.value,
      }));
    }

    //rememeber the "..." is known as the "spread operator"
    //it SPREADS across an entire object so we can do things like send a whole object to a child component
    //or in this case, we're spreading for only the useState hook so we change individual values
  };

  const handleSubmit = async () => {
    const updatedReimbursement = {
      ...reimbursement,
      userID: store.loggedInUser.userId,
    };

    const response = await axios
      .post("http://localhost:8080/reimbursements", updatedReimbursement)
      .catch((error) => {
        alert("Login failed! Try again and do better next time");
      })
      .finally(() => {
        onCallback();
      });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <h2>Create Reimbursement</h2>

      <label>
        Description:
        <input className="grey" name="description" type="text" onChange={storeValues} required />
      </label>
      <br />
      <label>
        Amount:
        <input className="grey" name="amount" type="number" onChange={storeValues} required />
      </label>
      <br />
      <br />
      <button type="submit" onClick={handleSubmit} className="grey">
        Create
      </button>
      <button type="button" onClick={onClose} className="grey">
        Cancel
      </button>
    </div>
  );
};
