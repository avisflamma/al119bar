import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory, editCategory, updateCategory } from "../../Redux/Actions/CategoryActions";
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
  const {loading : loadingCreate, error: errorCreate, categoryCreated} = categoryCreate;

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const {loading : loadingEdit, error: errorEdit, categoryRetriever} = categoryEdit;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate 
  } = categoryUpdate;

  useEffect( () => {
    if(categoryCreated){
      toast.success("Category Added", Toastobjects);
    }
    if(successUpdate){
      toast.success("Category Updated" , Toastobjects);
    }
    if(categoryIdSelected){
      if(!categoryRetriever || categoryRetriever._id !== categoryIdSelected){
        dispatch(editCategory(categoryIdSelected));
      }else{
        setIsEnabled(categoryRetriever.isEnabled);
        setTitle(categoryRetriever.title);
        setCategoryBanner(categoryRetriever.categoryBanner);
        setCategoryUrl(categoryRetriever.categoryUrl);
      }
    }
    
  }, [categoryCreated, categoryIdSelected, categoryRetriever, dispatch, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    if(categoryIdSelected || (categoryCreated && categoryCreated._id)){
      if(categoryCreated && categoryCreated._id && !categoryIdSelected){
        dispatch(updateCategory({_id: categoryCreated._id,isEnabled,title,categoryBanner,categoryUrl,}))
      }else{
        dispatch(updateCategory({_id: categoryIdSelected,isEnabled,title,categoryBanner,categoryUrl,}))
      }
    }else{
      dispatch(createCategory(isEnabled,title,categoryBanner,categoryUrl));
    }
  }

  return (
    <div className="col-md-12 col-lg-8">
      <form onSubmit={submitHandler}>
        { errorCreate && <Message variant="alert-danger">{errorCreate}</Message>}
        { loadingCreate && <Loading/>}

        { errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
        { loadingUpdate && <Loading/>}

        {
          loadingEdit ? <Loading/> : errorEdit ? <Message variant="alert-danger">{errorEdit}</Message> :
          (
            <>
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
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category_banner" className="form-label">
                  Category Banner
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control"
                  id="category_banner"
                  value={categoryBanner || ''}
                  onChange={(e) => setCategoryBanner(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category_url" className="form-label">
                  Category Url
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control"
                  id="category_url"
                  required
                  value={categoryUrl || ''}
                  onChange={(e) => setCategoryUrl(e.target.value)}
                />
              </div>

              <div className="d-grid">
                {
                  categoryRetriever  ? 
                  (
                    <button className="btn btn-primary py-3">Update category</button>
                  )
                  :
                  (
                    <button className="btn btn-primary py-3">Create category</button>
                  )
                }
              </div>
            </>
          )
        }
      </form>
    </div>
  );
};

export default CreateCategory;
