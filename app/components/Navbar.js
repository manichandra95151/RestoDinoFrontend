import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar({ onRetrieveBooking, onDeleteBooking }) {
  const [bookingId, setBookingId] = useState('');

  const handleRetrieveClick = () => {
    if (bookingId) {
      onRetrieveBooking(bookingId);
    }
  };

  const handleDeleteClick = () => {
    if (bookingId) {
      onDeleteBooking(bookingId);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-amber-600 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="bg-white text-black"
        />
        <Button onClick={handleRetrieveClick} className="bg-amber-700 hover:bg-amber-800">
          Retrieve Booking
        </Button>
        <Button onClick={handleDeleteClick} className="bg-red-600 hover:bg-red-700">
          Delete Booking
        </Button>
      </div>
    </nav>
  );
}
