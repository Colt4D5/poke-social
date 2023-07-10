import pokemon from '$poke';

export async function load({ params }) {
  const { id } = params;

  const set = await pokemon.set.find(id)

  return {
    set
  }
}