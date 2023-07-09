export async function handle({ event, resolve }) {
  event.locals.user = {
    id: 1,
    name: 'John Doe',
  };
  
  event.locals.user.id = 1;
  event.locals.user.name = 'Colton Allen';
  event.locals.user.username = 'Colt_4D5';
  event.locals.user.email = 'coltonaallen@gmail.com';
  event.locals.user.password = 'Muffinita1';
  event.locals.user.role = 'admin';
  event.locals.user.avatar = 'https://i.imgur.com/08svBlM.jpg';
  event.locals.user.banner = 'https://static.guidestrats.com/images/02/13602/00-featured-choosing-starter-pokemon-in-professor-oak-lab-pokemon-frlg-screenshot.jpg';

  event.locals.user.benched_cards = [
    'gym2-11',
    'bw5-1',
    'cel25c-15_A3',
    'gym2-2',
    'sm115-5',
    'ex7-4'
  ]

  event.locals.user.created_at = '2021-01-01T00:00:00.000Z';
  event.locals.user.updated_at = '2021-01-01T00:00:00.000Z';
  event.locals.user.deleted_at = null;
  
  const response = await resolve(event);
  return response;
}