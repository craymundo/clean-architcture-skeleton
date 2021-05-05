import { environment } from '../core/environments/environment';
import { isObject } from './objects';

export function encryptEmail(email: string): string {
  let encryptEmail = '';
  let bolArroba = false;
  for (let index = 0; index < email.length; index++) {
    let letra = email.charAt(index);
    if ((index > 3 || bolArroba) && letra !== '@' && index < email.length - 4)
      letra = '*';
    if (letra === '@') bolArroba = true;

    encryptEmail = encryptEmail + letra;
  }
  return encryptEmail;
}

let loader = null;

export function presentLoading(loadingController) {
  if (loader) {
    dismissLoader();
  }

  loader = document.createElement('div');
  loader.classList.add('ion-loading');
  const animation = document.createElement('div');
  animation.classList.add('loading-wrapper');
  loader.append(animation);
  document.getElementsByTagName('ion-app')[0].append(loader);
  animation.classList.add('visible');
}

export function dismissLoader() {
  if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
}

export function dismissLoading(loadingController) {
  dismissLoader();
}

export async function presentToast(toastController, message): Promise<void> {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
  });
  toast.present();
}

export function deepEqualObjects(object1, object2): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqualObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export function dateString(
  strDate: string,
  isShowDay = true,
  isShowD = false
): string {
  const originalDate = new Date(strDate);
  originalDate.setDate(originalDate.getDate() + 1);
  const diasSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  const diaLetras = isShowDay ? diasSemana[originalDate.getDay()] : '';
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const mesLetras = meses[originalDate.getMonth()];
  const dia = originalDate.getDate();
  const diaMes = dia < 10 ? `0${dia}` : dia;
  const anho = originalDate.getFullYear();
  const constD = isShowD ? ' de ' : ' ';
  const stringDate = `${diaLetras} ${diaMes} de ${mesLetras}${constD}${anho}`;
  return stringDate;
}

