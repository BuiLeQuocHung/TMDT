import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg from './login-1.png';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import makeTimer from '../../../../utils'
// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const firebaseAuth = require("firebase/auth");
 
export default function ForgotPassword() {
    const[email, setEmail] = useState('')
    const [errors, setErrors] = useState({});

    const onHandleChange = (e) => {
        const { email, value } = e.target;
        setEmail(value)
    }

  const onSubmit = async (e) =>  {
        try {
            console.log('here!!')
            await axios.post(
                `/user/forgotpassword`,
                {email},
            );

            toast.success(`Gửi mail khôi phục mật khẩu thành công`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            await makeTimer(2100)

            window.location.href = '/login'

            console.log("Password reset email sent!");
        } catch(error)  {
            toast.error('Email không tồn tại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    } 
  return (
      <div className="login register">
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
          <div className="login-img">
              <img src={loginImg} alt="login-img"></img>
          </div>
          <div className="form-login">
              <h3 className="text"> BGCity </h3>
              <h4 className="heading">Quên mật khẩu</h4>
              <p>Vui chơi, giải trí, thảo luận với thành viên khác trong nền tảng thương mại điện tử về boardgame duy nhất tại Việt Nam</p>
              <p style={{
                  opacity: 0.5,
                  marginTop: '1rem',
                  marginBottom: '1rem'
              }}>Nhập email của bạn</p>

              <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={onHandleChange}
                  name="email"
                  className="form-input"
                  required={true}
                  helperText={
                      errors.msg === 'Email not empty' ? errors.msg : ''
                  }
                  error={errors.msg === 'Email not empty' ? true : false}
                  autoComplete=""
              />
              <div className="login-group">
                  <Button
                      variant="contained"
                      // color="primary"
                      onClick={onSubmit}
                      fullWidth
                      style={{
                          padding: '10px 0',
                          backgroundColor: '#f37435c4',
                          color: 'white'
                      }}
                  >
                      Đặt lại mật khẩu
                  </Button> 
              </div>
          </div>
      </div>
  );
}
 
 
 

