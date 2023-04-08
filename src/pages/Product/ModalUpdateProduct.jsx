import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form, Button } from "react-bootstrap";

const initialState = {
  name: '',
  description: "",
  state: "",
  category: "",
};

const ModalUpdateProduct = ({
  show,
  productToEdit,
  setShowModal,
  setProductToEdit,
  updateProduct
}) => {
  const [product, setProduct] = useState(initialState);

  useEffect(() => {
    if(productToEdit && Object.keys(productToEdit).length !== 0){
        setProduct(productToEdit) 
      }else{
        setProduct(initialState)
      }
  }, [show]);

  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowModal(false);
    };

  const handleUpdateProduct = () => {
    updateProduct(product);
    setShowModal(false);
  };
  return (
    <Modal show={show} centered>
      <Modal.Header>Editar Producto</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text >Nombre Producto</InputGroup.Text>
          <Form.Control
            placeholder="Nombre de Producto"
            onChange={handleOnChange}
            name="name"
            value={product.name}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Descripcion</InputGroup.Text>
          <Form.Control
            placeholder="Descripcion del producto"
            name="description"
            value={product.description}
            onChange={handleOnChange}
          />
        </InputGroup>
        <Form.Select
          value={product.state}
          name="state"
          aria-label="Default select example"
          onChange={handleOnChange}
        >
          <option>Selecione un estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </Form.Select>
        <Form.Select
          value={product.category}
          name="category"
          aria-label="Default select example"
          onChange={handleOnChange}
        >
          <option>Seleccione una categoria</option>
          <option>Lacteos</option>
          <option>Gaseosa</option>
          <option>Dulces</option>
          <option>Abarrotes</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button onClick={handleUpdateProduct}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateProduct;
