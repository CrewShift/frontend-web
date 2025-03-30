import React, { useState, useEffect } from "react";
import "./FlightCrewApp.css";
import { Bell, User } from "lucide-react";

// Types
type Flight = {
  Duty: string;
  CheckIn: string | null;
  CheckOut: string | null;
  Departure: string;
  Arrival: string;
  DepTime: string;
  ArrivalTime: string;
  Aircraft: string;
  Cockpit: string;
  Cabin: string;
};

type DayData = {
  IndividualDay: string;
  Date: string;
  Duty?: string;
  FT_BLH?: string;
  FDT?: string;
  DT?: string;
  RP?: string;
  Flights?: Flight[];
};

type CalendarDay = {
  date: number;
  month: number;
  isCurrentMonth: boolean;
};

const BellIcon = () => <Bell size={24} />;
const UserIcon = () => <User size={24} />;

// Constants
const USER_NAME = "Dimitar";
const FLAGS: Record<string, string> = {
  SOF: "🇧🇬",
  WAW: "🇵🇱",
  AYT: "🇹🇷",
  FRA: "🇩🇪",
  LHR: "🇬🇧",
  CDG: "🇫🇷",
};

// Flight data from JSON (this would be fetched from an API in production)
const FLIGHT_DATA = [
  {
    IndividualDay: "Mon, 01Apr",
    Date: "2025-04-01",
    FT_BLH: "05:55",
    FDT: "07:55",
    DT: "08:25",
    RP: "17:30",
    Flights: [
      {
        Duty: "CAI8001",
        CheckIn: "03:45",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "WAW",
        DepTime: "04:45",
        ArrivalTime: "07:45",
        Aircraft: "A320/BHL",
        Cockpit: "TRI G.GOSPODINOV; COP US R. BERNARDO",
        Cabin: "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM K.KALOYANOV",
      },
      {
        Duty: "CAI8002",
        CheckIn: null,
        CheckOut: "12:10",
        Departure: "WAW",
        Arrival: "AYT",
        DepTime: "08:30",
        ArrivalTime: "10:45",
        Aircraft: "A320/BHL",
        Cockpit: "TRI G.GOSPODINOV; COP US R. BERNARDO",
        Cabin: "SEN CCM S.ZHEKOVA; CCM 2 Y.BOEVA; CCM M.ANDREEV",
      },
    ],
  },
  {
    IndividualDay: "Tue, 02Apr",
    Date: "2025-04-02",
    FT_BLH: "06:10",
    FDT: "08:00",
    DT: "08:40",
    RP: "18:00",
    Flights: [
      {
        Duty: "CAI8011",
        CheckIn: "04:00",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "FRA",
        DepTime: "05:00",
        ArrivalTime: "07:15",
        Aircraft: "B737/ATR",
        Cockpit: "CAPT L.KOSTADINOVA; FO A.PETROV",
        Cabin: "SEN CCM M.IVANOVA; CCM 2 P.DIMITROV",
      },
      {
        Duty: "CAI8012",
        CheckIn: null,
        CheckOut: "13:00",
        Departure: "FRA",
        Arrival: "SOF",
        DepTime: "08:00",
        ArrivalTime: "10:10",
        Aircraft: "B737/ATR",
        Cockpit: "CAPT L.KOSTADINOVA; FO A.PETROV",
        Cabin: "SEN CCM M.IVANOVA; CCM 2 P.DIMITROV",
      },
    ],
  },
  {
    IndividualDay: "Wed, 03Apr",
    Date: "2025-04-03",
    Duty: "Day Off",
  },
  {
    IndividualDay: "Thu, 04Apr",
    Date: "2025-04-04",
    FT_BLH: "06:05",
    FDT: "08:10",
    DT: "08:40",
    RP: "16:00",
    Flights: [
      {
        Duty: "CAI8031",
        CheckIn: "04:15",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "LHR",
        DepTime: "05:15",
        ArrivalTime: "07:20",
        Aircraft: "A320/BHL",
        Cockpit: "TRI G.GOSPODINOV; COP US R. BERNARDO",
        Cabin: "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM UT V.PETROV",
      },
      {
        Duty: "CAI8032",
        CheckIn: null,
        CheckOut: "13:20",
        Departure: "LHR",
        Arrival: "SOF",
        DepTime: "08:30",
        ArrivalTime: "11:00",
        Aircraft: "A320/BHL",
        Cockpit: "TRI G.GOSPODINOV; COP US R. BERNARDO",
        Cabin: "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM UT V.PETROV",
      },
    ],
  },
  {
    IndividualDay: "Fri, 05Apr",
    Date: "2025-04-05",
    FT_BLH: "05:45",
    FDT: "07:50",
    DT: "08:20",
    RP: "14:30",
    Flights: [
      {
        Duty: "CAI8041",
        CheckIn: "02:40",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "CDG",
        DepTime: "03:40",
        ArrivalTime: "06:10",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT N.STOYANOV; FO R.IVANOV",
        Cabin: "SEN CCM T.PETROVA; INS CCM K.DIMITROVA",
      },
      {
        Duty: "CAI8042",
        CheckIn: null,
        CheckOut: "11:25",
        Departure: "CDG",
        Arrival: "SOF",
        DepTime: "07:00",
        ArrivalTime: "09:25",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT N.STOYANOV; FO R.IVANOV",
        Cabin: "SEN CCM T.PETROVA; INS CCM K.DIMITROVA",
      },
    ],
  },
  {
    IndividualDay: "Sat, 06Apr",
    Date: "2025-04-06",
    FT_BLH: "06:00",
    FDT: "08:05",
    DT: "08:35",
    RP: "16:20",
    Flights: [
      {
        Duty: "CAI8051",
        CheckIn: "03:55",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "WAW",
        DepTime: "04:55",
        ArrivalTime: "07:50",
        Aircraft: "B777/ERJ",
        Cockpit: "CAPT I.KOLYADIN; FO D.PETROVA",
        Cabin: "SEN CCM L.GEORGIEVA; INS CCM M.KARPOV; CCM 2 I.NIKOLSKA",
      },
      {
        Duty: "CAI8052",
        CheckIn: null,
        CheckOut: "12:45",
        Departure: "WAW",
        Arrival: "SOF",
        DepTime: "08:50",
        ArrivalTime: "11:05",
        Aircraft: "B777/ERJ",
        Cockpit: "CAPT I.KOLYADIN; FO D.PETROVA",
        Cabin: "SEN CCM L.GEORGIEVA; INS CCM M.KARPOV; CCM 2 I.NIKOLSKA",
      },
    ],
  },
  {
    IndividualDay: "Sun, 07Apr",
    Date: "2025-04-07",
    FT_BLH: "05:50",
    FDT: "07:45",
    DT: "08:15",
    RP: "15:40",
    Flights: [
      {
        Duty: "CAI8061",
        CheckIn: "02:35",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "LHR",
        DepTime: "03:35",
        ArrivalTime: "06:10",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT V.DIMOV; FO S.PETROV",
        Cabin: "SEN CCM R.KOSTADINOVA; CCM 2 T.NIKOLSKA",
      },
      {
        Duty: "CAI8062",
        CheckIn: null,
        CheckOut: "11:40",
        Departure: "LHR",
        Arrival: "SOF",
        DepTime: "07:00",
        ArrivalTime: "10:00",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT V.DIMOV; FO S.PETROV",
        Cabin: "SEN CCM R.KOSTADINOVA; CCM 2 T.NIKOLSKA",
      },
    ],
  },
  {
    IndividualDay: "Mon, 08Apr",
    Date: "2025-04-08",
    Duty: "Day Off",
  },
  {
    IndividualDay: "Tue, 09Apr",
    Date: "2025-04-09",
    FT_BLH: "05:40",
    FDT: "07:35",
    DT: "08:05",
    RP: "14:50",
    Flights: [
      {
        Duty: "CAI8081",
        CheckIn: "03:30",
        CheckOut: null,
        Departure: "SOF",
        Arrival: "WAW",
        DepTime: "04:30",
        ArrivalTime: "07:20",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT M.TODOROV; FO E.KOSTADINOVA",
        Cabin: "SEN CCM P.STOILOV; CCM 2 G.PETROVA",
      },
      {
        Duty: "CAI8082",
        CheckIn: null,
        CheckOut: "12:20",
        Departure: "WAW",
        Arrival: "SOF",
        DepTime: "08:00",
        ArrivalTime: "10:10",
        Aircraft: "A320/BHL",
        Cockpit: "CAPT M.TODOROV; FO E.KOSTADINOVA",
        Cabin: "SEN CCM P.STOILOV; CCM 2 G.PETROVA",
      },
    ],
  },
];

