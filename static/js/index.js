function gdp_growth(){
d3.json('/highest_gdp_growth', function(error, data){
    if (error) return console.warn(error);

    var country = data[0]['country_name']
    var gdp_growth =data[0]['GDP_growth_percent']
    console.log(gdp_growth)
    console.log(country)
    var link = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"

    var map = L.map('map2').setView([0,0], 2);
      
      // Adding tile layer
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?' +
          'access_token=pk.eyJ1IjoiZHlsYnVyZ2VyMiIsImEiOiJjamh0dzZldGEwM25sM2trdDlkenBxam1tIn0.ln0RIf4CScMbTq-eYKKWyg',
      ).addTo(map);
    
      d3.json(link, function(data) {
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data.features, {
            style: function(feature) {
              return {
                color: 'white',
                fillColor: chooseColor(feature.properties.ADMIN),
                fillOpacity: 0.5,
                weight: 1.5,
                };
            },
            onEachFeature: function(feature, layer){
              for(var i = 0; i <= country.length; i++){
                if (country[i] === feature.properties.ADMIN){
                  layer.bindPopup(feature.properties.ADMIN + "<p>"+ gdp_growth[i]+"%");
                }
              }
            }  
            }).addTo(map)
      }); 
      function chooseColor(admin){
        var col= 'yellow'
        country.forEach(function(cnt){
            if (cnt === admin){
               col =  '#8B0000';
            }
        }) 
        return col;
    }       
})
}

function highest_gdp(){
    d3.json('/top_gdp_countries', function(error, data){
        if (error) return console.warn(error);
    
        var country = data[0]['country_name']
        var gdp =data[0]['Average_GDP']
       
        var link = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    
        var map = L.map('map1').setView([0,0], 2);
          
          // Adding tile layer
          L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?' +
              'access_token=pk.eyJ1IjoiZHlsYnVyZ2VyMiIsImEiOiJjamh0dzZldGEwM25sM2trdDlkenBxam1tIn0.ln0RIf4CScMbTq-eYKKWyg',
          ).addTo(map);
        
          d3.json(link, function(data) {
            // Creating a geoJSON layer with the retrieved data
            L.geoJson(data.features, {
              style: function(feature) {
                return {
                  color: 'white',
                  fillColor: chooseColor(feature.properties.ADMIN),
                  fillOpacity: 0.5,
                  weight: 1.5,
                }
              },
              onEachFeature: function(feature, layer){
                for(var i = 0; i <= country.length; i++){
                  if (country[i] === feature.properties.ADMIN){
                    layer.bindPopup(feature.properties.ADMIN + "<p>"+ gdp[i]);
                  }
                }
              }  
              }).addTo(map);
          }); 
         function chooseColor(admin){
            var col= '#00ff00'
            for(var i = 0; i <= country.length; i++){
              if (country[i] === admin){
                   console.log(admin)
                   col= '#8B0000';
                }
            }
            return col; 
        }       
    })   
}

highest_gdp()
gdp_growth()
