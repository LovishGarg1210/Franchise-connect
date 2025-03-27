import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import ApplicationForm from './components/ApplicationForm';
import { Route, Routes, useLocation } from 'react-router-dom';
import Formsubmitted from './components/Formsubmitted';
import RegistartionForm from './components/Login.jsx';
import Userdashboard from "./userdashboard.jsx";
import Homepage from './components/Homepage';

function App() {
  const location = useLocation();  // Get current location

  // Check if the current route is the Userdashboard page
  const isUserDashboard = location.pathname.includes('/userdashboard');

  return (
    <div className="min-h-screen bg-white">
      {!isUserDashboard && <Navbar />} {/* Conditionally render Navbar */}

      <main className={`${isUserDashboard ? 'p-0 m-0' : 'pt-24 pb-20 px-4 sm:px-6 lg:px-8'}`}>
        <div className={`w-full mx-auto ${isUserDashboard ? 'p-0 m-0' : ''}`}>
          <div className={`text-center mb-12 animate-fade-in ${isUserDashboard ? 'hidden' : ''}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join Our Franchise Family
            </h1>
            <p className="text-lg text-gray-600">
              Take the first step towards owning your own business. Fill out the application below to get started.
            </p>
          </div>

          {/* Adjusting width for mobile sizes */}
          <div className={`w-full sm:w-[80%] mx-auto ${isUserDashboard ? 'p-0 m-0 w-full ' : ''} sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[100%]`}>
            <Routes>
              <Route path="/" element={<ApplicationForm />} />
              <Route path="/submitted" element={<Formsubmitted />} />
              <Route path="/login" element={<RegistartionForm />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/franchise" element={<ApplicationForm/>} />
              <Route path="/userdashboard/*" element={<Userdashboard />} />
            </Routes>
          </div>
        </div>
      </main>

      {!isUserDashboard && (
        <footer className="bg-black w-full text-center text-gray-100 px-4 py-3 sm:px-6 lg:px-8">
          &copy; 2022 FranchiseConnect. All rights reserved.
        </footer>
      )}
    </div>
  );
}

export default App;
