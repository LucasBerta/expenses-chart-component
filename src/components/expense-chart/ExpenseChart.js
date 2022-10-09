import "./ExpenseChart.scss";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";

function ExpenseChart({
  balance = 0,
  spentThisMonth = 0,
  differenceFromLastMonth = 0,
  spendingLast7Days = [],
}) {
  const [highestSpentAmount, setHighestSpentAmount] = useState(0);

  useEffect(() => {
    setHighestSpentAmount(
      Math.max(...spendingLast7Days.map((item) => item.amount))
    );
  }, [spendingLast7Days]);

  function getDifferenceFromLastMonth() {
    const sign = Math.sign(differenceFromLastMonth);
    if (sign > 0) return `+${differenceFromLastMonth}%`;
    if (sign < 0) return `-${differenceFromLastMonth}%`;
    return `${differenceFromLastMonth}%`;
  }

  function getWeekday(index) {
    if (index === 0) return "mon";
    if (index === 1) return "tue";
    if (index === 2) return "wed";
    if (index === 3) return "thu";
    if (index === 4) return "fri";
    if (index === 5) return "sat";
    if (index === 6) return "sun";
  }

  function getItemSpentPercentage(item) {
    if (!highestSpentAmount) return 0;
    return item.amount / highestSpentAmount;
  }

  function isCurrentDay(index) {
    let currentDay = new Date().getDay() - 1; // Day on data.json starts on Monday
    if (currentDay === -1) {
      currentDay = 6;
    }
    return currentDay === index;
  }

  return (
    <div className="expense-container">
      <div className="expense__balance-container">
        <div>
          <h3 className="expense--balance-title">My balance</h3>
          <span className="expense--balance-amount">${balance}</span>
        </div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="expense__chart-container">
        <h1 className="expense__chart--title">Spending - Last 7 days</h1>
        <div className="expense__chart-data">
          {spendingLast7Days.map((item, index) => (
            <div key={item.id} className="expense__chart-data__item-container">
              <div
                className={`expense__chart-data--item ${
                  isCurrentDay(index) ? "current-day" : ""
                }`.trim()}
                style={{ flexGrow: getItemSpentPercentage(item) }}
              >
                <span className="expense__chart-data--item--tooltip">
                  ${item.amount}
                </span>
              </div>
              <h2 className="expense__chart-data--item-label">
                {getWeekday(index)}
              </h2>
            </div>
          ))}
        </div>
        <div className="expense__chart__footer">
          <div className="expense__chart__footer--spent__container">
            <h2>Total this month</h2>
            <span className="expense__chart__footer--spent-this-month">
              ${spentThisMonth}
            </span>
          </div>
          <div className="expense__chart__footer--difference__container">
            <span className="expense__chart__footer--difference-last-month">
              {getDifferenceFromLastMonth()}
            </span>
            <h2>from last month</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
