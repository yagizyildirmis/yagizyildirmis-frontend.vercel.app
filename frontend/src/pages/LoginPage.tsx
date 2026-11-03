import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section className="auth-karti">
      <h2>Giriş Yap</h2>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan">
          <label htmlFor="login-email">E-posta</label>
          <input id="login-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSent(false); }} aria-invalid={errors.email ? true : undefined} aria-describedby="login-email-error" />
          <span id="login-email-error" className="alan-hata">{errors.email}</span>
        </p>
        <p className="alan">
          <label htmlFor="login-password">Şifre</label>
          <input id="login-password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setSent(false); }} aria-invalid={errors.password ? true : undefined} aria-describedby="login-password-error" />
          <span id="login-password-error" className="alan-hata">{errors.password}</span>
        </p>
        <button type="submit" className="buton">Giriş yap</button>
      </form>
      {sent && <p className="basari-kutusu" role="status">Bilgiler geçerli. Gerçek giriş Sprint 10'da eklenecek.</p>}
      <p className="auth-linkler">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </section>
  );
}

export default LoginPage;
