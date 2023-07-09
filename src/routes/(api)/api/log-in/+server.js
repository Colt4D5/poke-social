import db from '$db';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
      status: 400,
      body: {
        error: "Email and password are required",
      },
    }));
  }

  const user = await db.collection('trainers').findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({
      status: 400,
      body: {
        error: "Invalid email or password",
      },
    }));
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return new Response(
      JSON.stringify({
      status: 400,
      body: {
        error: "Invalid email or password",
      },
    }));
  }

  return new Response(JSON.stringify({ 
    status: 200, 
    body: { 
      message: "Success",
      method: 'login'
    } 
  }));
}