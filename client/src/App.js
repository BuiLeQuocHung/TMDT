import './app.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobleState';
 
import Header from './components/header/Header';
import MainPage from './components/mainpage/MainPage';
import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
 
const App = () => {
   return (
       <DataProvider>
           <Router>
               <Header />
               <div style={{ marginTop: '120px' }}>
                   <MainPage />
               </div>
               <Footer />
           </Router>
           {/* <ToastContainer
           position="top-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
       /> */}
       </DataProvider>
 
   );
}
 
export default App;