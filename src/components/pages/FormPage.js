import React from "react";
import CustomAppBar from "../widgets/CustomAppBar";
import CAPIHelper from "../utils/CAPIHelper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./../../App.css";

import axios from "axios";
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";

function FormPage() {
  // In Function component u have the freedom to execute functions and hooks within your main functions.
  const [title] = React.useState("Function Component with Form");
  const [item, setItem] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  const generateToday = () => {
    return moment(new Date()).format("YYYY-MM-DD");
  };
  const initialFormState = {
    dob: generateToday(),
    name: "",
    email: "",
    country: "Malaysia"
  };
  const [formObject, setFormObject] = React.useState(initialFormState);
  // Because simpleValidator cannot be Reference multiple time.
  // It has to be used as a singleton or in constructor, remember singleton?
  // In our case we use React.useRef to stop it from re-reference again when the
  // whole function is refreshed.
  const simpleValidator = React.useRef(
    new SimpleReactValidator({ element: message => <label>{message}</label> })
  );

  React.useEffect(() => {
    if (refresh) {
      // You can reduce timeout to see error in effect.
      const timeOutInMiliseconds = 2500;
      const apiHelper = new CAPIHelper();
      apiHelper.type = "phonecode";
      setFormObject({
        dob: generateToday(),
        name: "",
        email: "",
        country: "Malaysia"
      });
      setLoaded(true);
      setItem([]);

      const fetchData = async () => {
        await axios
          .get(apiHelper.constructor.googleSheetURL(), {
            timeout: timeOutInMiliseconds
          })
          .then(function(response) {
            setItem(response.data.Result);
            setLoaded(false);
          })
          .catch(function(error) {
            setSnackbar(
              "Error in communicating to server. Refresh and try again"
            );
            setLoaded(false);
          })
          .finally(function() {
            setRefresh(false);
          });
      };
      fetchData();
    }
  }, [refresh]);

  const handleMenuClick = event => {
    switch (event.currentTarget.getAttribute("id")) {
      case "0":
        setRefresh(true);
        break;
      case "1":
        setSnackbar(title);
        break;
      default:
        setSnackbar(title);
        break;
    }
  };
  const validationCallBack = type => {
    let resultReturn = false;
    switch (type) {
      case "Email":
        resultReturn = simpleValidator.current.message(
          "email",
          formObject.email,
          "required|email"
        );
        break;
      case "Name":
        resultReturn = simpleValidator.current.message(
          "Full Name",
          formObject.name,
          "required|string|min:2"
        );
        break;
      case "Dob":
        resultReturn = simpleValidator.current.message(
          "Birthdate",
          formObject.dob,
          "required"
        );
        break;
      case "Contry":
        resultReturn = simpleValidator.current.message(
          "Country",
          formObject.country,
          "required"
        );
        break;
      default:
        resultReturn = false;
        break;
    }
    return resultReturn;
  };
  const handleSnackBarClose = event => {
    setSnackbar(false);
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    if (simpleValidator.current.allValid()) {
      setSnackbar("Congratulation, registration details is submitted!");
      let payLoad = {
        email: formObject.email,
        nric: formObject.nric,
        name: formObject.name,
        dob: formObject.dob,
        country: formObject.country
      };
      console.log(payLoad);
    } else {
      setSnackbar("Error, some fields are invalid or required");
      simpleValidator.current.showMessages();
    }
  };
  const handleFormChange = async event => {
    event.persist();
    await setFormObject({
      ...formObject,
      [event.target.id]: event.target.value
    });
  };
  const handleBlur = event => {
    simpleValidator.current.showMessageFor(event.target.id.toString());
  };

  return (
    <Box>
      <CustomAppBar
        title={title}
        loading={loaded}
        error={snackbar}
        handleSnackBarClose={handleSnackBarClose}
        handleMenuClick={handleMenuClick}
      />
      <Box p={2.5}>
        <h3>React Registration Form with React Simple Validation</h3>
        <p>
          Welcome to React registration form , in this form we will practise how
          validation is done, together with some Material UI components.
        </p>
        <form
          noValidate
          autoComplete="off"
          className="customForm"
          onSubmit={handleFormSubmit}
        >
          {/* Remember use onBlur to trigger because, in Function Component, there is no this.forceUpdate method which only works in class Component */}
          <TextField
            id="name"
            label="Full Name"
            error={Boolean(validationCallBack("Name"))}
            helperText={validationCallBack("Name")}
            inputProps={{
              maxLength: 150,
              autoComplete: "new-password"
            }}
            onChange={handleFormChange}
            onBlur={handleBlur}
            value={formObject.name}
            placeholder="Your Full Name..."
            className="customInput"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            error={Boolean(validationCallBack("Email"))}
            helperText={validationCallBack("Email")}
            inputProps={{
              maxLength: 150,
              autoComplete: "new-password"
            }}
            onChange={handleFormChange}
            onBlur={handleBlur}
            value={formObject.email}
            placeholder="Your Email..."
            className="customInput"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            id="dob"
            label="Birthday"
            type="date"
            className="customInput"
            onChange={handleFormChange}
            onBlur={handleBlur}
            value={formObject.dob}
            error={Boolean(validationCallBack("Dob"))}
            helperText={validationCallBack("Dob")}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="country"
            select
            label="Nationality"
            className="customInput"
            value={formObject.country}
            onChange={handleFormChange}
            error={Boolean(validationCallBack("Country"))}
            helperText={validationCallBack("Country")}
            fullWidth
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
          >
            {item.map(option => (
              <option key={option.Code} value={option.Name}>
                {option.Name}
              </option>
            ))}
          </TextField>
          <Box mt={2}>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default FormPage;
