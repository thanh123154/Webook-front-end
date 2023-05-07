import { Box, type ColorScheme, Container, Title } from "@mantine/core";
import React, { useState } from "react";
import themeDark from "@amcharts/amcharts5/themes/Dark";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLocalStorage } from "@mantine/hooks";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { type StaticType, type TotalStatic } from "../../types";

const Statistic = () => {
  const [theme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  const { data: session } = useSession();

  const {
    data: dataStatic,
    isLoading,
    refetch,
  } = api.user.getStaticByHostId.useQuery(
    { id: session?.user?.id || "" },
    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  const [dataTest, setDataTest] = useState<StaticType[]>();
  const [dataTotalStatic, setDataTotalStatic] = useState<TotalStatic[]>([
    {
      country: "January",
      value: 0,
    },
    {
      country: "February",
      value: 0,
    },
    {
      country: "March",
      value: 0,
    },
    {
      country: "April",
      value: 0,
    },
    {
      country: "May",
      value: 0,
    },
    {
      country: "June",
      value: 0,
    },
    {
      country: "July",
      value: 0,
    },
    {
      country: "August",
      value: 0,
    },
    {
      country: "September",
      value: 0,
    },
    {
      country: "November ",
      value: 0,
    },
    {
      country: "December",
      value: 0,
    },
  ]);

  function calculateTotalByMonth(
    data: StaticType[]
  ): { country: string; value: number }[] {
    const totalsByMonth: { [month: string]: number } = {};

    data.forEach((item) => {
      item.listing.forEach((listing) => {
        listing.booking.forEach((booking) => {
          const month = new Date(booking.createdAt).toLocaleString("en-US", {
            month: "long",
          });
          if (totalsByMonth[month]) {
            totalsByMonth[month] += booking.total;
          } else {
            totalsByMonth[month] = booking.total;
          }
        });
      });
    });

    const result: { country: string; value: number }[] = [];
    Object.keys(totalsByMonth).forEach((month) => {
      const value = totalsByMonth[month];
      if (typeof value !== "undefined") {
        result.push({ country: month, value });
      }
    });
    return result;
  }
  React.useEffect(() => {
    console.log(dataStatic, "data ra r");

    if (dataStatic) {
      const newDataTest: StaticType[] = dataStatic.map((item) => ({
        listing: item.listings.map((listing) => ({
          booking: listing.booking.map((booking) => ({
            total: booking.total,
            createdAt: booking.createdAt,
          })),
        })),
      }));
      // setDataTest(newDataTest);
      const total = calculateTotalByMonth(newDataTest);
      // setDataTotalStatic(total);
      console.log(total, "tong tien"); // Kết quả: 4227126
      // console.log(dataTest, "kq");

      const root = am5.Root.new("chartdiv");
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      if (theme === "dark") {
        root.setThemes([themeDark.new(root)]);
      } else {
        root.setThemes([am5themes_Animated.new(root)]);
      }

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      xRenderer.grid.template.setAll({
        location: 1,
      });

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          sequencedInterpolation: true,
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });

      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      // Set data

      xAxis.data.setAll(total);
      series.data.setAll(total);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      void series.appear(1000);
      void chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [theme, dataStatic]);

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      <Title mb={50}>Statistics 2023</Title>
      <Box h={500} id="chartdiv"></Box>
    </Container>
  );
};

export default Statistic;
