import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import axios from 'axios';

const getImageUrl = (imageUrl) => {
    return `${process.env.PUBLIC_URL}/assets/tours/${imageUrl}`;
};

const PaymentPage = () => {
    const location = useLocation();
    const { tourId } = location.state || {};
    const [tour, setTour] = useState(null);
    const [seatsToBook, setSeatsToBook] = useState('1');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [cardType, setCardType] = useState('');
    const [isHovering, setIsHovering] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');
    const navigate = useNavigate();

    const expiryRef = useRef(null);
    const cvcRef = useRef(null);

    useEffect(() => {
        if (tourId) {
            const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';
            axios.get(`${serverBaseUrl}/GetTourById/${tourId}`)
                .then((response) => {
                    setTour(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching tour details:', error);
                });
        }
    }, [tourId]);

    const handleSeatsChange = (e) => {
        setSeatsToBook(e.target.value);
    };

    const validateSeats = () => {
        const seats = parseInt(seatsToBook, 10);
        if (isNaN(seats) || seats <= 0) {
            alert('Please enter a valid number of seats.');
            return false;
        }
        if (seats > tour.available_seats) {
            alert(`You can only book up to ${tour.available_seats} seats.`);
            return false;
        }
        return true;
    };

    const detectCardType = (number) => {
        const visaPattern = /^4/;
        const masterCardPattern = /^5[1-5]/;
        if (visaPattern.test(number)) return 'Visa';
        if (masterCardPattern.test(number)) return 'MasterCard';
        return '';
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCardNumber(value);
        setCardType(detectCardType(value));

        if (value.length === 16) {
            expiryRef.current.focus();
        }
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
        setExpiryDate(value);

        if (value.length === 5) {
            cvcRef.current.focus();
        }
    };

    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvc(value);
    };

    const handlePayment = async () => {
        if (!validateSeats()) return;

        if (cardNumber.length < 13 || cardNumber.length > 19 || expiryDate.length !== 5 || cvc.length < 3 || cvc.length > 4) {
            alert('Please enter valid payment details.');
            return;
        }

        setTimeout(async () => {
            setIsPaymentSuccessful(true);
            setShowConfetti(true);

            const remainingSeats = tour.available_seats - parseInt(seatsToBook, 10);
            let status = remainingSeats === 0 ? 'booked' : 'available';

            const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';
            try {
                await axios.post(`${serverBaseUrl}/UpdateTourSeats`, {
                    id: tour.id,
                    available_seats: remainingSeats,
                    status,
                });

                const user = JSON.parse(localStorage.getItem('user'));
                const email = user.email;

                await axios.post(`${serverBaseUrl}/CompletePayment`, {
                    email,
                    tour_id: tour.id,
                    seats_booked: parseInt(seatsToBook, 10),
                });

                setBookingMessage(`Booking successful! ${seatsToBook} seats booked.`);
            } catch (error) {
                console.error('Error completing payment:', error);
                setBookingMessage('Error completing the booking and payment.');
            }

            setTimeout(() => {
                setShowConfetti(false);
                navigate('/');
            }, 3000);
        }, 1000);
    };

    if (!tour) {
        return <div className="min-h-screen flex items-center justify-center">Loading tour details...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {isPaymentSuccessful && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div className="relative z-10 bg-white text-black rounded-3xl shadow-2xl p-16 w-full max-w-2xl text-center overflow-hidden">
                        {showConfetti && (
                            <div className="absolute inset-0">
                                <Confetti width={800} height={600} numberOfPieces={300} recycle={false} />
                            </div>
                        )}
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-500 rounded-full p-8">
                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-green-500 mb-4">Payment Successful</h2>
                        <p className="text-lg text-gray-700">{bookingMessage}</p>
                    </div>
                </div>
            )}

            <div className="flex w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
                <div className="w-1/2 p-10 flex flex-col items-start bg-gradient-to-b from-indigo-600 to-blue-500 text-white rounded-l-3xl">
                    <img src={getImageUrl(tour.image_url)} alt={tour.title} className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg" />
                    <h2 className="text-3xl font-bold mb-4">{tour.title}</h2>
                    <p className="mb-2 text-lg"><strong>Price:</strong> ${tour.price}</p>
                    <p className="mb-2 text-lg"><strong>Start Date:</strong> {tour.start_date}</p>
                    <p className="mb-2 text-lg"><strong>Seats Available:</strong> {tour.available_seats}</p>
                    <div className="mb-6">
                        <label className="block mb-1 text-white">Number of Seats to Book</label>
                        <input
                            type="text"
                            value={seatsToBook}
                            onChange={handleSeatsChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                </div>

                <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-100 rounded-r-3xl">
                    <h3 className="text-2xl font-bold mb-6 text-center">Payment Details</h3>
                    <form className="space-y-6">
                        <div>
                            <label className="block mb-1 text-gray-700">Card Number</label>
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
                                        src={`/assets/cards/${cardType.toLowerCase()}.png`}
                                        alt={cardType}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-700">Expiration Date</label>
                            <input
                                ref={expiryRef}
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
                            <label className="block mb-1 text-gray-700">CVC</label>
                            <input
                                ref={cvcRef}
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
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={handlePayment}
                        >
                            {isHovering ? 'Pay Now' : `Total: $${tour.price * seatsToBook}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
