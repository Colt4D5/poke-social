import db from '$db';
import pokemon from '$poke';
import { setPrice } from '$lib/constants';



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

  const commonCards = cardsInSet.filter(card => card.rarity && card.rarity?.toLowerCase() === 'common');
  const uncommonCards = cardsInSet.filter(card => card.rarity && card.rarity?.toLowerCase()  === 'uncommon' || card.rarity?.toLowerCase().includes('promo'));
  const rareCards = cardsInSet.filter(card => card.rarity && card.rarity?.toLowerCase() === 'rare');
  const rareHoloCards = cardsInSet.filter(card => card.rarity && card.rarity?.toLowerCase().includes('rare '));

  const selectedCommonCards = getRandomCards(commonCards, 3);
  const selectedUncommonCards = getRandomCards(uncommonCards, 4);
  const selectedRareCards = getRandomCards(rareCards, 2);
  const selectedRareHoloCards = getRandomCards(rareHoloCards, 1);

  const allSelectedCards = [
    ...selectedCommonCards,
    ...selectedUncommonCards,
    ...selectedRareCards,
    ...selectedRareHoloCards
  ].map(card => {
    return {
      card: card.id,
      date_purchased: purchase_date
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
        purchase_date: purchase_date, 
        price: setPrice 
      },
        owned_cards: { $each: [...allSelectedCards ]}
      },
    }
  );

  return new Response(JSON.stringify({
    status: 201,
    cards: allSelectedCards,
    body: {
      message: `Successfully purchased a "${set.name}" pack!`
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
      const randomIndex = Math.floor(Math.random() * cards.length);
      if (cards[randomIndex].supertype?.toLowerCase() === 'trainer' && !pulledTrainer) {
        randomCards.push(cards[randomIndex]);
        pulledTrainer = true;
        cards.splice(randomIndex, 1);
      } else if (cards[randomIndex].supertype?.toLowerCase() === 'trainer' && pulledTrainer) {
        const newRandomIndex = Math.floor(Math.random() * cards.length);
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