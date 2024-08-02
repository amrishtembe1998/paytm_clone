import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchAmount = async () => {
      const balanceAmt = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBalance(balanceAmt.data.balance);
    };
    fetchAmount();
  }, []);
  return (
    <>
      <AppBar></AppBar>
      <div className="m-8">
        <Balance value={balance.toPrecision(4)}></Balance>
        <Users></Users>
      </div>
    </>
  );
};

export default Dashboard;
