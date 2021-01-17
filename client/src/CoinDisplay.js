import React, { useState } from 'react';
import styled from 'styled-components';
import useFetchData from './useFetchData';
import { useRecoilValue } from 'recoil';
import { inputDateData, sevenDaysData } from './atoms';

const StyledDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;

  .form {
    margin-bottom: 3rem;

    &__input {
      margin-right: 1rem;
      padding: 0.5rem;
      border-radius: 3rem;
      padding: 0.5rem 1.5rem;
      outline: none;
      border: 1px solid black;
    }

    &__btn {
      width: 8rem;
      text-align: center;
      display: inline-block;
      border: 1px solid white;
      outline: none;
      color: white;
      background-color: #098ef4;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 3rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 0.5rem 1rem rgba(black, 0.3);
        color: #087ede;
        background-color: #f6f8fc;
        border: 1px solid #087ede;
      }

      &:active {
        transform: translateY(0.1rem);
      }
    }
  }
  .date {
    color: #087ede;
  }
`;

const DataSection = styled.div`
  min-height: 40rem;
  padding: 2rem;
  margin-top: 3rem;
  background-color: #f6f8fc;
  border-radius: 3rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  .title {
    list-style: none;
    display: flex;
    border-bottom: 1px solid grey;
    padding: 1rem 1rem;
  }

  .display-row {
    display: flex;
    padding: 1.5rem 1rem;
  }
  .item {
    width: 20rem;
    flex-grow: 1;

    &--small {
      width: 10rem;
    }

    &--green {
      color: #1bb035;
    }
    &--red {
      color: #f64e64;
    }
  }
`;

const CoinDisplay = () => {
  const [date, setDate] = useState('');
  const dateData = useRecoilValue(inputDateData);
  const allData = useRecoilValue(sevenDaysData);
  const getData = useFetchData();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  const dataJsx = dateData.map((item, key) => {
    let dayDifference = (((item.close - item.open) / item.open) * 100).toFixed(
      1
    );
    let openOfSeventhDate;
    let sevenDayDifference;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i]['_id'] === item.currency) {
        if (allData[i].data.length > 1) {
          openOfSeventhDate = isNaN(allData[i].data[1].Open)
            ? allData[i].data[1].Open.replace(/,/g, '')
            : allData[i].data[1].Open;
        } else {
          openOfSeventhDate = null;
        }
      }
    }
    if (openOfSeventhDate) {
      sevenDayDifference = (
        ((item.close - openOfSeventhDate) / openOfSeventhDate) *
        100
      ).toFixed(1);
    } else {
      sevenDayDifference = 'n/a';
    }

    return (
      <div className="display-row" key={key}>
        <h4 className="item--small">{key + 1}</h4>
        <h4 className="item">
          {item.currency[0].toUpperCase() + item.currency.substring(1)}
        </h4>
        <h4 className="item">&#36;{numberWithCommas(item.close)}</h4>
        <h4
          className={`item--small item--${dayDifference > 0 ? 'green' : 'red'}`}
        >
          {dayDifference}&#37;
        </h4>
        <h4
          className={`item--small item--${
            sevenDayDifference > 0 ? 'green' : 'red'
          }`}
        >
          {sevenDayDifference}&#37;
        </h4>
        <h4 className="item">&#36;{numberWithCommas(item.volume)}</h4>
        <h4 className="item">&#36;{numberWithCommas(item.marketCap)}</h4>
      </div>
    );
  });

  const onSubmit = (event) => {
    event.preventDefault();
    getData(date);
  };

  return (
    <StyledDiv>
      <form className="form" onSubmit={onSubmit}>
        <input
          className="form__input"
          type="date"
          min="2019-10-14"
          max="2019-12-04"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button className="form__btn">Search</button>
      </form>

      <div>
        {dateData.length > 0 ? (
          <h2 className="date">{dateData[0].date}</h2>
        ) : null}

        <DataSection>
          <ul className="title">
            <li className="item--small">
              <h4>#</h4>
            </li>
            <li className="item">
              <h4>Coin</h4>
            </li>
            <li className="item">
              <h4>Price (Close)</h4>
            </li>
            <li className="item--small">
              <h4>24h</h4>
            </li>
            <li className="item--small">
              <h4>7d</h4>
            </li>
            <li className="item">
              <h4>24h Volume</h4>
            </li>
            <li className="item">
              <h4>Market Cap&#x25BC;</h4>
            </li>
          </ul>
          {dataJsx}
        </DataSection>
      </div>
    </StyledDiv>
  );
};

export default CoinDisplay;
