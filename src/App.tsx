import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import EmployeeContainer from './components/EmployeeContainer';
import AddEmployee from './components/AddEmployee'
import EmployeeService from './services/EmployeeService';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


const App: React.FC = () => {

  // State of employees. Changed when employees change
  const [employees, setEmployees] = useState([{} as {id: string, firstName: string, lastName: string, email: string}])

  // Re-render the page after the state of employees has been changed
  useEffect(() => {

    const getEmployees = async () => {
      const employees = await EmployeeService.getAllEmployees()
      setEmployees(employees)
    }
    getEmployees()

  }, [employees])


  // Adds an employee by calling the EmployeeService, which has a method that actually adds an employee to the DB
  const addEmployee = async (employee: {firstName: string, lastName: string, email:string}) => {
    EmployeeService.addEmployee(employee)
  }
  
  // Deletes an employee by calling the EmployeeService, which has a method that actually deletes an employee from the DB
  const deleteEmployee = async (employeeId: string) => {
    EmployeeService.deleteEmployee(employeeId)
    setEmployees(employees.filter(employee => employee.id !== employeeId))
  }

  return(
    <Router>

      <div className='main-wrapper'>

        <Navbar />

        <Routes>
          <Route path="/" element={<EmployeeContainer onDelete={deleteEmployee} employees={employees}/>} />
          <Route path="/add-employees" element={<AddEmployee onAdd={addEmployee} />} />
        </Routes>

      </div>

    </Router>
  )
  
}

export default App
