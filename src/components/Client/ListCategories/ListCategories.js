import React from "react";
import { map } from "lodash";
// import { Image } from "semantic-ui-react";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./ListCategories.scss";
export function ListCategories(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { categories } = props;
  const goToCategory = (id) => {
    navigate(`${location.pathname}/${id}`);
  };
  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <Box key={category.id} onClick={() => goToCategory(category.id)}>
          <h2>{category.title}</h2>
        </Box>
      ))}
    </div>
  );
}
