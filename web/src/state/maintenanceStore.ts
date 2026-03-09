import { req } from '../utils/domHelper';
import { dom } from '../dom/selectors';
import type { MaintenanceTask } from '../types/maintenance';

const STORAGE_KEY = 'motocare:v1:maintenance';
const listeners = new Set<() => void>();
let state: MaintenanceStoreState = loadMaintenanceState();

function loadMaintenanceState(): MaintenanceStoreState {}

export function readMaintenanceLogForm(form: HTMLFormElement) {
  const fd = new FormData(form);

  const date = String(fd.get('doneAt') ?? '').trim();
  const odo = String(fd.get('odo') ?? '').trim();

  if (!date) throw new Error('Date is required');
  if (!odo) throw new Error('Odo is required');

  return { date, odo };
}

export const maintenanceStore = {
  updateTaskInfo() {},

  addLog(input: Object) {
    console.log(input);

    const bikeId = req(dom.bikeScreen, 'bikeScreen').dataset.bikeId;

    console.log(bikeId);

    // odo should not be less than actual odo
  },
  schedule() {
    console.log('log scheduled');
  },

  updateRecentHistory() {},

  updateMaintenanceItemProgress() {},

  updateOverallProgress() {},
};
