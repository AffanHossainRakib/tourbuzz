// src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const PaymentPage = () => {
    const location = useLocation();
    const { tour } = location.state || {}; // Get the passed tour data
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [cardType, setCardType] = useState('');
    const navigate = useNavigate();

    // Detect the card type based on the input number
    const detectCardType = (number) => {
        const visaPattern = /^4/;
        const masterCardPattern = /^5[1-5]/;

        if (visaPattern.test(number)) {
            return 'Visa';
        } else if (masterCardPattern.test(number)) {
            return 'MasterCard';
        }
        return '';
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setCardNumber(value);
        setCardType(detectCardType(value));
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setExpiryDate(value);
    };

    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setCvc(value);
    };

    const handlePayment = () => {
        // Perform simple validation
        if (
            cardNumber.length < 13 || cardNumber.length > 19 || // Validate card length
            expiryDate.length !== 5 || // MM/YY format
            cvc.length < 3 || cvc.length > 4 // CVC typically 3 or 4 digits
        ) {
            alert('Please enter valid payment details.');
            return;
        }

        // Simulate payment processing
        setTimeout(() => {
            setIsPaymentSuccessful(true);
            setShowConfetti(true);

            // Redirect to homepage after showing success
            setTimeout(() => {
                setShowConfetti(false);
                navigate('/');
            }, 3000); // Adjust timeout for showing confetti
        }, 1000); // Simulate a delay for payment processing
    };

    if (!tour) {
        return <div className="min-h-screen flex items-center justify-center">No tour selected.</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 relative">
            {/* Success Overlay */}
            {isPaymentSuccessful && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div className="relative z-10 bg-white text-black rounded-lg shadow-lg p-12 w-full max-w-lg text-center overflow-hidden">
                        {showConfetti && (
                            <div className="absolute inset-0">
                                <Confetti width={500} height={400} numberOfPieces={200} recycle={false} />
                            </div>
                        )}
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-500 rounded-full p-6">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-green-500">Payment Successful</h2>
                    </div>
                </div>
            )}

            <div className="flex w-full max-w-5xl bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
                {/* Booked Tour Details */}
                <div className="w-1/2 p-8 flex flex-col items-start">
                    <img src={tour.image} alt={tour.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold mb-4">{tour.title}</h2>
                    <p className="mb-2"><strong>Location:</strong> {tour.location}</p>
                    <p className="mb-2"><strong>Price:</strong> ${tour.price}</p>
                    <p className="mb-2"><strong>Seats Available:</strong> {tour.availableSeats}</p>
                    <p className="mb-2"><strong>Start Date:</strong> {tour.startDate}</p>
                    <p className="mb-2"><strong>End Date:</strong> {tour.endDate}</p>
                </div>

                {/* Payment Form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-center">Payment Details</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-gray-300">Card Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    maxLength="19"
                                    required
                                />
                                {cardType && (
                                    <img 
                                        src={`/assets/cards/${cardType.toLowerCase()}.png`} // Path to card logo (visa.png, mastercard.png, etc.)
                                        alt={cardType}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-300">Expiration Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                maxLength="5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-300">CVC</label>
                            <input
                                type="text"
                                value={cvc}
                                onChange={handleCvcChange}
                                placeholder="CVC"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                maxLength="4"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
