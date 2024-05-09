import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://127.0.0.1:3000/payments/success',
                receipt_email: email,
            },
        });

        if (error && (error.type === "card_error" || error.type === "validation_error")) {
            // @ts-ignore
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                />
                <PaymentElement id="payment-element" />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default PaymentForm;
