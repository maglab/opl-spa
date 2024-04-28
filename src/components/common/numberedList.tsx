import {
  List,
  ListItemButton,
  ListItemButtonProps,
  Typography,
} from "@mui/material";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";
import StandardStack from "./standardStack";

interface NumberedListItemProps extends ListItemButtonProps {
  key: string;
  item: React.ReactNode;
}

interface NumberedListProps {
  header?: string | React.ReactNode;
  items: Array<NumberedListItemProps>;
}

export default function NumberedList({ header, items }: NumberedListProps) {
  const theme = useExtendedTheme();

  return (
    <StandardStack>
      {typeof header === "string" ? (
        <Typography pl={theme.layout.minorSpacing} variant="h6">
          {header}
        </Typography>
      ) : (
        header
      )}
      <List>
        {items.map(({ key, item, ...props }, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ListItemButton key={key} {...props}>
            <StandardStack minor direction="row" alignItems="baseline">
              <Typography>{`${index + 1}.`}</Typography>
              {item}
            </StandardStack>
          </ListItemButton>
        ))}
      </List>
    </StandardStack>
  );
}

NumberedList.defaultProps = {
  header: undefined,
};
