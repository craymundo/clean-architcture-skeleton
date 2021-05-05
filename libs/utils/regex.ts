export class Regex{
    static emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    static passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    static numberPattern = new RegExp(/^[0-9]+$/);
    static emailsPattern = new RegExp(/^[0-9?A-z0-9?]+(\.)?[a-zA-Z\-0-9]+@[a-zA-Z\-0-9]+\.[A-z]{2,3}$/);
    static namesPattern = new RegExp(/^([A-Za-zÀ-ÿÁÉÍÓÚñáéíóúÑ']{0}[A-Za-zÀ-ÿÁÉÍÓÚñáéíóúÑ']+[\s]*)+$/);
    static documentPattern = new RegExp(/^[A-Za-z0-9]+$/);
}
