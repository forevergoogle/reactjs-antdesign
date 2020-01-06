import antVi from 'antd/lib/locale-provider/vi_VN';
import appLocaleData from 'react-intl/locale-data/vi';
import viMessages from './../../locales/vi.json';

const viLocale = {
  messages: {
    ...viMessages,
  },
  antd: antVi,
  locale: 'vi',
  data: appLocaleData,
};

export default viLocale
