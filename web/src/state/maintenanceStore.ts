////  On each page load/reload, update:
// Due / Overdue / On track
// Recent History
// Record
// Last
// Due

// import type { Maintenance } from '../types/maintenance';
// import type { StoreState } from '../types/state';

export function readMaintenanceLogForm(form: HTMLFormElement) {
  const fd = new FormData(form);

  const date = String(fd.get('doneAt') ?? '').trim();
  const odo = String(fd.get('odo') ?? '').trim();

  if (!date) throw new Error('Date is required');
  if (!odo) throw new Error('Odo is required');

  return { date, odo };
}

export const maintenanceStore = {
  addLog(input: Object) {
    console.log(input);

    // odo should not be less than actual odo
  },
  schedule() {
    console.log('log scheduled');
  },
};
