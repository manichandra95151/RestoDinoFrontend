'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function BookingForm({ onSubmit }) {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ date, time, guests, name, email, phone })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-serif font-bold mb-6">Make a Reservation</h2>
      <div className="space-y-2">
        <Label htmlFor="date" className="text-lg">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="time" className="text-lg">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="bg-amber-50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guests" className="text-lg">Number of Guests</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          required
          className="bg-amber-50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-amber-50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-amber-50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-lg">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="bg-amber-50"
        />
      </div>
      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        Check Availability
      </Button>
    </motion.form>
  )
}

