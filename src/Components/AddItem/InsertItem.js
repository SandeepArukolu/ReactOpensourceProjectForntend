import { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const InsertItem = () =>{
   const [loading, setLoading] = useState(false);
     const [formData, setFormData] = useState({
              itemName: "",
              itemQty: 0,
              itemPrice: 0,
              itemDiscount: 0,
              ItemTax : 0
            });

            const handleInputChange = (e) => {
             const {name, value} = e.target;

             setFormData((prevdata) => ({
                ...prevdata, [name]: value,
             }))
            }

 const handleSubmit= async (e) => {
   debugger
   setLoading(true);
   e.preventDefault();
   const API_BASE_URL = "https://localhost:7053/api/OpenSource";
   const token = localStorage.getItem('token');
   try{
      if(formData != null){
         const response = await axios.post(`${API_BASE_URL}/AddItem`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token
              'Content-Type': 'application/json', // Ensure content type is set
          },
        }); 
       debugger
       const initialFormData={
              itemName: "",
              itemQty: 0,
              itemPrice: 0,
              itemDiscount: 0,
              ItemTax : 0
       }
        if(response){
         setLoading(false);
         setFormData(initialFormData);
         alert(response.data);
        }
      }
      else{
         setLoading(false);
      }
     
   }
   catch(error){
      setLoading(false);
      console.error('Error While Adding The item:', error);
      throw error.response ? error.response.data : new Error("Network Error");
   }
 }
    return(
        <div className="invoice-form-container">
         <h2>Add Item</h2>
         <form onSubmit={handleSubmit} className="invoice-form">
         <div className="form-group">
         <label>Name:</label>
         <input type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            required />
         </div>
         <div className="form-group">
           <label>Quantity:</label> 
        <input type="number"
         name="itemQty" 
        value={formData.itemQty} 
        onChange={handleInputChange}
        required />
         </div>
         <div className="form-group">
         <label>Price:</label>
         <input type="number" 
         name="itemPrice" value={formData.itemPrice}
          onChange={handleInputChange} min={0} required/>
         </div>
         <div className="form-group">
          <label>Discount: </label>
          <input type="number" name="itemDiscount" onChange={handleInputChange}
           value={formData.itemDiscount} required/>
         </div>
         <div className="form-group">
            <label>GST</label>
            <input type="text" name="ItemTax"
             onChange={handleInputChange}
             value={formData.ItemTax} required/>
         </div>
         <button type="submit"  className="submit-btn">
          Submit Invoice
        </button>
         </form>
         {loading ? <Loader /> : <div></div>}
        </div>
    )
}
export default InsertItem;