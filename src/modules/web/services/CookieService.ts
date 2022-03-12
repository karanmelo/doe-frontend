import Cookie, { CookieSetOptions } from 'universal-cookie';

class CookieService {
  private cookie = new Cookie();

  get(key: string) {
    return this.cookie.get(key);
  }

  set(key: string, value: string, options: CookieSetOptions | undefined) {
    this.cookie.set(key, value, options);
  }

  remove(key: string) {
    this.cookie.remove(key);
  }
}

export default new CookieService();
