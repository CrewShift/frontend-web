import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
//import { TableHead, TableRow, Table } from "./ui/table";

const Schedules = {
  "Tue, 01Apr": [
    {
      Date: "01Apr",
      Duty: "CAI2026",
      CheckIn: "12:00",
      CheckOut: "13:50",
      Departure: "SOF",
      Arrival: "AYT",
      DepartureTime: "12:00",
      ArrivalTime: "13:50",
      Aircraft: "A320/BHL",
      scheduleTime_BlockHours: null,
      scheduleDutyTime: "00:00",
      DutyTime: "01:50",
      ReportTime: "13:55",
      CockpitCrew: null,
      CabinCrew: null,
    },
  ],
  "Wed, 02Apr": [
    {
      Date: "02Apr",
      Duty: "CAI2139",
      CheckIn: "19:45",
      CheckOut: "16:00",
      Departure: "AYT",
      Arrival: "WAW",
      DepartureTime: "04:45",
      ArrivalTime: "07:45",
      Aircraft: "A320/BHL",
      scheduleTime_BlockHours: null,
      scheduleDutyTime: null,
      DutyTime: null,
      ReportTime: null,
      CockpitCrew: "TRI G.GOSPODINOV; COP US R. BERNARDO",
      CabinCrew:
        "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM 2 Y.BOEVA; CCM K.KALOYANOV; CCM M.ANDREEV; CCM UT K.KRUMOV; CCM UT V.PETROV",
    },
    {
      Date: "02Apr",
      Duty: "CAI2139",
      CheckIn: "19:45",
      CheckOut: "16:00",
      Departure: "WAW",
      Arrival: "AYT",
      DepartureTime: "08:45",
      ArrivalTime: "11:40",
      Aircraft: "A320/BHL",
      scheduleTime_BlockHours: null,
      scheduleDutyTime: null,
      DutyTime: null,
      ReportTime: null,
      CockpitCrew: "TRI G.GOSPODINOV; COP US R. BERNARDO",
      CabinCrew:
        "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM 2 Y.BOEVA; CCM K.KALOYANOV; CCM M.ANDREEV; CCM UT K.KRUMOV; CCM UT V.PETROV",
    },
  ],
};

const ScheduleData = () => {
  return (
    <div>
      <div>
        <p>All times are UTC</p>
        {Object.entries(Schedules).map(([date, schedule]) => (
          <Card key={date} className="mb-2 p-6">
            <h2 className="mb-2 text-lg font-semibold">{date}</h2>
            {schedule.map((schedule, index) => (
              <>
                <h3>C/I - C/O</h3>
                <span>
                  {schedule.CheckIn} - {schedule.CheckOut}
                </span>
                <Card
                  key={index}
                  className="bg-primary text-primary-foreground mb-4 border p-4 shadow-md"
                >
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription>{schedule.Duty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="mb-2">
                    <span className="font-medium">Departure:</span>{" "}
                    {schedule.Departure} at {schedule.DepartureTime}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Arrival:</span>{" "}
                    {schedule.Arrival} at {schedule.ArrivalTime}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Aircraft:</span>{" "}
                    {schedule.Aircraft}
                  </div>
                  {schedule.CockpitCrew && (
                    <div className="mb-2">
                      <span className="font-medium">Cockpit Crew:</span>{" "}
                      {schedule.CockpitCrew}
                    </div>
                  )}
                  {schedule.CabinCrew && (
                    <div>
                      <span className="font-medium">Cabin Crew:</span>{" "}
                      {schedule.CabinCrew}
                    </div>
                  )} */}
                  </CardContent>
                </Card>
              </>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScheduleData;
