import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./products-list.module.scss";
import axios from "axios";
import { message, Button } from "antd";

function Product(props) {
  const [isModify, setIsModify] = useState(false);
  const isNewProduct = props.isNewProduct;
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [measureUnit, setMeasureUnit] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const product = props.itemData;
  console.log("props.itemDate&product: ", product);
  const history = useHistory();

  useEffect(() => {
    if (!isNewProduct) {
      setProductCode(product.Code);
      setProductName(product.Name);
      setProductType(product.Type);
      setMeasureUnit(product.MeasureUnit);
      setProductPrice(product.Price);
      setProductStock(product.Stock);
    }
  }, [product, isNewProduct]);

  function handleTransRecordClick(code) {
    history.push(`/products/transaction?code=${code}`);
  }

  function handleModifyClick() {
    setIsModify(true);
  }

  async function handleDeleteClick(code) {
    try {
      const resData = await axios({
        url: "/api/product/delete",
        method: "POST",
        data: {
          code,
        },
      });
      console.log("handleDeleteClick resData: ", resData);
      if (resData.data.code === 200) {
        props.handleDeleteProductExcecute();
        message.success(resData.data.msg);
      }
    } catch (er) {
      console.log(
        "Get error from http://localhost:3000/api/product/delete",
        er
      );
    }
  }

  async function handleConfirmModifyClick(code) {
    setIsModify(false);

    const updateProductObj = {
      Code: productCode,
      Name: productName,
      Type: productType,
      MeasureUnit: measureUnit,
      Price: productPrice,
      Stock: productStock,
    };

    try {
      const resData = await axios({
        url: "/api/product/update",
        method: "POST",
        data: {
          code,
          updateProductObj,
        },
      });
      console.log("handleConfirmModifyClick resData: ", resData);
      if (resData.data.code === 200) {
        message.success(resData.data.msg);
      } else {
        message.warning(resData.data.msg);
      }
    } catch (er) {
      console.log(
        "Get error from http://localhost:3000/api/product/update",
        er
      );
    }
  }

  async function handleConfirmNewClick(code) {
    setIsModify(false);

    const updateProductObj = {
      Code: productCode,
      Name: productName,
      Type: productType,
      MeasureUnit: measureUnit,
      Price: productPrice,
      Stock: productStock,
    };

    try {
      const resData = await axios({
        url: "/api/product/new",
        method: "POST",
        data: {
          code,
          updateProductObj,
        },
      });
      console.log("handleConfirmNewClick resData: ", resData);
      if (resData.data.code === 200) {
        if (props.handleNewProductExecute) {
          props.handleNewProductExecute();
          console.log("handleNewProductExecute()........");
        }
        message.success(resData.data.msg);
      } else {
        message.warning(resData.data.msg);
      }
    } catch (er) {
      console.log(
        "Get error from http://localhost:3000/api/product/new",
        er
      );
    }
  }

  function handleCancelModifyClick() {
    setIsModify(false);
    setProductCode(product.Code);
    setProductName(product.Name);
    setProductType(product.Type);
    setMeasureUnit(product.MeasureUnit);
    setProductStock(product.Stock);
    setProductPrice(product.Price);
  }

  function handleInputChange(event) {
    if (event.target.name === "productCode") {
      setProductCode(event.target.value);
    } else if (event.target.name === "productName") {
      setProductName(event.target.value);
    } else if (event.target.name === "productType") {
      setProductType(event.target.value);
    } else if (event.target.name === "measureUnit") {
      setMeasureUnit(event.target.value);
    } else if (event.target.name === "productStock") {
      setProductStock(Number(event.target.value));
    } else if (event.target.name === "productPrice") {
      setProductPrice(Number(event.target.value));
    }
  }

  return (
    <ul className="products-list">
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="productCode"
            value={productCode}
            onChange={handleInputChange}
          />
        ) : (
          productCode
        )}
      </li>
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
          />
        ) : (
          productName
        )}
      </li>
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="productType"
            value={productType}
            onChange={handleInputChange}
          />
        ) : (
          productType
        )}
      </li>
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="measureUnit"
            value={measureUnit}
            onChange={handleInputChange}
          />
        ) : (
          measureUnit
        )}
      </li>
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="productPrice"
            value={productPrice !== 0 ? productPrice : ""}
            onChange={handleInputChange}
          />
        ) : (
          productPrice
        )}
      </li>
      <li className="products-list-item">
        {isModify || isNewProduct ? (
          <input
            type="text"
            name="productStock"
            value={productStock !== 0 ? productStock : ""}
            onChange={handleInputChange}
          />
        ) : (
          productStock
        )}
      </li>
      <li className="products-list-item">
        <button
          type="button"
          onClick={() => handleTransRecordClick(productCode)}
        >
          &nbsp;Transactions&nbsp;
        </button>
      </li>
      {isModify || isNewProduct ? (
        <li className="products-list-item">
          {isModify && (
            <button
              type="button"
              onClick={() => handleConfirmModifyClick(product.Code)}
            >
              &nbsp;OK&nbsp;
            </button>
          )}
          {isNewProduct && (
            <button
              type="button"
              onClick={() => handleConfirmNewClick(productCode)}
            >
              &nbsp;OK&nbsp;
            </button>
          )}
          &nbsp;
          {isModify && (
            <button type="button" onClick={handleCancelModifyClick}>
              &nbsp;Cancel&nbsp;
            </button>
          )}
        </li>
      ) : (
        <li className="products-list-item">
          <button type="button" onClick={() => handleModifyClick()}>
            &nbsp;Modify&nbsp;
          </button>
          &nbsp;
          <button type="button" onClick={() => handleDeleteClick(productCode)}>
            &nbsp;Delete&nbsp;
          </button>
        </li>
      )}
    </ul>
  );
} 

