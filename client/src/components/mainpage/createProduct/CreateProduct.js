import { CircularProgress } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory, useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import loadingimage from './loading.gif';
import makeTimer from '../../../utils'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

 
function handleCategory(categories, product, isEdit) {
   return categories.map((category) => {
       if (isEdit && category.id.toLowerCase() == product.category.toLowerCase()) {
           return (
               <option
                   selected
                   value={category.id}
                   key={category.id}
               >
                   {category.name}
               </option>
           );
       } else {
           return (
               <option
                   value={category.id}
                   key={category.id}
               >
                   {category.name}
               </option>
           );
       }
   })
}
function CreateProduct() {
  const params = useParams();
  var initialState = {
      name: '',
      age: '',
      category: '',
      description: '',
      difficultLevel: '',
      numPlayerFrom: '',
      numPlayerTo: '',
      playingTime: '',
      price: '',
      image: {},
  };
  const history = useHistory();
  const state = useContext(GlobleState);
  const [categories] = state.categoriesApi.categories;
  const [products] = state.productsApi.products;
  const [callback, setCallback] = state.productsApi.callback;
  const [isAdmin] = state.usersApi.isAdmin;
  const [token] = state.token;
  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [startdate, setStartDate] = useState(new Date());
  const [onEdit, setOnEdit] = useState(false);
//   console.log("=======product=====", product.category)
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
      if (params.id) {
          products && Object.values(products).forEach((product) => {
              if (product.id == params.id) {
                  setProduct(product);
                  setImage(product.image);
                  setStartDate(new Date(product.birthday));
                  setOnEdit(true);
              }
          });
      } else {
          setProduct(initialState);
          setImage(false);
          setOnEdit(false);
      }
  }, [params.id, products]);
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (onEdit) {
            //   if (!isAdmin) return alert("You're not an admin.");
            //   if (!image) return alert('Image not found.');
              setLoadingTwo(true)
              await axios.put(
                  `/api/products/${product.id}`,
                  {...product, image, price: Number(product.price), description: product.description.charAt(0).toUpperCase() + product.description.slice(1)},
                  {
                      headers: { Authorization: token },
                  },
              );
              toast.success(`Ch???nh s???a s???n ph???m ${product.name} th??nh c??ng`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              await makeTimer(2000)
              setLoadingTwo(false)
              setCallback(!callback);
              history.push('/');
          } else {
            //   if (!isAdmin) return alert("You're not an admin.");
            //   if (!image) return alert('Image not found.');
              setLoadingTwo(true)
              await axios.post(
                  '/api/products',
                  {...product, image, price: Number(product.price), description: product.description.charAt(0).toUpperCase() + product.description.slice(1)},
                  {
                      headers: { Authorization: token },
                  },
              );
              toast.success(`Th??m s???n ph???m ${product.name} th??nh c??ng`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              await makeTimer(2000)
              setLoadingTwo(false)
              setCallback(!callback);
              history.push('/');
          }
      } catch (err) {
        //   alert(err.response.data.msg);
          toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }
  };
  const onHandleChange = (e) => {
      let targets = e.target;
      let name = targets.name;
      let value = targets.value.toLowerCase();
      console.log('=======name====', name)
      console.log('=======product', product)
      setProduct({
          ...product,
          [name]: value,
      });
  };
  const onHandleUpload = async (e) => {
      e.preventDefault();
      try {
        //   if (!isAdmin) return alert("You're not an admin.");
          const file = e.target.files[0];
          if (!file) {
            //   return alert('Image not found.');
              return toast.warn('Kh??ng t??m th???y ???nh.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            }
          if (file.size > 1024 * 1024) {
              // 1mb
            //   return alert('Size too large.');
              return toast.warn('K??ch th?????c qu?? l???n.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              
          }
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
              // 1mb
            //   return alert('File format is incorrect.');
              return toast.warn('T???p tin kh??ng ????ng ?????nh d???ng.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          }
         
          let formDate = new FormData();
          formDate.append('file', file);
          setLoading(true);
          
          const res = await axios.post('/api/upload', formDate, {
              headers: {
                  'content-type': 'multipart/from-data',
                  Authorization: token,
              },
          });
          setLoading(false);
          setImage(res.data);
          toast.success(`Th??m ???nh th??nh c??ng`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      } catch (err) {
        //   alert(err.response.data.msg);
        toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }
  };
  const handleDestroyImage = async () => {
      try {
        //   if (!isAdmin) return alert("You're not an admin.");
          setLoading(true);
          await axios.post(
              '/api/destroy',
              { public_id: image.public_id },
              {
                  headers: { Authorization: token },
              },
          );
          setLoading(false);
          setImage(false);
          toast.success(`X??a ???nh th??nh c??ng`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      } catch (err) {
        //   alert(err.response.data.msg);
          toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }
  };
  let styleImaheUpload = {
      display: image ? 'block' : 'none',
  };
  return (
      <div className="create-product container" id = "create-product-container">
          <div
            style={{
                display: 'none'
            }}
          >
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style = {{
                    zIndex: '11'
                }}
            />
          </div>
          <div className="cp-image-upload-box">
              {loading ? (
                  <div className="cp-loading-image">
                      {' '}
                      <img src={loadingimage} alt="loading-img"></img>
                  </div>
              ) : (
                  <>
                      <input
                          type="file"
                          className="cp-file-upload"
                          name="file"
                          id="file_up"
                          onChange={onHandleUpload}
                      ></input>
                      <img
                          className="cp-image-upload"
                          style={styleImaheUpload}
                          alt="img-upload"
                          src={image ? image.url : ''}
                      ></img>
                      {image ? (
                          <Tooltip title="Delete Image" placement="top">
                              <span
                                  className="cp-image-button"
                                  onClick={handleDestroyImage}
                              >
                                  X
                              </span>
                          </Tooltip>
                      ) : (
                          ''
                      )}
                  </>
              )}
          </div>
       
          <div className ="div-form">
              <form onSubmit={handleSubmit} className = "form-create-edit">
               
                  {/* <div className="mb-3">
                      <label htmlFor="product_id" className="form-label">
                          Product ID
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          onChange={onHandleChange}
                          disabled={onEdit ? true : false}
                          value={product.product_id}
                          id="product_id"
                          name="product_id"
                          required
                      />
                  </div> */}
                  <div className="ten-cate">
                      <div className="mb-3" id ="ten">
                          <label htmlFor="name" className="form-label">
                              T??n
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.name}
                              id="name"
                              name="name"
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label
                              htmlFor="category"
                              className="form-label"
                              style={{ marginRight: '20px' }}
                          >
                              Ph??n lo???i
                          </label>
                          <select
                              name="category"
                              id="category"
                              onChange={onHandleChange}
                          >
                              {handleCategory(categories && Object.values(categories), product, onEdit)}
                              </select>
                              </div>
                  </div>
               
                  <div>
                      <div className="mb-3">
                          <label htmlFor="price" className="form-label">
                              Gi?? ti???n
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.price}
                              id="price"
                              name="price"
                              required
                          />
                      </div>
                      <div>USD</div>
                  </div>
               
                  <div className="motcaidivtodung">
                      <div className="mb-3 mr-3">
                          <label htmlFor="bust" className="form-label">
                              S??? ng?????i ch??i t???i thi???u
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.numPlayerFrom}
                              id="bust"
                              name="numPlayerFrom"
                              required
                          />
                      </div>
                      <div className="mb-3 mr-3">
                          <label htmlFor="waist" className="form-label">
                              t???i ??a
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.numPlayerTo}
                              id="waist"
                              name="numPlayerTo"
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="japanName" className="form-label">
                              Th???i gian ch??i
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.playingTime}
                              id="japanName"
                              name="playingTime"
                              required
                          />
                      </div>
                      <div>ph??t</div>
                  </div>
                  <div className="motcaidivvuavua">
                      <div className="mb-3 mr-3">
                          <label htmlFor="hip" className="form-label">
                              ????? tu???i t???
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.age}
                              id="hip"
                              name="age"
                              required
                          />
                      </div>
                      <div className="mb-3 mr-3">
                          <label htmlFor="height" className="form-label">
                              ????? kh??
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              onChange={onHandleChange}
                              value={product.difficultLevel}
                              id="height"
                              name="difficultLevel"
                              required
                          />
                      </div>
                  </div>
               
               
                  {/* <div className="birth">
                      <span className="d-block">Birthday</span>
                      <DatePicker
                          selected={startdate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                      />
                  </div> */}
               
                  {/* <div className="mb-3 mt-3">
                      <label htmlFor="blood_type" className="form-label">
                          Blood Type
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          onChange={onHandleChange}
                          value={product.blood_type}
                          id="blood_type"
                          name="blood_type"
                          required
                      />
                  </div> */}
                  <div className="mb-3 mt-3">
                      <label htmlFor="hobby" className="form-label">
                          M?? t???
                      </label>
                      <input
                          type="text"
                          className="form-control"
                          onChange={onHandleChange}
                          value={product.description.charAt(0).toUpperCase() + product.description.slice(1)}
                          id="hobby"
                          name="description"
                          required
                      />
                  </div>
               
               
                  <button type="submit" className="cp-button">
                  {loadingTwo ? (
                         <CircularProgress size={25} />
                     ) :
                     onEdit ? 'C???p nh???t' : 'T???o'
                   }
                  </button>
              </form>
          </div>
       
      </div>
  );
}
export default CreateProduct;