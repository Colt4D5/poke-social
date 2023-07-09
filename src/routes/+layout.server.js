import pokemon from '$poke';

export async function load({ locals }) {
  // const card = await pokemon.card.find('base1-4');
  const user = await locals.user;
  const benchedCards = [];
  for (const card of locals.user.benched_cards) {
    const benchedCard = await pokemon.card.find(card);
    benchedCards.push(benchedCard);
  }


  
  return {
    user,
    benchedCards
  }
}