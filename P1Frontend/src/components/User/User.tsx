import { useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { Button, Table } from "react-bootstrap";
import { store } from "../../globalData/store";
import { UserInterface } from "../../interfaces/UserInterface";
import axios from "axios";

interface UserProps {
  users: UserInterface[];
  onCallback: () => void;
}

export const User: React.FC<UserProps> = ({ users, onCallback }) => {


  useEffect(() => {});



  return (
    <div className="container">
      <h3>Users:</h3>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === "User" ? (
                  <>
                    <button
                      onClick={async () => {

                        await axios
                          .patch(
                            "http://localhost:8080/users/user=" + user.userId,
                            {
                              userId: user.userId,
                              firstName: user.firstName,
                              lastName: user.lastName,
                              username: user.username,
                              email: user.email,
                              role: "Admin",
                            }
                          )
                          .then(() => {
                            onCallback();
                          })
                          .catch((error) => {
                            console.log(
                              "Update Failed! Try again and do better next time"
                            );
                          });
                      }}
                    >
                      Promote
                    </button>
                    <button
                      onClick={async () => {
                        await axios
                          .delete(
                            "http://localhost:8080/users/user=" + user.userId
                          )
                          .catch((error) => {
                            console.log(
                              "Delete Failed! Try again and do better next time"
                            );
                          });

                        onCallback();
                      }}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <div></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
