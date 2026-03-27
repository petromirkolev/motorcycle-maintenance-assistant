import { test as base, expect } from './garage-fixtures';

type MaintenanceFixtures = {
  maintenanceInput: {
    doneAt: string;
    odo: string;
  };
  maintenanceScheduleInput: {};
};

export const test = base.extend<MaintenanceFixtures>({
  maintenanceInput: async ({}, use) => {
    const input = {
      doneAt: '2026-03-16',
      odo: '100',
    };
    await use(input);
  },
});

export { expect };
