import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { BikeResponse } from '../types/bike';
import { ValidInput } from '../types/auth';
import { API_URL } from './constants';

export const api = {
  async registerUser(
    request: APIRequestContext,
    input: ValidInput,
  ): Promise<APIResponse> {
    const response = await request.post(`${API_URL}/auth/register`, {
      data: {
        email: input.email,
        password: input.password,
      },
    });

    return response;
  },

  async loginUser(
    request: APIRequestContext,
    input: ValidInput,
  ): Promise<APIResponse> {
    const response = await request.post(`${API_URL}/auth/login`, {
      data: {
        email: input.email,
        password: input.password,
      },
    });

    return response;
  },

  async createBike(
    request: APIRequestContext,
    user_id: string,
    overrides: Partial<{
      make: string;
      model: string;
      year: number;
      odo: number;
    }> = {},
  ): Promise<APIResponse> {
    const response = await request.post(`${API_URL}/bikes`, {
      data: {
        user_id,
        make: `Test Bike ${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        model: 'Tracer 9GT',
        year: 2021,
        odo: 1000,
        ...overrides,
      },
    });

    return response;
  },

  async updateBike(
    request: APIRequestContext,
    user_id: string,
    bike_id: string,
    overrides: Partial<{
      id: string;
      make: string;
      model: string;
      year: number;
      odo: number;
    }>,
  ): Promise<APIResponse> {
    const updateResponse = await request.put(`${API_URL}/bikes/${bike_id}`, {
      data: {
        id: bike_id,
        user_id,
        make: overrides.make,
        model: overrides.model,
        year: overrides.year,
        odo: overrides.odo,
      },
    });
    return updateResponse;
  },

  async listFirstBike(
    request: APIRequestContext,
    user_id: string,
  ): Promise<BikeResponse> {
    const response = await request.get(`${API_URL}/bikes?user_id=${user_id}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    return body.bikes[0];
  },

  async logMaintenance(
    request: APIRequestContext,
    bike_id: string,
    overrides: Partial<{
      bike_id: string;
      name: 'oil-change' | 'coolant-change';
      date: string;
      odo: number;
    }>,
  ) {
    const response = await request.post(`${API_URL}/maintenance/log`, {
      data: {
        bike_id,
        name: overrides.name,
        date: overrides.date,
        odo: overrides.odo,
      },
    });

    return response;
  },

  async scheduleMaintenance(
    request: APIRequestContext,
    bike_id: string,
    overrides: Partial<{
      name: 'oil-change' | 'coolant-change';
      interval_km: number;
      interval_days: number;
    }>,
  ) {
    const response = await request.post(`${API_URL}/maintenance/schedule`, {
      data: {
        bike_id,
        name: overrides.name,
        interval_km: overrides.interval_km,
        interval_days: overrides.interval_days,
      },
    });

    return response;
  },

  async getMaintenance(
    request: APIRequestContext,
    bike_id: string,
  ): Promise<APIResponse> {
    const response = await request.get(
      `${API_URL}/maintenance?bike_id=${bike_id}`,
    );

    return response;
  },
};
