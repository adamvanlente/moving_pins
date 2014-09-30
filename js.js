/*
 * A (very) quick and (very) dirty shot at making some pins
 * move around on a Google map using the Javascript V3 api
 */

var gmap = {

  map: undefined,

  currentItemIndex: 0,

  markerList: [],
  lineList: [],

  circleIcon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      fillOpacity: 1,
      scale: 4.5,
      strokeColor: 'white',
      strokeWeight: 1
  },


  setMap: function() {

      var mapOptions = {
        center: new google.maps.LatLng(37.424235,-122.094075),
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map =
        new google.maps.Map(document.getElementById("map"), mapOptions);

      google.maps.event.addListener(this.map, 'click', function(event) {
          console.log(event.latLng);
      });

      gmap.marker.begin(gmap.markerOne);

      setTimeout(function() {
        gmap.marker.begin(gmap.markerTwo)
      }, 5000);

      setTimeout(function() {
        gmap.marker.begin(gmap.markerThree)
      }, 7000);



  }
};

gmap.marker = {

    begin: function (marker) {

        var firstCoords = marker.coords[0];

        var coords = new google.maps.LatLng(firstCoords[0], firstCoords[1]);

        var markerPin = new google.maps.Marker({
          map: gmap.map,
          position: coords,
          icon: gmap.circleIcon
        });

        gmap.marker.moveMarker(marker, firstCoords, markerPin);

    },

    moveMarker: function(markerObj, curLoc, pin) {

        var index = markerObj.currentMarkerIndex;

        pin = pin || markerObj.pin;
        curLoc = curLoc || markerObj.coords[index];
        index++;

        markerObj.tempNewLines = [];
        markerObj.currentCoordsIndex = 0;
        markerObj.pin = pin;

        if (markerObj.coords[index]) {
            var newLoc = markerObj.coords[index];

            for (var percent = 0; percent < 1; percent += 0.01) {
              var newLat = curLoc[0] + percent * (newLoc[0] - curLoc[0]);
              var newLon = curLoc[1] + percent * (newLoc[1] - curLoc[1]);
              markerObj.tempNewLines.push([newLat, newLon]);
            }

            gmap.marker.relocate(markerObj);
        }
    },

    relocate: function(markerObj) {

        var newIndex = markerObj.currentCoordsIndex;
        var coordsList = markerObj.tempNewLines;

        if (coordsList[newIndex]) {

            var coords = coordsList[newIndex];
            markerObj.currentCoordsIndex += 1;
            markerObj.pin.setPosition(new google.maps.LatLng(coords[0], coords[1]));

            setTimeout(function() {
                gmap.marker.relocate(markerObj);
            }, 30)

            var path = [];

            for (var i = 0; i < newIndex; i++) {
                path.push(new google.maps.LatLng(coordsList[newIndex][0], coordsList[newIndex][1]))
            }

            var line = new google.maps.Polyline({
              path: path,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });

            line.setMap(gmap.map);

        } else {
            markerObj.currentMarkerIndex += 1;
            gmap.marker.moveMarker(markerObj);

        }
    }

};


gmap.markerOne = {

  lines: [],

  name: "markerOne",

  tempNewLines: [],

  currentMarkerIndex: 0,
  currentCoordsIndex: 0,
  pin: undefined,

  coords: [
      [37.42385300339043,-122.09458619356155],
      [37.423978679636434,-122.09458887577057],
      [37.42401915160295,-122.09458887577057],
      [37.42405323324201,-122.09457814693451],
      [37.42409157506739,-122.09458351135254],
      [37.424121396473566,-122.09458351135254],
      [37.424157608165096,-122.0945754647255],
      [37.42419594993704,-122.09458351135254],
      [37.42423216159251,-122.09461838006973],
      [37.42427050332626,-122.09467470645905],
      [37.424276893613296,-122.09471493959427],
      [37.42428541399521,-122.09473371505737],
      [37.424313105229636,-122.09471762180328],
      [37.42434718673489,-122.09469079971313],
      [37.42436422748168,-122.09467738866806],
      [37.42438126822463,-122.094666659832],
      [37.42442173997352,-122.09465861320496],
      [37.42444730106684,-122.094666659832],
      [37.4244749922414,-122.09467202425003],
      [37.424504813494856,-122.09467202425003],
      [37.42453463473643,-122.09465324878693],
      [37.42455380552832,-122.09463983774185],
      [37.42456445596617,-122.09459692239761],
      [37.42458149666349,-122.09458351135254],
      [37.424587886924016,-122.09457278251648],
      [37.4245921470974,-122.09455668926239]
  ]
}

