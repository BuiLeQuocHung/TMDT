import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobleState } from '../../../GlobleState';
import { Link } from 'react-router-dom';
import ProductItem from '../utils/productItem/ProductItem';
import dayjs from 'dayjs';

function DetailsProduct() {
    let params = useParams();
    const state = useContext(GlobleState);
    const [products] = state.productsApi.products;
    const [detailProduct, setDetailProduct] = useState([]);
    const [isAdmin] = state.usersApi.isAdmin;
    const addCart = state.usersApi.addCart;

    // Component did mount
    useEffect(() => {
        if (params) {
            products.forEach((product) => {
                if (product._id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [detailProduct]);
    return (
        <div className="wapper">
            <div className="titile__" > 
                <div className="tittle-content">
                    <Link to="/" style= {{color: '#7b7b7b'}}>
                        Home 
                    </Link>
                    <span>/</span>
                    <span>{detailProduct.category}</span>
                </div>
            </div>
            <div className="card-product">
               
                <div className="card__body">
                    <div className="card__body-left">
                        {detailProduct.images ? (
                            <img
                                src={detailProduct.images.url}
                                alt="product-detail"
                            ></img>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="card__body-right">
                        <h2 className="modal-name">{detailProduct.name}</h2>
                        <p className="modal-price">
                            {detailProduct.price} vnđ
                        </p>


                        <div className="feature">  
                            <div className="bb">
                                <i class="fas fa-users"></i>
                                <div>
                                    <div className="bb1">Players</div>
                                    <div className="bb2">{detailProduct.blood_type}</div>
                                </div>
                            </div>
                            <div className="bb">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <div className="bb1">Playing Time</div>
                                    <div className="bb2">{detailProduct.blood_type}</div>
                                </div>
                            </div>
                            <div className="bb">
                                <i class="fas fa-birthday-cake"></i>
                                <div>
                                    <div className="bb1">Age</div>
                                    <div className="bb2">{detailProduct.blood_type}</div>
                                </div>
                            </div>
                            <div className="bb">
                                <i class="fas fa-award"></i>
                                <div>
                                    <div className="bb1">Level</div>
                                    <div className="bb2">{detailProduct.blood_type}</div>
                                </div>
                            </div>
                        </div>
                        <div className="desc">
                            Bài Uno - Trò chơi bài phổ biến rầm rộ ở Việt Nam hiện nay. Người chơi đánh hết bài đầu tiên chiến thắng. Và đừng quên hô "Uno" khi bạn chỉ còn 1 lá bài đó!
                        </div>
                        <br></br>
                        <span className="stock"> In stock</span>
                        <div className="reviews">
                            <ul className="stars">
                                <li>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li>
                                    <i className="fa fa-star"></i>
                                </li>
                                <li>
                                    <i className="far fa-star"></i>
                                </li>
                            </ul>
                            <span>(64 reviews)</span>
                        </div>
                        
                        <div className="card__bottom">
                            {isAdmin ? (
                                <div className="product_admin-btn">
                                    {/* <div className="product_admin-delete">Delete</div>🐊🚀 */}
                                    <div className="product_admin-edit">
                                        <Link
                                            to={`/product/edit/${detailProduct._id}`}
                                            style={{ color: 'white' }}
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="card_btn-addtocart"
                                    onClick={() => addCart(detailProduct)}
                                >
                                    Add To Cart
                                </div>
                            )}
                        </div>
                        <div className="single-line"></div>
                        <div className="delivery">
                            <i class="fas fa-truck-moving"></i>
                            <span>Estimated delivery time</span>
                            <div className="delivery-desc">
                                <li>Hà Nội & HCM: 1 - 2 ngày. Miễn phí với đơn hàng trên 500.000đ</li>
                                <li>Các tỉnh thành khác: 3 - 5 ngày</li>
                                <li>Trường hợp cần giao hàng gấp, liên hệ trực tiếp Hotline: 12345</li>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="indicator"></div>
                
            </div>
            <div className="related-products container">
                <h2>Related products</h2>
                <div className="row">
                    {products.map((product, index) => {
                        if (product.category === detailProduct.category) {
                            if (index <= 7) {
                                return (
                                    <ProductItem
                                        product={product}
                                        key={index}
                                    />
                                );
                            }
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DetailsProduct;
