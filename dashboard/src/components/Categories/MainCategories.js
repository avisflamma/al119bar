import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";

const MainCategories = () => {

  const [categoryIdSelected, setCategoryIdSelected] = useState("");



  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
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
