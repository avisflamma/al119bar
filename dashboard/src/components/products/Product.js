import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const Product = (props) => {


    const product  = props.product;

    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure??")){
        dispatch(deleteProduct(id));
        }
    }

    return (
      <tbody>
        <tr>
          <td>{product._id}</td>
          <td>
              <b>{product.name}</b>
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
                    <Link
                      to={`/product/${product._id}/edit`}
                      className="dropdown-item"
                    >
                      Edit 
                    </Link>
                    <Link
                      to="#"
                      className="dropdown-item text-danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </Link>
                  </div>
              </div>
          </td>
        </tr>
      </tbody>
    );
};

export default Product;