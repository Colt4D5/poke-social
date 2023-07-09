import pokemon from '$poke';
import { redirect } from '@sveltejs/kit';
import db from '$db';

export async function load({ locals }) {
  
  const user_email = locals.user_email;
  const logged_in = locals.logged_in;

  if (!user_email || !logged_in) {
    throw redirect(302, '/login');
  }

  const user = await db.collection('trainers').findOne({'email': user_email});
  
  const benchedCards = [];
  if (user.benched_cards.length > 0) {
    for (const card of user.benched_cards) {
      const benchedCard = await pokemon.card.find(card);
      benchedCards.push(benchedCard);
    }
  }


  
  return {
    user,
    benchedCards
  }
}