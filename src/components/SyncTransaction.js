import React, { useState } from "react";
import axios from "axios";
import "../styles/SyncTransactions.css";

const SyncTransactions = () => {
  const [userToken, setUserToken] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initiates bank account linking through Salt Edge Connect.
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
        setError("Failed to initiate bank linking. The server returned an unexpected response.");
      }
    } catch (err) {
      console.error("Error during bank linking initiation:", err);
      setError(err.response?.data?.message || "Failed to initiate bank linking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Syncs transactions using the provided user token.
  const syncTransactions = async (userToken) => {
    try {
      if (!userToken) {
        throw new Error("A valid User Token is required to sync transactions.");
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
        throw new Error("Server returned an error. Please try syncing again.");
      }
    } catch (err) {
      console.error("Error syncing transactions:", err);
      setError(err.response?.data?.Message || "Failed to sync transactions. Please try again.");
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
    <div className="sync-transactions">
      <h2>Sync Your Transactions</h2>
      <p className="sync-instructions">
        To ensure your financial data is up-to-date, you can sync your transactions from your bank account. You have two options:
      </p>
      <ol className="sync-steps">
        <li>
          <strong>Link Bank Account:</strong> Click the "Link Bank Account" button to securely connect to your bank using Salt Edge Connect.
        </li>
        <li>
          <strong>Sync Using User Token:</strong> If you already have a banking user token, enter it below and click "Sync Transactions" to update your records.
        </li>
      </ol>

      <div className="sync-form-container">
        <form onSubmit={handleSync} className="sync-form">
          <label htmlFor="userToken">Banking User Token:</label>
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

      <button onClick={initiateSaltEdgeConnect} disabled={loading} className="link-bank-button">
        {loading ? "Loading..." : "Link Bank Account"}
      </button>

      {message && <p className="success-message" style={{ color: "green" }}>{message}</p>}
      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SyncTransactions;
