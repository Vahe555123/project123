import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhoneList from './phone/phoneList';
import AddPhone from './phone/addPhone';
import EditPhone from './phone/editPhone';
import { LoginPage } from './login';
import { useEffect } from 'react';
import { adminProfile } from './api';

function App() {
  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('adminToken')
        if (!token) return;
        const response = await adminProfile(token)
        console.log(response);
      } catch (error) {
        localStorage.removeItem('adminToken');
        window.location.replace("/login")
        console.log(error);
      }
    }
    getData()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneList />} />
        <Route path="/add" element={<AddPhone />} />
        <Route path="/edit/:id" element={<EditPhone />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
