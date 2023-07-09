// import pokemon from '$poke';

export async function load({ locals }) {
  // const card = await pokemon.card.find('base1-4');
  const user = await locals.user;
  
  return {
    user
    // card
  }
}