import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, saveSession } from '../../services/authService';

export default function LoginGoogleButton({ onLogin }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;

      if (!credential) {
        throw new Error('Google no devolvió credential');
      }

      const data = await loginWithGoogle(credential);

      saveSession(data);

      if (onLogin) {
        onLogin(data.user);
      }

      console.log('Usuario logueado:', data.user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        alert('No se pudo iniciar sesión con Google');
      }}
    />
  );
}