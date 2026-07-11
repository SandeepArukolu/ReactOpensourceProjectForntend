
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = async () => {
    try {
        const API_BASE_URL = "https://localhost:7053/api/OpenSource";
        const response = await axios.get(`${API_BASE_URL}/GetAllItems`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response && response.data) {
          setItems(response.data);
         // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
   
  };
  return (
    <ItemsContext.Provider value={{ items, fetchItems}}>
      {children}
    </ItemsContext.Provider>
  );
};
