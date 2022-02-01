import { useState } from "react";
import * as React from "react";
import axios from "axios";
import { Input, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box, Card } from "@mui/material";

const GroceryListItem = ({ item, token, onGrabList }) => {
  console.log(item);
  const [itemCount, setItemCount] = useState(item.item_quantity);

  const deleteItem = (item) => {
    axios
      .delete(
        `https://grocerease.herokuapp.com/grocerease/delete_item/${item.pk}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      )
      .then(() => {
        console.log("here");
        onGrabList();
      });
  };

  const handleUpdateQuantity = (event) => {
    axios.patch(
      `https://grocerease.herokuapp.com/grocerease/item_detail/${item.pk}/`,
      { item_quantity: itemCount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
  };

  return (
    <Box
      key={item.name}
      sx={{
        display: "flex",
        color: "#FFF8F0",
        padding: 0,
        marginLeft: 1.3,
        "& > *": { border: "1px solid black", px: 2, background: "#EEB61B" },
        "& *": { ml: 0, py: "3px", color: "#FFF8F0" },
      }}
    >
      <Box sx={{ width: "8rem" }} scope="row">
        {item.name}
      </Box>
      <Box sx={{ width: "4rem" }}>
        <Input
          value={itemCount}
          onChange={(event) => setItemCount(event.target.value)}
          onBlur={handleUpdateQuantity}
          sx={{ width: "2rem", textAlign: "center", color: "#FFF8F0" }}
        />
      </Box>
      <Box sx={{ width: "8rem" }}>{item.choices}</Box>
      <Box sx={{ width: "3.5rem" }} scope="row" align="right">
        <IconButton
          onClick={(event) => {
            event.preventDefault();
            deleteItem(item);
          }}
        >
          <DeleteIcon sx={{ fontSize: "20px", p: 0, m: 0 }} />
        </IconButton>
      </Box>
    </Box>
    // <TableRow
    //   key={item.name}
    //   sx={{
    //     background: "#EEB61B",
    //     color: "#FFF8F0",
    //     //height: "15px",
    //     padding: 0,
    //     "& td": { border: "1px solid black", height: "1px !important" },
    //     "& * *": { m: 0, py: "3px", color: "#FFF8F0" },
    //   }}
    // >
    //   <TableCell sx={{ width: "14rem" }} scope="row">
    //     {item.name}
    //   </TableCell>
    //   <TableCell scope="row">
    //     <Input
    //       value={itemCount}
    //       onChange={(event) => setItemCount(event.target.value)}
    //       onBlur={handleUpdateQuantity}
    //       sx={{ maxWidth: "2rem", textAlign: "center" }}
    //     />
    //   </TableCell>
    //   <TableCell sx={{ width: "10rem" }}>{item.choices}</TableCell>

    //   <TableCell
    //     sx={{ width: "4rem", maxHeight: " 2rem" }}
    //     scope="row"
    //     align="right"
    //   >
    //     <IconButton
    //       onClick={(event) => {
    //         event.preventDefault();
    //         deleteItem(item);
    //       }}
    //     >
    //       <DeleteIcon sx={{ fontSize: "20px", p: 0, m: 0 }} />
    //     </IconButton>
    //   </TableCell>
    // </TableRow>
  );
};

export default GroceryListItem;
