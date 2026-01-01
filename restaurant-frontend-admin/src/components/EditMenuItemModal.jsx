import React, { useState, useEffect } from 'react';
import API from '../api'; 
import './EditMenuItemModal.css';

function EditMenuItemModal({ isOpen, item, onClose, onSave, onDelete, mode }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    jainAvailable: false,
    image: '',
    availability: true,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      
      const fetchCategories = async () => {
        try {
          setLoadingCategories(true);
          const response = await API.get('/categories');
          setCategories(response.data);
          setCategoriesError(null);
          // If new item or no category selected, default to first category
          if ((!form.category || form.category === '') && response.data.length > 0) {
            setForm(prev => ({ ...prev, category: response.data[0]._id || response.data[0].name }));
          }
        } catch (error) {
          setCategoriesError('Failed to load categories');
          console.error(error);
        } finally {
          setLoadingCategories(false);
        }
      };

      fetchCategories();

     
      if (mode === 'edit' && item) {
        setForm({
          name: item.name || '',
          description: item.description || '',
          price: item.price || '',
          category: item.category || '',
          jainAvailable: item.jainAvailable || false,
          image: item.image || '',
          availability: item.availability ?? true,
        });
      } else {
        setForm({
          name: '',
          description: '',
          price: '',
          category: '',
          jainAvailable: false,
          image: '',
          availability: true,
        });
      }
    }
  }, [isOpen, item, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{mode === 'edit' ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* Category dropdown */}
          {loadingCategories ? (
            <div>Loading categories...</div>
          ) : categoriesError ? (
            <div className="error">{categoriesError}</div>
          ) : (
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          <label>
            <input
              type="checkbox"
              name="jainAvailable"
              checked={form.jainAvailable}
              onChange={handleChange}
            />
            Jain Option Available
          </label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="availability"
              checked={form.availability}
              onChange={handleChange}
            />
            Available
          </label>

          <div className="button-row">
            <button type="submit" className='delete-btn'>
              {mode === 'edit' ? 'Save Changes' : 'Add Item'}
            </button>
            {mode === 'edit' && (
              <button
                className="delete-btn"
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    onDelete(item._id);
                  }
                }}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuItemModal;
