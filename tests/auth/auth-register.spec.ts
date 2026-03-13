import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';
import { validInput } from '../utils/test-data';

test.describe('Valid credentials registration page test suite', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.gotoreg();
  });

  test('User can register with valid credentials', async () => {
    await registerPage.fillEmail(validInput.email);
    await registerPage.fillPassword(validInput.password);
    await registerPage.fillConfirmPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectSuccess('Registration successful!');
  });

  test('User cannot register without credentials', async () => {
    await registerPage.submit();
    await registerPage.expectError('Email is required');
  });

  test('User cannot register without email', async () => {
    await registerPage.fillPassword(validInput.password);
    await registerPage.fillConfirmPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectError('Email is required');
  });

  test('User cannot register without password', async () => {
    await registerPage.fillEmail(validInput.email);
    await registerPage.fillConfirmPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectError('Password is required');
  });

  test('User cannot register without confirm password', async () => {
    await registerPage.fillEmail(validInput.email);
    await registerPage.fillPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectError('Confirm password is required');
  });

  test('User cannot register with same valid credentials', async () => {
    await registerPage.fillEmail(validInput.email);
    await registerPage.fillPassword(validInput.password);
    await registerPage.fillConfirmPassword(validInput.password);
    await registerPage.submit();
    await registerPage.expectError('User already exists');
  });

  test('Cancel button loads login page', async () => {
    await registerPage.backButton.click();
    await expect(registerPage.goToRegButton).toBeVisible();
  });
});

test.describe('Invalid credentials registration page test suite', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.gotoreg();
  });

  test('User cannot register with invalid email', async () => {});

  test('User cannot register with invalid short password', async () => {});

  test('User cannot register with invalid long password', async () => {});

  test('User cannot register with not matching passwords', async () => {});
});
