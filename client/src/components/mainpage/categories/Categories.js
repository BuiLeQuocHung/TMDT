import React, { useState, useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import axios from 'axios';
import makeTimer from '../../../utils'
import { CircularProgress } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Categories() {
   const state = useContext(GlobleState);
   const [categories] = state.categoriesApi.categories;
   const [callback, setCallback] = state.categoriesApi.callback;
   const [token] = state.token;
 
   const [categorycreate, setCategorycreate] = useState('');
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingEdit, setLoadingEdit] = useState(false);
   const [categoryupdate, setCategoryupdate] = useState('');
   const [id, setId] = useState('');
  
   // const [onEdit, setOnEdit] = useState(false);
 
   useEffect(() => {
       window.scrollTo(0, 0);
   }, []);
 
   const createCategory = async (e) => {
       e.preventDefault();
       try {
          console.log("categorycreate:", categorycreate);
          console.log("categoryupdate:", categoryupdate);
          setLoadingCreate(true)
           await axios.post(
               '/api/category',
               { name: categorycreate },
               {
                   headers: { Authorization: token },
               },
           );
           await makeTimer()
        //    alert(`Add ${categorycreate} successfully`);
            
           toast.success(`Thêm danh mục ${categorycreate} thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

           setLoadingCreate(false)
           setCategorycreate('');
           setCallback(!callback);
       } catch (err) {
        //    alert(err.response.data.msg);
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
   const updateCategory = async (e) => {
       e.preventDefault();
       try {
          
           console.log(id);
           console.log(categoryupdate);
           setLoadingEdit(true)
           await axios.put(
               `/api/category/${id}`,
               { name: categoryupdate },
               {
                   headers: { Authorization: token },
               },
           );
           await makeTimer()
        //    alert(`update ${categoryupdate} successfully`);
           toast.success(`Cập nhật danh mục ${categoryupdate} thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
           setLoadingEdit(false)
           setCategoryupdate('');
           setCallback(!callback);
       } catch (err) {
        //    alert(err.response.data.msg);
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
  
 
   const editCategory = (id, name) => {
       // setOnEdit(true);
       setId(id);
       setCategoryupdate(name);
   };
   const deleteCategory = async (id, name) => {
       if (window.confirm('You want delete this category')) {
           try {
               console.log("detele",id);
               await axios.delete(`/api/category/${id}`, {
                   headers: { Authorization: token },
               });
               console.log("detele:",callback);
               setCallback(!callback);
               toast.success(`Xóa danh mục ${name} thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

           } catch (err) {
            //    alert(err.response.data.msg);
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
       }
   };
  
 
   return (
       <div className="categories">
           <div 

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
           <div className="container">
               <div className="categories-body">
                   <div className="categories-form">
                       <form onSubmit={createCategory} className="create-category">
                           <label
                               htmlFor="category"
                               className="categories-label"
                           >
                              Tên:
                           </label>
                           <input
                               type="text"
                               name="category"
                               id="category"
                               className="categories-input"
                               value={categorycreate}
                               required
                               onChange={(e) => setCategorycreate(e.target.value)}
                           ></input>
                           <button
                               type="submit"
                               className="categories-button"
                               style={{ width: '80px' }}
                           >
                               {loadingCreate ? (
                           <CircularProgress size={25} />
                               ) : (
                                   'Tạo'
                               )}
                           </button>
                       </form>
                       <form onSubmit={updateCategory} className="create-category">
                           <label
                               htmlFor="category"
                               className="categories-label"
                           >
                               Tên:
                           </label>
                           <input
                               type="text"
                               name="category"
                               id="category"
                               className="categories-input"
                               value={categoryupdate}
                               required
                               onChange={(e) => setCategoryupdate(e.target.value)}
                           ></input>
                           <button
                               type="submit"
                               className="categories-button"
                               style={{ width: '80px' }}
                           >
                                  {loadingEdit ? (
                           <CircularProgress size={25} />
                               ) : (
                                   'Lưu'
                               )}
                              
                           </button>
                       </form>
                   </div>
                   <div className="categories-list">
                       {categories && Object.values(categories).map((category) => {
                           return (
                               <div
                                   key={category.id}
                                   className="categories-item"
                               >
                                   <div className="categories-item-name">
                                       {category.name}
                                   </div>
                                   <div>
                                       <button
                                           className="categories-button"
                                           style={{ marginRight: '10px' }}
                                           onClick={() =>
                                               editCategory(
                                                   category.id,
                                                   category.name,
                                               )
                                           }
                                       >
                                          
                                           Chỉnh sửa
                                       </button>
                                       <button
                                           className="categories-button"
                                           onClick={() =>
                                               deleteCategory(
                                                   category.id,
                                                   category.name,
                                               )
                                           }
                                       >
                                           Xoá
                                       </button>
                                   </div>
                               </div>
                           );
                       })}
                   </div>
               </div>
           </div>
       </div>
   );
}
 
export default Categories;
