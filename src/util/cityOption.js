import Ajax from './ajax';

const citys = require('file-loader?name=[path][name].[ext]!../../../assets/json/citysSource.json');


export default function getCitys() {
  Ajax({
    url: citys,
    method: 'GET',
    dataType: 'json',
  }, (json) => {
    cityOptions(json);
  });
  function cityOptions(data) {
    const provinces = data.provinces;
    const cities = data.cities;
    const areas = data.areas;

    areas.forEach((area) => {
      const matchCity = cities.filter(city => city.code === area.parent_code)[0];
      if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity
          .children
          .push({ label: area.name, value: area.code });
      }
    });

    cities.forEach((city) => {
      const matchProvince = provinces.filter(province => province.code === city.parent_code)[0];
      if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince
          .children
          .push({ label: city.name, value: city.code, children: city.children });
      }
    });

    const options = provinces.map(province => ({ label: province.name, value: province.code, children: province.children }));
    window.cityOptions = options;
    // console.log(JSON.stringify(options))
    // export default options;
  }
}
export function getCitysNameById(id) {

}
