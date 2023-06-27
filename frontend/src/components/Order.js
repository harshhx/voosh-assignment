import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import axios from "axios";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

function Modal({ open, handleClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(name, price, mobile);
    // Reset form fields
    setName("");
    setPrice("");
    setMobile("");
    handleClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#fff",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="button"
              onClick={handleClose}
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Order() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/order", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.allOrders);
        if (res?.data?.allOrders) {
          setData(res.data.allOrders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Your Orders
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Best Ecommerce to place and track your orders
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ marginTop: 20 }}
        >
          Add Order
        </Button>
        {openModal && <Modal open={openModal} handleClose={handleCloseModal} />}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        {data && (
          <Grid container spacing={5} alignItems="flex-end">
            {data.map((data) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={data._id} xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={data.itemName}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        ${data.totalAmount}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" align="center">
                      {data?.mobile}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Order;
