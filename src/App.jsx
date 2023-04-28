import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";

function App() {
  const [stockMarketsprices, setstockMarketsprice] = useState([])
  const [stockMarketsChart, setstockMarketsCharts] = useState({
    
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  })

  useEffect(() => {
    fetch('https://colorful-sari-slug.cyclic.app/stockMarkets_price')
    .then(res => res.json())
    .then(result => {
      console.log(result)
      setstockMarketsprice(result)
    })

    fetch('https://colorful-sari-slug.cyclic.app/stockMarkets_price_chart')
    .then(res => res.json())
    .then(result => {
      console.log(result)
      setstockMarketsCharts({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: result.Companyname
          }
        },
        series: [
          {
            name: "ราคา",
            data: result.Price
          }
        ]
      })
    })

  
  },[])
  return (
    <div>
      <h1>ณัฐนันท์ เพ็ชรฟัก 6303231</h1>
      <ul>
        {stockMarketsprices.map(stockMarket => (
          <li key={stockMarket.id}>
            {stockMarket.Companyname} {stockMarket.Price}
          </li>
        ))}
      </ul>
      <Chart
        options={stockMarketsChart.options}
        series={stockMarketsChart.series}
        type='bar'
        width='500'
      />
    </div>
  )
}


  export default App