function ProductsList(props) {
  const [productsList, setProductsList] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [afterDelete, setAfterDelete] = useState(false);

  function handleNewProductClick() {
    setIsNewProduct(true);
  }

  function handleNewProductExecute() {
    setIsNewProduct(false);
    console.log(" setIsNewProduct(false);.....");
  }

  function handleDeleteProductExcecute() {
    setAfterDelete(true);
  }

  useEffect(() => {
    async function getProductsList() {
      try {
        const resData = await axios({
          url: "/api/products",
          method: "POST",
          data: {},
        });
        console.log("getProducts resData: ", resData);
        setProductsList(resData?.data);
      } catch (er) {
        console.log("Get error from http://localhost:3000/login/products", er);
      }
    }

    getProductsList();

    if (afterDelete) {
      setAfterDelete(false);
    }
  }, [isNewProduct, afterDelete]);

  return (
    <div className={styles["products-list-div"]}>
      <ul className="products-list header">
        <li className="products-list-item">Product Code</li>
        <li className="products-list-item">Product Name</li>
        <li className="products-list-item">Product Type</li>
        <li className="products-list-item">Measure Unit</li>
        <li className="products-list-item">Product Price</li>
        <li className="products-list-item">Product Stock</li>
        <li className="products-list-item">Transaction</li>
        <li className="products-list-item">Operation</li>
      </ul>
      {productsList.length !== 0 ? (
        productsList.map((product, index) => (
          <Product
            itemData={product}
            key={index}
            handleDeleteProductExcecute={handleDeleteProductExcecute}
          />
        ))
      ) : (
        <h2 className="products-list-row-text">There are no products!</h2>
      )}
      {isNewProduct && (
        <Product
          isNewProduct={isNewProduct}
          handleNewProductExecute={handleNewProductExecute}
        />
      )}
      <div className="products-list-new-button">
        <Button type="primary" onClick={handleNewProductClick}>
          New Product
        </Button>
      </div>
    </div>
  );
}

export default ProductsList;
