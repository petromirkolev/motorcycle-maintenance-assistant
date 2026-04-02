export type ValidInput = {
  email?: string;
  password?: string;
};

export type InvalidInput = {
  email?: string;
  password?: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
  };
};
