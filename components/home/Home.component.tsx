import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import FileCopyTwoTone from "@mui/icons-material/FileCopyTwoTone";
import Box from "@mui/material/Box";
import { QRCodeSVG } from "qrcode.react";
import theme from "../../theme/DarkTheme";
import { GetInfoNode, NodeAddress } from "../../model/GetInfoNode";
import { useState } from "react";
import { NodeTable } from "../tableNodes/NodeTable.component";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContentWrapper from "../notification/Notification.component";

const PREFIX = "Home";

const classes = {
  root: `${PREFIX}-root`,
  input: `${PREFIX}-input`,
};

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.input}`]: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid " + theme.palette.primary.light,
    padding: "20px 26px 20px 12px",
    marginTop: theme.spacing(2),
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.divider,
      boxShadow: "0 0 0 0.2rem " + theme.palette.divider,
    },
  },
}));

const BootstrapInput = InputBase;

type ParentProps = {
  nodeInfo: GetInfoNode | null;
  show: (visible: boolean, message: string) => void;
};

export default function HomeView({ nodeInfo, show }: ParentProps) {
  let addr: NodeAddress =
    nodeInfo!.address.length > 0 ? nodeInfo!.address[0] : nodeInfo!.binding[0];
  const [selectAddr, setSelectAddr] = useState(addr);
  let mapAddress = new Map();
  for (let i = 0; i < nodeInfo!.address.length; i++) {
    let addr = nodeInfo!.address[i];
    mapAddress.set(addr.type, addr);
  }
  if (nodeInfo === null) return <>NodeInfo null</>;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(
      `${nodeInfo!.id}@${selectAddr.address}:${selectAddr.port}`
    );
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <StyledGrid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardContent
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box component="span" m={1}>
              <Chip
                label={nodeInfo!.alias}
                style={{
                  background: "#" + nodeInfo!.color,
                }}
              />
            </Box>
          </Grid>
          <Grid>
            <QRCodeSVG
              value={`${nodeInfo!.id}@${selectAddr.address}:${selectAddr.port}`}
              size={300}
              level="H"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl
              variant="outlined"
              style={{
                margin: theme.spacing(2),
                minWidth: 230,
                textAlign: "center",
              }}
            >
              <InputLabel id="address-select-outlined-label">
                Address
              </InputLabel>
              <Select
                labelId="address-select-outlined-label"
                id="address-outlined-select"
                value={selectAddr.type}
                onChange={(event: any) =>
                  setSelectAddr(mapAddress.get(event.target.value))
                }
                label="Address"
                input={
                  <BootstrapInput
                    classes={{
                      root: classes.root,
                      input: classes.input,
                    }}
                  />
                }
              >
                {nodeInfo!.address.map((address, index) => {
                  return (
                    <MenuItem key={index} value={address.type}>
                      {address.type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <IconButton onClick={handleClick} size="large">
              <FileCopyTwoTone />
            </IconButton>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              autoHideDuration={6000}
              onClick={handleClose}
              onClose={() => setOpen(false)}
            >
              <Box>
                <SnackbarContentWrapper
                  onClose={handleClose}
                  variant="success"
                  message="Address successfully copied to clipboard"
                />
              </Box>
            </Snackbar>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <NodeTable show={show} />
      </Grid>
    </StyledGrid>
  );
}
