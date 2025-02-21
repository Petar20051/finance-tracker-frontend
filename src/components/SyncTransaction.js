import React, { useState } from "react";
import axios from "axios";
import "../styles/SyncTransactions.css";

const SyncTransactions = () => {
  const [userToken, setUserToken] = useState("");
  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

 
  const initiateSaltEdgeConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      
      const response = await axios.get("https://localhost:7109/api/Expense/initiate-connect", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 && response.data.connectUrl) {
        setMessage("Redirecting to Salt Edge Connect...");
        window.location.href = response.data.connectUrl; 
      } else {
        setError("Failed to initiate Salt Edge Connect. Invalid response from the server.");
      }
    } catch (err) {
      console.error("Error during Salt Edge Connect initiation:", err);
      setError(err.response?.data?.message || "Failed to initiate Salt Edge Connect.");
    } finally {
      setLoading(false);
    }
  };

 
  const syncTransactions = async (userToken) => {
    try {
      if (!userToken) {
        throw new Error("UserToken is required to sync transactions.");
      }

      const response = await axios.post(
        "https://localhost:7109/api/Expense/sync-transactions",
        { UserToken: userToken }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.Message || "Transactions synced successfully!");
      } else {
        throw new Error("Failed to sync transactions. Please try again.");
      }
    } catch (err) {
      console.error("Error syncing transactions:", err);
      setError(err.response?.data?.Message || "Failed to sync transactions.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSync = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      await syncTransactions(userToken); 
    } catch (err) {
      console.error("Error in handleSync:", err);
      setError(err.message || "Failed to sync transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sync Transactions</h1>

      <div className="sync-form-container">
        <form onSubmit={handleSync} className="sync-form">
          <label htmlFor="userToken">User Token:</label>
          <input
            id="userToken"
            type="text"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            placeholder="Enter your banking user token"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Syncing..." : "Sync Transactions"}
          </button>
        </form>
      </div>

      <button onClick={initiateSaltEdgeConnect} disabled={loading}>
        {loading ? "Loading..." : "Link Bank Account"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SyncTransactions;