//let FLIGHT_DATA_2 = await fetchScheduleInfo();

// Helper functions
const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

const calculateDuration = (depTime: string, arrTime: string): string => {
  const [depH, depM] = depTime.split(":").map(Number);
  const [arrH, arrM] = arrTime.split(":").map(Number);

  let hours = arrH - depH;
  let minutes = arrM - depM;
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) hours += 24;

  return `${hours} Hours ${minutes} minutes`;
};

const generateCalendarData = (month: number): CalendarDay[] => {
  const firstDay = new Date(2025, month, 1);
  const lastDay = new Date(2025, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay(); // Get the start day of the current month

  // Calculate the start index for the grid (skip previous month days)
  let startIndex = startDay === 0 ? 6 : startDay - 1; // Adjusting Sunday to be the last day

  const days: CalendarDay[] = [];

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, month: month, isCurrentMonth: true });
  }

  // Add the days for the next month to fill the grid if necessary
  const remainder = (7 - ((days.length + startIndex) % 7)) % 7;
  for (let i = 1; i <= remainder; i++) {
    days.push({ date: i, month: month + 1, isCurrentMonth: false });
  }

  return days;
};

const hasFlightData = (date: number, month: number): DayData | undefined => {
  const monthStr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][month];
  const dateStr = date < 10 ? `0${date}` : `${date}`;
  return FLIGHT_DATA.find((day) =>
    day.IndividualDay.includes(`${dateStr}${monthStr}`),
  );
};

