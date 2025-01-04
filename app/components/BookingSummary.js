'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function BookingSummary({ bookingDetails, onConfirm, confirmed }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  let BookingId=1;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(backendUrl);

  const handleConfirmBooking = async () => {
    if (confirmed || isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendUrl}api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingDetails,
          date: format(bookingDetails.date, 'yyyy-MM-dd'), // Ensure date is formatted for backend
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setConfirmationMessage('Booking confirmed successfully!');
        onConfirm(result); // Notify parent about the confirmed booking
      } else {
        setConfirmationMessage('Failed to confirm booking. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      setConfirmationMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-serif font-bold mb-6">
        {confirmed ? 'Booking Confirmed!' : 'Booking Summary'}
      </h2>
      <div className="space-y-4 text-lg">
        <p><strong>Date:</strong> {format(bookingDetails.date, "PPP")}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Guests:</strong> {bookingDetails.guests}</p>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>Phone:</strong> {bookingDetails.phone}</p>
        <p><strong>Booking Id:</strong> {BookingId++}</p>
      </div>

      {confirmationMessage && (
        <p className={`text-center ${confirmed ? 'text-green-600' : 'text-red-600'} font-semibold`}>
          {confirmationMessage}
        </p>
      )}

      {!confirmed && (
        <Button
          onClick={handleConfirmBooking}
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700'
          } text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </Button>
      )}

      {confirmed && (
        <div className="text-center text-green-600 font-semibold">
          <p>Thank you for your reservation!</p>
          <p>We look forward to serving you.</p>
        </div>
      )}
    </motion.div>
  );
}
