import db from '$db';
import { json } from '@sveltejs/kit'

export async function GET({ locals }) {
  const userEmail = locals.user_email;

  await db.collection('trainers').updateOne(
    { email: userEmail }, 
    { 
      $set: { "owned_cards": [] }, 
      $set: { "purchases": [] }
    }
  );

  // return new Response(JSON.stringify({ msg: 'successfully deleted!'}));
  return json({ msg: 'successfully deleted!'});
}