const getFlightStatus = (date: number, month: number): string => {
  const data = hasFlightData(date, month);
  if (!data) return "none";
  if (data.Duty === "Day Off") return "dayOff";
  if (data.Flights)
    return data.Flights.length > 1 ? "multipleFlights" : "singleFlight";
  return "workNoFlight";
};

const getDayDutyTimes = (dayData?: DayData) => {
  if (!dayData?.Flights?.length) return { start: "", end: "" };
  const first = dayData.Flights[0];
  const last = dayData.Flights[dayData.Flights.length - 1];
  return {
    start: first.CheckIn || first.DepTime,
    end: last.CheckOut || last.ArrivalTime,
  };
};

const FlightCrewApp: React.FC = () => {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(3); // April
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedDayData, setSelectedDayData] = useState<DayData | null>(null);
  const [dutyTimes, setDutyTimes] = useState({ start: "", end: "" });
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const calendarDays = generateCalendarData(selectedMonth);
  const monthNames = [
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
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  useEffect(() => setFadeIn(true), []);

  useEffect(() => {
    const dateStr = selectedDate < 10 ? `0${selectedDate}` : `${selectedDate}`;
    const monthStr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][selectedMonth];
    const foundDay = FLIGHT_DATA.find((day) =>
      day.IndividualDay.includes(`${dateStr}${monthStr}`),
    );
    setSelectedDayData(foundDay || null);
    if (foundDay) {
      setDutyTimes(getDayDutyTimes(foundDay));
      if (isDateSelected)
        setDisplayDate(new Date(2025, selectedMonth, selectedDate));
    }
  }, [selectedDate, selectedMonth, isDateSelected]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (!isDateSelected) setDisplayDate(now);
    }, 60000);
    return () => clearInterval(interval);
  }, [isDateSelected]);

  const formattedHeaderDate = formatDate(displayDate);

  const handleDaySelect = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date);
      setIsDateSelected(true);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-100">
      {/* Top Dark Section */}
      <div className="w-full bg-neutral-950 px-4 py-6 text-white shadow-lg sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Welcome Section */}
            <div
              className={`transition-opacity duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            >
              <h1 className="mb-1 text-2xl font-semibold sm:text-3xl md:text-4xl">
                Hello, {USER_NAME}
              </h1>
              <p className="text-base opacity-80 sm:text-lg">
                What's on today's agenda?
              </p>
            </div>

            {/* Header Row */}
            <div className="flex items-center gap-4 self-end md:self-auto">
              <button className="rounded-full p-2 transition hover:bg-gray-800">
                <BellIcon />
              </button>
              <div
                className={`text-sm font-medium transition-opacity duration-700 sm:text-base ${
                  fadeIn ? "opacity-100" : "opacity-0"
                }`}
              >
                {formattedHeaderDate}
              </div>
              <button className="rounded-full p-2 transition hover:bg-gray-800">
                <UserIcon />
              </button>
            </div>
          </div>

          {/* Time Container */}
          <div
            className={`mt-4 flex items-center justify-center gap-2 font-mono text-lg transition-opacity duration-700 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{dutyTimes.start || "--:--"}</span>
            <span className="text-gray-400">•</span>
            <span>{dutyTimes.end || "--:--"}</span>
          </div>

          <div className="mt-6 h-px bg-gray-700"></div>
        </div>
      </div>

      {/* Main Content with Background */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Your scrollable content starts here */}
        <div className="scroll-content">
          {/* Calendar Section */}
          <div className={`calendar-container ${fadeIn ? "fade-in" : ""}`}>
            {/* Month Selector */}
            <div className="months-container">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  className={`month-button ${selectedMonth === index ? "selected" : ""}`}
                  onClick={() => setSelectedMonth(index)}
                >
                  {month}
                </button>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {/* Day Headers */}
              <div className="days-header">
                {dayNames.map((day) => (
                  <div key={day} className="day-header-text">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Dates */}
              <div className="dates-grid">
                {calendarDays.map((day, index) => {
                  const isCurrentMonth = day.isCurrentMonth;
                  const isSelected =
                    isCurrentMonth &&
                    day.date === selectedDate &&
                    day.month === selectedMonth;

                  // Determine flight status for visual indicators
                  const flightStatus = isCurrentMonth
                    ? getFlightStatus(day.date, day.month)
                    : "none";

                  const dateClasses = [
                    "date-button",
                    !isCurrentMonth && "other-month",
                    isSelected && "selected",
                    !isSelected &&
                      flightStatus === "multipleFlights" &&
                      "multiple-flights",
                    !isSelected &&
                      flightStatus === "singleFlight" &&
                      "single-flight",
                    !isSelected && flightStatus === "dayOff" && "day-off",
                    !isSelected &&
                      flightStatus === "workNoFlight" &&
                      "work-no-flight",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  const dateTextClasses = [
                    "date-number",
                    !isCurrentMonth && "other-month-text",
                    (isSelected || flightStatus !== "none") &&
                      "special-date-text",
                    flightStatus === "dayOff" && !isSelected && "day-off-text",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={`${day.date}-${day.month}-${index}`}
                      className={dateClasses}
                      onClick={() => handleDaySelect(day)}
                      disabled={!isCurrentMonth}
                    >
                      <span className={dateTextClasses}>{day.date}</span>

                      {/* Indicator dots for different flight statuses */}
                      {isCurrentMonth &&
                        flightStatus !== "none" &&
                        !isSelected && (
                          <div
                            className={`status-indicator ${flightStatus}-indicator`}
                          ></div>
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Legend */}
              <div className="legend-container">
                <div className="legend-item">
                  <div className="legend-dot single-flight-dot"></div>
                  <span className="legend-text">Single Flight</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot multiple-flights-dot"></div>
                  <span className="legend-text">Multiple</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot day-off-dot"></div>
                  <span className="legend-text">Day Off</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Plan Section */}
          <div className={`todays-plan-section ${fadeIn ? "fade-in" : ""}`}>
            <div className="plan-header">
              <h2 className="plan-header-title">Today's Plan</h2>
              <button className="view-all-btn">view all</button>
            </div>

            {/* No flights message */}
            {(!selectedDayData || selectedDayData.Duty === "Day Off") && (
              <div className="no-flights-container">
                <p className="no-flights-text">
                  {selectedDayData?.Duty === "Day Off"
                    ? "Day Off - Enjoy your rest!"
                    : "No flight information available for this date."}
                </p>
              </div>
            )}

            {/* Flight Tickets */}
            {selectedDayData && selectedDayData.Flights && (
              <div className="flights-list">
                {selectedDayData.Flights.map((flight, index) => {
                  const duration = calculateDuration(
                    flight.DepTime,
                    flight.ArrivalTime,
                  );

                  return (
                    <div key={`flight-${flight.Duty}-${index}`}>
                      {index > 0 && <div className="flight-separator"></div>}
                      <div className="flight-ticket">
                        {/* Origin */}
                        <div className="flight-row">
                          <div className="flight-location">
                            <div className="location-code">
                              {flight.Departure}{" "}
                              {FLAGS[flight.Departure] || "🏳️"}
                            </div>
                            <div className="flight-number">{flight.Duty}</div>
                          </div>
                          <div className="flight-time">
                            <div className="time-value">{flight.DepTime}</div>
                          </div>
                        </div>

                        {/* Flight Progress */}
                        <div className="flight-progress-container">
                          <div className="flight-progress-line">
                            <div className="flight-progress-dot"></div>
                            <div className="flight-progress-bar"></div>
                            <div className="flight-progress-dot"></div>
                          </div>
                          <div className="flight-duration">{duration}</div>
                        </div>

                        {/* Destination */}
                        <div className="flight-row">
                          <div className="flight-location">
                            <div className="location-code">
                              {flight.Arrival} {FLAGS[flight.Arrival] || "🏳️"}
                            </div>
                            <div className="aircraft-info">
                              <div className="aircraft-type">
                                {flight.Aircraft}
                              </div>
                            </div>
                          </div>
                          <div className="flight-time">
                            <div className="time-value">
                              {flight.ArrivalTime}
                            </div>
                          </div>
                        </div>

                        {/* Additional Flight Info */}
                        <div className="flight-additional-info">
                          <p className="flight-crew-info">
                            <span className="flight-crew-label">Cockpit: </span>
                            {flight.Cockpit}
                          </p>
                          <p className="flight-crew-info">
                            <span className="flight-crew-label">Cabin: </span>
                            {flight.Cabin}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCrewApp;
