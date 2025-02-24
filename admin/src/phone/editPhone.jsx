import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPhoneById, updatePhone } from '../api';

const EditPhone = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', brand: '', price: '', image: null });

  useEffect(() => {
    fetchPhone();
  }, []);

  const fetchPhone = async () => {
    const response = await getPhoneById(id);
    setFormData(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('brand', formData.brand);
    data.append('price', formData.price);
    if (formData.image) data.append('image', formData.image);

    await updatePhone(id, data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Update Phone</button>
    </form>
  );
};

export default EditPhone;
