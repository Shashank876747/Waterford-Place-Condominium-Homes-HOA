import React, { useState } from 'react';
import { 
  CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock, 
  Check, PlusCircle, AlertCircle, Loader2
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function CalendarTab() {
  const { events } = useSiteData();
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

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'meeting': return { bg: 'bg-rose-50 border-rose-100', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' };
      case 'social': return { bg: 'bg-amber-50 border-amber-100', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' };
      case 'trash': return { bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' };
      case 'maintenance': return { bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800' };
      case 'holiday': return { bg: 'bg-blue-50 border-blue-100', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' };
      default: return { bg: 'bg-slate-50 border-slate-100', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-800' };
    }
  };

  const getEventsForDay = (day: number) => {
    const formattedDate = `2026-07-${day < 10 ? '0' + day : day}`;
    return events.filter(e => e.date === formattedDate);
  };

  const filteredEvents = events.filter((evt) => {
    const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
    
    if (selectedDay !== null) {
      const formattedSelectedDate = `2026-07-${selectedDay < 10 ? '0' + selectedDay : selectedDay}`;
      const matchesDay = evt.date === formattedSelectedDate;
      return matchesCategory && matchesDay;
    }

    return matchesCategory;
  });

  const handleAddToCalendar = (id: string) => {
    setAddingId(id);
    setTimeout(() => {
      setAddingId(null);
      setAddedEvents((prev) => [...prev, id]);
    }, 1000);
  };

  // Generate calendar grid days
  const calendarDaysList = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDaysList.push({ type: 'empty', key: `empty-${i}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEvents = getEventsForDay(d);
    calendarDaysList.push({
      type: 'day',
      day: d,
      key: `day-${d}`,
      eventsCount: dayEvents.length,
      hasMeeting: dayEvents.some(e => e.category === 'meeting'),
      hasSocial: dayEvents.some(e => e.category === 'social'),
      hasService: dayEvents.some(e => e.category === 'maintenance'),
      hasTrash: dayEvents.some(e => e.category === 'trash'),
    });
  }

  return (
    <div className="space-y-12" id="calendar-view-container">
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#3e3223] sm:text-4xl bg-[#f5efe6] inline-block px-6 py-2 rounded-2xl border border-[#e5dac4] shadow-sm">
          Community Calendar
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Stay informed about municipal garbage collections, board assembly hearings, pooling hours, and neighborly landscaping cleanups. Click on highlighted calendar grid slots to list active matches.
        </p>
      </section>

      {/* Main Grid: Calendar left, Listings right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Calendar Frame */}
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-900" />
              <h3 className="font-serif text-xl font-bold text-slate-900">{currentMonthName}</h3>
            </div>
            <div className="flex items-center gap-1">
              <button disabled className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-300 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button disabled className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-300 cursor-not-allowed">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDaysList.map((item) => {
              if (item.type === 'empty') {
                return <div key={item.key} className="aspect-square bg-slate-50/40 rounded-xl" />;
              }

              const isSelected = selectedDay === item.day;
              
              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedDay(item.day || null)}
                  className={`aspect-square rounded-xl p-1.5 flex flex-col justify-between items-start border transition-all relative cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-900/15'
                      : 'bg-white hover:bg-slate-50 border-slate-150 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.day}</span>
                  
                  {/* Indicators dot row */}
                  {item.eventsCount && item.eventsCount > 0 ? (
                    <div className="flex gap-0.5 mt-auto w-full justify-end">
                      {item.hasMeeting && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-rose-300' : 'bg-rose-500'}`} />}
                      {item.hasSocial && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-500'}`} />}
                      {item.hasService && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-indigo-300' : 'bg-indigo-505'}`} />}
                      {item.hasTrash && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`} />}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Board Meeting
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Social
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Trash Service
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Grounds
            </span>
          </div>
        </div>

        {/* Selected Day Agenda Side panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {selectedDay !== null ? `July ${selectedDay} Agenda` : 'All Events Agenda'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-widest font-bold">
                {selectedDay !== null ? 'Selected Date Focus' : 'Full Month Overview'}
              </p>
            </div>
            
            {selectedDay !== null && (
              <button
                onClick={() => setSelectedDay(null)}
                className="text-xs font-semibold text-blue-900 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Show All Month
              </button>
            )}
          </div>

          {/* Category Quick Filter */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Events Agenda list */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {filteredEvents.map((evt) => {
              const styles = getCategoryStyles(evt.category);
              const isAdded = addedEvents.includes(evt.id);
              const isAddingThis = addingId === evt.id;

              return (
                <div
                  key={evt.id}
                  className={`rounded-2xl border ${styles.bg} p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-4`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${styles.badge}`}>
                        {evt.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        {evt.date}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-slate-950 text-base leading-snug">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-550 leading-relaxed">
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

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleAddToCalendar(evt.id)}
                      disabled={isAddingThis}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all border flex-1 ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isAddingThis
                          ? 'bg-slate-50 text-slate-400 border-slate-150'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                      }`}
                    >
                      {isAddingThis ? (
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
        </div>
      </section>
    </div>
  );
}