export function getAddDate(days: number): string {
  const today = days === 0 ? new Date() : sumarDias(new Date(), days);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export function sumarDias(fecha, dias): Date {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

export function getValueLocalStorage(platform: 'web' | 'mobile', key: string) {
  if (platform === 'web') {
    const value = window.localStorage.getItem(key);
    if (isJSON(value)) return JSON.parse(value);
    return value;
  }
}

export function deleteKeyFromLocalStorage(
  platform: 'web' | 'mobile',
  key: string
) {
  if (platform === 'web') {
    window.localStorage.removeItem(key);
  }
}

export function deleteAllKeysFromLocalStorage(platform: 'web' | 'mobile') {
  if (platform === 'web') {
    window.localStorage.clear();
  }
}

export function setValueLocalStorage(
  platform: 'web' | 'mobile',
  key: string,
  value: any
) {
  if (platform === 'web') {
    if (typeof value === 'object')
      window.localStorage.setItem(key, JSON.stringify(value));
    else window.localStorage.setItem(key, value);
  }
}

export function isJSON(value: any): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @function Determine the type of time if is for the late or is
 * in the morning, show in template 'am' or 'pm'
 */
export function setTimeLate(time: string): string {
  const hour = time.substr(0, time.indexOf(':'));
  return parseInt(hour) >= 12 ? 'p.m.' : 'a.m.';
}

export function setTimeHout(time: string): string {
  let normalTime: string;
  const hour = time.substr(0, time.indexOf(':'));
  const minutes = time.substr(time.indexOf(':'), time.length);
  if (parseInt(hour) > 12) {
    const normalHour = parseInt(hour) - 12;
    const num = new Number(normalHour);
    normalTime = `${num.toString(normalHour[1])}${minutes}`;
  } else {
    normalTime = time;
  }
  return normalTime;
}

export function sumarMinutos(fecha, minutos, segundos): any {
  fecha.setSeconds(segundos);
  fecha.setMinutes(fecha.getMinutes() + minutos);
  return fecha;
}

export function stringTodate(dateString): Date {
  const reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
  const [temp, year, month, day, hours, minutes, seconds] = reggie.exec(
    dateString
  );
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
}

export function buildMapsUrl(
  lat: string,
  lng: string,
  platformName: string,
  appsAvailable: any[] = [],
  label = '',
  searchName = ''
): string {
  const defaultUrl = `https://www.google.com/maps/search/${searchName}/@${lat},${lng},18z`;
  const platformSchemes = new Map<string, string>([
    ['ios', `maps://?q=${searchName}&,sll=${lat},${lng}&z=18`],
    ['android', `geo://${lat},${lng}?q=${lat},${lng}(${label})`],
    ['desktop', defaultUrl],
    ['unavailable', defaultUrl],
  ]);

  // FIXME: we should really think about using LaunchNavigator's navigate()
  const shouldUsePlatform = (
    schemes: Map<string, string>,
    platform: string,
    apps: any[],
    ignore = 'ios'
  ): boolean => {
    return schemes.has(platform) && apps.length && platform !== ignore;
  };

  const currentPlatformName = shouldUsePlatform(
    platformSchemes,
    platformName,
    appsAvailable
  )
    ? platformName
    : 'unavailable';

  return platformSchemes.get(currentPlatformName);
}

export function formatDate(dateIsoString: string, options: any) {
  if (!dateIsoString) {
    return '';
  }
  const date = new Date(dateIsoString);
  const result: string = new Intl.DateTimeFormat('es', options)
    .format(date)
    .replace('\xA0', '');

  // NOTE: there's a bug in chrome that changes values in the range 12:00pm to
  // 12:59pm to the range of 00:00pm to 00:59pm
  if (
    options.hasOwnProperty('hour12') &&
    options.hour12 &&
    result.endsWith('p.m.')
  ) {
    if (result.startsWith('00:')) {
      return result.replace('00:', '12:');
    }
  }

  return result;
}

export function dateExpired(
  dateIsoStr01: string,
  minuteLapse: number,
  setZerotime = false
): boolean {
  const d1 = new Date(dateIsoStr01);
  const d2 = new Date();
  if (setZerotime) {
    d2.setHours(0, 0, 0, 0);
  }
  d1.setMinutes(d1.getMinutes() - minuteLapse);
  return d1.getTime() < d2.getTime();
}

/**
 * return AGE number of Client per date of birthday
 * @param dateBrithday String date ISOFormat
 * @returns Age number
 */
export function getAge(dateBrithday: string): number {
  const splidDate = dateBrithday.split('/');
  const newFirstDate = new Date(
    `${splidDate[2]}-${splidDate[1]}-${splidDate[0]}`
  );
  newFirstDate.setMinutes(
    newFirstDate.getMinutes() + newFirstDate.getTimezoneOffset()
  );
  const todayDate = new Date();
  const dateParam = new Date(newFirstDate);
  let age = todayDate.getFullYear() - dateParam.getFullYear();
  const m = todayDate.getMonth() - dateParam.getMonth();
  if (m < 0 || (m === 0 && todayDate.getDate() < dateParam.getDate())) {
    age--;
  }
  return age;
}

/**
 * return true if age is greater than environment.LEGAL_AGE_NUMBER
 *
 * @param date String date ISOFormat
 * @returns Boolean
 */


export function dateIsHigher(firstDate: string, secondDate = ''): boolean {
  const splidDate = firstDate.split('/');
  const newFirstDate = new Date(
    `${splidDate[2]}-${splidDate[1]}-${splidDate[0]}`
  );
  newFirstDate.setMinutes(
    newFirstDate.getMinutes() + newFirstDate.getTimezoneOffset()
  );

  let newSecondDate = new Date();

  if (secondDate !== '') {
    const splitSecondDate = secondDate.split('/');
    newSecondDate = new Date(
      `${splitSecondDate[2]}-${splitSecondDate[1]}-${splitSecondDate[0]}`
    );
  }
  newFirstDate.setHours(0, 0, 0, 0);
  newSecondDate.setHours(0, 0, 0, 0);
  return newFirstDate > newSecondDate;
}

export function dateIsLess(firstDate: string): boolean {
  const splidDate = firstDate.split('/');
  const newFirstDate = new Date(
    `${splidDate[2]}-${splidDate[1]}-${splidDate[0]}`
  );

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear() - 120;

  const secondDate = new Date(`${mm}-${dd}-${year}`);

  newFirstDate.setHours(0, 0, 0, 0);
  secondDate.setHours(0, 0, 0, 0);
  return newFirstDate < secondDate;
}

export function formattedDate(isoDatetime: string): string {
  return formatDate(isoDatetime, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatteTime(isoDatetime: string): string {
  return formatDate(isoDatetime, {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function changeFormatDate(
  isoDatetime: string,
  character = '-',
  invert = true
): string {
  const dateString = formattedDate(isoDatetime);

  const newDateString = dateString.split('/');
  return invert
    ? `${newDateString[2]}${character}${newDateString[1]}${character}${newDateString[0]}`
    : `${newDateString[0]}${character}${newDateString[1]}${character}${newDateString[2]}`;
}

export function getParam(
  params: { [key: string]: any },
  defaultParam: any,
  names: string[]
): any {
  for (const elem of names) {
    const data = params[elem];
    if (data) {
      return data;
    }
  }
  return defaultParam;
}

export function toDefault(valString: string): string {
  let returnVal = valString;
  if (valString === null) {
    returnVal = '';
  }
  return returnVal;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
