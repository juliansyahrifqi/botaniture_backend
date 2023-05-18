import "dotenv/config";
import axios from "axios";
import { myDataSource } from "./app-data-source";
import { Province } from "./entities/Province";
import { City } from "./entities/City";

async function fetchAndInsertProvinceData() {
  try {
    const response = await axios.get('https://api.rajaongkir.com/starter/city', {
      headers: {
        key: process.env.RAJAONGKIR_API_KEY
      }
    });
    const cities = response.data.rajaongkir.results;

    await myDataSource
      .initialize()
      .then(() => {
        console.log("Data source has been initialized");
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });

    for (const city of cities) {
      const province = await myDataSource.getRepository(Province).findOneBy({ prov_id: +city.province_id});

      const newCity = new City();
      newCity.city_id = +city.city_id;
      newCity.city_name = city.type + ' ' + city.city_name;
      newCity.province = province;

      await myDataSource.getRepository(City).save(newCity);
    }

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data', error);
  }
}

fetchAndInsertProvinceData();