import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section className="auth-karti">
      <h2>Kayıt Ol</h2>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan"><label htmlFor="register-name">Ad Soyad</label><input id="register-name" value={name} onChange={(event) => { setName(event.target.value); setSent(false); }} aria-invalid={errors.name ? true : undefined} aria-describedby="register-name-error" /><span id="register-name-error" className="alan-hata">{errors.name}</span></p>
        <p className="alan"><label htmlFor="register-email">E-posta</label><input id="register-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSent(false); }} aria-invalid={errors.email ? true : undefined} aria-describedby="register-email-error" /><span id="register-email-error" className="alan-hata">{errors.email}</span></p>
        <p className="alan"><label htmlFor="register-password">Şifre</label><input id="register-password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setSent(false); }} aria-invalid={errors.password ? true : undefined} aria-describedby="register-password-error" /><span id="register-password-error" className="alan-hata">{errors.password}</span></p>
        <p className="alan"><label htmlFor="register-password2">Şifre (tekrar)</label><input id="register-password2" type="password" value={password2} onChange={(event) => { setPassword2(event.target.value); setSent(false); }} aria-invalid={errors.password2 ? true : undefined} aria-describedby="register-password2-error" /><span id="register-password2-error" className="alan-hata">{errors.password2}</span></p>
        <button type="submit" className="buton">Kayıt ol</button>
      </form>
      {sent && <p className="basari-kutusu" role="status">Bilgiler geçerli. Kayıt işlemi bu sprintte yapılmıyor.</p>}
      <p className="auth-linkler"><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></p>
    </section>
  );
}

export default RegisterPage;
