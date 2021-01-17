import { atom } from 'recoil';

const inputDateData = atom({
  key: 'inputDateData',
  default: [],
});

const sevenDaysData = atom({
  key: 'sevenDaysData',
  default: [],
});

export { inputDateData, sevenDaysData };
