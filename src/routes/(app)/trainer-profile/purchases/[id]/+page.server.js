import db from '$db';
import pokemon from '$poke';

export async function load({ locals, params }) {
  const { user_email } = locals;
  const purchase_id = params.id;

  const cards = await db.collection('trainers').findOne(
    { "email": user_email, "owned_cards": { $elemMatch: { purchase_id: purchase_id } } }
  );

  console.log(cards.owned_cards);

  const purchasedCards = cards?.owned_cards?.filter(card => card.purchase_id === purchase_id);

  const myCards = [];

  for (const card of purchasedCards) {
    const cardData = await pokemon.card.find(card.card);
    myCards.push({
      ...cardData, 
      date_purchased: card.date_purchased, 
      quantity: card.quantity, 
      purchase_id
    });
  }



  return {
    purchasedCards: myCards
  }
}