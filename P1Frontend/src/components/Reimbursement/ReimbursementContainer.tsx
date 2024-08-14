import { useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";
import axios from "axios";
import { Reimbursement } from "./Reimbursement";

export const ReimbursementContainer: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<
    ReimbursementInterface[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllReimbursements();
  }, []);

  const getAllReimbursements = async () => {
    const response = await axios.get(
      "http://localhost:8080/reimbursements/user=" + store.loggedInUser.userId
    );
    setReimbursements(response.data);
  };

  return (
    <div>
      <Reimbursement
        reimbursements={[...reimbursements].sort((a, b) => {
          if (a.reimbursementId === undefined) return 1;
          if (b.reimbursementId === undefined) return -1;
          return b.reimbursementId - a.reimbursementId;
        })}
        onCallback={getAllReimbursements}
      />
    </div>
  );
};
