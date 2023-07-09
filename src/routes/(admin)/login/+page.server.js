import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const { user_email, logged_in } = locals;
  if (user_email && logged_in) {
    throw redirect('302', '/');
  }
}
