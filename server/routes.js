import { addHouse, getHouseDetails, updateHouse } from './controller/houses.js';

export const addHouseRoute = async (req, res) => {
  try {
    const houseId = await addHouse(req?.body)
    res.send({ message: "ok", houseId });
  } catch (error) {
    res.status(error?.status ? error.status : 500).send({ message: error.message ? error.message : 'server error' });
  }
};

export const houseDetailsRoute = async (req, res) => {
  try {
    const houseDetails = await getHouseDetails(req?.url?.match(/\/(\d+)$/)[1])
    res.send({ status: "ok", houseDetails })
  } catch (error) {
    res.status(error?.status ? error.status : 500).send({ message: error.message ? error.message : 'server error' });
  }
};

export const updateHouseRoute = async (req, res) => {
  try {
    await updateHouse(req)
    res.send({ status: "ok" })
  } catch (error) {
    res.status(error?.status ? error.status : 500).send({ message: error.message ? error.message : 'server error' });
  }
};
