import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const CategoriesTable = ({setCategoryIdSelected}) => {


  const dispatch = useDispatch();
  
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories} = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { error:errorDelete, success:successDelete } = categoryDelete;

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch], successDelete)

  return (
    <div className="col-md-12 col-lg-4">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
        </table>
        {
          errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>)
        }
        {
          loading ? (<Loading/>) : error ? <Message variant="alert-danger">{error}</Message> :
          ( 
            <table className="table">
              <tbody>
                {
                  categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category._id}</td>
                      <td>
                        <b>{category.title}</b>
                      </td>
                      <td className="text-end">
                        <div className="dropdown">
                          <Link
                            to="#"
                            data-bs-toggle="dropdown"
                            className="btn btn-light"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Link>
                          <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => setCategoryIdSelected(category._id)}>
                              Edit info
                            </button>
                            <button className="dropdown-item text-danger" to="#">
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
    </div>
  );
};

export default CategoriesTable;
