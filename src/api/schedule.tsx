import apiClient from "./apiClient";
import axios from "axios";

export interface DayData {
  IndividualDay: string;
  Date: string;
  Duty?: string;
  FT_BLH?: string;
  FDT?: string;
  DT?: string;
  RP?: string;
  Flights?: Flight[];
}

export interface Flight {
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
}

export async function fetchScheduleInfo(): Promise<DayData[]> {
  try {
    const response = await apiClient.get<DayData[]>("/schedule");
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching schedule:", error);

    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject("An unexpected error occurred.");
  }
}
