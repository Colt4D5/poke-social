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

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(email, hashedPassword);

  return new Response(JSON.stringify({ 
    status: 200, 
    body: { message: "Success" } 
  }));
}