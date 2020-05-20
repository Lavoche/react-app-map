export default class YaGeocode {

    _apiBase = "https://geocode-maps.yandex.ru/1.x/?apikey=b4d2c5bf-1f62-4634-b76b-ade75cee0f23&format=json&geocode=";

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error (`Couldn ot fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    };

    getAddress = async (coord) => {
        const res = await this.getResource(coord.reverse().join(','));
        return this._transformCoord(res.response);
    };
    _transformCoord = (res) => {
        const {name, description} = res.GeoObjectCollection.featureMember[0].GeoObject;
        return `${name}, ${description}`;
    }
}