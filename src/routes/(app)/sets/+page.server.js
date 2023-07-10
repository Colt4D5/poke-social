import pokemon from '$poke';

export async function load() {
  const sets = await pokemon.set.all();

  return {
    sets
  }
}