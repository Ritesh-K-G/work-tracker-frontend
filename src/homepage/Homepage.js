import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../App.css";
import logo from "../sprinklr-logo.PNG";
import Table from "../components/table";
import loadingAnimation from "../Iphone-spinner-2.gif";
import sprinklr_animation from "../sprinklr-animated.gif";
import CreateJobForm from "./createJobForm";

function Homepage() {
  const [managingPage, setManagingPage] = useState(false);
  const [myManagingTasks, setMyManagingTasks] = useState([]);

  const [assignedPage, setAssignedPage] = useState(false);
  const [myAssignedTasks, setMyAssignedTasks] = useState([]);

  const [isError, setIsError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [createTask, setCreateTask] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      localStorage.clear();
      window.location.reload();
    }
    if (createTask) {
      setCreateTask(false);
    }
    if (managingPage) {
      axios.get("http://localhost:8080/api/getAssignedTasks?Id=" + user_id)
        .then((response) => {
          setLoading(false);
          setMyAssignedTasks(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setIsError(error.message);
        });
    } else if (assignedPage) {
      axios.get("http://localhost:8080/api/getManagingTasks?Id=" + user_id)
        .then((response) => {
          setLoading(false);
          setMyManagingTasks(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setIsError(error.message);
        });
    }
  }, [managingPage, assignedPage]);

  const assignedPageClick = (event) => {
    setAssignedPage(false);
    setCreateTask(false);
    setManagingPage(false);
    // event.preventDefault();
    setAssignedPage(true);
  };

  const managingPageClick = (event) => {
    setAssignedPage(false);
    setCreateTask(false);
    setManagingPage(false);
    // event.preventDefault();
    setManagingPage(true);
  };

  const logoutClick = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  const homepageClick = (event) => {
    window.location.reload();
  };

  const createTaskClick = (event) => {
    setAssignedPage(false);
    setCreateTask(false);
    setManagingPage(false);
    // event.preventDefault();
    setCreateTask(true);
  };

  return (
    <div>
      <nav class="navbar background">
        <ul class="nav-list">
          <div class="logo" onClick={homepageClick}>
            <img src={logo} style={{ width: '50px', height: 'auto' }} />
            <p>
              Work Tracker
            </p>
          </div>
          <li>
            <a href="#" onClick={assignedPageClick}>
              Assigned Tasks
            </a>
          </li>
          <li>
            <a href="#" onClick={managingPageClick}>
              Managing Tasks
            </a>
          </li>
        </ul>
        <div class="rightNav">
          <button class="btn" onClick={createTaskClick}>
            Task+
          </button>
          <button class="btn btn-sm" onClick={logoutClick}>
            LogOut
          </button>
        </div>
      </nav>
      <div class="My-content">
        {/* {assignedPage == false && managingPage == false && isLoading == true && <img src={sprinklr_animation}/>} */}
        {
          createTask
            ? <CreateJobForm/> 
            : isLoading
                ? <img src={sprinklr_animation} />
                : isError !== ""
                  ? <h2>{isError}</h2>
                  : managingPage
                    ? <Table data={myManagingTasks} />
                    : <Table data={myAssignedTasks} />
        }
      </div>
    </div>
  );
}

export default Homepage;
