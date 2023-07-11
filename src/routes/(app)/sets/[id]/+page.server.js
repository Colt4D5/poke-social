import pokemon from '$poke';

export async function load({ params }) {
  const { id } = params;

  const set = await pokemon.set.find(id)

  const holos = await pokemon.card.where({ 
    q: `set.name:${set.name} rarity:holo`,
    pageSize: 4, 
    page: 1,
  })

  return {
    set,
    holos
  }
}