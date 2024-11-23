import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, setPortfolioData, ShowLoading, ReloadData } from "./redux/rootSlice";
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading(true));
      const response = await axios.get('https://portfolix.onrender.com/api/portfolio/get-portfolio-data');
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading(true));
    } catch (error) {
      dispatch(HideLoading(true));
    }
  };
  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
