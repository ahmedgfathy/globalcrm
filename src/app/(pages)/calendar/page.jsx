"use client"
import React, { useState, useEffect } from "react";
import {
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addEvent, deleteEvent, getEventsForUser, updateEvent } from "@/actions/event";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchEvents = async ()=>{
    try{
      const data = await getEventsForUser()
      setCurrentEvents(data)
      console.log(data)
    }catch(error){console.error(error)}
  }

  useEffect(() => {
    fetchEvents()
  }, []);

  const handleEventDrop = async (eventDropInfo) => {
    const { event } = eventDropInfo;
  
    const updatedEvent = {
      description: event.title, 
      mettingDate: event.start.toISOString(),
    };
  
    try {

      await updateEvent(event.id,updatedEvent); 
      console.log("Event updated:", updatedEvent);
      fetchEvents(); 
    } catch (error) {
      console.error("Error updating event:", error);
  

      eventDropInfo.revert();
    }
  };
  

  const sendData = async (newEventTitle, selectedDate) => {
    const currentData = {description: newEventTitle, mettingDate: selectedDate}
    try{
      const data = await addEvent(currentData)
      console.log(data)
      fetchEvents()
    }catch(error){
      console.error(error)
    }
  }

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };
const handleDelete = async(id)=>{
  try{
    const data = await deleteEvent(id)
    console.log(data)
    fetchEvents()
  }catch(error){
    console.error(error)
  }
}
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      // selected.event.remove();
      handleDelete(selected.event.id)
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar; 
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
      sendData(newEventTitle, selectedDate.start)
    }
  };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                  key={event?.$id}
                >
                  {event?.description}
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event?.mettingDate, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
        <FullCalendar
  height={"85vh"}
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  }} 
  initialView="dayGridMonth"
  editable={true} 
  selectable={true} 
  selectMirror={true} 
  dayMaxEvents={true} 
  select={handleDateClick}
  eventDrop={handleEventDrop}
  eventClick={handleEventClick} 
  events={currentEvents?.map(event => ({
    id: event.$id,
    title: event.description,
    start: event.mettingDate,
    allDay: true 
  }))}
/>

        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <button
              className="bg-green-500 text-white p-3 mt-5 rounded-md"
              type="submit"
            >
              Add
            </button>{" "}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;