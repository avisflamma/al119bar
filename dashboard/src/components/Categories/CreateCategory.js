import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";



const Toastobjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};


const CreateCategory = (props) => {

  const categoryIdSelected = props.categoryIdSelected;

  const [isEnabled, setIsEnabled] = useState(0);
  const [title, setTitle] = useState("");
  const [categoryBanner, setCategoryBanner] = useState(null);
  const [categoryUrl, setCategoryUrl] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {loading, error, category} = categoryCreate;

  useEffect( () => {
    if(category){
      toast.success("Category Added", Toastobjects);
      dispatch({type : CATEGORY_CREATE_RESET})
      setIsEnabled(0);
      setTitle("");
      setCategoryBanner(null);
      setCategoryUrl("");
    }
  }, [category, dispatch])

  const submitHandler = (e) => {
    e.preventDefault();
    if(categoryIdSelected){

    }else{
      dispatch(createCategory(isEnabled,title,categoryBanner,categoryUrl));
    }
  }

  return (
    <div className="col-md-12 col-lg-8">
      <form onSubmit={submitHandler}>
        {
          error && <Message variant="alert-danger">{error}</Message>
        }
        {
          loading && <Loading/>
        }
        <div className="mb-4">
          <label htmlFor="category_title" className="form-label">
            Category title
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control"
            id="category_title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="d-grid">
          {
            categoryIdSelected ? 
            (
              <button className="btn btn-primary py-3">Update category</button>
            )
            :
            (
              <button className="btn btn-primary py-3">Create category</button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
