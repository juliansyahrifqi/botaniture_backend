import axios from "axios";
import { myDataSource } from "./app-data-source";
import { Province } from "./entities/Province";

async function fetchAndInsertProvinceData() {
  try {
    const response = await axios.get('https://freastofficial.com/api/provinces');
    const provinces = response.data;

    await myDataSource
      .initialize()
      .then(() => {
        console.log("Data source has been initialized");
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });

    for (const province of provinces) {
      const newProvince = new Province();
      newProvince.prov_id = province.id;
      newProvince.prov_name = province.name;

      await myDataSource.getRepository(Province).save(newProvince);
    }

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data', error);
  }
}

fetchAndInsertProvinceData();