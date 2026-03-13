// goto();
// fillEmail(email);
// fillPassword(password);
// submit();
// login(email, password);
// expectError(message);

import { Page, Locator } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly loginTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginTitle = this.page.locator(
      '[data-testid="screen-login"] .auth__title',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
