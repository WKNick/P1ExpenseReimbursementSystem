import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { Button, Table } from "react-bootstrap";
import { store } from "../../globalData/store";
import { AddReimbursement } from "./AddReimbursement";
import { EditReimbursement } from "./EditReimbursement";
import "./Reimbursement.css"

interface ReimbursementProps {
  reimbursements: ReimbursementInterface[];
  onCallback: () => void;
}

export const Reimbursement: React.FC<ReimbursementProps> = ({
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
  


  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const openEditPopup = (reimbursement: ReimbursementInterface) => {
    setCurrentReimbursement(reimbursement)
    setIsEditPopupOpen(true)
  };
  const closeEditPopup = () => setIsEditPopupOpen(false);

  const [currentReimbursement, setCurrentReimbursement] =
    useState<ReimbursementInterface>({
      reimbursementId: 0,
      description: "",
      amount: 0,
      status: "",
      user: {
        userId: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        role: "",
      },
    })



    
    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(event.target.value)
    }

  return (
    <div className="container">
      
      <h3>{store.loggedInUser.firstName} {store.loggedInUser.lastName}'s Reimbursements:</h3>

      <EditReimbursement
        reimbursement={currentReimbursement}
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        onCallback={onCallback}
      />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
              ID {sortColumn === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
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
            <th>
              <button onClick={openPopup} className="input">New Reimbursement</button>
              <AddReimbursement
                isOpen={isPopupOpen}
                onClose={closePopup}
                onCallback={onCallback}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedReimbursements.map((reimbursement, index) => (
             statusFilter === 'All' || reimbursement.status === statusFilter ? (
            
            <tr key={reimbursement.reimbursementId}>

            

              <><td>{reimbursement.reimbursementId}</td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.status}</td>
              <td>
                  {reimbursement.status === "Pending" ? (
                    <button onClick={() => openEditPopup(reimbursement)} className="input">
                      Edit Reimbursement
                    </button>
                  ) : (
                    <div></div>
                  )}
                </td></>
          
            </tr>
             ):
             <div>

             </div>
            
              
          ))}
        </tbody>
      </Table>
    </div>
  )
}
