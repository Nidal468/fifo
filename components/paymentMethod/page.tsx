'use client'

import { SetStateAction, useState } from 'react';

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState('pay_up_front');
    const [cardDetails, setCardDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        billingAddress: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        email: '',
        phone: '',
    });

    const handleMethodChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedMethod(event.target.value);
    };
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px]'>
                <label htmlFor="payment-method">Payment method:</label>
                <select id="payment-method" value={selectedMethod} onChange={handleMethodChange}>
                    <option value="">Pay on receipt</option>
                    <option value="pay_up_front">Pay up front</option>
                    <option value="other">Cash advance</option>
                </select>
            </div>
            {selectedMethod === 'pay_up_front' && (
                <div className="credit-card-input w-full bg-slate-200 p-[10px] rounded-[5px] flex flex-col gap-[10px]">
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="cardholderName" className='text-zinc-700'>Cardholder Name:</label>
                        <input
                            type="text"
                            id="cardholderName"
                            name="cardholderName"
                            placeholder="Name on card"
                            value={cardDetails.cardholderName}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="expirationDate">Expiration Date:</label>
                        <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            placeholder="MM/YY"
                            value={cardDetails.expirationDate}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="billingAddress">Billing Address:</label>
                        <input
                            type="text"
                            id="billingAddress"
                            name="billingAddress"
                            placeholder="Street Address"
                            value={cardDetails.billingAddress}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={cardDetails.city}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="state">State/Province:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="State"
                            value={cardDetails.state}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="zip">Zip/Postal Code:</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="Zip/Postal Code"
                            value={cardDetails.zip}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            value={cardDetails.country}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            value={cardDetails.email}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-[10px]'>
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="123-456-7890"
                            value={cardDetails.phone}
                            onChange={handleInputChange}
                            className='w-full bg-white outline-0 p-[5px] rounded-[3px]'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethod;
