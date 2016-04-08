// Mouse Position Plugin
L.Control.MousePosition = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        return this._container;
    },
    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove);
    },
    _onMouseMove: function (e) {
        var lng = L.Util.formatNum(e.latlng.lng, 2).toFixed(2);
        var lat = L.Util.formatNum(e.latlng.lat, 2).toFixed(2);
        this._container.innerHTML = lat + " : " + lng;
    }
});
L.Map.mergeOptions({ positionControl: false });
L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});
L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
// End Mouse Position
