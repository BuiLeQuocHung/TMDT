import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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
            <div className ="infomation">
                <div className="customer-detail">
                    <h3>Account Information</h3>
                    <form 
                        noValidate
                        autoComplete="off"
                        
                        className="form-infor"
                    >
                        <div className="name">
                            <div className="form-title " style={{width:'50%',marginRight:'50px'}}>
                                <label>First Name</label>
                                <TextField
                                    autoComplete=""
                                    label="First Name"
                                    variant="outlined"
                                    value= {user.email}
                                    onChange={onHandleChange}
                                    name="email"
                                    className="form-input"
                                    required={true}
                                    helperText=""
                                    error=""
                                />
                            </div>
                            <div className="form-title" style={{width:'50%'}}>
                                <label>Last Name</label>
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
                        </div>
                        
                        <div className="form-title">
                            <label>Phone</label>
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
                            <label>Password</label>
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
                        <div className="login-group" style={{marginLeft:'15%'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onSubmit={onSubmit}
                                disabled={user.loading}
                            >
                                {user.loading ? (
                                    <CircularProgress size={25} />
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
