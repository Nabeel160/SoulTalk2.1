import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../Config';
import '../../../App.css';
import axios from "axios";

interface ProductType {
    id: number;
    name: string;
    product_image: string;
    price: string;
}

axios.defaults.withCredentials = true;



const Product: React.FC = () => {
    const [prod, setProd] = useState<ProductType>({
        id: 0,
        name: "",
        product_image: "",
        price: ""
    });
    const [url,setUrl]=useState<string>("")
    const { product_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, [product_id]);


    const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

    const getProduct = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/payments/product/${product_id}/`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data: ProductType = await response.json();
                setProd(data);
            } else {
                // Handle error response
                console.error('Error fetching product:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    // Function to retrieve CSRF token from cookies

    const handleCheckout = async () => {
        try {
            const csrfToken = getCSRFToken();
            if (!csrfToken) {
                console.error('CSRF token not found');
                return;
            }
            const response = await fetch(`${API_URL}/api/payments/create-checkout-session/${prod.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token in request headers
                },
                credentials: 'include',
                // Add any request body data if needed
                // body: JSON.stringify({ /* Add data here */ }),
            });
            if (response.ok) {
                // Handle successful checkout
                console.log('Checkout successful');
               const responseData = await response.json();
                console.log('Checkout session URL:', responseData.checkout_url);
               window.location.href = responseData.checkout_url;
            } else {
                // Handle error response
                console.error('Error during checkout:', response.statusText);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className='containers'>
            <div className='cards'>
                <img src={prod?.product_image} alt="" className='p_img'/>
                <div>
                    <h3>{prod?.name}</h3>
                    <p>$ {prod?.price}</p>
                </div>
                <button onClick={handleCheckout} className='btns'>Checkout</button>
            </div>
        </div>
    );
};

export default Product;
