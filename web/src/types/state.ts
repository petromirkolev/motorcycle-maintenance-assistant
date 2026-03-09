import type { Bike } from './bikes';
import type { Maintenance } from './maintenance';

export type StoreState = {
  bikes: Bike[];
  maintenance: Maintenance[];
};

type AppState = {
  selectedBikeId: string | null;
  selectedBikeFound: Bike | null;
  currentMaintenanceItem: string | null;
};

export const appState: AppState = {
  selectedBikeId: null,
  selectedBikeFound: null,
  currentMaintenanceItem: null,
};
