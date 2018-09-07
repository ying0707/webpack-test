import { ZH, EN } from '../../config/lang';

export function setSysLanguage() {
  if (localStorage.lang === 'EN' || !localStorage.lang)window.themisLang = EN;
  if (localStorage.lang === 'ZH')window.themisLang = ZH;
}
