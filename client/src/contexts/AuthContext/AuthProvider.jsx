import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import useEth from "../EthContext/useEth";

const LOCAL_KEY = "sanjeevani_auth_address";

const AuthProvider = ({ children }) => {
  const { state } = useEth();
  const { web3, accounts, loading } = state || {};

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored && accounts && accounts[0] && stored.toLowerCase() === accounts[0].toLowerCase()) {
      setUser({ address: accounts[0] });
    } else {
      setUser(null);
    }
    setAuthLoading(false);
  }, [accounts, loading]);

  useEffect(() => {
    // If user is logged in but account changed, log out
    if (!accounts || !accounts[0]) return;
    if (user && user.address.toLowerCase() !== accounts[0].toLowerCase()) {
      logout();
    }
  }, [accounts]);

  const login = useCallback(async () => {
    if (!web3) throw new Error("Web3 not initialized");
    setAuthLoading(true);
    try {
      const account = accounts && accounts[0] ? accounts[0] : (await web3.eth.requestAccounts())[0];
      if (!account) throw new Error("No account available");

      const nonce = `Login to Sanjeevani: ${Math.random().toString(36).slice(2)}@${Date.now()}`;

      // Ask the user to sign the nonce
      const signature = await web3.eth.personal.sign(nonce, account);

      // Recover address from signature
      const recovered = web3.eth.accounts.recover(nonce, signature);

      if (recovered && recovered.toLowerCase() === account.toLowerCase()) {
        localStorage.setItem(LOCAL_KEY, account);
        setUser({ address: account });
        setAuthLoading(false);
        return { success: true };
      }

      setAuthLoading(false);
      return { success: false, error: "Signature verification failed" };
    } catch (err) {
      setAuthLoading(false);
      console.error("Login failed:", err);
      return { success: false, error: err.message };
    }
  }, [web3, accounts]);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
