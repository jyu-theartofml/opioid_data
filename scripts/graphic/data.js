
/**
 *
 * DATA SOURCE:  http://www.census.gov/foreign-trade/statistics/country/
 *
 */

function fetchData() {
    d3.csv("drate_unemp_merged.csv", function(csv) {

        var normalized=[];

        for (var i=0; i < csv.length; i++)  {
            var row=csv[i];

            for (var y=0; y < 11; y++) {
                row.year= +row.year,
                row.death_rate = +row.death_rate,
                row.unemployment_rate= +row.unemployment_rate,
                row.US_death_rate = +row.US_death_rate,
                row.US_unemployment_rate = +row.US_unemployment_rate,
                normalized.push(row);

            }
        }

        statesGrouped = d3.nest()
            .key(function(d) { return d.year; })
            .entries(normalized);

        //get death rate and unemploytment for each year

        // grouped by length of years
        for (var y=0; y < statesGrouped.length; y++) {
            var yearGroup=statesGrouped[y];
            for (var c=0; c < yearGroup.values.length; c++) {
                 var state=yearGroup.values[c];
                 numDeath =  Number(state.US_death_rate); //national death rate for that year
                 numUnemp = Number(state.US_unemployment_rate); //national unemployment rate for that year

                }

            yearlyDeaths.push(numDeath);
            yearlyUnemp.push(numUnemp);
        //console.log("drate " + String(yearlyDeaths));
          }

        //Start running
        run();
        refreshIntervalId = setInterval(run, delay);
        // run();

    });

}
