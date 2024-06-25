import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faProcedures, faUserMd, faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { SignUp, Login, Homepage, Patients, Wards, Staffs, AddPatients, Supplies, SurgicalSupplies, NonsurgicalSupplies, 
  PharmaceuticalSupplies, AddNextOfKin, AddStaff, InPatient, OutPatient, AddInPatient, AddOutPatient, PatientMedication, 
  AddSurgicalSupplies,AddNonSurgicalSupplies, AddPharmaceuticalSupplies, AddRequisition, 
  Suppliers,
  AddSupplier} from './pages';
import Dropdown from './pages/Dropdown.jsx';
import './pages/styles.css';
import PatientDropdown from './pages/PatientDropdown.jsx';

const App = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <div>
      <div className='content' style={{ marginTop: token ? '80px' : '0px' }}>
        <Routes>
         <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Login setToken={setToken} />} />
          {token && (         
            <>
              <Route path='/homepage' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>Welcome! {token.user.user_metadata.full_name}</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF </a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <Homepage token={token} />
                </>
              } />
              <Route path='/patients' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF </a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT</a></li>
                    </ul>
                  </nav>
                  <Patients />
                </>
              } />
              <Route path='/wards' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF </a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <Wards />
                </>
              } />
              <Route path='/staffs' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF </a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <Staffs />
                </>
              } />
              <Route path='/addpatients' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF </a></li>
                      <li><Dropdown /> </li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddPatients />
                </>
              } />
              <Route path='/surgicalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <SurgicalSupplies />
                </>
              } />
              <Route path='/nonsurgicalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <NonsurgicalSupplies /> 
                </>
              } />
              <Route path='/pharmaceuticalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <PharmaceuticalSupplies />
                </>
              } />
              <Route path='/addnextofkin' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown /></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddNextOfKin />
                </>
              } />
              <Route path='/addstaff' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddStaff />
                </>
              } />
              <Route path='/inpatient' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <InPatient />
                </>
              } />
               <Route path='/outpatient' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <OutPatient />
                </>
              } />
              <Route path='/addinpatient' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddInPatient />
                </>
              } />
              <Route path='/addinpatient' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddInPatient />
                </>
              } />
              <Route path='/addoutpatient' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddOutPatient />
                </>
              } />
               <Route path='/patientmedication' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <PatientMedication />
                </>
              } />
              <Route path='/addsurgicalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddSurgicalSupplies />
                </>
              } />
              <Route path='/addnonsurgicalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddNonSurgicalSupplies />
                </>
              } />
              <Route path='/addpharmaceuticalsupplies' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddPharmaceuticalSupplies />
                </>
              } />
              <Route path='/addrequisition' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddRequisition />
                </>
              } />
              <Route path='/suppliers' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <Suppliers />
                </>
              } />
              <Route path='/addsupplier' element={
                <>
                  <nav className='nav'>
                    <p className='dashboard'>WELLMEADOWS</p>
                    <ul>
                      <li><a href='/homepage' className='homepage'><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                      <li><PatientDropdown/></li>
                      <li><a href='/wards' className='wards'><FontAwesomeIcon icon={faProcedures} /> WARD</a></li>
                      <li><a href='/staffs' className='staffs'><FontAwesomeIcon icon={faUserMd} /> STAFF</a></li>
                      <li><Dropdown /></li>
                      <div className='separator'></div>
                      <li><a href='/' className='signout'><FontAwesomeIcon icon={faSignOutAlt} />  SIGN OUT </a></li>
                    </ul>
                  </nav>
                  <AddSupplier />
                </>
              } />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
