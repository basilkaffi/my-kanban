import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../store/actions/crudAction";
import CategoryBar from "../components/CategoryBar";
import Navbar from '../components/Navbar';

function AppPage() {
  const dispatch = useDispatch();
  const categories = ["backlog", "todo", "done", "completed"];
  const items = useSelector((state) => state.crudReducer.items);

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  return (
    <div className="AppPage background">
      <Navbar/>
      <div className="divider">
        {categories.map((category, idx) => (
          <CategoryBar category={category} items={items} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default AppPage;
