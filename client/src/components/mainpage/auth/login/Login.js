import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg1 from './login-1.png';

import axios from 'axios';

// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Login() {
   const [user, setUser] = useState({
       email: '',
       password: '',
       loading: false,
   });
   const [errors, setErrors] = useState({});

   useEffect(() => {
       window.scrollTo(0, 0);
   }, []);

   const onHandleChange = (e) => {
       const { name, value } = e.target;
       setUser({
           ...user,
           [name]: value,
       });
   };
   const onSubmit = async (e) => {
       e.preventDefault();
       setUser({ ...user, loading: true });

       try {
           await axios.post('/user/login', { ...user });

           localStorage.setItem('firstLogin', true);
           setUser({ ...user, loading: false });

           window.location.href = '/';
       } catch (err) {
           setUser({ ...user, loading: false });
           if (user.email === '') {
               setErrors({ msg: 'Email not empty' });
           } else {
               if (user.password === '') {
                   setErrors({ msg: 'Password not empty' });
               } else {
                   setErrors(err.response.data);
               }
           }
       }
   };
   return (
       <div className="login register">
           <div className="login-img">
               {/* <p className="login-desc">Có quá nhiều hình thức MMO khác nhau để lựa chọn. Hãy chọn một hình thức duy nhất, học từ người tin tưởng và bắt tay vào làm cho đến khi có kết quả, không nên đứng núi này trông núi nọ.</p> */}
               <img src={loginImg1} alt="login-img"></img>
           </div>
           <div className="form-login">
               <h3 className="text"> BGCity </h3>
               <h4 className="heading">Đăng nhập vào BGCity</h4>
               <p>Vui chơi, giải trí, thảo luận với thành viên khác trong nền tảng thương mại điện tử về boardgame duy nhất tại Việt Nam</p>
               {/* <p>Đăng nhập bằng </p> */}
               {/* <div className="button-group"> */}
               {/* </div> */}
               <p style={{
                   opacity: 0.5,
                   marginTop: '1rem',
                   marginBottom: '1rem'
               }}>Đăng nhập bằng tài khoản</p>
           <form
               style = {{
                   marginTop: '-10px'
               }}
               noValidate
               autoComplete="off"
               onSubmit={onSubmit}
           >
               <TextField
                   autoComplete=""
                   label="Email"
                   variant="outlined"
                   value={user.email}
                   onChange={onHandleChange}
                   name="email"
                   className="form-input"
                   required={true}
                   helperText={
                       errors.msg === 'Email not empty'
                           ? errors.msg
                           : errors.msg === 'Tài khoản không tồn tại'
                           ? 'User not exits'
                           : ''
                   }
                   error={
                       errors.msg === 'Email not empty' ||
                       errors.msg === 'Tài khoản không tồn tại'
                           ? true
                           : false
                   }
               />
               <TextField
                   autoComplete=""
                   label="Password (6+ Charactor)"
                   variant="outlined"
                   required={true}
                   value={user.password}
                   onChange={onHandleChange}
                   name="password"
                   type="password"
                   className="form-input"
                   helperText={
                       errors.msg === 'Password not empty'
                           ? errors.msg
                           : errors.msg === 'Mật khẩu không đúng'
                           ? 'Password wrong'
                           : ''
                   }
                   error={
                       errors.msg === 'Password not empty' ||
                       errors.msg === 'Mật khẩu không đúng'
                           ? true
                           : false
                   }
               />
               <p style={{
                   opacity: 0.5,
                   textDecoration: 'underline'
               }}>Quên mật khẩu?</p>
               <div className="login-group">
                   <Button
                       variant="contained"
                       // color="primary"
                       type="submit"
                       onSubmit={onSubmit}
                       disabled={user.loading}
                       fullWidth
                       style={{
                           padding: '10px 0',
                           backgroundColor: '#f37435c4',
                           color: 'white'
                       }}
                   >
                       {user.loading ? (
                           <CircularProgress size={25} />
                       ) : (
                           'Đăng nhập vào Boardgame'
                       )}
                   </Button>
                   <p className="register">Chưa có tài khoản BGcity?    <Link to="/register" style={{color: '#f37435c4'}}>Đăng ký</Link></p>     
                  
               </div>
           </form>
           </div>
       </div>
   );
}


