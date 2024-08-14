import { useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";
import axios from "axios";
import { User } from "./User";
import { UserInterface } from "../../interfaces/UserInterface";

export const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:8080/users");
    setUsers(response.data);
  };

  return (
    <div>
      <User users={[...users].sort((a, b) => {
    if (a.userId === undefined) return 1;
    if (b.userId === undefined) return -1;
    return b.userId - a.userId;
  })} onCallback={getAllUsers} />
    </div>
  );
};
