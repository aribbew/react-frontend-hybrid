import React, { useState, useEffect } from "react";
import { TableAdmin } from "../";
import { map } from "lodash";
import { Button, FormControlLabel } from "@mui/material";
import { Checkbox } from "semantic-ui-react";
import { FiRefreshCw } from "react-icons/fi";
import "./TablesListAdmin.scss";

export function TablesListAdmin(props) {
  const { tables } = props;
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);
  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoreload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="table-container">
      <Button className="tables-list" onClick={onReload}>
        <FiRefreshCw className="icon" />
      </Button>
      <div className="reload-toggle">
        <FormControlLabel
          className="label-edit-toggle"
          label="Reload Automatico"
          control={
            <Checkbox
              toggle
              checked={autoReload}
              onChange={(_, data) => onCheckAutoreload(data.checked)}
            />
          }
        />
      </div>

      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
}
