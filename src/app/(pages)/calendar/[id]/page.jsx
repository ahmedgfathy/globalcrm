"use client";
import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  addEvent,
  deleteEvent,
  getEventsForLeadsOrUnits,
  updateEvent,
} from "@/actions/event";
import Modal from "@/app/components/calender/Modal";

const Calendar =   ({params }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const fetchEvents = async () => {
    try {
      const data = await getEventsForLeadsOrUnits(params.id);
      setCurrentEvents(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventDrop = async (eventDropInfo) => {
    const { event } = eventDropInfo;

    const updatedEvent = {
      description: event.title,
      mettingDate: event.start.toISOString(),
    };

    try {
      await updateEvent(event.id, updatedEvent);
      console.log("Event updated:", updatedEvent);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);

      eventDropInfo.revert();
    }
  };
  const sendData = async (title, start, end, type, description) => {
    const eventData = {
      description: title,
      mettingDate: start,
      endDate: end,
      type: type,
      details: description,
      eventFor: params.id,
    };
    try {
      const data = await addEvent(eventData);
      setNewEventTitle("")
      setSelectedDate("")
      setEventType("")
      setStartDate("")
      setEndDate("")
      setDescription("")
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const data = await deleteEvent(id);
      console.log(data);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      handleDelete(selected.event.id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEventTitle  && eventType && description) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();
  
      const newEvent = {
        title: newEventTitle,
        start: startDate || selectedDate.start,
        end: endDate || selectedDate.end,
        allDay: false,
        extendedProps: {
          type: eventType,
          description: description,
        },
      };
  
      calendarApi.addEvent(newEvent);
      handleCloseDialog();
      sendData(newEventTitle, newEvent.start, newEvent.end, eventType, description);
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
            events={currentEvents?.map((event) => ({
              id: event.$id,
              title: event.description,
              start: event.mettingDate,
              end: event.endDate,
              allDay: true,
            }))}
          />
        </div>
      </div>
<Modal 
isDialogOpen={isDialogOpen}
setIsDialogOpen={setIsDialogOpen}
handleAddEvent={handleAddEvent}
setEventType={setEventType} newEventTitle={newEventTitle}
setNewEventTitle={setNewEventTitle} eventType={eventType} startDate={startDate} setStartDate={setStartDate}
endDate={endDate} setEndDate={setEndDate} description={description} setDescription={setDescription}
/>
    </div>
  );
};

export default Calendar;
