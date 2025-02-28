import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import {PrivyProvider} from '@privy-io/react-auth';


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <PrivyProvider
      appId="cm7mslm7t00hnx7utbgsj2572"
      config={{
        
        // Customize Privy's appearance
        appearance: {
          theme: 'dark',
        },
        
      }}
    >
        <Router>
          <App />
        </Router>
    </PrivyProvider>
);