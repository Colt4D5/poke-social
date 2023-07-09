<script>
  let isLogin = true;
  const toggleLogin = () => isLogin = !isLogin;

  let email;
  let password;

  const handleSubmit = async (e) => {
    if (!email || !password) {
      return;
    }
    let apiUrl;
    if (isLogin) {
      console.log('Is logging in...');
      apiUrl = '/api/log-in'
    } else {
      console.log('Is registering...');
      apiUrl = '/api/sign-up'
    }

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const json = await res.json();
    console.log(json);

  }
</script>

<div class="container">
  <h1>{isLogin ? 'Log In' : 'Register'}</h1>
  <form method="post" on:submit|preventDefault={handleSubmit}>
    <input bind:value={email} placeholder="Email" type="text" name="email" id="email" required>
    <input bind:value={password} placeholder="Password" type="password" name="password" id="password" required>

    {#if isLogin }
      <input type="submit" value="Log In">
      <p>Don't have an account? Register <a on:click={() => toggleLogin()} href="#sign-up">here</a>!</p>
    {:else}
      <input type="submit" value="Sign Up">
      <p>Already signed up? Log in <a on:click={() => toggleLogin()} href="#log-in">Here</a>!</p>
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
