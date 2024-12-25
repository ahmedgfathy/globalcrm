import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePicker } from 'antd';
import { useTranslation } from '@/app/context/TranslationContext';

function Modal({ isDialogOpen, setIsDialogOpen, handleAddEvent, setEventType, newEventTitle, setNewEventTitle, eventType, startDate, setStartDate, endDate, setEndDate, description, setDescription }) {
  const { locale } = useTranslation();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent locale={locale}>
        <DialogHeader>
          <DialogTitle>Add New Event Details</DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleAddEvent}>
          <Input
            type="text"
            placeholder="Event Title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            required
            className="border border-gray-200 p-3 rounded-md text-lg"
          />
          <Select onValueChange={(value) => setEventType(value)}>
            <SelectTrigger className="w-[180px]">
              <span>{eventType || 'Select Type'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="call">Call</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <DatePicker
            label="Start Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            
          />
          <DatePicker
            label="End Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-200 p-3 rounded-md text-lg"
          />
          <Button
            className="bg-green-500 text-white p-3 mt-5 rounded-md"
            type="submit"
          >
            Add Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
