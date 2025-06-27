const API_BASE_URL = 'http://localhost:3001';

const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};


// Categories API
export const getCategories = () => fetchData('/categories');

// Products API
export const getPopularCategories = () => fetchData('/categories/popularcategori');
export const getProducts = () => fetchData('/products');
export const getProductsByCategory = (categoryId) => fetchData(`/products/category/${categoryId}`);
export const searchProducts = (query) => fetchData(`/products/search?query=${query}`);
export const getPopularProducts = () => fetchData('/products/popular');
export const getNewProducts = () => fetchData('/products/new');

// Filters API (Додаємо)
export const getFilters = () => fetchData('/filters');
export const getProductByItem = (itemId) => fetchData(`/products/by-item/${itemId}`);


// Cart API
export const getCart = (userId) => fetchData(`/cart/${userId}`);
export const addToCart = (userId, productId, quantity) => 
  fetchData('/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, quantity }),
  });

export const updateCartItem = (userId, cartItemId, quantity) => 
  fetchData('/cart/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cartItemId, quantity }),
  });

export const removeFromCart = (userId, cartItemId) => 
  fetchData('/cart/remove', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cartItemId }),
  });

// Auth API
export const loginUser = (email, password) => 
  fetchData('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
export const createProduct = async (formData, token) => {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};


export const getMyProducts = async (token) => {
  return await fetchData('/products/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = (email, password, username) => 
  fetchData('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });

// Orders API
export const getOrders = (userId) => fetchData(`/orders/${userId}`);
export const createOrder = (userId, cartItems) => 
  fetchData('/orders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cartItems }),
  });

// Users API
export const getUserProfile = (userId) => fetchData(`/users/${userId}`);
export const updateUserProfile = (userId, userData) => 
  fetchData(`/users/update/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  
