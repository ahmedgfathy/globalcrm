"use client";
import React, { useEffect, useRef } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

function Page() {
  const calendarRef = useRef(null);
  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      useFormPopup: true,
      useDetailPopup: true,
      defaultView: "month",
      template: {
        time(event) {
          const { start, end, title } = event;
          return `<span style="color: white;">${formatTime(start)}~${formatTime(
            end
          )} ${title}</span>`;
        },
        allday(event) {
          return `<span style="color: gray;">${event.title}</span>`;
        },
      },
      calendars: [
        {
          id: "cal1",
          name: "Personal",
          backgroundColor: "#03bd9e",
        },
        {
          id: "cal2",
          name: "Persona2",
          backgroundColor: "#00a9ff",
        },
      ],
    });
    calendar.createEvents([
      {
        id: "1",
        calendarId: "cal1",
        title: "اجتماع عمل",
        category: "time",
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
      },
      {
        id: "2",
        calendarId: "cal2",
        title: "مهمة شخصية",
        category: "time",
        start: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        end: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
      },
    ]);
    calendar.on("beforeCreateEvent", (event) => {
      console.log(event);
      const { title, start, end, isAllDay } = event;
      calendar.createEvents([
        {
          id: String(new Date().getTime()),
          calendarId: "cal1",
          title,
          category: isAllDay ? "allday" : "time",
          start,
          end,
        },
      ]);
    });
    return () => {
      calendar.destroy();
    };
  }, []);

  return <div ref={calendarRef} style={{ height: "800px" }}></div>;
}

export default Page;
