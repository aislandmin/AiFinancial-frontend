import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { urlToObj } from "../../common/common-functions";
import styles from "./transactions-list.module.scss";

function Transaction(props) {
  const transaction = props.itemData;
  console.log("props.itemDate&transaction: ", transaction);

  return (
    <ul className="transactions-list">
      <li className="transactions-list-item">{transaction.Code}</li>
      <li className="transactions-list-item">{transaction.Date}</li>
      <li className="transactions-list-item">{transaction.Number}</li>
    </ul>
  );
}

export default function TransactionsList() {
  const location = useLocation();
  const [transactionsList, setTransactionsList] = useState([]);
  const urlParamsObj = urlToObj(location.search);
  const { code } = urlParamsObj;

  useEffect(() => {
    async function getTranctionsListByCode(code) {
      try {
        const resData = await axios({
          url: "/api/transactions",
          method: "POST",
          data: { code },
        });
        console.log("getTranctionsListByCode resData: ", resData);
        setTransactionsList(resData?.data);
      } catch (er) {
        console.log(
          "Get error from http://localhost:3000/login/transactions",
          er
        );
      }
    }

    getTranctionsListByCode(code);
  }, [code]);

  return (
    <div className={styles["transactions-list-div"]}>
      <ul className="transactions-list header">
        <li className="transactions-list-item">Product Code</li>
        <li className="transactions-list-item">Sale Date</li>
        <li className="transactions-list-item">Sale Number</li>
      </ul>
      {transactionsList.length !== 0 ? (
        transactionsList.map((transaction, index) => (
          <Transaction itemData={transaction} key={index} />
        ))
      ) : (
        <h2 className="transactions-list-row-text">
          There are no transaction records!
        </h2>
      )}
    </div>
  );
}
