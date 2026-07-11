import React, { useContext, useEffect, useState, useRef } from 'react';
//import {  BootstrapTable ,TableHeaderColumn } from 'react-bootstrap-table';
//import {    } from 'react-bootstrap-table-next';
import { ItemsContext } from '../ItemContext/ItemsProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ProductList = () => {
  const { items, fetchItems } = useContext(ItemsContext);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { updateItem } = useContext(ItemsContext);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const toggleModal = () => setModal(!modal);

  const handleRowClick = (row) => {
    setSelectedItem(row);
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleUpdateItem = () => {
    updateItem(selectedItem);
    toggleModal();
  };

  console.log(items); // Debugging line

  return (
    <div>
      <BootstrapTable keyField='id' data={items} striped hover>
  <TableHeaderColumn isKey dataField='id' hidden>ID</TableHeaderColumn>
  <TableHeaderColumn dataField='itemName'>Item Name</TableHeaderColumn>
  <TableHeaderColumn dataField='itemQty'>Item Stock</TableHeaderColumn>
  <TableHeaderColumn dataField='itemPrice'>Item Price</TableHeaderColumn>
  <TableHeaderColumn dataField='itemDiscount'>Item Discount</TableHeaderColumn>
  <TableHeaderColumn dataField='itemTax'>GST(Tax)</TableHeaderColumn>
  <TableHeaderColumn dataField='action' dataFormat={(cell, row) => (
    <Button color="primary" onClick={() => handleRowClick(row)}>View Details</Button>
  )}>Action</TableHeaderColumn>
</BootstrapTable>


      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Item</ModalHeader>
        <ModalBody>
          {selectedItem && (
            <div>
              <label>Item Name</label>
              <input type="text" name="itemName" value={selectedItem.itemName} onChange={handleInputChange} />
              <label>Item Stock</label>
              <input type="text" name="itemQty" value={selectedItem.itemQty} onChange={handleInputChange} />
              <label>Item Price</label>
              <input type="text" name="itemPrice" value={selectedItem.itemPrice} onChange={handleInputChange} />
              <label>Item Discount</label>
              <input type="text" name="itemDiscount" value={selectedItem.itemDiscount} onChange={handleInputChange} />
              <label>GST(Tax)</label>
              <input type="text" name="itemTax" value={selectedItem.itemTax} onChange={handleInputChange} />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateItem}>Update</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductList;
