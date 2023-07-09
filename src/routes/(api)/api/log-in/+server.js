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

  console.log(email, password);

  // password = asdfasdf
  const testPw = '$2b$10$NnTV8iFESE5GgS1KQqMG9OURO6aoXgSmLU5rCgc4eGZ08WGlYp2tC';

  const match = await bcrypt.compare(password, testPw);

  console.log(match);

  return new Response(JSON.stringify({ 
    status: 200, 
    body: { message: "Success" } 
  }));
}