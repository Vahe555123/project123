import { useState } from 'react';
import { createPhone } from '../api';

const AddPhone = () => {
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', image: null, images: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChangeMain = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleFileChangeAll = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        
        if (formData.image) {
            data.append('image', formData.image);
        }
        formData.images.forEach((file) => {
            data.append(`images`, file);
        });

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
                <label>Image main:</label>
                <input type="file" onChange={handleFileChangeMain} />
            </div>
            <div>
                <label>Image all:</label>
                <input type="file" onChange={handleFileChangeAll} multiple />
            </div>
            <button type="submit">Add Phone</button>
        </form>
    );
};

export default AddPhone;
