export async function handle({ event, resolve }) {
  event.locals.user = {
    id: 1,
    name: 'John Doe',
  };
  
  event.locals.user.id = 1;
  event.locals.user.name = 'John Doe';
  event.locals.user.username = 'JohnDoe24';
  event.locals.user.email = 'XXXXXXXXXXXX';
  event.locals.user.password = 'XXXXXXXX';
  event.locals.user.role = 'admin';
  event.locals.user.avatar = 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80';
  event.locals.user.banner = 'https://images.unsplash.com/photo-1599813391721-ed8c5fe98166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1839&q=80';
  event.locals.user.created_at = '2021-01-01T00:00:00.000Z';
  event.locals.user.updated_at = '2021-01-01T00:00:00.000Z';
  event.locals.user.deleted_at = null;
  
  const response = await resolve(event);
  return response;
}