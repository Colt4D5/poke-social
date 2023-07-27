<script>
  import toast from 'svelte-french-toast';
  import { invalidateAll, goto } from '$app/navigation';
  import { setCookie } from '$utils';

  let isLogin = true;
  const toggleLogin = () => isLogin = !isLogin;

  let email;
  let username;
  let password;

  const handleSubmit = async (e) => {
    if (!email || !password) {
      if (!isLogin && !username) {
        toast.error('You must choose a username')
        return;
      } else {
        toast.error('You must include an email and a password');
        return;
      }
    }
    const apiUrl = isLogin ? '/api/log-in' : '/api/sign-up'

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password})
    })
    const json = await res.json();
    

    if (json.status === 200) {
      if (isLogin) {
        setCookie('logged_in', 'true', 30);
        setCookie('user_email', email, 30);
        toast.success('Welcome back!');
        invalidateAll();
        email = ''
        username = ''
        password = '';
        goto('/');
      } else { // is signing up
        email = ''
        username = ''
        password = '';
        toast.success('Thank you for registering!');
        invalidateAll();
        window.location.reload();
      }
    } else if (json.status === 409) {
      toast.error(json.body.error);
    } else if ([400, 404].includes(json.status)) {
      toast.error('Your login credentials are incorrect');
    } else {
      toast.error('Whoops! Something went wrong.')
    }
  }

</script>

<div class="container">
  <h1>{isLogin ? 'Log In' : 'Register'}</h1>
  <form method="post" on:submit|preventDefault={handleSubmit}>
    <input bind:value={email} placeholder="Email" type="text" name="email" id="email" required>
    
    {#if !isLogin }
      <input bind:value={username} placeholder="Username" type="text" name="username" id="username" required>
    {/if}

    <input bind:value={password} placeholder="Password" type="password" name="password" id="password" required>

    {#if isLogin }
      <input type="submit" value="Log In">
      <p>Don't have an account? Register <a on:click|preventDefault={() => toggleLogin()} href="#sign-up">here</a>!</p>
    {:else}
      <input type="submit" value="Sign Up">
      <p>Already signed up? Log in <a on:click|preventDefault={() => toggleLogin()} href="#log-in">Here</a>!</p>
    {/if}
  </form>
</div>

<style lang="postcss">
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(100%, 800px);
    background-color: #ffffff11;
    border-radius: 1rem;
    padding: 2rem 1rem;
    & form {
      margin-bottom: 0;
      & button {
        /* margin: 0; */
      }
    }
  }
</style>
