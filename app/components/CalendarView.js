'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export default function CalendarView() {
  const [date, setDate] = useState(new Date())

  const getBookings = (date) => {
    if (!date) return [];
    return ['18:00', '19:30', '20:00']
  }

  const bookedTimes = getBookings(date)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-serif font-bold mb-6">Select a Date</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-amber-50"
      />
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Booked Times for {date ? date.toDateString() : 'Selected Date'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {bookedTimes.map((time) => (
            <Button key={time} variant="outline" disabled className="bg-red-100 text-red-600">
              {time}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

