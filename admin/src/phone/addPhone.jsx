import { useState } from 'react';
import { createPhone } from '../api';

const AddPhone = () => {
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', image: null });

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

        await createPhone(data);
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
            <button type="submit">Add Phone</button>
        </form>
    );
};

export default AddPhone;
