mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'cluster-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-74.5, 40],
    zoom: 7
});

map.addControl(new mapboxgl.NavigationControl());


map.on('load', function (){     //function to add clusters of spots to the map
    map.addSource('spots',{
        type: 'geojson',
        data: spots,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({           // adding Layer to add color and radius for each cluster on zoom in and out
        id: 'clusters',
        type: 'circle',
        source: 'spots',
        filter: ['has','point_count'],
        point: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#00BCD4',
                10,
                '#2196F3',
                30,
                '#3F51B5'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                20,
                30,
                25
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field' : '{point_count_abbreviated}',
            'text-font' : ['DIN offc Pro Medium' , 'Arial Unicode MS Bold'],
            'text-size' : 12
        }
    });

    map.addLayer({
        id:'unclustered-point',
        type: 'circle',
        source: 'spots',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color' : '#11B4DA',
            'circle-radius' : 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': "#fff"
        }
    });

    map.on('click', 'clusters', function(e){
        const features = map.queryRenderFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('spots').getClusterExpansionZoom(
            clusterId,
            function(err,zoom) {
                if(err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });


    map.on('click','uncluster-point', function(e){
        const {popUpMarkup} = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map)
    });

    map.on('mouseenter','clusters', function(){
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave','clusters', function(){
        map.getCanvas().style.cursor = '';
    });
});

// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v12',
//     center: [-74.5, 40],
//     zoom: 7
// });
