// Filename - App.js

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import logo from "./sprinklr-logo.PNG";
import Table from "./components/table";

function App() {
  const [myManagingTasks, setMyManagingTasks] = useState([]);
  const [myAssignedTasks, setMyAssignedTasks] = useState([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/getAssignedTasks?Id=6658616291ca5540b036e983")
      .then((response) => setMyAssignedTasks(response.data))
      .catch((error) => console.log(error));
  }, []);

	return (
		<div>
			<nav class="navbar background">
				<ul class="nav-list">
					<div class="logo">
						<img src={logo} style={{width: '50px', height: 'auto'}} />
            <p>
              Work Tracker
            </p>
					</div>
				</ul>
				<div class="rightNav">
					<button class="btn btn-sm">
						LogOut
					</button>
				</div>
			</nav>
      <div class="My-content">
        {
          isError !== "" 
            ? <h2>{isError}</h2>
            : <div>
                <p>My Assigned Tasks</p>
                <Table data={myAssignedTasks}/>
              </div>
        }
        
      </div>
		</div>
	);
}

export default App;
