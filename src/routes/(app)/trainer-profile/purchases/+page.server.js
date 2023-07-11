import db from '$db';

export async function load({ parent }) {
  const { user } = await parent();

  const updatedUser = await db.collection('trainers').findOne({ _id: user._id });

  const purchases = updatedUser.purchases;

  return {
    purchases
  }
}