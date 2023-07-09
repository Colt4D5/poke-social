import db from '$db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request }) {
  const { email, username, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
      status: 400,
      body: {
        error: "Email, username, and password are required",
      },
    }));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    _id: uuidv4(),
    email,
    username,
    password: hashedPassword,
    role: 'user',
    avatar: '',
    banner: '',
    bio: '',
    balance: 50.00,
    is_active: true,
    is_verified: true,
    posts: [],
    purchases: [],
    owned_cards: [],
    benched_cards: [],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: '',
  }

  await db.collection('trainers').insertOne(newUser);

  return new Response(JSON.stringify({ 
    status: 200, 
    body: { 
      message: "Success",
      method: 'register'
    }  
  }));
}