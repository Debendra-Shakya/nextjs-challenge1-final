import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { trackError } from "../../store/topTrackSlice";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const TopTrack = () => {
  const isLoading = useSelector((state) => state?.topTrack?.isLoading);
  const error = useSelector((state) => state?.topTrack?.error);
  const value = useSelector((state) => state?.topTrack?.data);
  const country = useSelector((state) => state?.form?.country);
  const topNumber = useSelector((state) => state?.form?.topNumber);

  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: `Top ${topNumber} tracks in ${country.toUpperCase()}`,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      categories: value.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: "Total listeners",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.f}",
        },
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.f}</b> of total<br/>',
    },
    series: [
      {
        colorByPoint: true,
        data: value.map((item) => {
          return { name: item.name, y: Number(item.listeners) };
        }),
      },
    ],
  });

  useEffect(() => {
    window.Highcharts = Highcharts;
    setOptions({
      ...options,
      title: {
        text: `Top ${topNumber} tracks in ${country.toUpperCase()}`,
      },
      xAxis: {
        categories: value.map((item) => item.name),
      },
      series: [
        {
          colorByPoint: true,
          data: value.map((item) => {
            return { name: item.name, y: Number(item.listeners) };
          }),
        },
      ],
    });
  }, [value]);

  return (
    <div>
      {isLoading ? (
        //   "isloading"
        <Spinner />
      ) : error ? (
        <h1 style={{ textAlign: "center" }}>{error}</h1>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
      {/* <div>{JSON.stringify(value)}</div> */}
    </div>
  );
};

export default TopTrack;
