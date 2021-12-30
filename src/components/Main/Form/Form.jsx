import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useSpeechContext } from "@speechly/react-client";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: new Date().toISOString().split("T")[0],
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setformData] = useState(initialState);
  const {  segment } = useSpeechContext()

  const createTransaction = () => {
    if (!formData.category || !formData.amount || !formData.date) return;
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    addTransaction(transaction);
    setformData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setformData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setformData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setformData(initialState);
      }
      segment.entities.forEach((e) => {
        switch (e.type) {
          case "amount":
            setformData({ ...formData, amount: e.value });
            break;
          case "category":
            setformData({ ...formData, category: e.value[0]+e.value.slice(1).toLowerCase() });
            break;
          case "date":
            setformData({ ...formData, date: e.value });
            break;

          default:
            break;
        }
      });
      if(segment.isFinal && formData.category && formData.amount && formData.date) { createTransaction()}
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment?.words.map((w) => w.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setformData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setformData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((e) => (
              <MenuItem key={e.type} value={e.type}>
                {e.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setformData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          value={formData.date}
          onChange={(e) => setformData({ ...formData, date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          type="date"
          label="Date"
          fullWidth
        />
      </Grid>
      <Button
        onClick={createTransaction}
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
      >
        Create
      </Button>
     
    </Grid>
    
  );
};

export default Form;
