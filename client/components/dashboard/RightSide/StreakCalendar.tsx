'use client'

import { intToString } from "@/lib/utils";
import { Tooltip } from "@mui/material";
import { eachDayOfInterval, endOfMonth, format, getMonth, getYear, isToday, startOfMonth, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";

const StreakCalendar = ({ streaks }: { streaks: string[] }) => {
  const [days, setDays] = useState<Date[]>([]);
  const [today] = useState(new Date());
  
  useEffect(() => {
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const firstDayOfWeek = startOfWeek(firstDayOfMonth);

    const daysInMonth = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfMonth });
    setDays(daysInMonth);
  }, []);

  const isStreakDay = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return streaks.filter(s => s == formattedDate);
  };

  return (
    <div className="streak-calendar">
      <div className="calendar-actions">
        <div className="action">&lt;</div>
        <h3>{format(today, 'MMMM')}</h3>
        <div className={"action" + (areSameMonthAndYear(today, days[days.length-1]) ? ' disabled' : '')}>&gt;</div>
      </div>
      <div className="calendar-header">
        <div className="calendar-day header">Sun</div>
        <div className="calendar-day header">Mon</div>
        <div className="calendar-day header">Tus</div>
        <div className="calendar-day header">Wed</div>
        <div className="calendar-day header">Thu</div>
        <div className="calendar-day header">Fri</div>
        <div className="calendar-day header">Sat</div>
      </div>
      <div className="calendar-grid">
        {days.map((day, i) => 
          day > today || day.getDate() - i > 0 ?
            <div
              key={day.toString()}
              className={`calendar-day disabled`}
              >
              {format(day, 'dd')}
            </div>
          :
            <Tooltip key={day.toString()} title={isStreakDay(day).length + ' lessons completed'}>
              <div
                className={`calendar-day ${isStreakDay(day).length ? 'streak' : ''} ${isToday(day) ? 'today' : ''}`}
                >
                {intToString(format(day, 'd'))}
              </div>
            </Tooltip>
        )}
      </div>
      <center>
        <h3>{intToString(streaks.length)} lessons completed</h3>
      </center>
    </div>
  )
}

const areSameMonthAndYear = (date1: Date, date2: Date): boolean => {
  return getYear(date1) === getYear(date2) && getMonth(date1) === getMonth(date2);
};

export default StreakCalendar