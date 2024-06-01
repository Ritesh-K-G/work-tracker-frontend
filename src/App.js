// Filename - App.js

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import logo from "./sprinklr-logo.PNG";
import Table from "./components/table";
import loadingAnimation from "./Iphone-spinner-2.gif";

function App() {
  const [managingPage, setManagingPage] = useState(true);
  const [myManagingTasks, setMyManagingTasks] = useState([]);

  const [assignedPage, setAssignedPage] = useState(false);
  const [myAssignedTasks, setMyAssignedTasks] = useState([]);

  const [isError, setIsError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (managingPage) {
        axios.get("http://localhost:8080/api/getAssignedTasks?Id=6658616291ca5540b036e983")
        .then((response) => {
          setMyAssignedTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setIsError(error.message);
          setLoading(false);
        });
      } else if (assignedPage) {
        axios.get("http://localhost:8080/api/getManagingTasks?Id=6658614991ca5540b036e982")
        .then((response) => {
          setMyManagingTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setIsError(error.message);
          setLoading(false);
        });
      }
    }, 400)
  }, [managingPage, assignedPage]);

  const assignedPageClick = (event) => {
    event.preventDefault();
    setLoading(true);
    setAssignedPage(true);
    setManagingPage(false);
  };
  const managingPageClick = (event) => {
    event.preventDefault();
    setLoading(true);
    setAssignedPage(false);
    setManagingPage(true);
  };


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
          <li>
            <a href="#" onClick={assignedPageClick}>
              My Assigned Tasks
            </a>
          </li>
          <li>
            <a href="#" onClick={managingPageClick}>
              My Managing Tasks
            </a>
          </li>
				</ul>
				<div class="rightNav">
          <button class="btn btn-lg">
            Create Task
          </button>
					<button class="btn btn-sm">
						LogOut
					</button>
				</div>
			</nav>
      <div>

      </div>
      <div class="My-content">
        {
          isLoading 
          ? <img src={loadingAnimation} />
          : isError !== "" 
              ? <h2>{isError}</h2>
              : managingPage
                ? <Table data={myManagingTasks}/>
                : <Table data={myAssignedTasks}/>
        }
      </div>
		</div>
	);
}

export default App;
