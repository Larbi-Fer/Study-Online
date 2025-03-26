'use client'

import { getStreaks } from "@/actions/user.action";
import { useAppSelector } from "@/lib/hooks";
import { intToString } from "@/lib/utils";
import Loading from "@/ui/Loading";
import Toast from "@/ui/Toast";
import { Tooltip } from "@mui/material";
import { eachDayOfInterval, endOfMonth, format, getMonth, getYear, isToday, startOfMonth, startOfWeek, setMonth } from "date-fns";
import { div } from "motion/react-client";
import { useEffect, useRef, useState } from "react";

const StreakCalendar = ({ streaks }: { streaks: string[] }) => {
  const [days, setDays] = useState<Date[]>([]);
  const today = useRef(new Date())
  const [monthStreaks, setMonthStreaks] = useState(streaks);
  const currentMonth = useRef(new Date().getMonth())
  const userId = useAppSelector(state => state.user?.id)!;
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMonthDays(today.current);
  }, []);

  const setMonthDays = (date: Date) => {
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);

    const firstDayOfWeek = startOfWeek(firstDayOfMonth);

    const daysInMonth = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfMonth });
    
    setDays(daysInMonth);
  }

  const isStreakDay = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');

    return monthStreaks.filter(s => s == formattedDate);
  };

  const handleNextOrPrevious = (type: 'next' | 'previous') => async() => {
    setLoading(true)
    currentMonth.current += type == 'next' ? 1 : -1
    const date = setMonth(today.current, currentMonth.current)

    const newStreaks = await getStreaks(userId, currentMonth.current)

    if (newStreaks.message != 'SUCCESS') return Toast('Something went wrong', 'error')
      
    setMonthDays(date)
    setMonthStreaks(newStreaks.payload.map((s: {createdAt: Date}) => format(s.createdAt, 'yyyy-MM-dd')))
    setLoading(false)
  }

  const goToDay = () => {
    if (areSameMonth(today.current, days[days.length-1])) return
    setMonthDays(today.current)
    setMonthStreaks(streaks)
  }

  return (
    <div className="streak-calendar">
      <div className="calendar-actions">
        <button className="action" onClick={handleNextOrPrevious('previous')}>&lt;</button>
        <button onClick={goToDay} className={areSameMonth(today.current, days[days.length-1]) ? '' : 'action'}><h3>{format(days[days.length - 1] || today.current, 'MMMM yy')}</h3></button>
        <button onClick={handleNextOrPrevious('next')} disabled={areSameMonth(today.current, days[days.length-1])} className="action">&gt;</button>
      </div>
      { loading ? <div className="loading-area"><Loading /></div> :
      <>
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
            day > today.current || day.getDate() - i > 1 ?
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
          <h3>{intToString(monthStreaks.length)} lessons completed</h3>
        </center>
      </>
      }
    </div>
  )
}

const areSameMonth = (date1: Date, date2: Date): boolean => {
  return getYear(date1) === getYear(date2) && getMonth(date1) === getMonth(date2);
};

export default StreakCalendar