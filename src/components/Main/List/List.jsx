import React, { useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";

const List = () => {
  const classes = useStyles();
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);
  

  // const transactions = [
  //   {
  //     id: 1,
  //     type: "Income",
  //     category: "Salary",
  //     amount: 100,
  //     date: "Mon Dec 20 2021",
  //   },
  //   {
  //     id: 2,
  //     type: "Expense",
  //     category: "Rent",
  //     amount: 20,
  //     date: "Mon Dec 22 2021",
  //   },
  //   {
  //     id: 3,
  //     type: "Income",
  //     category: "Business",
  //     amount: 50,
  //     date: "Mon Dec 23 2021",
  //   },
  // ];

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((e) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={e.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  e.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={e.category}
              secondary={`$${e.amount} - ${e.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(e.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
