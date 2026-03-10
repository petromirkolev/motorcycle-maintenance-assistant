/* Entry point for the Motorcycle Maintenance Assistant web application.
 * Initializes the application by rendering the initial screen and binding event listeners.
 */

import { bindEvents } from './ui/router';
import { render } from './dom/render';

render.initialScreen();
bindEvents();
