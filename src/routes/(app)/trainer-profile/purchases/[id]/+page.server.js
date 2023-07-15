import db from '$db';
import pokemon from '$poke';

export async function load({ locals, params }) {
  const { user_email } = locals;
  const purchase_id = params.id;

  const cards = await db.collection('trainers').findOne(
    { "email": user_email, "owned_cards": { $elemMatch: { purchase_id: purchase_id } } }
  );


  const purchasedCards = cards?.purchases?.find(purchase => purchase?.purchase_id === purchase_id);

  const myCards = [];

  for (const card of purchasedCards.set.cards_opened) {
    const cardData = await pokemon.card.find(card);
    myCards.push({
      ...cardData, 
      date_purchased: purchasedCards.date_purchased, 
      quantity: cards.owned_cards.find(card => card.purchase_id === purchase_id).quantity, 
      purchase_id
    });
  }

  return {
    purchasedCards: myCards
  }
}