import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import axios from 'axios';

// MUI stuff
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function MyAccount() {
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
    const [date, setDate] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    );

     // handles when user changes input in date inputfield
    const handleChangeDate = e => {
        setDate(e.target.value);
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
                            
                            className="form-infor"
                        >
                            
                            <div className="form-title">
                                <label>Họ và tên</label>
                                <TextField
                                    autoComplete=""
                                    label="Last Name"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Số điện thoại</label>
                                <TextField
                                    autoComplete=""
                                    label="Phone"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Email</label>
                                <TextField
                                    autoComplete=""
                                    label="Email"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Địa chỉ</label>
                                <TextField
                                    autoComplete=""
                                    label="Password"
                                    variant="outlined"
                                    required={true}
                                    value={user.password}
                                    onChange={onHandleChange}
                                    name="password"
                                    type="password"
                                    className="form-input"
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Ngày sinh</label>
                                <TextField
                                    name="date"
                                    id="date"
                                    label="Date"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={date}
                                    onChange={handleChangeDate}
                                    fullWidth
                                    required
                                    className="form-input"
                                  />
                            </div>
                            <div className="login-group" style={{marginLeft:'15%'}}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onSubmit={onSubmit}
                                    disabled={user.loading}
                                    className="update-infor-button"
                                >
                                    {user.loading ? (
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
                            
                            className="form-infor"
                        >
                            
                            <div className="form-title">
                                <label>Mật khẩu cũ</label>
                                <TextField
                                    autoComplete=""
                                    label="Mật khẩu cũ"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Mật khẩu mới</label>
                                <TextField
                                    autoComplete=""
                                    label="Mật khẩu mới"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title">
                                <label>Xác nhận mật khẩu</label>
                                <TextField
                                    autoComplete=""
                                    label="Mật khẩu mới"
                                    variant="outlined"
                                    value= {user.password}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="login-group" style={{marginLeft:'15%'}}>
                                <Button
                                    variant="contained"
                                    
                                    type="submit"
                                    onSubmit={onSubmit}
                                    disabled={user.loading}
                                    className="update-password-button"
                                >
                                    {user.loading ? (
                                        <CircularProgress size={25} />
                                    ) : (
                                        'Cập nhập mật khẩu'
                                    )}
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
