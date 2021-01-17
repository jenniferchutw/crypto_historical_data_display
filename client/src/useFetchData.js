import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { inputDateData, sevenDaysData } from './atoms';

const useFetchData = () => {
  const setData = useSetRecoilState(sevenDaysData);
  const setDateData = useSetRecoilState(inputDateData);

  const instance = axios.create({
    headers: {
      'Content-Type': 'text/html',
      Accept: 'application/json',
    },
  });
  const getData = async (date) => {
    try {
      const response = await instance.get(`/api?date=${date}`);
      const history = await response.data;

      history.forEach((item) => {
        //If data has seven days data, get first and last day, else only get first day
        if (item.data.length === 7) {
          item.data.splice(1, item.data.length - 2);
        } else {
          item.data.splice(1, item.data.length - 1);
        }
      });

      inputDataData(history);
      setData(history);
    } catch (err) {
      alert(err);
    }
  };

  const chechNumType = (item) => {
    return isNaN(item) ? item.replace(/,/g, '') : item;
  };

  // Create a new array for storing searched date data, sort data by Market Cap, then store data into recoil atom
  const inputDataData = (history) => {
    var oneDayHistory = [];
    if (history) {
      for (let i = 0; i < history.length; i++) {
        let dayHistory = {
          id: history[i].data[0]._id,
          currency: history[i].data[0].Currency,
          date: history[i].data[0].Date,
          open: parseFloat(chechNumType(history[i].data[0].Open)),
          high: parseFloat(chechNumType(history[i].data[0].High)),
          low: parseFloat(chechNumType(history[i].data[0].Low)),
          close: parseFloat(chechNumType(history[i].data[0].Close)),
          volume: parseFloat(chechNumType(history[i].data[0].Volume)),
          marketCap: parseFloat(chechNumType(history[i].data[0]['Market Cap'])),
        };
        oneDayHistory.push(dayHistory);
      }
    }

    oneDayHistory.sort((a, b) => {
      return b.marketCap - a.marketCap;
    });

    setDateData(oneDayHistory);
  };

  return getData;
};

export default useFetchData;
