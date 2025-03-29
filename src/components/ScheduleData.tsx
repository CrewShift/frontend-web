import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "./ui/table";

const Schedules = [
  {
    Day: "Tue, 01Apr",
    Date: "01Apr",
    Duty: "CAI2026",
    CheckIn: "12:00",
    CheckOut: "13:50",
    Departure: "SOF",
    Arrival: "AYT",
    DepartureTime: "12:00",
    ArrivalTime: "13:50",
    Aircraft: "A320/BHL",
    FlightTime_BlockHours: null,
    FlightDutyTime: "00:00",
    DutyTime: "01:50",
    ReportTime: "13:55",
    CockpitCrew: null,
    CabinCrew: null,
  },
  {
    Day: "Wed, 02Apr",
    Date: "02Apr",
    Duty: "CAI2139",
    CheckIn: "19:45",
    CheckOut: "16:00",
    Departure: "AYT",
    Arrival: null,
    DepartureTime: null,
    ArrivalTime: null,
    Aircraft: "A320/BHL",
    FlightTime_BlockHours: null,
    FlightDutyTime: null,
    DutyTime: null,
    ReportTime: null,
    CockpitCrew: "TRI G.GOSPODINOV; COP US R. BERNARDO",
    CabinCrew:
      "SEN CCM S.ZHEKOVA; INS CCM A.IVANOVA; CCM 2 Y.BOEVA; CCM K.KALOYANOV; CCM M.ANDREEV; CCM UT K.KRUMOV; CCM UT V.PETROV",
  },
];
const ScheduleData = () => {
  return (
    <>
      <Card className="overflow-hidden p-0">
        <Table className="bg-amber-200">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Duty</TableHead>
              <TableHead>C/I - C/O</TableHead>
              <TableHead>Dep</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Arr</TableHead>
              <TableHead>A/C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Schedules.map((schedule, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{schedule.Day}</TableCell>
                  {(schedule.FlightDutyTime === "00:00" && (
                    <TableCell>DAY OFF</TableCell>
                  )) || (
                    <>
                      <TableCell>{schedule.Duty}</TableCell>
                      <TableCell>C/I {schedule.CheckIn}</TableCell>
                      <TableCell>{schedule.Departure}</TableCell>
                      <TableCell>{schedule.DepartureTime}</TableCell>
                      <TableCell>{schedule.Arrival}</TableCell>
                      <TableCell>{schedule.ArrivalTime}</TableCell>
                      <TableCell>{schedule.Aircraft}</TableCell>
                    </>
                  )}
                </TableRow>
                {schedule.FlightDutyTime === "00:00" || (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>C/O {schedule.CheckOut}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>
      <p>All times are UTC</p>
    </>
  );
};

export default ScheduleData;
