export type AuthUser = {
  id: string;
  email: string;
};

let currentUser: AuthUser | null = null;

export function setCurrentUser(user: AuthUser | null): void {
  currentUser = user;
}

export function getCurrentUser(): AuthUser | null {
  return currentUser;
}
