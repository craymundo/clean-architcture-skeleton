export class Messages {
    static errorEmailEmpty = 'Debes ingresar un correo para contactarte';
    static errorEmailInvalid = 'Ingresa un correo válido. Ej: correo@mail.com';

    static errorEmailDoesNotExist = 'No existe una cuenta asociada a este correo.';
    static errorCaptchaIncorrecto = 'Llena un resultado';


    static errorGeneric = 'Ocurrio un error. Por favor, vuelve a intentarlo';


    // Messages for register
    static errorMessageRegister = {
      errorDocumentNumberEmpty: 'Ingresa el número',
      errorDocumentNumberDniMin: 'Son 8 dígitos',
      errorDocumentNumberMin: 'Mínimo 4 dígitos',
      errorDocumentNumberMax: 'Máximo 12 dígitos',
      errorNameEmpty: '¡Espera! ¿Con quién estamos conversando?',
      errorFirstSurnameEmpty: 'Para continuar necesitamos esta información.',
      errorBirthdateEmpty: 'Debes ingresar esta información',
      errorGenderEmpty: 'Esta información debe estar OK.',
      errorCaptchaEmpty: 'Llena un resultado',
      errorEmailRegisterEmpty: 'Debes ingresar un correo para contactarte.',
      errorEmailRegisterInvalid: 'Ingresa un correo válido. Ej: correo@mail.com',
      errorPhoneEmpty: 'Ingresa tu número',
      errorPhoneMin: 'Mínimo 9 dígitos.',
      errorPasswordEmpty: 'Debes ingresar una contraseña',
      errorPasswordStrongInvalid: 'Recuerda usar una contraseña segura.',
      errorPasswordEqual: '¡Revisa bien! Las contraseñas deben coincidir.',
      errorConfirmPasswordEmpty: 'Ingresa de nuevo la contraseña'
    };
    
    static errorPasswordEmpty = 'Ingresa tu password';
}