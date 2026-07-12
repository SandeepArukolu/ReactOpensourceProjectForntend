import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../ItemContext/ItemsProvider";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const ProductList = () => {
  const { items, fetchItems, updateItem } = useContext(ItemsContext);

  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const toggleModal = () => setModal(!modal);

  const handleRowClick = (row) => {
    setSelectedItem(row);
    setModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedItem((prev) => ({
      ...prev,
      value,
    }));
  };

  const handleUpdateItem = () => {
    updateItem(selectedItem);
    toggleModal();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Products</h3>

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Item Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Discount</th>
            <th>GST (Tax)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.itemName}</td>
                <td>{item.itemQty}</td>
                <td>{item.itemPrice}</td>
                <td>{item.itemDiscount}</td>
                <td>{item.itemTax}</td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleRowClick(item)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Edit Product
        </ModalHeader>

        <ModalBody>
          {selectedItem && (
            <>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="itemName"
                  value={selectedItem.itemName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  className="form-control"
                  type="text"
                  name="itemQty"
                  value={selectedItem.itemQty || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  className="form-control"
                  type="text"
                  name="itemPrice"
                  value={selectedItem.itemPrice || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Discount</label>
                <input
                  className="form-control"
                  type="text"
                  name="itemDiscount"
                  value={selectedItem.itemDiscount || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">GST (Tax)</label>
                <input
                  className="form-control"
                  type="text"
                  name="itemTax"
                  value={selectedItem.itemTax || ""}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleUpdateItem}>
            Update
          </Button>

          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductList;