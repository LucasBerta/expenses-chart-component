import "./App.scss";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import data from "./assets/data/data.json";

function App() {
  return (
    <div className="app">
      <ExpenseChart
        balance={data.balance}
        spentThisMonth={data.spentThisMonth}
        differenceFromLastMonth={data.differenceFromLastMonth}
        spendingLast7Days={data.spendingLast7Days}
      />
    </div>
  );
}

export default App;
