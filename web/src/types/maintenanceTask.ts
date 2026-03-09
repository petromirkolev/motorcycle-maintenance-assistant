export type MaintenanceTask = {
  id: string;
  bikeId: string;
  name: string;
  intervalKm: number | null;
  intervalDays: number | null;
};
