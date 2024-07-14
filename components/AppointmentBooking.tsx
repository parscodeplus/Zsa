'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, DayValue } from 'react-x-calendar';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

interface TimeSlot {
  start: string; // Format: 'HH:mm'
  end: string;   // Format: 'HH:mm'
}

interface Availability {
  date: string; // Format: 'YYYY-MM-DD'
  timeSlots: TimeSlot[];
}

// Holidays in Tir 1403 (July 2024)
const holidays: string[] = [
  '2024-06-21',
  '2024-06-23',
  '2024-06-28',
  '2024-06-30',
  '2024-07-05',
  '2024-07-07',
  '2024-07-12',
  '2024-07-14',
  '2024-07-19',
];

const breakTimes: TimeSlot[] = [
  { start: '12:00', end: '13:00' },
  { start: '17:00', end: '17:30' },
];

const availabilityData: Availability[] = [
  { date: '2024-07-15', timeSlots: [{ start: '09:00', end: '10:00' }, { start: '10:00', end: '11:00' }] },
  { date: '2024-07-16', timeSlots: [{ start: '11:00', end: '12:00' }, { start: '14:00', end: '15:00' }] },
  // Add more availability data here
];

const isHoliday = (date: string): boolean => {
  return holidays.includes(date);
};

const formatDate = (date: DayValue): string => {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
};

const AppointmentBooking: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay);
      if (!isHoliday(formattedDate)) {
        const availability = availabilityData.find(avail => avail.date === formattedDate);
        setAvailableTimeSlots(availability ? availability.timeSlots : []);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  }, [selectedDay]);

  const isDayDisabled = (day: DayValue): boolean => {
    const formattedDate = formatDate(day);
    return isHoliday(formattedDate);
  };

  const disabledDays = holidays.map(date => {
    const [year, month, day] = date.split('-').map(Number);
    return { year, month, day };
  });

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="mb-5 text-2xl font-bold">???? ???</h1>
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        locale="fa"
        disabledDays={disabledDays}
        
        shouldHighlightWeekends
      />
      {selectedDay && (
        <div className="mt-5">
          <h2 className="mt-5 text-xl font-semibold">????? ??????????:</h2>
          <p>{`${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`}</p>
          {availableTimeSlots.length > 0 ? (
            <div>
              <h3 className="mt-3 text-lg font-medium">???????? ?????:</h3>
              <ul className="list-disc pl-5">
                {availableTimeSlots.map((slot, index) => (
                  <li key={index}>{`${slot.start} - ${slot.end}`}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-3 text-red-500">??? ???? ???? ???? ??? ??? ???? ?????.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
