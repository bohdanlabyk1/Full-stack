const API_URL = 'http://localhost:3001/cart';

export const getCart = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`);
  return response.json();
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await fetch('http://localhost:3001/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    // Check if the response status is not OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding to cart:', errorData);
      throw new Error('Failed to add to cart');
    }

    const data = await response.json();
    console.log('Item added to cart successfully:', data);
    return data;
  } catch (error) {
    console.error('Request failed:', error);
  }
};

export const updateCartItem = async (userId, cartItemId, quantity) => {
  await fetch(`${API_URL}/update`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cartItemId, quantity }),
  });
};

export const removeFromCart = async (userId, cartItemId) => {
  await fetch(`${API_URL}/remove`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cartItemId }),
  });
};
