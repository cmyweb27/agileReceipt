import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import useStore from "./store";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import {
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Button,
  Box,
  Radio,
  RadioGroup,
} from "@mui/material";
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  email: yup.string().email().required(),
  //   paymentType: yup.string().required(),
  //   cost: yup.number().required(),
});
function Receipt() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formHandler = async (data) => {
    console.log(data, "data");

    await axios
      .post(
        "https://5ph5259cx1.execute-api.eu-west-1.amazonaws.com/prod/paystack-api",
        data
      )
      .then((res) => {
        console.log(res, "success");
      })
      .catch((err) => err);
    // delete data.cost;
    // data.date = date;
    // data.time = time;

    // data.mode = mode;
    // data.membership = member;
    // data.value = price;

    // if (data.paymentType === "bankPayment") {
    //   axios
    //     .post(
    //       "https://ws8osh4cr1.execute-api.eu-west-1.amazonaws.com/second/secondtry",
    //       data
    //     )
    //     .then((res) => {
    //       if (res.data === "success") {
    //       }
    //     })
    //     .catch((err) => err);
    // }

    // if (data.paymentType === "cardPayment") {
    //   data.type = "Card Payment";
    //   console.log("in card payment");
    //   axios
    //     .post(
    //       //"https://ws8osh4cr1.execute-api.eu-west-1.amazonaws.com/test/conferenceRegistration",
    //       "https://pqn3elm16i.execute-api.eu-west-1.amazonaws.com/dev/flutter-payment",
    //       data
    //     )
    //     .then((res) => {
    //       console.log(res, "res");
    //       if (res.data.status === "success") {
    //         window.location.replace(res.data.data.link);
    //       }
    //     })
    //     .catch((err) => err);
    // }
  };
  return (
    <div>
      <form>
        {" "}
        <Grid container spacing={2} sx={{ pt: 0 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("firstName", {
                required: "Required",
              })}
              id="firstName"
              name="firstName"
              label="First name"
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
          <Grid item xs={12} sm={12}>
            <TextField
              required
              {...register("cost", {
                required: "Required",
              })}
              //defaultValue={price}
              // id="email"
              name="cost"
              label="price"
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
            <Typography>Add Attendee</Typography>
          </Button>
        </Box>
        {/* <Box sx={{ textAlign: "center", mt: 2 }}>
          {" "}
          <Button variant="contained" color="info">
            <Typography>cancel</Typography>
          </Button>
        </Box> */}
      </form>
    </div>
  );
}

export default Receipt;