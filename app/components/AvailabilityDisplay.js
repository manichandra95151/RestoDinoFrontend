'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function AvailabilityDisplay({ bookingDetails, onTimeSelect }) {
  const [selectedTime, setSelectedTime] = useState(bookingDetails.time)

  // This is a mock function to simulate checking availability
  const checkAvailability = (date) => {
    // In a real application, this would make an API call to check availability
    const allTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
    // Simulate some times being unavailable
    const unavailableTimes = ['18:00', '19:30']
    return allTimes.map(time => ({
      time,
      available: !unavailableTimes.includes(time)
    }))
  }

  const availableTimes = checkAvailability(bookingDetails.date)

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    onTimeSelect(time)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-serif font-bold mb-6">Available Times</h2>
      <p className="text-lg">Date: <span className="font-semibold">{format(bookingDetails.date, "PPP")}</span></p>
      <p className="text-lg">Selected time: <span className="font-semibold">{selectedTime}</span></p>
      <div className="grid grid-cols-3 gap-3">
        {availableTimes.map(({ time, available }) => (
          <Button 
            key={time} 
            variant={time === selectedTime ? "default" : "outline"}
            className={`
              ${available ? 'bg-amber-50 hover:bg-amber-100' : 'bg-red-100 text-red-600'}
              ${time === selectedTime ? 'ring-2 ring-amber-600' : ''}
            `}
            disabled={!available}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

