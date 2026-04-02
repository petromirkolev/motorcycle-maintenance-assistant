import { test as base, expect, request } from '@playwright/test';
import { invalidInput, uniqueEmail, validInput } from '../utils/test-data';
import { api } from '../utils/api-helpers';

type ApiFixtures = {
  validInput: {
    email: string;
    password: string;
  };

  invalidInput: {
    email: string;
    password: string;
    shortPassword: string;
    longPassword: string;
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

  invalidInput: async ({}, use) => {
    const email = invalidInput.email;
    const password = invalidInput.password;
    const shortPassword = invalidInput.shortPassword;
    const longPassword = invalidInput.longPassword;

    await use({ email, password, shortPassword, longPassword });
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
