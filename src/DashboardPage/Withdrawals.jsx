import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Firebase_context";
import axios from "axios";

const Withdrawals = () => {
  
  const {  user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Load user info
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/user/${user.email}`).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [user]);

  // Update withdrawAmount based on coin input
  useEffect(() => {
    const amount = (coinToWithdraw / 20).toFixed(2);
    setWithdrawAmount(amount);
  }, [coinToWithdraw]);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (coinToWithdraw > userInfo?.coin) {
      Swal.fire("Error", "You can't withdraw more coins than you have.", "error");
      return;
    }

    const withdrawalData = {
      worker_email: userInfo?.email,
      worker_name: userInfo?.name,
      withdrawal_coin: parseInt(coinToWithdraw),
      withdrawal_amount: parseFloat(withdrawAmount),
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:5000/withdrawals", withdrawalData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Withdrawal request submitted!", "success");
        // Reset form
        setCoinToWithdraw(0);
        setPaymentSystem("");
        setAccountNumber("");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit withdrawal.", "error");
    }
  };

  if (!userInfo) return <p className="text-center py-10">Loading...</p>;

  const userCoin = userInfo.coin;
  const dollarValue = (userCoin / 20).toFixed(2);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">💵 Withdrawal Request</h2>

      <div className="mb-4">
        <p className="text-gray-700 font-medium">
          Your Total Coin: <span className="text-blue-600 font-bold">{userCoin}</span>
        </p>
        <p className="text-gray-700 font-medium">
          Available for Withdraw: <span className="text-green-600 font-bold">${dollarValue}</span>
        </p>
      </div>

      {userCoin >= 200 ? (
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Coin to Withdraw</label>
            <input
              type="number"
              min="0"
              max={userCoin}
              required
              className="w-full px-4 py-2 border rounded"
              value={coinToWithdraw}
              onChange={(e) => setCoinToWithdraw(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Withdraw Amount ($)</label>
            <input
              type="number"
              value={withdrawAmount}
              disabled
              className="w-full px-4 py-2 border bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Select Payment System</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Upay">Upay</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Account Number</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Request Withdraw
          </button>
        </form>
      ) : (
        <p className="text-red-600 font-semibold mt-4 text-center">
          ❌ Insufficient coin. You need minimum 200 coins to withdraw.
        </p>
      )}
    </div>
  );
};

export default Withdrawals;
