// src/services/mockData.ts
export type HospitalType = "Hospital" | "Clinic" | "Diagnostics";
export type Status = "available" | "limited";

export type Hospital = {
  id: number;
  name: string;
  location: string;
  status: Status;
  type: HospitalType;
  image?: string;
};

export const hospitalsNearby: Hospital[] = [
  {
    id: 1,
    name: "Synergy Hospital",
    location: "Ballupur",
    status: "available",
    type: "Hospital",
  },
  {
    id: 2,
    name: "Graphic Era Hospital",
    location: "Clement Town",
    status: "available",
    type: "Hospital",
  },
  {
    id: 3,
    name: "Max Super Speciality",
    location: "Jakhan",
    status: "limited",
    type: "Hospital",
  },
  {
    id: 4,
    name: "City Care Clinic",
    location: "MG Road",
    status: "limited",
    type: "Clinic",
  },
  {
    id: 5,
    name: "Dehradun Diagnostic Labs",
    location: "Rajpur",
    status: "available",
    type: "Diagnostics",
  },
  {
    id: 6,
    name: "Himalaya Clinic",
    location: "Indira Nagar",
    status: "available",
    type: "Clinic",
  },
  {
    id: 7,
    name: "Green City Hospital",
    location: "Paltan Bazaar",
    status: "available",
    type: "Hospital",
  },
  {
    id: 8,
    name: "Valley Diagnostics",
    location: "Koti",
    status: "limited",
    type: "Diagnostics",
  },
  {
    id: 9,
    name: "RiverView Hospital",
    location: "Raipur",
    status: "available",
    type: "Hospital",
  },
  {
    id: 10,
    name: "Sunrise Health",
    location: "Dalanwala",
    status: "available",
    type: "Clinic",
  },
];
