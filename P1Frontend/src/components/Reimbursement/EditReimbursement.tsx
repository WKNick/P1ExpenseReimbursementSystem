import { useState } from "react";
import { FormControl } from "react-bootstrap";
import "./EditReimbursement.css";
import axios from "axios";
import { store } from "../../globalData/store";
import { useNavigate } from "react-router-dom";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";

interface PopupProps {
  reimbursement: ReimbursementInterface;
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}

export const EditReimbursement: React.FC<PopupProps> = ({
  reimbursement,
  isOpen,
  onClose,
  onCallback,
}) => {
  const [editedReimbursement, setEditedReimbursement] = useState({
    description: reimbursement.description,
    amount: reimbursement.amount,
    status: reimbursement.status,
    userID: 0,
  })

  const storeValues = (input: any) => {
    //if the "username" input changed, set the value of username in the user state object

    if (input.target.name === "description") {
      setEditedReimbursement((editedReimbursement) => ({
        ...editedReimbursement,
        description: input.target.value,
      }))
      setEditedReimbursement((editedReimbursement) => ({
        ...editedReimbursement,
        status: reimbursement.status,
      }))
    }

    //rememeber the "..." is known as the "spread operator"
    //it SPREADS across an entire object so we can do things like send a whole object to a child component
    //or in this case, we're spreading for only the useState hook so we change individual values
  };

  const handleSubmit = async () => {
    const response = await axios
      .patch(
        "http://localhost:8080/reimbursements/reimbursement=" +
          reimbursement.reimbursementId,
        editedReimbursement
      )
      .catch((error) => {

      })
      .finally(() => {
        onCallback();
      });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <h2>Update Reimbursement</h2>

      <label>
        Description:
        <input className="grey" name="description" type="text" onChange={storeValues} required />
      </label>
      <br />
      <button className="grey" type="submit" onClick={handleSubmit}>
        Update
      </button>
      <button className="grey" type="button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};
