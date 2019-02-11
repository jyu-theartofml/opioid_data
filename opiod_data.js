
d3.csv("summary_data/type_counts.csv", function(csv) {

       data_selection=[];

       for (var i=0; i < csv.length; i++)  {
            var record=csv[i];

            record.Heroin = +record.Heroin,
            record.Methadone = +record.Methadone,
            record.Natural = +record.Natural,
            record.Synthetic = +record.Synthetic,
            data_selection.push(record);
          };


      stateGrouping = d3.nest()
          .key(function(d) { return d.State; })
          .entries(data_selection)
      console.log(stateGrouping[0])

      var dropdownChange = function() {
            var newCereal = d3.select(this).property('value'),
                newData   = statesGrouping[newCereal];
                console.log(newCereal);
                updateBars(newData);
                      };
      var state_names= ['Arizona','Colorado','Conneticut'];
      var dropdown = d3.select("#main")
                       .insert("select")
                       .on("change", dropdownChange);

      dropdown.selectAll("option")
              .data(state_names)
              .enter().append("option")
              .attr("value", function (d) { return d; console.log(d);})
              .text(function (d) {
                              return d[0] + d.slice(1,d.length); // capitalize 1st letter
                          });

    // use string  value to find index
  var name1= Object.keys(stateGrouping)
  function isName (element) {
            return element ='Arizona';
            }
  name_indx=name1.findIndex(isName)
  //console.log(name_indx);
 //console.log(stateGrouping[name_indx]);


    }
)
