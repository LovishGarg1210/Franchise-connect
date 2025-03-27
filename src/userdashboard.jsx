import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from './userdashboard/usercomponents/Sidebar.jsx';
import Header from './userdashboard/usercomponents/Header.jsx';
import Dashboard from './userdashboard/userpages/Dashboard.jsx';
import Sales from './userdashboard/userpages/Sales.jsx';
import Expenses from './userdashboard/userpages/Expenses.jsx';
import SalesHistory from './userdashboard/userpages/Historpage.jsx';
import EmployeeList from './userdashboard/userpages/Employeepage.jsx';
import  Settings  from './userdashboard/userpages/settings.jsx'

function Userdashboard() {
    const [isOpen, setIsOpen] = React.useState(true);
  return (
   
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="flex-1 w-20">
          <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
          <main >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/history" element={<SalesHistory/>} />
              <Route path="/employees" element={<EmployeeList/>} />
              <Route path="/settings" element={<Settings/>} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
  
  );
}

export default Userdashboard;