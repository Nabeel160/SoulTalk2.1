import React,{useState, useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';



const stripePromise = loadStripe("pk_test_51OwIeXRupoa5NrAzir5dLjpwd81Ndks1AoDx3sJNvd7L4hd3LzABXQ0nVwIINYDiixh413f5kZEDT4WhY52oITRR00heOXo6Xy");

const Checkout = () => {

    const [clientsecret, setClientSecret]=useState('')
    const {prod_id}=useParams();
    console.log(prod_id)
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/payments/create-checkout-session/${prod_id}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prod_id),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret:clientsecret
      };




  return (
    <div className='container'>
        {clientsecret && (
        <Elements  stripe={stripePromise} options={options}>
             <PaymentForm/>
        </Elements>
      )}
    </div>
  )
}

export default Checkout