gmap.markerTwo = {

  lines: [],

  name: "markerOne",

  tempNewLines: [],

  currentMarkerIndex: 0,
  currentCoordsIndex: 0,
  pin: undefined,

  coords: [
      [37.42386365392794,-122.09458887577057],
      [37.423897735637745,-122.09458887577057],
      [37.423929687226625,-122.09459155797958],
      [37.42395311838314,-122.09459155797958],
      [37.42398080974047,-122.09459155797958],
      [37.42400850108757,-122.09459155797958],
      [37.42402767201416,-122.09459155797958],
      [37.42404897303797,-122.09459155797958],
      [37.42406388375103,-122.09459155797958],
      [37.42408731486554,-122.09458619356155],
      [37.42411287607301,-122.09458351135254],
      [37.424134177072574,-122.0945754647255],
      [37.424157608165096,-122.09456741809845],
      [37.42416825865928,-122.09454327821732],
      [37.424183169348574,-122.09451913833618],
      [37.42419594993704,-122.09449231624603],
      [37.42420660042575,-122.0944681763649],
      [37.424215120815646,-122.09442794322968],
      [37.424227901398645,-122.09440648555756],
      [37.42423855188283,-122.09438234567642],
      [37.42424281207606,-122.09435284137726],
      [37.42424920236548,-122.09432870149612],
      [37.42426198294268,-122.09430187940598],
      [37.42426624313459,-122.09428578615189]
  ]
}

gmap.markerThree = {

  lines: [],

  name: "markerOne",

  tempNewLines: [],

  currentMarkerIndex: 0,
  currentCoordsIndex: 0,
  pin: undefined,

  coords: [
      [37.42385726360561,-122.09458351135254],
      [37.423891345318346,-122.09458887577057],
      [37.42390412595661,-122.09458887577057],
      [37.42393607754277,-122.09458887577057],
      [37.423972289323935,-122.09458619356155],
      [37.4240063709843,-122.09458619356155],
      [37.42403619242442,-122.09458619356155],
      [37.42406814395421,-122.09458619356155],
      [37.42409796536972,-122.09458082914352],
      [37.42412352657355,-122.09458082914352],
      [37.42414695766941,-122.09458082914352],
      [37.42418955964308,-122.09458082914352],
      [37.42422151110744,-122.09459960460663],
      [37.424227901398645,-122.09460496902466],
      [37.4242364217861,-122.09462374448776],
      [37.42425133246183,-122.09464520215988],
      [37.424264113038674,-122.09466129541397],
      [37.42427476351769,-122.09468811750412],
      [37.424283283899825,-122.09470689296722],
      [37.424283283899825,-122.09471493959427],
      [37.424283283899825,-122.09474444389343],
      [37.424283283899825,-122.09475517272949],
      [37.424276893613296,-122.09477663040161],
      [37.424276893613296,-122.09477931261063],
      [37.42426624313459,-122.09480077028275],
      [37.42426198294268,-122.09482491016388],
      [37.42425346255813,-122.09483563899994],
      [37.42425133246183,-122.094846367836],
      [37.42425133246183,-122.09485977888107],
      [37.42425133246183,-122.0948651432991],
      [37.424244942172606,-122.0948839187622]
  ]
}


gmap.setMap();
