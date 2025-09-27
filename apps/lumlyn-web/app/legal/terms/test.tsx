// 👉 Dacă în același section ai și un link „Ai uitat parola?”, unde îl pui: înăuntru form sau în afara lui? De ce?
<section aria-labelledby="wel_msg">
    <h1 id="wel_msg"> Welcome back </h1>

    <form aria-labelledby="auth_title">
        <h2 id="auth_title">Autentificare</h2>

        <label htmlFor="email">Adresa de email</label>
        <input 
            id="email" 
            type="email" 
            name="email" 
            placeholder="ex: nume@email.com"
            required 
        />

        <label htmlFor="password">Parola</label>
        <input 
            id="password" 
            type="password" 
            name="password" 
            placeholder="type your pasword here" 
            required
        />

        <h4 id="auth_title">Ai uitat parola?</h4>

        <label htmlFor="email_recovery">Introdu adresa de email sa iti trimitem un link de recuperare</label>
        <input 
            id="email_recovery" 
            type="email_recovery" 
            name="email_recovery" 
            placeholder="ex: nume@email.com"
        />
        <button aria-label="Primeste link de recuperare parola">Trimite</button>
    </form>
</section>




