import db from '$db';
import pokemon from '$poke';

export async function load({ parent }) {
  const { user } = await parent();

  const updatedUser = await db.collection('trainers').findOne({ _id: user._id });

  const myCards = [];



  // for (const card of updatedUser.owned_cards) {
  //   const cardData = await pokemon.card.find(card.card);
  //   myCards.push({...cardData, date_purchased: card.date_purchased, quantity: card.quantity});
  // }

  return {
    user,
    streamed: {
      cards: new Promise(async (fulfill) => {
        for (let i = 0; i < 10; i++) {
          const card = updatedUser.owned_cards[i];
          const cardData = await pokemon.card.find(card.card);
          myCards.push({...cardData, date_purchased: card.date_purchased, quantity: card.quantity});
        }
        fulfill(myCards);
      })
    }
  }
}