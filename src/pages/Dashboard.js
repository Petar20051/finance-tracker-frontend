import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SyncTransactions from "../components/SyncTransaction"; 
import {
  FaWallet,
  FaRegChartBar,
  FaLightbulb,
  FaExchangeAlt,
  FaPiggyBank,
  FaChartPie,
} from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isGrid, setIsGrid] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const carouselRef = useRef(null);

  
  const featureData = [
    {
      title: "Reports",
      icon: <FaRegChartBar size={32} />,
      description: "Analyze your spending trends and performance.",
      linkText: "View Reports",
      linkTo: "/reports",
    },
    {
      title: "AI Predictions",
      icon: <FaChartPie size={32} />,
      description: "Get AI-powered insights into your future expenses.",
      linkText: "Get Predictions",
      linkTo: "/ai-predictions",
    },
    {
      title: "Currency Converter",
      icon: <FaExchangeAlt size={32} />,
      description: "Quickly convert amounts between currencies.",
      linkText: "Convert Currency",
      linkTo: "/currency-converter",
    },
    {
      title: "Budgets",
      icon: <FaWallet size={32} />,
      description: "Create and manage budgets to control your spending.",
      linkText: "View Budgets",
      linkTo: "/budgets",
    },
    {
      title: "Expenses",
      icon: <FaPiggyBank size={32} />,
      description: "Log and review your expenses easily.",
      linkText: "Manage Expenses",
      linkTo: "/manage-expenses",
    },
    {
      title: "Goals",
      icon: <FaLightbulb size={32} />,
      description: "Set financial goals and track your progress.",
      linkText: "View Goals",
      linkTo: "/goals",
    },
  ];

 
  const duplicatedFeatures = [...featureData, ...featureData];

 
  useEffect(() => {
    if (isGrid) return; 

    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 2; 
    let direction = 1; 

    const scrollInterval = setInterval(() => {
   
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth
      ) {
        direction = -1;
      } else if (scrollContainer.scrollLeft <= 0) {
        direction = 1;
      }

      scrollAmount += scrollStep * direction;
      scrollContainer.scrollLeft = scrollAmount;
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [isGrid]);

 
  const toggleLayout = () => {
    setIsGrid((prev) => !prev);
  };

  
  const handleShowSync = () => {
    setShowSync(true);
   
    document.getElementById("sync-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>
        This is your central hub for managing your financial life. From budgeting
        and tracking expenses to setting goals and receiving AI predictions,
        explore all the powerful tools available to help you take control of your money.
      </p>

      <div className="features-container-wrapper">
        
        <div
          className={`features-container ${isGrid ? "grid" : "carousel"}`}
          ref={!isGrid ? carouselRef : null}
        >
          {(isGrid ? featureData : duplicatedFeatures).map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-container">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.linkTo} className="feature-button">
                {feature.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>

     
      <div className="view-all-container">
        <button className="view-all-button" onClick={toggleLayout}>
          {isGrid ? "Show Carousel" : "View All"}
        </button>
      </div>

      
      {!showSync && (
        <div className="cta-sync-container">
          <h2>Keep Your Data Up-to-Date</h2>
          <p>
            Click below to sync your transactions automatically by linking your bank account.
          </p>
          <button linkTo="#sync-section" className="cta-sync-button" onClick={handleShowSync}>
            Sync Now
          </button>
        </div>
      )}

     
      {showSync && (
        <div className="sync-section" id="sync-section">
          <h2>Sync Transactions</h2>
          <p>
            Link your bank account or sync your transactions to keep your financial data current.
          </p>
          <SyncTransactions />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
