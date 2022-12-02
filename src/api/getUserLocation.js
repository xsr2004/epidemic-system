// 获取当前城市
const getCurrentCityName = function() {
    return new Promise((resolve, reject) => {
      new BMap.LocalCity().get((result) => {
        let geoc = new BMap.Geocoder();
        geoc.getLocation(result.center, (rs) => {
          // rs 中携带着所有的定位信息，这里只获取了城市(city)和所在的区(district)
          let addComp = rs.addressComponents;
          let result = addComp.city + addComp.district;
          console.log(rs);
          console.log(1);
          resolve(result);
        });
      }, {enableHighAccuracy: true});
    });
  }
  export default getCurrentCityName;