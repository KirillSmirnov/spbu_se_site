// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  var getXmlHttp;

  getXmlHttp = function() {
    var hr, _;
    return hr = (function() {
      try {
        return new XMLHttpRequest();
      } catch (_error) {
        _ = _error;
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (_error) {
          _ = _error;
          return new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
    })();
  };

  this.initM = function() {
    var gotgeojson, map, xmlhttp;
    map = L.map('spbuSeMap').setView([59.8815, 29.82916], 15);
    if (!(window.browser_too_old === void 0)) {
      L.control.attribution({
        position: 'topright',
        prefix: '<a href="browser_too_old.html">Рекомендуем обновить браузер</a>',
        attribution: null
      }).addTo(map);
    }
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Картографические данные: &copy; пользователи <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map);
    gotgeojson = function(text) {
      var clusters, geoJsonLayer, matmex, scale;
      matmex = eval('(' + text + ')');
      geoJsonLayer = L.geoJson([matmex], {
        style: function(feature) {
          var s, _ref, _ref1, _ref2, _ref3;
          s = (_ref = (_ref1 = feature.properties) != null ? _ref1.style : void 0) != null ? _ref : {};
          s.opacity = 0.6;
          if (((_ref2 = feature.properties) != null ? _ref2.building : void 0) === "yes") {
            s.weight = 2;
            s.fill = true;
            s.color = "#000000";
            s.fillColor = "#B0DE5C";
            s.fillOpacity = 0.4;
          }
          if ((_ref3 = feature.properties) != null ? _ref3.color : void 0) {
            s.color = feature.properties.color;
          }
          return s;
        },
        onEachFeature: function(feature, layer) {
          var _ref, _ref1, _ref2, _ref3;
          return layer.bindPopup((_ref = (_ref1 = (_ref2 = feature.properties) != null ? _ref2.popupContent : void 0) != null ? _ref1 : (_ref3 = feature.properties) != null ? _ref3.name : void 0) != null ? _ref : "");
        },
        pointToLayer: function(feature, latlng) {
          var icon, iurl, _ref, _ref1;
          iurl = (_ref = (_ref1 = feature.properties) != null ? _ref1.iconURL : void 0) != null ? _ref : 'images/map_marker.png';
          if (!(window.browser_too_old === void 0)) {
            iurl = iurl.replace('.png', '.gif');
          }
          icon = L.icon({
            iconUrl: iurl,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, 0]
          });
          return L.marker(latlng, {
            icon: icon
          });
        }
      });
      clusters = new L.MarkerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 15
      });
      clusters.addLayer(geoJsonLayer);
      map.addLayer(clusters);
      scale = L.control.scale();
      scale.options.imperial = false;
      return scale.addTo(map);
    };
    xmlhttp = getXmlHttp();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        return gotgeojson(xmlhttp.responseText);
      }
    };
    xmlhttp.open('GET', "geoinfo/matmex.geojson" + "?0", true);
    xmlhttp.send(null);
  };

}).call(this);
