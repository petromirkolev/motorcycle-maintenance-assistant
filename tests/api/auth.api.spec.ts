import { test, expect } from '../fixtures/api-fixtures';
import { api } from '../utils/api-helpers';
import {
  EMAIL_PASS_REQUIRED,
  INVALID_CREDENTIALS,
  INVALID_EMAIL,
  LOGIN_SUCCESS,
  PASS_LONG,
  PASS_SHORT,
  USER_EXIST,
  USER_REGISTER_SUCCESS,
} from '../utils/constants';

test.describe('Auth API test suite', () => {
  test('Register with valid credentials succeeds', async ({
    request,
    validInput,
  }) => {
    const response = await api.registerUser(request, validInput);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.message).toBe(USER_REGISTER_SUCCESS);
  });

  test('Register with duplicate email is rejected', async ({
    request,
    validInput,
  }) => {
    await api.registerUser(request, validInput);

    const duplicateResponse = await api.registerUser(request, validInput);
    expect(duplicateResponse.status()).toBe(409);

    const duplicateBody = await duplicateResponse.json();
    expect(duplicateBody.error).toBe(USER_EXIST);
  });

  test('Register with invalid email is rejected', async ({
    request,
    validInput,
    invalidInput,
  }) => {
    const response = await api.registerUser(request, {
      ...validInput,
      email: invalidInput.email,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe(INVALID_EMAIL);
  });

  test('Register with missing email is rejected', async ({
    request,
    validInput,
  }) => {
    const response = await api.registerUser(request, {
      ...validInput,
      email: undefined,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe(EMAIL_PASS_REQUIRED);
  });

  test('Register with missing password is rejected', async ({
    request,
    validInput,
  }) => {
    const response = await api.registerUser(request, {
      ...validInput,
      password: undefined,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe(EMAIL_PASS_REQUIRED);
  });

  test('Register with short password is rejected', async ({
    request,
    validInput,
    invalidInput,
  }) => {
    const response = await api.registerUser(request, {
      ...validInput,
      password: invalidInput.shortPassword,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe(PASS_SHORT);
  });

  test('Register with long password is rejected', async ({
    request,
    validInput,
    invalidInput,
  }) => {
    const response = await api.registerUser(request, {
      ...validInput,
      password: invalidInput.longPassword,
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe(PASS_LONG);
  });

  test('Login with valid credentials succeeds', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, { ...registeredUser });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    expect(loginBody.message).toBe(LOGIN_SUCCESS);
  });

  test('Login with wrong password is rejected', async ({
    request,
    registeredUser,
    invalidInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: invalidInput.password,
    });
    expect(loginResponse.status()).toBe(401);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(INVALID_CREDENTIALS);
  });

  test('Login with non existing email is rejected', async ({
    request,
    registeredUser,
    invalidInput,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: invalidInput.email,
    });
    expect(loginResponse.status()).toBe(401);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(INVALID_CREDENTIALS);
  });

  test('Login with missing email is rejected', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      email: undefined,
    });
    expect(loginResponse.status()).toBe(400);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(EMAIL_PASS_REQUIRED);
  });

  test('Login with missing password is rejected', async ({
    request,
    registeredUser,
  }) => {
    const loginResponse = await api.loginUser(request, {
      ...registeredUser,
      password: undefined,
    });
    expect(loginResponse.status()).toBe(400);

    const loginBody = await loginResponse.json();
    expect(loginBody.error).toBe(EMAIL_PASS_REQUIRED);
  });
});
