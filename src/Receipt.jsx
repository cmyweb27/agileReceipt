import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { Typography, TextField, Grid, Button, Box } from "@mui/material";
const schema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  email: yup.string().email().required(),
  mode: yup.string().required(),
  cost: yup.number().required(),
});
function Receipt() {
  const [sent, setSent] = useState(false);
  const handleSent = () => {
    setSent(true);
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let current = new Date();
  let date = current.toDateString();
  let time = current.toTimeString().split(" ")[0];

  const formHandler = async (data) => {
    console.log(data, "data");
    // delete data.cost;
    data.date = date;
    data.time = time;

    // data.mode = mode;
    // data.membership = member;
    await axios
      .post(
        "https://5ph5259cx1.execute-api.eu-west-1.amazonaws.com/prod/paystack-api",
        data
      )
      .then((res) => {
        console.log(res, "success");
        handleSent();
      })
      .catch((err) => err);
  };
  return (
    <div>
      <form>
        {" "}
        <Grid container spacing={2} sx={{ pt: 0 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("name", {
                required: "Required",
              })}
              id="name"
              name="name"
              label="name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
            {errors.firstName && (
              <Typography variant="caption" color="#FF0000">
                {errors.firstName?.type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("lastName", {
                required: "Required",
              })}
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
            {errors.lastName && (
              <Typography variant="caption" color="#FF0000">
                {errors.lastName?.type}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("phoneNumber", {
                required: "Required",
              })}
              id="phonenumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              variant="standard"
            />
            {errors.phoneNumber && (
              <Typography variant="caption" color="#FF0000">
                {errors.phoneNumber?.type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("email", {
                required: "Required",
              })}
              id="email"
              name="email"
              label="Email Address"
              fullWidth
              autoComplete="email adress"
              variant="standard"
            />
            {errors.email && (
              <Typography variant="caption" color="#FF0000">
                {errors.email?.type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("cost", {
                required: "Required",
              })}
              //defaultValue={price}
              // id="email"
              name="cost"
              label="Amount Paid"
              fullWidth
              // autoComplete="email adress"
              variant="standard"
            />

            {errors.email && (
              <Typography variant="caption" color="#FF0000">
                {errors.email?.type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("mode", {
                required: "Required",
              })}
              //defaultValue={price}
              // id="email"
              name="mode"
              label="Description"
              fullWidth
              // autoComplete="email adress"
              variant="standard"
            />

            {errors.mode && (
              <Typography variant="caption" color="#FF0000">
                {errors.mode?.type}
              </Typography>
            )}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <RadioGroup name="paymentType">
              {" "}
              <FormControlLabel
                value="bankPayment"
                control={<Radio />}
                label="Pay Into Bank Account"
                color="primary"
                required
                {...register("paymentType", {
                  required: "Required",
                })}
              />
              <FormControlLabel
                value="cardPayment"
                control={<Radio />}
                label="Pay With Card"
                color="primary"
                required
                {...register("paymentType", {
                  required: "Required",
                })}
                disabled
              />
            </RadioGroup>
            {errors.paymentType && (
              <Typography variant="caption" color="#FF0000">
                {errors.paymentType?.type}
              </Typography>
            )}
          </Grid> */}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          {" "}
          <Button variant="contained" onClick={handleSubmit(formHandler)}>
            <Typography variant="subtitle2">Send Receipt</Typography>
          </Button>
        </Box>
        {/* <Box sx={{ textAlign: "center", mt: 2 }}>
          {" "}
          <Button variant="contained" color="info">
            <Typography>cancel</Typography>
          </Button>
        </Box> */}
      </form>

      {sent && (
        <Typography variant="h4" textAlign="center">
          Mail has been sent
        </Typography>
      )}
    </div>
  );
}

export default Receipt;
