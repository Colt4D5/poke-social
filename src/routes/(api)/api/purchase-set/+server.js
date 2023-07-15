import db from '$db';
import pokemon from '$poke';
import { setPrice } from '$lib/constants';
import { v4 as uuidv4 } from 'uuid';


export async function POST({ request }) {
  const { set, user } = await request.json();

  const purchase_date = new Date();

  if (!set || !user) {
    return new Response(JSON.stringify({
      status: 400,
      body: {
        message: 'Invalid data'
      }
    }))
  }

  const currentUser = await db.collection('trainers').findOne({ email: user.email });

  if (!currentUser) {
    return new Response(JSON.stringify({
      status: 400,
      body: {
        message: 'Invalid user'
      }
    }))
  }

  if (Number(currentUser.balance) < Number(setPrice)) {
    return new Response(JSON.stringify({
      status: 403,
      body: {
        message: 'Not enough money'
      }
    }))
  }

  const cardsInSet = await pokemon.card.all({ q: `set.name:${set.name}` });

  const commonCards = cardsInSet?.filter(card => card.rarity && card.rarity?.toLowerCase() === 'common');
  const uncommonCards = cardsInSet?.filter(card => card.rarity && card.rarity?.toLowerCase()  === 'uncommon' || card.rarity?.toLowerCase().includes('promo'));
  const rareCards = cardsInSet?.filter(card => card.rarity && card.rarity?.toLowerCase() === 'rare');
  const rareHoloCards = cardsInSet?.filter(card => card.rarity && card.rarity?.toLowerCase().includes('rare '));

  let selectedCommonCards = []
  let selectedUncommonCards = [];
  let selectedRareCards = [];
  let selectedRareHoloCards = [];
  if (commonCards) {
    selectedCommonCards = getRandomCards(commonCards, 3);
  }
  if (uncommonCards) {
    selectedUncommonCards = getRandomCards(uncommonCards, 4);
  }
  if (rareCards) {
    selectedRareCards = getRandomCards(rareCards, 2);
  }
  if (rareHoloCards) {
    selectedRareHoloCards = getRandomCards(rareHoloCards, 1);
  }

  const purchase_id = uuidv4();

  const allSelectedCards = [
    ...selectedCommonCards,
    ...selectedUncommonCards,
    ...selectedRareCards,
    ...selectedRareHoloCards
  ].map(card => {
    return {
      card: card.id,
      date_purchased: purchase_date,
      purchase_id,
      quantity: 1
    }
  })

  await db.collection('trainers').updateOne(
    { email: user.email }, 
    { 
      $set: { balance: Number((+currentUser.balance - +setPrice).toFixed(2)) },
      $push: { purchases: { 
        'set': {
          set_id: set.id,
          cards_opened: allSelectedCards.map(card => card.card)
        }, 
        purchase_id,
        purchase_date: purchase_date, 
        price: setPrice 
      } }
    }
  );

  for (const card of allSelectedCards) {
    await db.collection('trainers').updateOne(
      { email: user.email, "owned_cards.card": card.card },
      { $inc: {
        "owned_cards.$.quantity": 1
      } }
    )

    await db.collection('trainers').updateOne(
      { email: user.email, "owned_cards.card": { $ne: card.card } },
      { $addToSet: { owned_cards: card }  }
    )

  }

return new Response(JSON.stringify({
  status: 201,
  body: {
    message: `Successfully purchased a "${set.name}" pack!`,
    cards: allSelectedCards,
    purchase_id,
  }
}))
}

function getRandomCards(cards, num) {
  const randomCards = [];
  let pulledTrainer = false;
  if (cards < num) {
    return cards;
  } else {
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * cards?.length);
      if (cards[randomIndex].supertype?.toLowerCase() === 'trainer' && !pulledTrainer) {
        randomCards.push(cards[randomIndex]);
        pulledTrainer = true;
        cards.splice(randomIndex, 1);
      } else if (cards[randomIndex].supertype?.toLowerCase() === 'trainer' && pulledTrainer) {
        const newRandomIndex = Math.floor(Math.random() * cards.length) || 0;
        randomCards.push(cards[newRandomIndex]);
        cards.splice(newRandomIndex, 1);
      } else {
        randomCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
      }
    }
  }
  return randomCards;
}