import React, { useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import { Link } from 'react-router-dom';
import Checked from './checked.png'
 
function renderHeading(isAdmin) {
   if (isAdmin) {
       return (
           <tr>
               <th scope="col">Khách hàng</th>
               <th scope="col">Payment ID</th>
               <th scope="col">Ngày mua</th>
               <th scope="col">Trạng thái</th>
               <th scope="col">Hành động</th>
           </tr>
       )
   } else {
       return (
           <tr>
               <th scope="col">Payment ID</th>
               <th scope="col">Ngày mua</th>
               <th scope="col">Trạng thái</th>
               <th scope="col">Hành động</th>
           </tr>
       )
   }
}
 
 
function OrderHistory() {
  const state = useContext(GlobleState);
  const [history] = state.usersApi.history;
  const [isAdmin] = state.usersApi.isAdmin;
  
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  return (
      <div className="history">
          <div className="container">
              {history.length === 0 ? (
                  <h2 style={{ marginBottom: '300px' }}>
                      Empty
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
                              {isAdmin ? 'Tổng cộng có tất cả': 'Bạn đã mua'}{' '}
                              <span className="history-length">
                                  {history.length}
                              </span>{' '}
                              đơn hàng
                          </span>
                      </div>
                      <table className="table table-bordered sm-table">
                          <thead>
                              {/* <tr>
                                  <th scope="col">Payment ID</th>
                                  <th scope="col">Ngày mua</th>
                                  <th scope="col"></th>
                              </tr> */}
                              {renderHeading(isAdmin)}
                          </thead>
                          <tbody>
                              {history.map((payment, index) => {
                                  return (
                                      <tr key={index}>
                                          {isAdmin ? <td>{payment.name}</td> : ''}
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
                                          <td style={{textAlign: 'center'}}><img src={Checked} style={{
                                              width: '20px',
                                              height: '20px',
                                              objectFit: 'cover'
                                          }}></img></td>
                                          <td style={{ textAlign: 'center' }}>
                                              <Link
                                                  to={`history/${payment.id}`}
                                              >
                                                  Xem chi tiết
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