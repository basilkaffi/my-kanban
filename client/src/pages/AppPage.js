import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../store/actions/crudAction";
import CategoryBar from "../components/CategoryBar";
import logo from "../assets/kanban.png";
import { Button } from 'react-bootstrap';

function AppPage() {
  const dispatch = useDispatch();
  const categories = ["backlog", "todo", "done", "completed"];

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  return (
    <div className="AppPage background">
      <div className="header">
        <div className="logo">
          <img src={logo} alt={"logo website"} />
          <div className="text">MY-KANBAN</div>
        </div>
        <div className="dropdown">
          <div className="username">{localStorage.username.toUpperCase()}</div>
          <div className="dropdownContent">
            <Button className="logout" >Logout</Button>
          </div>
        </div>
      </div>
      <div className="divider">
        {categories.map((category) => (
          <CategoryBar category={category} />
        ))}
      </div>
    </div>
  );
}

export default AppPage;
