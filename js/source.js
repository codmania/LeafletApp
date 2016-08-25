MERCATOR = { 

    fromPointToLatLng: function(point){

        return {
            lat: (2 * Math.atan(Math.exp((point.y - 128) / -(256 / (2 * Math.PI)))) - Math.PI / 2)/ (Math.PI / 180),
            lng:  (point.x - 128) / (256 / 360)
        };
  
    },

    fromLatLngToPoint:function(latLng){
        var siny =  Math.min(Math.max(Math.sin(latLng.lat* (Math.PI / 180)), -.9999), .9999);
        return {
           x: 128 + latLng.lng * (256/360),
           y: 128 + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI))
        };
    },

    getTileAtLatLng: function(latLng, zoom){

        var t = Math.pow(2,zoom),
            s = 256 / t,
            p = this.fromLatLngToPoint(latLng);

            return {x: Math.floor(p.x / s), 
                    y: Math.floor(p.y / s), 
                    z: zoom};
    },

    getTileBounds: function(tile){

        tile = this.normalizeTile(tile);

        var t = Math.pow(2, tile.z),
            s = 256 / t,
            sw = {x: tile.x * s,
                  y: (tile.y * s) + s},
            ne = {x: tile.x * s + s,
                  y: (tile.y * s)};
            return {sw:this.fromPointToLatLng(sw),
                    ne:this.fromPointToLatLng(ne)
            };
    },

    normalizeTile: function(tile){
        var t = Math.pow(2, tile.z);
        tile.x = ((tile.x % t) + t) % t;
        tile.y = ((tile.y % t) + t) % t;

        return tile;
    }
}
