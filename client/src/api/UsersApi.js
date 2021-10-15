import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
 
function UsersApi(token) {
  const [isLogged, setIslogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState(false);
  // thang nay dung de render cai history khi mua hang hanh cong -> goi lai API
 
  //  Add Cart
  const addCart = async (product) => {
      if (isLogged === false) {
          alert('Please login to continue buying');
      } else {
          const check = cart.every((item) => {
              return item.id !== product.id;
          });
          if (check) {
              setCart([...cart, { ...product, quantity: 1 }]);
              axios.patch(
                  '/user/addCart',
                  { cart: [...cart, { ...product, quantity: 1 }] },
                  {
                      headers: { Authorization: token },
                  },
              );
          } else {
              toast.success('🦄 Wow so easy!', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
            
              alert('This product has been added to cart.');
          }
      }
  };
 
  // Get User
  useEffect(() => {
      if (token) {
          const getUser = async () => {
              try {
                  const res = await axios.get('/user/infor', {
                      headers: { Authorization: token },
                  });
                  console.log("========res=get user=====", res)
                  setIslogged(true);
                  if (res.data.role === 1) {
                      setIsAdmin(true);
                  }
                  setCart(Object.values(res.data.cart));
                  console.log("=======truc khi ", user)
                  setUser(res.data);
                  console.log("=======sau khi ", user)
              } catch (err) {
                  console.log(err.response);
              }
          };
          getUser();
      }
  }, [token, isAdmin, isLogged, callback]);
 
  // Payment
  useEffect(() => {
      if (token) {
          const getHistory = async () => {
              if (isAdmin) {
                  let res = await axios.get('/api/payment', {
                      headers: { Authorization: token },
                  });
                  setHistory(Object.values(res.data));
              } else {
                  let res = await axios.get('/user/history', {
                      headers: { Authorization: token },
                  });
                  setHistory(Object.values(res.data));
              }
          };
          getHistory();
      }
  }, [token, callback, isAdmin]);
 
  return {
      isLogged: [isLogged, setIslogged],
      isAdmin: [isAdmin, setIsAdmin],
      cart: [cart, setCart],
      history: [history, setHistory],
      callback: [callback, setCallback],
      addCart: addCart,
      user: [user, setUser],
  };
}
 
export default UsersApi;