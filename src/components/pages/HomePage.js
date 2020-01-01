import React from "react";
import CustomAppBar from "../widgets/CustomAppBar";
import CAPIHelper from "../utils/CAPIHelper";
import Box from "@material-ui/core/Box";
import LoopRender from "../utils/LoopRender";
import axios from "axios";

function HomePage() {
  // In Function component u have the freedom to execute functions and hooks within your main functions.
  const [title] = React.useState(
    "Advance Use of UseEffect and UseState in Function Components"
  );
  const [item, setItem] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);

  // The boilerplate code for useEffect is...
  // useEffect(() => {
  //   codes you want to run. Normally is for fetching and updating props value into state.
  //   return () => {
  //     cleanup code after component is disposed e.g. deleteChatConnection to free up memory etc.
  //   };
  // }, [stateYouWantToWatch])

  React.useEffect(() => {
    if (refresh) {
      // You can reduce timeout to see error in effect.
      const timeOutInMiliseconds = 2500;
      const apiHelper = new CAPIHelper();
      apiHelper.type = "default";
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
            console.log("axios task complete!");
            setRefresh(false);
          });
      };
      fetchData();
    }
    // by adding [] empty array useEffect becomes a componentDidMount behaviour
    // which executes once.
    // If you want a state to be trigger a refresh again, pass in state name inside [] instead.
    // in this case, I use refresh as a command.
  }, [refresh]);

  const handleMenuClick = event => {
    // Watch this handleMenuClick how it is assigned from props.
    // It catches a event bubbled from the child CloseMenu event.

    switch (event.currentTarget.getAttribute("id")) {
      case "0":
        // By toggling refresh state will trigger the useEffect again,
        // because we use [refresh] and it is watching that particular state.
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

  return (
    <Box>
      <CustomAppBar
        title={title}
        loading={loaded}
        error={snackbar}
        handleMenuClick={handleMenuClick}
      />
      <Box p={2}>
        <LoopRender data={item}></LoopRender>
      </Box>
    </Box>
  );
}

export default HomePage;
