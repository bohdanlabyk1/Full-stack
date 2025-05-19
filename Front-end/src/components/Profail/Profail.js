import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
       console.log('Form data being sent:', formData);
      const response = await axios.put('http://localhost:3001/auth/me', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (!user) return <div className="loading">Завантаження...</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Мій акаунт</h1>
      <div className="profile-card">
        {[
          { label: 'Ім’я', name: 'username' },
          { label: 'Email', name: 'email' },
          { label: 'Телефон', name: 'phone' },
          { label: 'По батькові', name: 'patronymic' },
          { label: 'Дата народження', name: 'birthdate' },
  
        ].map((field) => (
          <div className="profile-field" key={field.name}>
            <label>{field.label}:</label>
            {editMode ? (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            ) : (
              <span>{user[field.name] || 'Не вказано'}</span>
            )}
          </div>
        ))}

        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="btn save" onClick={saveChanges}>
                Зберегти
              </button>
              <button
                className="btn cancel"
                onClick={() => {
                  setFormData(user);
                  setEditMode(false);
                }}
              >
                Скасувати
              </button>
            </>
          ) : (
            <button className="btn edit" onClick={() => setEditMode(true)}>
              Редагувати
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
