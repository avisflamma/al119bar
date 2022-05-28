import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { Link } from "react-router-dom";

const MainCategories = () => {

  const [categoryIdSelected, setCategoryIdSelected] = useState("");

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
        <div>
          <Link to="/categories" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>
      

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
              <CategoriesTable setCategoryIdSelected={setCategoryIdSelected}/>
              {/* Create category */}
              {
                <CreateCategory categoryIdSelected={categoryIdSelected} setCategoryIdSelected={setCategoryIdSelected}/>
              }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
