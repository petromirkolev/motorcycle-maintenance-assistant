type Screen = 'login' | 'garage' | 'bike';

const qs = <T extends HTMLElement>(sel: string) =>
  document.querySelector(sel) as T | null;
const byTestId = <T extends HTMLElement>(id: string) =>
  qs<T>(`[data-testid="${id}"]`);

function setTopbarVisible(visible: boolean) {
  const topbar = byTestId<HTMLElement>('topbar');
  if (!topbar) return;
  topbar.classList.toggle('is-hidden', !visible);
}

function setScreen(screen: Screen) {
  const login = byTestId<HTMLElement>('screen-login');
  const garage = byTestId<HTMLElement>('screen-garage');
  const bike = byTestId<HTMLElement>('screen-bike');
  if (!login || !garage || !bike) return;

  login.classList.toggle('is-hidden', screen !== 'login');
  garage.classList.toggle('is-hidden', screen !== 'garage');
  bike.classList.toggle('is-hidden', screen !== 'bike');

  setTopbarVisible(screen !== 'login');
}

function wireUI() {
  const loginBtn = byTestId<HTMLButtonElement>('btn-login');
  console.log('[MotoCare] btn-login found?', !!loginBtn);

  loginBtn?.addEventListener('click', () => {
    const emailInput = qs<HTMLInputElement>('#loginEmail');
    const email = emailInput?.value || 'demo@motocare.app';
    const userEmail = byTestId<HTMLElement>('user-email');
    if (userEmail) userEmail.textContent = email;

    setScreen('garage');
  });

  byTestId<HTMLButtonElement>('btn-logout')?.addEventListener('click', () => {
    const userEmail = byTestId<HTMLElement>('user-email');
    if (userEmail) userEmail.textContent = '—';
    setScreen('login');
  });

  byTestId<HTMLButtonElement>('btn-back-to-garage')?.addEventListener(
    'click',
    () => {
      setScreen('garage');
    },
  );

  // Garage -> Bike: use one stable hook (the card wrapper)
  const firstBikeOpen = document.querySelector(
    '[data-testid^="bike-open-"]',
  ) as HTMLButtonElement | null;
  console.log('[MotoCare] bike-open-* found?', !!firstBikeOpen);
  firstBikeOpen?.addEventListener('click', () => setScreen('bike'));

  byTestId<HTMLButtonElement>('btn-register')?.addEventListener('click', () => {
    alert('Register flow later (API).');
  });
}

setScreen('login');
wireUI();
