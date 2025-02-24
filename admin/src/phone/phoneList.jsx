import  { useState, useEffect } from 'react';
import { getPhones, deletePhone } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  useEffect(() => {
    fetchPhones();
  }, []);
  const nav = useNavigate()
  const fetchPhones = async () => {
    const response = await getPhones();
    setPhones(response.data);
  };
  console.log(phones);
  
  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken')
    if(!token){
      nav('/login')
      return;
    }
    await deletePhone(id , token);
    fetchPhones();
  };

  return (
    <div>
      <Link to="/add">Add Phone</Link>
      <ul>
        {phones.map((e) => (
          <li key={e._id}>
            <h3>{e.name}</h3>
            <p>{e.brand} - ${e.price}</p>
            {e.imageUrl && <img src={`http://localhost:3001/uploads/${e.imageUrl}`} alt={e.name} width="100" />}
            <div>
              <Link to={`/edit/${e._id}`}>Edit</Link>
              <button onClick={() => handleDelete(e._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneList;
