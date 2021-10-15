import React, { useState, useContext, useEffect } from 'react';
import { GlobleState } from '../../../GlobleState';
import axios from 'axios';
function Categories() {
    const state = useContext(GlobleState);
    const [categories] = state.categoriesApi.categories;
    const [callback, setCallback] = state.categoriesApi.callback;
    const [token] = state.token;

    const [categorycreate, setCategorycreate] = useState('');
    const [categoryupdate, setCategoryupdate] = useState('');
    const [id, setId] = useState('');
    // const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const createCategory = async (e) => {
        e.preventDefault();
        try {
           console.log("categorycreate:", categorycreate);
           console.log("categoryupdate:", categoryupdate);
            await axios.post(
                '/api/category',
                { name: categorycreate },
                {
                    headers: { Authorization: token },
                },
            );
            alert(`Add ${categorycreate} successfully`);
            setCategorycreate('');
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            
            console.log(id);
            console.log(categoryupdate);
            await axios.put(
                `/api/category/${id}`,
                { name: categoryupdate },
                {
                    headers: { Authorization: token },
                },
            );
            alert(`update ${categoryupdate} successfully`);
            setCategoryupdate('');
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    

    const editCategory = (id, name) => {
        // setOnEdit(true);
        setId(id);
        setCategoryupdate(name);
    };
    const deleteCategory = async (id, name) => {
        if (window.confirm('You want delete this category')) {
            try {
                console.log("detele",id);
                await axios.delete(`/api/category/${id}`, {
                    headers: { Authorization: token },
                });
                console.log("detele:",callback);
                setCallback(!callback);
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
    };

    return (
        <div className="categories">
            <div className="container">
                <div className="categories-body">
                    <div className="categories-form">
                        <form onSubmit={createCategory} className="create-category">
                            <label
                                htmlFor="category"
                                className="categories-label"
                            >
                               Tên: 
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                className="categories-input"
                                value={categorycreate}
                                required
                                onChange={(e) => setCategorycreate(e.target.value)}
                            ></input>
                            <button
                                type="submit"
                                className="categories-button"
                                style={{ width: '80px' }}
                            >
                                Tạo
                            </button>
                        </form>
                        <form onSubmit={updateCategory} className="create-category">
                            <label
                                htmlFor="category"
                                className="categories-label"
                            >
                                Tên:
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                className="categories-input"
                                value={categoryupdate}
                                required
                                onChange={(e) => setCategoryupdate(e.target.value)}
                            ></input>
                            <button
                                type="submit"
                                className="categories-button"
                                style={{ width: '80px' }}
                            >
                                Lưu
                            </button>
                        </form>
                    </div>
                    <div className="categories-list">
                        {categories && Object.values(categories).map((category) => {
                            return (
                                <div
                                    key={category.id}
                                    className="categories-item"
                                >
                                    <div className="categories-item-name">
                                        {category.name}
                                    </div>
                                    <div>
                                        <button
                                            className="categories-button"
                                            style={{ marginRight: '10px' }}
                                            onClick={() =>
                                                editCategory(
                                                    category.id,
                                                    category.name,
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="categories-button"
                                            onClick={() =>
                                                deleteCategory(
                                                    category.id,
                                                    category.name,
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
