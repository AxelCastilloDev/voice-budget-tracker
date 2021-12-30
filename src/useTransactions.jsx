import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);

  const filteredTransactions = transactions.filter((e) => e.type === title);
  const total = filteredTransactions.reduce(
    (acc, current) => (acc += current.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  filteredTransactions.forEach(t => {
      const category = categories.find(c => c.type === t.category) 

      if(category) category.amount += t.amount
  })

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [{
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.color),
    }],
    labels: filteredCategories.map((c) => c.type),
  };

  return { total, chartData };
};

export default useTransactions;
