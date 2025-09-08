import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Tooltip = (props) => {
  return (
    <List>
      {props.tooltip.map((item, ind) => (
        <ListItem sx={{ py: 0 }}>
          <ListItemButton sx={{ px: 0 }}>
            <ListItemIcon
              sx={{
                "& svg": {
                  fontSize: "1rem",
                },
                minWidth: "calc(100% - 75%) ",
              }}
            >
              {item[1]}
            </ListItemIcon>

            <ListItemText primary={item[0]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Tooltip;
