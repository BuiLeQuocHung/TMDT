import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import makeTimer from '../../../utils'
import moment from 'moment';
 
import axios from 'axios';
 
// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
 
function MyAccount() {
   const state = useContext(GlobleState);
   const [token] = state.token;
   const [user] = state.usersApi.user;
   const [callback, setCallback] = state.usersApi.callback;
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const history = useHistory();
 
   const initialStateInfo = {
       name: '',
       phone: '',
       email: '',
       password: '',
       address: '',
       image: ''
   };
 
   const initialStatePassowrd = {
       password: '',
       newPassowrd: '',
       confirmPassowrd: '',
   };
 
   const [newUser, setNewUser] = useState(initialStateInfo);
   const [newPassword, setNewPassword] = useState(initialStatePassowrd);
 
 
   const onHandleChange = (e) => {
       let targets = e.target;
       let name = targets.name;
       let value = targets.value.toLowerCase();
       setNewUser({
           ...newUser,
           [name]: value,
       });
   };
 
 
   const onHandleChangePassword = (e) => {
       let targets = e.target;
       let name = targets.name;
       let value = targets.value.toLowerCase();
       setNewPassword({
           ...newPassword,
           [name]: value,
       });
   };
 
   const handleSubmitInfo = async (e) => {
      e.preventDefault();
      try {
          setLoadingUpdate(true)
           await axios.patch(
               `/user/infor/${user.id}`,
               newUser,
               {
                   headers: { Authorization: token },
               },
           );
           await makeTimer()
           setLoadingUpdate(false)
              setCallback(!callback);
              history.push('/myAccount');
      } catch (err) {
          alert(err.response.data.msg);
      }
  };
   const handleSubmitPassword = async (e) => {
      e.preventDefault();
      try {
           await axios.patch(
               `/user/password/${user.id}`,
               newPassword,
               {
                   headers: { Authorization: token },
               },
           );
              setCallback(!callback);
              history.push('/myAccount');
      } catch (err) {
          alert(err.response.data.msg);
      }
  };
 
   useEffect(() => {
       window.scrollTo(0, 0);
       setNewUser(user)
   }, [])
 
   const  updatepassword = async () => {
       if (window.confirm('You want update password')) {
           try {
               await axios.patch(`/user/edit`, {
                   headers: { Authorization: token },
               });
               alert(`update successfully`);
               setCallback(!callback);
           } catch (err) {
               alert(err.response.data.msg);
           }
       }
   };
  
 
   return (
       <div className="wapper">
           <div className="titile__" >
               <div className="tittle-content">
                   <Link to="/" style= {{color: '#7b7b7b'}}>
                       Home
                   </Link>
                   <span> / </span>
                   <span>MyAccount</span>
               </div>
           </div>
           <div className="wapper-body">
               <br/>
               <br/>
               <div className ="information">
                   <div className="information-left">
                       <h3>Chỉnh sửa thông tin</h3>
                       <form
                           noValidate
                           autoComplete="off"
                           onSubmit= {handleSubmitInfo}
                           className="form-infor"
                       >
                          
                           <div className="form-title">
                               <label>Họ và tên</label>
                               <TextField
                                   label="Họ và tên"
                                   id="outlined-required"
                                   variant="outlined"
                                   name="name"
                                   className="form-input"
                                   value={newUser.name}
                                   onChange={onHandleChange}
                               />
                           </div>
                           <div className="form-title">
                               <label>Số điện thoại</label>
                               <TextField
                                   label="Số điện thoại"
                                   id="outlined-required"
                                   variant="outlined"
                                   name="phone"
                                   className="form-input"
                                   value={newUser.phone}
                                   onChange={onHandleChange}
                               />
                           </div>
                           <div className="form-title">
                               <label>Email</label>
                               <TextField
                                   label="Email"
                                   id="outlined-required"
                                   variant="outlined"
                                   name="email"
                                   className="form-input"
                                   value={newUser.email}
                                   onChange={onHandleChange}
                               />
                           </div>
                           <div className="form-title">
                               <label>Địa chỉ</label>
                               <TextField
                                   label="Địa chỉ"                                   
                                   id="outlined-required"
                                   variant="outlined"
                                   name="address"
                                   className="form-input"
                                   onChange={onHandleChange}
                                   value={newUser.address}
                               />
                           </div>
                          
                           <div className="login-group" style={{marginLeft:'15%'}}>
                               <Button
                                   variant="contained"
                                   type="submit"
                                  
                                   className="update-infor-button"
                               >
                                       {loadingUpdate ? (
                         <CircularProgress size={25} />
                     ) : (
                         'Cập nhập thông tin'
                     )}
                                  
                               </Button>
                           </div>
                       </form>
                   </div>
                   <div className="information-right">
                       <h3>Ảnh đại diện</h3>
                       <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1609941293/javcommerce/person_slkixq.jpg" alt="" className="information-left-image"/>
                       <Button variant="contained"  type="submit" className="update-avatar">Cập nhập Avatar</Button>
                       <form
                           noValidate
                           autoComplete="off"
                           onSubmit={handleSubmitPassword}
                           className="form-infor"
                       >
                          
                           <div className="form-title">
                               <label>Mật khẩu cũ</label>
                               <TextField
                                   label="password cũ"                                   
                                   id="outlined-required"
                                   variant="outlined"
                                   className="form-input"
                                   type="password"
                                   name="password"
                                   onChange={onHandleChangePassword}
 
                               />
                           </div>
                           <div className="form-title">
                               <label>Mật khẩu mới</label>
                               <TextField
                                   label="password mới"                                   
                                   id="outlined-required"
                                   variant="outlined"
                                   className="form-input"
                                   type="password"
                                   name="newPassword"
                                   onChange={onHandleChangePassword}
                               />
                           </div>
                           <div className="form-title">
                               <label>Xác nhận mật khẩu</label>
                               <TextField
                                   label="password mới"                                   
                                   id="outlined-required"
                                   variant="outlined"
                                   className="form-input"
                                   type="password"
                                   name="confirmPassword"
                                   onChange={onHandleChangePassword}
                               />
                           </div>
                           <div className="login-group" style={{marginLeft:'15%'}}>
  
                                                     <Button
                                   variant="contained"
                                   type="submit"
                                  
                                   className="update-infor-button"
                               >
                                  
                                   Cập nhập mật khẩu
                                  
                               </Button>
                           </div>
                       </form>              
                   </div>
               </div>
               <br/>
               <br/>
           </div>
          
       </div>
   );
}
 
export default MyAccount;
