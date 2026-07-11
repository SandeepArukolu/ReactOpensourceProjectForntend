import { useState, useEffect, useContext } from "react"
import "./Invoice.css";
import axios from "axios";
import Loader from "./Loader/Loader";
import { ItemsContext } from "./ItemContext/ItemsProvider";
function Invoice(){
        const [formData, setFormData] = useState({
          customerName: "",
          customerEmail: "",
          itemName: "",
          itemPrice: "",
          quantity: 1,
          discount: 0,
          Itemtax:0,
          totalAmount: 0,
        });
 const [loading, setLoading] = useState(false);
 //const [items, setItems] = useState([]);
 const [isSubmit, setSubmitButton]= useState(false);
const {items, fetchItems} = useContext(ItemsContext);

useEffect(() => {
  fetchItems();
    }, [fetchItems]);

        // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name == "itemName"){
      var item = items.filter(x=>x.itemName == value);
      setFormData((prevData) => ({
        ...prevData,
        itemPrice: item[0].itemPrice
      }));
      setFormData((prevData) => ({
        ...prevData,
        discount: item[0].itemDiscount
      }));
      const {quantity} = formData;
      const itemPrice = item[0].itemPrice;
     const itemDiscount = item[0].itemDiscount;
    const discountedPrice = itemPrice * quantity * (1 - itemDiscount / 100);
    const taxRate = 10; // Example tax rate of 10%
     const total = discountedPrice * (1 + taxRate / 100);
      //const total = (item[0].itemPrice * quantity) * (1 - item[0].itemDiscount / 100);
      setFormData((prevData) => ({
        ...prevData,
        Itemtax: taxRate,
      }));
      setFormData((prevData) => ({
        ...prevData,
        totalAmount: total.toFixed(2),
      }));
    }
    if(name == "quantity" && value != "" && value != "0"){
      const {itemPrice, discount } = formData;
      let qty= parseInt(value);
      setSubmitButton(false);
      //const total = (itemPrice * qty) * (1 - discount / 100);
    const discountedPrice = itemPrice * qty * (1 - discount / 100);
    const taxRate = 10; // Example tax rate of 10%
     const total = discountedPrice * (1 + taxRate / 100);
      setFormData((prevData) => ({
        ...prevData,
        totalAmount: total.toFixed(2),
      }));
    }
    if(name == "quantity" && (value == "0" || value == "")){
      setSubmitButton(true);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const API_BASE_URL = "https://localhost:7053/api/OpenSource";
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_BASE_URL}/DownloadInvoice`, formData, {
            responseType: 'blob', // Set responseType here
            headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token
              'Content-Type': 'application/json', // Ensure content type is set
          },
        });       
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
       var obj= JSON.parse(response.config.data)
        a.download = `${obj.customerName}_Invoice.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Revoke the object URL after download
        window.URL.revokeObjectURL(url);
        const initialFormData = {
          customerName: "",
          customerEmail: "",
          itemName: "",
          itemPrice: "",
          quantity: 1,
          discount: 0,
          Itemtax:0,
          totalAmount: 0,
      };
      setFormData(initialFormData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
        console.error('Error downloading the invoice:', error);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};
    
  return (
    <div className="invoice-form-container">
      <h2>Invoice Form</h2>
      <form onSubmit={handleSubmit} className="invoice-form">
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Name:</label>
          <select
        name="itemName"
        value={formData.itemName}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>Select an item</option>
        {items.map(item => (
          <option key={item.itemId} value={item.itemName}>{item.itemName}</option>
        ))}
      </select>
        </div>

        <div className="form-group">
          <label>Item Price:</label>
          <input
            type="number"
            name="itemPrice"
            value={formData.itemPrice}
             disabled= {true}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
             disabled= {true}
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>GST(%):</label>
          <input
            type="number"
            name="Itemtax"
            value={formData.Itemtax}
             disabled= {true}
            min="0"
            max="100"
          />
        </div>

        {/* <div className="form-group">
          <button type="button" onClick={calculateTotal}>
            Calculate Total
          </button>
        </div> */}

        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="text"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
          />
        </div>
        <button type="submit" disabled= {isSubmit} className="submit-btn">
          Submit Invoice
        </button>
      </form>
      {loading ? <Loader /> : <div></div>}
    </div>
  );
}


export default Invoice