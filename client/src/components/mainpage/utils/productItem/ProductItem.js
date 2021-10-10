import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { GlobleState } from '../../../../GlobleState';
 
export default function ProductItem({
   product,
   isAdmin,
   deleteProduct,
   handleCheckProduct,
}) {
   const state = useContext(GlobleState);
   const addCart = state.usersApi.addCart;
 
   const [openModal, setOpenModal] = useState(false);
 
   const day = dayjs(product.birthday).format('DD-MM-YYYY');
 
   const openModel = () => {
       setOpenModal(true);
   };
 
   const closeModal = () => {
       setOpenModal(false);
   };
 
   const onHandleChange = () => {
       handleCheckProduct(product._id);
   };
 
   return (
       <React.Fragment>
           <div className="col-sm-12 col-md-6 col-lg-4">
               <div className="prouduct_cart">
                   {/* {product.price > 1200 ? (
                       <>
                           <div className="prouduct_cart-new">New</div>
                       </>
                   ) : (
                       ''
                   )} */}
                   {isAdmin ? (
                       <input
                           type="checkbox"
                           checked={product.checked}
                           className="prouduct_cart-checkbox"
                           onChange={onHandleChange}
                       ></input>
                   ) : (
                       ''
                   )}
                   <Link to={`/detail/${product._id}`}>
                       <img
                           src={product.images.url}
                           alt="product-item"
                           className="product-img"
                       ></img>
                   </Link>
 
                   <div className="content">
                       <Link to={`/detail/${product._id}`}>
                           <div className="product-name">{product.name}</div>
                       </Link>
                       {isAdmin ? (
                           ''
                       ) : (
                           <>
                               <div className="price">
                                   ${product.price} / 1h
                               </div>
                               <div
                                   className="btn-addtocart"
                                   onClick={() => addCart(product)}
                               >
                                   Add To Cart
                               </div>
                           </>
                       )}
                   </div>
 
                   <button className="quick-look" onClick={openModel}>
                       <div>Quick look</div>
                   </button>
                   <button
                       className="rp-btn-addtocart"
                       onClick={() => addCart(product)}
                   >
                       <div>Add to cart</div>
                   </button>
               </div>
               {isAdmin ? (
                   <div className="product_admin-btn">
                       <div
                           className="product_admin-delete"
                           onClick={() =>
                               deleteProduct(
                                   product._id,
                                   product.images.public_id,
                               )
                           }
                       >
                           Delete
                       </div>
                       <div className="product_admin-edit">
                           {' '}
                           <Link
                               to={`/product/edit/${product._id}`}
                               style={{ color: 'white' }}
                           >
                               Edit
                           </Link>
                       </div>
                   </div>
               ) : (
                   <></>
               )}
               <div className={openModal ? 'modal modal-show' : 'modal'}>
                   <div className="modal-content">
                       <div className="btn-close-modal" onClick={closeModal}>
                           &times;
                       </div>
                   <div className="card__body">
                       <div className="card__body-left">
                           {product.images.url ? (
                               <img
                                   // src={detailProduct.images.url}
                                   src="https://bgvnpicture.s3-ap-southeast-1.amazonaws.com/old/stories/images/uno-mattel-4.jpg"
                                   alt="product-detail"
                               ></img>
                           ) : (
                               ''
                           )}
                       </div>
                       <div className="card__body-right card__body-right--a">
                           <div className="modal-wrapper" >
                               <Link to={`/detail/${product._id}`} className="modal-name">
                                   Bài Uno
                                   </Link>
                               {/* <h5 ></h5> */}
                               <p className="modal-price">
                                   139.000đ
                               </p>
                           </div>
                           <div className="modal-list">
                               <div className="modal-item">
                                   <div className="modal-image">
                                       <i className="fa fa-user"></i>
                                   </div>
                                   <div className="modal-desc">
                                       <p>Số người chơi</p>
                                       <p style ={{fontWeight: 'bold'}}>2 đến 10 người</p>
                                   </div>
                               </div>
                               <div className="modal-item">
                                   <div className="modal-image">
                                       <i className="fa fa-clock"></i>
                                   </div>
                                   <div className="modal-desc">
                                       <p>Thời gian chơi</p>
                                       <p style={{fontWeight: 'bold'}}>Dưới 30 phút</p>
                                   </div>
                               </div>
                               <div className="modal-item">
                                   <div className="modal-image">
                                       <i className="fa fa-star"></i>
                                   </div>
                                   <div className="modal-desc">
                                       <p>Độ tuổi</p>
                                       <p style={{fontWeight: 'bold'}}>Từ 8 tuổi</p>
                                   </div>
                               </div>
                               <div className="modal-item">
                                   <div className="modal-image">
                                       <i className="fa fa-star"></i>
                                   </div>
                                   <div className="modal-desc">
                                       <p>Độ khó</p>
                                       <p style={{fontWeight: 'bold'}}>1</p>
                                   </div>
                               </div>
                           </div>
                           <p className="modal-text">Bài Uno - Trò chơi bài phổ biến rầm rộ ở Việt Nam hiện nay. Người chơi đánh hết bài đầu tiên chiến thắng. Và đừng quên hô "Uno" khi bạn chỉ còn 1 lá bài đó!</p>
                           {isAdmin ? (
                               <div
                                   className="product_admin-btn"
                                   style={{ marginTop: '20px'}}
                               >
                                   <div
                                       style = {{
                                           borderRadius: '8px',
                                           marginLeft: '24px',
                                           marginRight: '20px'
                                       }}
                                       onClick={() =>
                                           deleteProduct(
                                               product._id,
                                               product.images.public_id,
                                           )
                                       }
                                   >
                                       Delete
                                   </div>
                                   <div style={{  borderRadius: '8px', marginLeft: '12px', }}>
                                       <a
                                           href={`/product/edit/${product._id}`}
                                           style={{color: 'white'}}
                                       >
                                           Edit
                                       </a>
                                   </div>
                               </div>
                           ) : (
                               <div
                                   className="card_btn-addtocart"
                                   onClick={() => addCart(product)}
                                //    style = {{
                                //        margin: "0 auto"
                                //    }}
                               >
                                   Add To Cart
                               </div>
                           )} 
                       </div>
                   </div>
                   {/* <div>
                       {isAdmin ? (
                               <div
                                   className="product_admin-btn"
                                   style={{ marginTop: '20px'}}
                               >
                                   <div
                                       style = {{
                                           borderRadius: '8px',
                                           marginLeft: '24px',
                                           marginRight: '20px'
                                       }}
                                       onClick={() =>
                                           deleteProduct(
                                               product._id,
                                               product.images.public_id,
                                           )
                                       }
                                   >
                                       Delete
                                   </div>
                                   <div style={{  borderRadius: '8px', marginLeft: '12px', }}>
                                       <a
                                           href={`/product/edit/${product._id}`}
                                           style={{color: 'white'}}
                                       >
                                           Edit
                                       </a>
                                   </div>
                               </div>
                           ) : (
                               <div
                                   className="card_btn-addtocart"
                                   onClick={() => addCart(product)}
                               >
                                   Add To Cart
                               </div>
                           )}      
                   </div> */}
                   </div>
               </div>
           </div>
       </React.Fragment>
   );
}
 

