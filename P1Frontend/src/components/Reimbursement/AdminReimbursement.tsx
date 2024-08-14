import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { Button, Table } from "react-bootstrap";
import { store } from "../../globalData/store";
import { AddReimbursement } from "./AddReimbursement";
import { EditReimbursement } from "./EditReimbursement";
import axios from "axios";

interface ReimbursementProps {
  reimbursements: ReimbursementInterface[];
  onCallback: () => void;
}

export const AdminReimbursement: React.FC<ReimbursementProps> = ({
  reimbursements,
  onCallback,
}) => {


  const [statusFilter, setStatusFilter] = useState<string>('All')

  const [sortedReimbursements, setSortedReimbursements] = useState<ReimbursementInterface[]>(reimbursements)
  const [sortColumn, setSortColumn] = useState<string>('id')
  const [sortOrder, setSortOrder] = useState<string>('asc')

  useEffect(() => {
    const timer = setTimeout(() => {
      sortData()
    }, 400)
    return () => clearTimeout(timer);

  }, )

  useEffect(() => {
    sortData()
  }, [statusFilter, sortOrder, sortColumn])

  const sortData = () => {
    const sorted = [...reimbursements].sort((a, b) => {
      if (sortColumn === 'id') {
        if (a.reimbursementId === undefined) return 1
        if (b.reimbursementId === undefined) return -1
        return sortOrder === 'asc' ? a.reimbursementId - b.reimbursementId : b.reimbursementId - a.reimbursementId
      } else if (sortColumn === 'status') {
        if (a.status === undefined) return 1
        if (b.status === undefined) return -1
        return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      }
      return 0
    })
    setSortedReimbursements(sorted)
  }
  const handleSort = (column: SetStateAction<string>) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc"
    setSortColumn(column)
    setSortOrder(order)
  };
  
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value)
  }
  
  return (
    <div className="container">
      <h3>All Reimbursements:</h3>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
              ID {sortColumn === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th>User</th>
            <th>Description</th>
            <th>Amount</th>
            <th>
            <label>Status: </label>
                <select className="input" id="statusFilter" value={statusFilter} onChange={handleFilterChange}>
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                </select>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedReimbursements.map((reimbursement, index) => (
            statusFilter === 'All' || reimbursement.status === statusFilter ? (
            
            <tr key={reimbursement.reimbursementId}>
              <td>{reimbursement.reimbursementId}</td>
              <td>
                {reimbursement.user?.firstName} {reimbursement.user?.lastName}
              </td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.status}</td>
              <td>
                {reimbursement.status === "Pending" ? (
                  <>
                    <button className="input"
                      onClick={async () => {
                        await axios.patch(
                          "http://localhost:8080/reimbursements/reimbursement=" +
                            reimbursement.reimbursementId,
                          {
                            description: reimbursement.description,
                            amount: reimbursement.amount,
                            status: "Approved",
                            userID: store.loggedInUser.userId,
                          }
                        );
                        onCallback();
                      }}
                    >
                      Approve
                    </button>
                    <button className="input"
                      onClick={async () => {
                        await axios.patch(
                          "http://localhost:8080/reimbursements/reimbursement=" +
                            reimbursement.reimbursementId,
                          {
                            description: reimbursement.description,
                            amount: reimbursement.amount,
                            status: "Denied",
                            userID: store.loggedInUser.userId,
                          }
                        );
                        onCallback();
                      }}
                    >
                      Deny
                    </button>
                  </>
                ) : (
                  <div></div>
                )}
              </td>
            </tr>
            ):
            <div>

            </div>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
