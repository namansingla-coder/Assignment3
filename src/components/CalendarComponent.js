import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useState, useEffect } from "react";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    title: "Project Meeting",
    allDay: false,
    start: new Date(2025, 5, 6, 10, 0),
    end: new Date(2025, 5, 6, 11, 0),
  },
  {
    title: "Team Lunch",
    allDay: false,
    start: new Date(2025, 5, 6, 12, 0),
    end: new Date(2025, 5, 6, 13, 0),
  },
  {
    title: "Client Presentation",
    allDay: false,
    start: new Date(2025, 5, 8, 14, 0),
    end: new Date(2025, 5, 8, 15, 30),
  },
  {
    title: "Project Deadline",
    allDay: false,
    start: new Date(2025, 5, 12, 16, 0),
    end: new Date(2025, 5, 12, 17, 0),
  },
  {
    title: "Team Building Activity",
    allDay: false,
    start: new Date(2025, 5, 13, 18, 0),
    end: new Date(2025, 5, 13, 19, 0),
  },
  {
    title: "Project Review",
    allDay: false,
    start: new Date(2025, 5, 16, 20, 0),
    end: new Date(2025, 5, 16, 21, 0),
  },
  {
    title: "Project Demo",
    allDay: false,
    start: new Date(2025, 5, 20, 22, 0),
    end: new Date(2025, 5, 20, 23, 0),
  },
];

const EVENT_STORAGE_KEY = "calendarEvents";

const EventComponent = ({ event }) => {
  const startTime = format(event.start, "p");
  const endTime = format(event.end, "p");
  const timeLabel = event.allDay ? "All Day" : `${startTime} - ${endTime}`;

  return (
    <div
      title={`${event.title}\n${timeLabel}`}
      className="text-black dark:text-white"
    >
      {event.title}
    </div>
  );
};

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem(EVENT_STORAGE_KEY);
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        return parsedEvents.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
      } catch {
        return initialEvents;
      }
    }
    return initialEvents;
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleInputChange = (field, value) => {
    setNewEvent({ ...newEvent, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const { title, start, end } = newEvent;
    const validationErrors = {};

    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!start) validationErrors.start = "Start time is required.";
    if (!end) validationErrors.end = "End time is required.";

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (start && end && startDate >= endDate) {
      validationErrors.time = "End time must be after start time.";
    }

    return validationErrors;
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { title, start, end } = newEvent;

    setEvents([
      ...events,
      {
        title,
        start: new Date(start),
        end: new Date(end),
        allDay: false,
      },
    ]);

    setNewEvent({ title: "", start: "", end: "" });
    setErrors({});
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((e) => e !== selectedEvent));
    setSelectedEvent(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Team Calendar
      </h2>

      <form
        onSubmit={handleAddEvent}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"
      >
        <div className="col-span-1 sm:col-span-1">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-1">
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) => handleInputChange("start", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.start && (
            <p className="text-red-500 text-sm">{errors.start}</p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-1">
          <input
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => handleInputChange("end", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        <div className="col-span-1 sm:col-span-1 flex items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="h-[600px] overflow-auto mb-4">
        <BigCalendar
            className="dark:text-white"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          onSelectEvent={(event) => setSelectedEvent(event)}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          popup
          components={{
            event: EventComponent,
          }}
        />
      </div>

      {selectedEvent && (
        <div className="flex justify-end">
          <button
            onClick={handleDeleteEvent}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded dark:bg-red-500 dark:hover:bg-red-600"
          >
            Delete Selected Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;