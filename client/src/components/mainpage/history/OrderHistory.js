import React, { useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import { Link } from 'react-router-dom';
 
function OrderHistory() {
   const state = useContext(GlobleState);
   const [history] = state.usersApi.history;
 
   useEffect(() => {
       window.scrollTo(0, 0);
   }, []);
 
   return (
       <div className="history">
           <div className="container">
               {history.length === 0 ? (
                   <h2 style={{ marginBottom: '300px' }}>
                       History Clear
                       <Link to="/" className="cart-to-home">
                           <i
                               className="fas fa-long-arrow-alt-left"
                               style={{ marginRight: '5px' }}
                           ></i>
                           Quay về trang chủ
                       </Link>
                   </h2>
               ) : (
                   <div>
                       <div className="history-header">
                           <h2>Lịch sử mua hàng</h2>
                           <span className="history-label">
                               Bạn đã mua{' '}
                               <span className="history-length">
                                   {history.length}
                               </span>{' '}
                               đơn hàng
                           </span>
                       </div>
                       <table className="table table-bordered sm-table">
                           <thead>
                               <tr>
                                   <th scope="col">Payment ID</th>
                                   <th scope="col">Ngày mua</th>
                                   <th scope="col"></th>
                               </tr>
                           </thead>
                           <tbody>
                               {history.map((payment, index) => {
                                   return (
                                       <tr key={index}>
                                           <td>{payment.id}</td>
                                           <td>
                                               {new Date(
                                                   payment.created_at
                                               ).toLocaleDateString('vi-VN', {
                                                   day: "numeric",
                                                   month: "short",
                                                   year: "numeric",
                                                   hour: "numeric",
                                                   minute: "2-digit"
                                               })}
                                           </td>
                                           <td style={{ textAlign: 'center' }}>
                                               <Link
                                                   to={`history/${payment.id}`}
                                               >
                                                   View
                                               </Link>
                                           </td>
                                       </tr>
                                   );
                               })}
                           </tbody>
                       </table>
                   </div>
               )}
           </div>
       </div>
   );
}
 
export default OrderHistory;
 

