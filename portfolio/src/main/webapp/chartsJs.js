// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Food');
  data.addColumn('number', 'percentage');
    data.addRows([
    ['pounded yam', 10],
    ['Goat meat', 20],
    ['Efo riro', 10],
    ['Beans', 20],
    ['Jollof rice', 15]
  ]);

  var piechart_options = {title:'Pie Chart: Favorite Food',
  width:700,
  height:500};
  var piechart = new google.visualization.PieChart(document.getElementById('piechart-container'));
  piechart.draw(data, piechart_options);

  var barchart_options = {title:'Bar chart: Favorite Food',
  width:700,
  height:500,
  legend: 'none'};
  var barchart = new google.visualization.BarChart(document.getElementById('barchart-container'));
  barchart.draw(data, barchart_options);
}

