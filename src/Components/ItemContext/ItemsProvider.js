
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
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${API_BASE_URL}/api/OpenSource/GetAllItems`, {
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
