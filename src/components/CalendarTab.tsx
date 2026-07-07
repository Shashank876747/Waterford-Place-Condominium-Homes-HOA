import React, { useState } from 'react';
import { 
  CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock, 
  Tag, Info, Check, PlusCircle, AlertCircle, Loader2 
} from 'lucide-react';
import { eventsList } from '../data/eventsData';
import { CalendarEvent } from '../types';

export default function CalendarTab() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'meeting' | 'social' | 'trash' | 'maintenance' | 'holiday'>('all');
  const [selectedDay, setSelectedDay] = useState<number | null>(15); // Default to July 15, 2026 (Board meeting day!)
  const [addedEvents, setAddedEvents] = useState<string[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Community Calendar Details - July 2026
  const currentMonthName = "July 2026";
  const daysInMonth = 31;
  const startDayOffset = 3; // July 1, 2026 starts on Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed...)

  const categories = [
    { name: 'All Events', id: 'all', color: 'bg-slate-100 text-slate-700' },
    { name: 'Board Meetings', id: 'meeting', color: 'bg-rose-100 text-rose-700' },
    { name: 'Social Events', id: 'social', color: 'bg-amber-100 text-amber-700' },
    { name: 'Trash & Recycling', id: 'trash', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Grounds Service', id: 'maintenance', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Holidays', id: 'holiday', color: 'bg-blue-100 text-blue-700' },
  ];

  // Map categories to visual badges
  const categoryConfig: Record<string, { label: string; bg: string; dot: string }> = {
    meeting: { label: 'Board Meeting', bg: 'bg-rose-50 border-rose-200 text-rose-700', dot: 'bg-rose-500' },
    social: { label: 'Social Gathering', bg: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-500' },
    trash: { label: 'Trash schedule', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
    maintenance: { label: 'Service/Grounds', bg: 'bg-indigo-50 border-indigo-200 text-indigo-700', dot: 'bg-indigo-500' },
    holiday: { label: 'Holiday Close', bg: 'bg-blue-50 border-blue-200 text-blue-700', dot: 'bg-blue-500' },
  };

  // Get active filtered events
  const filteredEvents = eventsList.filter((evt) => {
    const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
    
    // If a day is selected in the grid, filter list to that day, unless category changes (then we show all)
    if (selectedDay !== null && activeCategory === 'all') {
      const dayStr = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;
      return evt.date === `2026-07-${dayStr}`;
    }
    
    return matchesCategory;
  });

  // Check if a specific day has events
  const getEventsForDay = (day: number) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-07-${dayStr}`;
    return eventsList.filter((evt) => evt.date === dateStr);
  };

  // Trigger simulated calendar file export
  const handleAddToCalendar = (id: string) => {
    if (addingId) return;
    setAddingId(id);
    setTimeout(() => {
      setAddingId(null);
      setAddedEvents((prev) => [...prev, id]);
      
      setTimeout(() => {
        setAddedEvents((prev) => prev.filter((evId) => evId !== id));
      }, 4000);
    }, 1200);
  };

  // Construct Calendar grid
  const calendarCells: (number | null)[] = [];
  // Add empty offsets
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  // Add days of July
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }
  // Fill remaining cells to round to multiple of 7
  const totalCells = Math.ceil(calendarCells.length / 7) * 7;
  for (let i = calendarCells.length; i < totalCells; i++) {
    calendarCells.push(null);
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-12" id="calendar-view-container">
      {/* Title block */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Community Calendar & Events
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Keep track of Board of Directors meetings, neighborhood socials, grounds maintenance programs, and trash collection schedules. Click on any calendar day to inspect scheduled actions.
        </p>
      </section>

      {/* Interactive Grid & Filters */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2 widths): Custom Calendar Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            
            {/* Month Header controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <CalendarDays className="h-5.5 w-5.5 text-blue-900" />
                <h3 className="font-serif font-bold text-slate-900 text-lg">
                  {currentMonthName}
                </h3>
              </div>
              <div className="flex space-x-1">
                <button className="rounded-lg p-1.5 border border-slate-200 text-slate-400 hover:text-slate-700 cursor-not-allowed" disabled>
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button className="rounded-lg p-1.5 border border-slate-200 text-slate-400 hover:text-slate-700 cursor-not-allowed" disabled>
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Days of Week Row */}
            <div className="grid grid-cols-7 text-center border-b border-slate-100 pb-2">
              {daysOfWeek.map((day) => (
                <span key={day} className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar Numbers Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center" id="calendar-days-grid">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={idx} className="aspect-square bg-slate-50/40 rounded-xl" />;
                }

                const dayEvents = getEventsForDay(day);
                const isSelected = selectedDay === day;
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDay(day);
                      setActiveCategory('all'); // Reset filters when click day to show exact daily list
                    }}
                    id={`calendar-day-${day}`}
                    className={`aspect-square relative flex flex-col items-center justify-center rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md font-bold'
                        : hasEvents
                        ? 'bg-amber-500/5 text-slate-900 border-amber-500/25 font-semibold hover:bg-slate-100'
                        : 'bg-white text-slate-700 border-slate-150 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm">{day}</span>
                    
                    {/* Event Dots indicator */}
                    {hasEvents && (
                      <span className="absolute bottom-1.5 flex gap-1">
                        {dayEvents.slice(0, 3).map((evt, eIdx) => (
                          <span
                            key={eIdx}
                            className={`h-1.5 w-1.5 rounded-full ${
                              isSelected ? 'bg-amber-400' : categoryConfig[evt.category]?.dot || 'bg-slate-400'
                            }`}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Guidance */}
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50/50 border border-amber-200/40 p-4">
            <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Calendar Instructions</h4>
              <p className="text-xs text-slate-600 leading-normal">
                Days highlighted in soft yellow have scheduled events. Select any numbered block to show events occurring on that day, or use category pills on the right to show all matching events.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Filters and Event Cards */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              Filter By Category
            </h4>
            <div className="flex flex-col gap-2" id="calendar-category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setSelectedDay(null); // Clear day selection to view full category
                  }}
                  id={`cal-filter-btn-${cat.id}`}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-blue-900 text-white shadow'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${categoryConfig[cat.id]?.dot || 'bg-slate-400'}`} />
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-200/50 text-slate-500">
                    {cat.id === 'all' 
                      ? eventsList.length 
                      : eventsList.filter(e => e.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Events List Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            {selectedDay !== null 
              ? `Events Scheduled for July ${selectedDay}, 2026` 
              : `${categories.find(c => c.id === activeCategory)?.name || 'Filtered'} Events`}
          </h3>
          {selectedDay !== null && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs font-bold text-blue-900 hover:underline"
            >
              Show All Events This Month
            </button>
          )}
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2" id="filtered-events-list">
          {filteredEvents.map((evt) => {
            const config = categoryConfig[evt.category] || { label: 'General', bg: 'bg-slate-50 text-slate-600', dot: 'bg-slate-400' };
            const isAdded = addedEvents.includes(evt.id);
            const isAdding = addingId === evt.id;

            return (
              <div
                key={evt.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${config.bg}`}>
                      {config.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      July {evt.date.split('-')[2]}, 2026
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-slate-950 text-base">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-slate-600 font-medium">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleAddToCalendar(evt.id)}
                    disabled={isAdding}
                    className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all border ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isAdding
                        ? 'bg-slate-50 text-slate-400 border-slate-150'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />
                        <span>Adding...</span>
                      </>
                    ) : isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
                        <span>Added to Calendar!</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span>Export to Google Calendar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6">
              <AlertCircle className="h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm font-semibold">No Scheduled Events</p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                {selectedDay !== null 
                  ? `There are no official association meetings, trash pickups, or social projects recorded for July ${selectedDay}, 2026.` 
                  : 'There are no upcoming events listed for the chosen category.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
