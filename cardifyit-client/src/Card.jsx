import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

// Define a Card component and use useState hook to define two state variables
const Card = () => {
  // State variable to hold card data
  const [cardData, setCardData] = useState([]);
  // State variable to hold error message
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch card data on component mount
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      // Fetch card data from API
      const response = await fetch(API_URL);
      // Parse response as JSON
      const data = await response.json();
      // Update state with card data
      setCardData(data);
    } catch (error) {
      // Update state with error message
      setError(error);
    }
  };

  const handleCreate = async ({ name, description, productUrl, imageUrl, addToCardId } = {}) => {
    try {
      // Log item being added
      console.log(`add item: ${JSON.stringify({ name, description, productUrl, imageUrl, addToCardId })}`); 
      // Send new item to API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, description, productUrl, imageUrl, addToCardId }), 
      });
      // Parse response as JSON
      const returnedItem = await response.json(); 
      // Update state with new item
      setCardData([...cardData, returnedItem]);
    } catch (error) {
      // Update state with error message
      setError(error);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      // Log item being updated
      console.log(`update item: ${JSON.stringify(updatedItem)}`);
      // Send updated item to API endpoint
      await fetch(`${API_URL}/${updatedItem.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedItem),
      });
      // Update state with updated item
      setCardData(cardData.map(item => item.id === updatedItem.id ? updatedItem : item));
    } catch (error) {
      // Update state with error message
      setError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete item from API endpoint
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers,
      });
      // Update state by removing deleted item
      setCardData(cardData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Specify what should be rendered on the screen
  return (
    <div>
      <CardList
        name={term}
        data={cardData}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

// Define type of props passed to the Card component
Card.propTypes = {
  term: PropTypes.string,
  API_URL: PropTypes.string,
  headers: PropTypes.object
};