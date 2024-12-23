"use client";
import React, { useState, useEffect, useRef } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Video, Users, Bell, Plus } from "lucide-react";
import "./calendar.css";

export default function CalendarDashboard() {
  const calendarRef = useRef(null);
  const [activeView, setActiveView] = useState('month');
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const calendarTypes = [
    { id: 'meetings', name: 'Meetings', color: '#0ea5e9', icon: <Users className="h-5 w-5" /> },
    { id: 'calls', name: 'Calls', color: '#22c55e', icon: <Phone className="h-5 w-5" /> },
    { id: 'reminders', name: 'Reminders', color: '#f59e0b', icon: <Bell className="h-5 w-5" /> }
  ];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      usageStatistics: false,
      useFormPopup: true,
      useDetailPopup: true,
      defaultView: activeView,

      month: {
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        isAlways6Weeks: false,
        workweek: false
      },
      week: {
        hourStart: 8,
        hourEnd: 20,
      },
      calendars: calendarTypes,
      template: {
        time(event) {
          return `
            <div class="calendar-event ${event.calendarId}">
              <div class="event-title">${event.title}</div>
              <div class="event-time">${formatTime(event.start)} - ${formatTime(event.end)}</div>
              ${event.attendees ? `<div class="event-attendees">${event.attendees.join(', ')}</div>` : ''}
            </div>
          `;
        },
        allday(event) {
          return `
            <div class="calendar-event ${event.calendarId}">
              <div class="event-title">${event.title}</div>
            </div>
          `;
        }
      }
    });

    // Example events - Replace with your actual data
    const sampleEvents = [
      {
        id: '1',
        calendarId: 'meetings',
        title: 'Team Meeting',
        category: 'time',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        attendees: ['John', 'Sarah']
      },
      {
        id: '2',
        calendarId: 'calls',
        title: 'Client Call',
        category: 'time',
        start: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        end: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        attendees: ['Client A']
      }
    ];

    calendar.createEvents(sampleEvents);
    setUpcomingEvents(sampleEvents);

    return () => calendar.destroy();
  }, [activeView]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar Dashboard</h1>
        <Button onClick={() => {}} className="bg-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Calendar Types */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Event Types</h3>
              <div className="space-y-3">
                {calendarTypes.map(type => (
                  <div key={type.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${type.color}20` }}>
                      {React.cloneElement(type.icon, { className: `h-5 w-5`, style: { color: type.color } })}
                    </div>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-gray-500">5 upcoming</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <div className={`p-2 rounded-lg bg-${event.calendarId}-100 dark:bg-${event.calendarId}-900/20`}>
                      {calendarTypes.find(type => type.id === event.calendarId)?.icon}
                    </div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">{formatTime(event.start)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar */}
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                onClick={() => setActiveView('month')}
                className={activeView === 'month' ? 'bg-primary text-white' : ''}
              >
                Month
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView('week')}
                className={activeView === 'week' ? 'bg-primary text-white' : ''}
              >
                Week
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView('day')}
                className={activeView === 'day' ? 'bg-primary text-white' : ''}
              >
                Day
              </Button>
            </div>
            <div ref={calendarRef} className="min-h-[800px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
