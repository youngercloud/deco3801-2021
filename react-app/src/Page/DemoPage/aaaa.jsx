import {Component} from "react";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl';

class aaaa extends Component {

    render(){
        const onSubmit = (data) => {
            console.log(data);
            MapboxGl.accessToken =
                'pk.eyJ1IjoibGluZ3hpMjExIiwiYSI6ImNrdWUycWg5cTFlM3UycG12anRlcnZ2b3QifQ.mp24OFFxrF3e93xjPwbhGg';
            // let coor = 0;
            const geocoder = new MapboxGeocoder({
                accessToken: MapboxGl.accessToken,
                // types: 'place,postcode,locality,neighborhood'
                types: 'postcode'
            });
            geocoder.addTo('#geocoder');
            function searchCoorsByName(locationName) {
                geocoder.query(locationName);
                geocoder.on('result', (e) => {
                    // coor = e.result.geometry.coordinates;

                    // console.log(e.result.bbox[1],"tjis c");
                    const x = e.result.bbox[0];
                    const y = e.result.bbox[1];
                    localStorage.setItem('x',x);
                    localStorage.setItem('y',y);

                });
            }
            const {postcode} = data;
            searchCoorsByName(`australia,${postcode}`);
            let {latitude1,longitude1} =data;
            latitude1 = localStorage.getItem('x');
            longitude1 = localStorage.getItem('y');

            const data1 = {
                ...data,
                latitude:latitude1,
                longitude:longitude1,
            }
            console.log(data1);

            // localStorage.clear("x");
            // localStorage.clear("y");
        };
        return(
            <div>
                <div id="geocoder"></div>
                <pre id="result"></pre>
            </div>
        )}
}
export default aaaa;