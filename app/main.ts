import '../styles/app.scss';

// Global code
import flamethrower from 'flamethrower-router';
import { GAPageView, passwordlessSignin } from './util/firebase';
import { scrollSave } from './util/scroll';
import './util/key-bindings';

window.addEventListener('flamethrower:router:end', (e) => {
    GAPageView()
});
  

// saves scroll position on navbar
scrollSave();

// handles passwordless signin
passwordlessSignin();

// Router
export const router = flamethrower({ prefetch: 'hover', log: false });


// All web components must be exported here
export * from './components/global-data.svelte';

// Auth
export * from './components/users/user-data.svelte';
export * from './components/users/google-signin.svelte';
export * from './components/users/apple-signin.svelte';
export * from './components/users/email-signin.svelte';
export * from './components/users/sign-out.svelte';
export * from './components/users/app-signin.svelte';
export * from './components/users/if-pro.svelte';
export * from './components/users/if-user.svelte';
export * from './components/users/if-access.svelte';
export * from './components/users/user-avatar.svelte';
export * from './components/users/change-email.svelte';
export * from './components/users/delete-account.svelte';

// Progress Tracking
export * from './components/progress/mark-complete.svelte';
export * from './components/progress/complete-icon.svelte';
export * from './components/progress/quiz-modal.svelte';

// UI
export * from './components/ui/modal-action.svelte';
export * from './components/ui/modal-dialog.svelte';
export * from './components/ui/route-loader.svelte';
export * from './components/ui/toast-message.svelte';
export * from './components/ui/navbar-toggle.svelte';
export * from './components/ui/img-reveal.svelte';
export * from './components/ui/scroll-show.svelte';
export * from './components/ui/discord-count.svelte';
export * from './components/ui/scroll-up.svelte';

// Search
export * from './components/search/algolia-search.svelte';

// Video
export * from './components/video/video-player.svelte';
export * from './components/video/autoplay-toggle.svelte'; 

// Payments
export * from './components/payments/buy-course.svelte'; 
export * from './components/payments/buy-pro.svelte'; 
export * from './components/payments/buy-lifetime.svelte'; 
export * from './components/payments/customer-portal.svelte';
export * from './components/payments/user-charges.svelte';
export * from './components/payments/price-select.svelte';
export * from './components/payments/seat-assign.svelte';
export * from './components/payments/user-invoices.svelte';
export * from './components/payments/manage-subscription.svelte';
export * from './components/payments/update-payment.svelte';
export * from './components/payments/update-address.svelte';


// Shared
export * from './components/ui/loading-spinner.svelte';