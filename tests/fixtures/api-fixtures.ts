import { test as base, expect, request } from '@playwright/test';
import { uniqueEmail, validInput } from '../utils/test-data';
import { api } from '../utils/api-helpers';

type ApiFixtures = {
  validInput: {
    email: string;
    password: string;
  };

  registeredUser: {
    email: string;
    password: string;
  };

  loggedInUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<ApiFixtures>({
  validInput: async ({}, use) => {
    const email = uniqueEmail();
    const password = validInput.password;

    await use({ email, password });
  },

  registeredUser: async ({ request, validInput }, use) => {
    await api.registerUser(request, { ...validInput });

    await use({ ...validInput });
  },

  loggedInUser: async ({ request, registeredUser }, use) => {
    await api.loginUser(request, { ...registeredUser });
  },
});

export { expect };
