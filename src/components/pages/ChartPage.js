import React from "react";
import CustomAppBar from "../widgets/CustomAppBar";
import CAPIHelper from "../utils/CAPIHelper";
import Box from "@material-ui/core/Box";
import { Chart } from "primereact/chart";
// chart is based on the popular chart.js you need to npm that as well.
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { randomColorHelper } from "../utils/RandomColorHelper";

function ChartPage() {
  // In Function component u have the freedom to execute functions and hooks within your main functions.
  const [title] = React.useState("Function Component with Chart");
  const [item, setItem] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);

  React.useEffect(() => {
    if (refresh) {
      // You can reduce timeout to see error in effect.
      const timeOutInMiliseconds = 2000;
      const apiHelper = new CAPIHelper();
      apiHelper.type = "population";
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
    // Watch this handleMenuClick how it is assigned from props.
    // It catches a event bubbled from the child CloseMenu event.

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
  const processItem = data => {
    const allCountries = data.map(item => {
      return item.Name;
    });
    const allPopulations = data.map(item => {
      return item.Population;
    });
    const allColors = randomColorHelper(allPopulations);
    const graphData = {
      labels: allCountries,
      position: "left",
      datasets: [
        {
          label: "Country Population 2018",
          backgroundColor: allColors,
          data: allPopulations
        }
      ]
    };

    return graphData;
  };
  const graphOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          // data for manipulation
          return data.datasets[tooltipItem.datasetIndex].data[
            tooltipItem.index
          ].toLocaleString();
        }
      }
    },
    pan: {
      enabled: true,
      mode: "x"
    },
    zoom: {
      enabled: true,
      mode: "x"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return value.toLocaleString();
            }
          }
        }
      ]
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
      {/* if there's item there's show! */}
      {item && (
        <Box p={2}>
          <Chart type="bar" data={processItem(item)} options={graphOptions} />
        </Box>
      )}
    </Box>
  );
}

export default ChartPage;
