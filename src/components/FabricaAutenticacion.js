export function crearSesion(usuario, password) {
  // Simulamos una validación
  if (usuario === 'admin' && password === '123') {
    return { usuario: 'admin', rol: 'ADMIN', token: 'abc-123' };
  } else if (usuario && password) {
    return { usuario: usuario, rol: 'CLIENTE', token: 'xyz-789' };
  } else {
    return null; // Error de login
  }
}