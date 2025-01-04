
'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingForm from './components/BookingForm';
import AvailabilityDisplay from './components/AvailabilityDisplay';
import BookingSummary from './components/BookingSummary';
import CalendarView from './components/CalendarView';
import Navbar from './components/Navbar';

export default function Home() {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [retrievedBooking, setRetrievedBooking] = useState(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
    setBookingStep(2);
  };

  const handleTimeSelect = (newTime) => {
    setBookingDetails((prev) => ({ ...prev, time: newTime }));
  };

  const handleConfirmBooking = () => {
    console.log('Booking confirmed:', bookingDetails);
    setBookingStep(3);
  };

  const handleRetrieveBooking = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/bookings/${id}`);
      if (response.ok) {
        const booking = await response.json(); // Expect a single booking object
        console.log('Retrieved booking:', booking);
        setRetrievedBooking(booking); // Set the retrieved booking
      } else if (response.status === 404) {
        alert('Booking not found');
      } else {
        alert('An error occurred while retrieving the booking');
      }
    } catch (error) {
      console.error('Error retrieving booking:', error);
    }
  };
  

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        alert('Booking deleted successfully');
      } else {
        alert('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 text-amber-900">
      <div className="container mx-auto px-4 py-8">
        <Navbar
          onRetrieveBooking={handleRetrieveBooking}
          onDeleteBooking={handleDeleteBooking}
        />
        <header className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">Resto Dino</h1>
          <p className="text-xl italic">Experience the Taste</p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          {retrievedBooking && (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-4">Retrieved Booking:</h2>
    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
      <p><strong>Date:</strong> {new Date(retrievedBooking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {retrievedBooking.time}</p>
      <p><strong>Guests:</strong> {retrievedBooking.guests}</p>
      <p><strong>Name:</strong> {retrievedBooking.name}</p>
      <p><strong>Email:</strong> {retrievedBooking.email}</p>
      <p><strong>Phone:</strong> {retrievedBooking.phone}</p>
    </div>
  </div>
)}

          {bookingStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BookingForm onSubmit={handleBookingSubmit} />
              <CalendarView />
            </div>
          )}
          {bookingStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AvailabilityDisplay
                bookingDetails={bookingDetails}
                onTimeSelect={handleTimeSelect}
              />
              <BookingSummary
                bookingDetails={bookingDetails}
                onConfirm={handleConfirmBooking}
              />
            </div>
          )}
          {bookingStep === 3 && (
            <BookingSummary bookingDetails={bookingDetails} confirmed={true} />
          )}
        </motion.div>
      </div>
    </main>
  );
}
