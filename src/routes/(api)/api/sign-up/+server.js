import db from '$db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request }) {
  const { email, username, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({
      status: 400,
      body: {
        error: "Email, username, and password are required",
      },
    }));
  }

  const emailMatch = await db.collection('trainers').find({ email }).toArray();
  if (emailMatch.length > 0) {
    return new Response(JSON.stringify({
      status: 409,
      body: {
        error: "This email is already linked to an account",
      },
    }));
  }

  const usernameMatch = await db.collection('trainers').find({ username }).toArray();
  if (usernameMatch.length > 0) {
    return new Response(JSON.stringify({
      status: 409,
      body: {
        error: "This username is already in use",
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
    allies: [],
    rival: '',
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