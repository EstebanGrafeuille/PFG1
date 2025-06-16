/**
 * Pruebas para los utilitarios de seguridad
 */
import errorHandler from '../utils/errorHandler';
import inputSanitizer from '../utils/inputSanitizer';
import secureStorage from '../utils/secureStorage';

describe('Utilidades de Seguridad', () => {
  // Pruebas para SecureStorage
  describe('SecureStorage', () => {
    const testKey = 'test-secure-key';
    const testValue = { user: 'testUser', token: '1234567890', expiresAt: new Date().toISOString() };

    // Limpiar después de cada prueba
    afterEach(async () => {
      await secureStorage.removeSecureItem(testKey);
    });

    it('debería guardar y recuperar datos correctamente', async () => {
      // Guardar datos
      const saveResult = await secureStorage.saveSecureItem(testKey, testValue);
      expect(saveResult).toBe(true);

      // Recuperar datos
      const retrievedValue = await secureStorage.getSecureItem(testKey);
      expect(retrievedValue).toEqual(testValue);
    });

    it('debería eliminar datos correctamente', async () => {
      // Guardar datos
      await secureStorage.saveSecureItem(testKey, testValue);

      // Eliminar datos
      const removeResult = await secureStorage.removeSecureItem(testKey);
      expect(removeResult).toBe(true);

      // Verificar que los datos han sido eliminados
      const retrievedValue = await secureStorage.getSecureItem(testKey);
      expect(retrievedValue).toBeNull();
    });

    it('debería identificar tokens expirados correctamente', () => {
      // Token expirado (ayer)
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 1);
      expect(secureStorage.isTokenExpired(expiredDate.toISOString())).toBe(true);

      // Token válido (mañana)
      const validDate = new Date();
      validDate.setDate(validDate.getDate() + 1);
      expect(secureStorage.isTokenExpired(validDate.toISOString())).toBe(false);
    });
  });

  // Pruebas para InputSanitizer
  describe('InputSanitizer', () => {
    it('debería sanitizar strings correctamente', () => {
      const unsafeString = '<script>alert("XSS")</script>';
      const sanitized = inputSanitizer.sanitizeString(unsafeString);

      expect(sanitized).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
      expect(sanitized).not.toContain('<script>');
    });

    it('debería sanitizar objetos recursivamente', () => {
      const unsafeObject = {
        name: '<b>Test</b>',
        description: 'Normal text',
        nested: {
          html: '<img src="x" onerror="alert(1)">'
        }
      };

      const sanitized = inputSanitizer.sanitizeObject(unsafeObject);

      expect(sanitized.name).toBe('&lt;b&gt;Test&lt;/b&gt;');
      expect(sanitized.description).toBe('Normal text');
      expect(sanitized.nested.html).not.toContain('<img');
    });

    it('debería validar emails correctamente', () => {
      expect(inputSanitizer.validateEmail('test@example.com')).toBe(true);
      expect(inputSanitizer.validateEmail('invalid-email')).toBe(false);
      expect(inputSanitizer.validateEmail('')).toBe(false);
      expect(inputSanitizer.validateEmail(null)).toBe(false);
    });

    it('debería validar contraseñas correctamente', () => {
      // Contraseña válida
      const strongPassword = 'Test1234!';
      expect(inputSanitizer.validatePassword(strongPassword).valid).toBe(true);

      // Contraseñas inválidas
      expect(inputSanitizer.validatePassword('short').valid).toBe(false); // Muy corta
      expect(inputSanitizer.validatePassword('onlyletters').valid).toBe(false); // Sin números ni caracteres especiales
      expect(inputSanitizer.validatePassword('12345678').valid).toBe(false); // Solo números
    });
  });

  // Pruebas para ErrorHandler
  describe('ErrorHandler', () => {
    it('debería generar mensajes amigables para el usuario', () => {
      const errorCode = 'auth/invalid-credentials';
      const message = errorHandler.getUserFriendlyMessage(errorCode);

      expect(message).toBe('El email o la contraseña son incorrectos');
      expect(message).not.toBe(errorCode);
    });

    it('debería manejar errores de API correctamente', () => {
      const apiError = new Error('API Error');
      apiError.status = 404;

      const errorInfo = errorHandler.handleApiError(apiError);

      expect(errorInfo.success).toBe(false);
      expect(errorInfo.errorCode).toBeTruthy();
      expect(errorInfo.userMessage).toBeTruthy();
    });

    it('debería manejar errores de autenticación correctamente', () => {
      const authError = new Error('Email already in use');

      const errorInfo = errorHandler.handleAuthError(authError);

      expect(errorInfo.success).toBe(false);
      expect(errorInfo.errorCode.startsWith('auth/')).toBe(true);
      expect(errorInfo.userMessage).toBeTruthy();
    });
  });
});
