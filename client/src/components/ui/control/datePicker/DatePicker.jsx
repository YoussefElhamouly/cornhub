import React, { useState, useRef } from "react";
import styles from "./datePicker.module.scss";
import Menu from "../menu/Menu";
import Button from "../button/Button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = ({
  selectedDate = null,
  onChange = () => {},
  placeholder = "Date",
  format = "MM/DD/YYYY",
  minDate = null,
  maxDate = null,
  disabledDates = [],
  className = "",
  buttonStyle = {},
  wrapperStyle = {},
}) => {
  const menuRef = useRef(null);
  const [displayTitle, setDisplayTitle] = useState(placeholder);
  const currentYear = selectedDate
    ? selectedDate.getFullYear()
    : new Date().getFullYear();
  const currentMonth = selectedDate ? selectedDate.getMonth() : 0;

  const [displayYear, setDisplayYear] = useState(currentYear);
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return placeholder;
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return format.replace("DD", d).replace("MM", m).replace("YYYY", y);
  };

  const isDateDisabled = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (disabledDates.includes(dateStr)) return true;
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(displayYear, displayMonth, day);
    if (!isDateDisabled(newDate)) {
      onChange(newDate);
      setDisplayTitle(formatDate(newDate));
      if (menuRef.current) {
        setTimeout(() => {
          menuRef.current.close();
        }, 10);
      }
    }
  };

  const handleClear = () => {
    onChange(null);
    setDisplayTitle(placeholder);
    if (menuRef.current) {
      setTimeout(() => {
        menuRef.current.close();
      }, 10);
    }
  };

  const days = [];
  const totalDays = daysInMonth(displayYear, displayMonth);
  const firstDay = firstDayOfMonth(displayYear, displayMonth);

  // Add previous month's days
  const prevMonthDays = daysInMonth(
    displayMonth === 0 ? displayYear - 1 : displayYear,
    displayMonth === 0 ? 11 : displayMonth - 1,
  );
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isOtherMonth: true,
    });
  }

  // Add current month's days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      day: i,
      isOtherMonth: false,
    });
  }

  // Add next month's days only to complete the last week
  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isOtherMonth: true,
    });
  }

  const calendarWeeks = [];
  for (let i = 0; i < days.length; i += 7) {
    calendarWeeks.push(days.slice(i, i + 7));
  }

  const dateKey = selectedDate ? selectedDate.getTime() : "empty";

  return (
    <Menu
      key={dateKey}
      ref={menuRef}
      title={displayTitle}
      leftIcon={Calendar}
      closeOnSelect={false}
      wrapperStyle={wrapperStyle}
      buttonStyle={{
        height: "32px",
        width: "140px",
        ...buttonStyle,
      }}
      menuStyle={{
        padding: "1rem",
        minWidth: "320px",
        backgroundColor: "var(--primary-bg)",
        height: "fit-content",
      }}
      className={className}
    >
      <div className={styles.date_picker_header}>
        <Button
          variant="transparent"
          icon={ChevronLeft}
          onClick={handlePrevMonth}
          className={styles.nav_btn}
        />
        <div className={styles.month_year_display}>
          {months[displayMonth]} {displayYear}
        </div>
        <Button
          variant="transparent"
          icon={ChevronRight}
          onClick={handleNextMonth}
          className={styles.nav_btn}
        />
      </div>

      <div className={styles.calendar_wrapper}>
        <div className={styles.weekdays}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendar}>
          {calendarWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((dayObj, dayIndex) => {
                const { day, isOtherMonth } = dayObj;
                const isCurrentDay =
                  !isOtherMonth &&
                  selectedDate &&
                  day === selectedDate.getDate() &&
                  displayMonth === selectedDate.getMonth() &&
                  displayYear === selectedDate.getFullYear();

                const isToday =
                  !isOtherMonth &&
                  day === new Date().getDate() &&
                  displayMonth === new Date().getMonth() &&
                  displayYear === new Date().getFullYear();

                const dateObj = new Date(displayYear, displayMonth, day);
                const disabled = isOtherMonth || isDateDisabled(dateObj);

                return (
                  <Button
                    key={dayIndex}
                    variant="transparent"
                    title={day}
                    onClick={() => !disabled && handleDateSelect(day)}
                    disabled={disabled}
                    className={`${styles.day} ${isCurrentDay ? styles.selected : ""} ${
                      isToday ? styles.today : ""
                    } ${isOtherMonth ? styles.other_month : ""} ${disabled ? styles.disabled : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.clear_button}>
        <Button variant="transparent" title="Clear" onClick={handleClear} />
      </div>
    </Menu>
  );
};

export default DatePicker;
