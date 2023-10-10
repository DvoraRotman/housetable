import { addHouse, getHouseDetails, updateHouse } from './controller/houses.js';
import axios from 'axios'
import querystring from 'querystring'


export const getAuthorizationCode = async (scope, client_id, code) => {
  try {
    let data

    let axiosObj = {
      method: 'GET',
      url: `https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&response_type=${code}&client_id=${client_id}&scope=${scope}`,
    }
    let result
    try {
      result = await axios(axiosObj)
    } catch (error) {
      console.log('error in axios:  ', error.message);
    }
    if (result && result.data) data = result.data
  } catch (error) {
    console.log('error in axios command', error.message);
    throw error;
  }
}
export const getinvoiceNumber = async (access_token) => {
  console.log("getinvoiceNumber----------------");
  try {
    let data
    const requestBody = {
      "Invoice_ID": "987654321",
      "Invoice_Type": 305,
      "Vat_Number": 777777715,
      "Union_Vat_Number": 125847553,
      "Invoice_Reference_Number": "975626515",
      "Customer_VAT_Number": 18,
      "Customer_Name": "שם הלקוח",
      "Invoice_Date": "2023-09-21",
      "Invoice_Issuance_Date": "2023-09-07",
      "Branch_ID": "533",
      "Accounting_Software_Number": 36955574,
      "Client_Software_Key": "76857",
      "Amount_Before_Discount": 552.75,
      "Discount": 52.75,
      "Payment_Amount": 500,
      "VAT_Amount": 85,
      "Payment_Amount_Including_VAT": 585,
      "Invoice_Note": "הערות",
      "Action": 0,
      "Vehicle_License_Number": 584752145,
      "Phone_Of_Driver": "0505674235",
      "Arrival_Date": "2023-02-26",
      "Estimated_Arrival_Time": "13:25",
      "Transition_Location": 12,
      "Delivery_Address": "כתובת אספקה",
      "Additional_Information": 0,
      "Items": [
        {
          "Index": 7446,
          "Catalog_ID": "5569875437",
          "Category": 15,
          "Description": "תיאור הפריט",
          "Measure_Unit_Description": "קילו",
          "Quantity": 100.5,
          "Price_Per_Unit": 5.5,
          "Discount": 52.75,
          "Total_Amount": 500,
          "VAT_Rate": 17,
          "VAT_Amount": 85
        }
      ]
    };

    let axiosObj = {
      method: 'POST',
      url: 'https://openapi.taxes.gov.il/shaam/tsandbox/Invoices/v1/Approval',
      data: requestBody,
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }

    }
    let result
    try {
      result = await axios(axiosObj);
      if (result?.data) {
        data = result.data;
        console.log(' getinvoiceNumberהצליח', result.data);
        return result.data?.Confirmation_Number
        // getinvoiceNumber(result.data?.access_token)
      }
    } catch (error) {
      console.log(axiosObj);

      console.log(error?.response?.data?.error_description ?? error?.response?.data?.moreInformation ?? 'faild in get invoices health api');
    }
  } catch (error) {
    console.log('error in axios command', error.message);
    throw error;
  }
}
export const getinvoicesHealth = async (access_token) => {
  console.log("getinvoicesHealth----------------");

  try {
    let data

    let axiosObj = {
      method: 'GET',
      url: 'https://openapi.taxes.gov.il/shaam/tsandbox/Invoices/v1/Health',
      headers: {

        Authorization: `Bearer ${access_token}`
      }

    }
    let result
    try {
      result = await axios(axiosObj);
      if (result?.data) {
        data = result.data;
        const resGetinvoiceNumber = getinvoiceNumber(access_token)
        return resGetinvoiceNumber
      }
    } catch (error) {
      console.log(error?.response?.data?.error_description ?? error?.response?.data?.moreInformation ?? 'faild in get invoices health api');
    }
  } catch (error) {
    console.log('error in axios command', error.message);
    throw error;
  }
}
export const refreshToken = async (refresh_token) => {
  console.log("refreshToken----------------");

  try {
    let data
    const requestBody = {
      client_id: '9289dfd882533f20117727b4513405ab',
      scope: 'scope',
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
      client_secret: 'dcc6cca03b2a05c60eeff6b15bc377ad'
    };
    const formData = querystring.stringify(requestBody);

    let axiosObj = {
      method: 'POST',
      url: 'https://openapi.taxes.gov.il/shaam/tsandbox/longtimetoken/oauth2/token',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    }
    let result
    try {
      result = await axios(axiosObj);
      if (result?.data) {
        data = result.data;
        console.log("refreshToken הצליח");
        const resGetinvoicesHealth = await getinvoicesHealth(result.data?.access_token)
        return resGetinvoicesHealth;
      }
    } catch (error) {
      console.log(error?.response?.data?.error_description ?? error?.response?.data?.moreInformation ?? 'faild in get token api');
    }
  } catch (error) {
    console.log('error in axios command', error.message);
    // throw error;
  }
}
export const getToken = async (req, res) => {
  console.log("getToken----------------", req.query.code);

  try {
    let data
    const requestBody = {
      grant_type: 'authorization_code',
      code: req.query.code,
      scope: 'scope',
      // redirect_uri:''
    };
    const formData = querystring.stringify(requestBody);

    let axiosObj = {
      method: 'POST',
      url: `https://openapi.taxes.gov.il/shaam/tsandbox/longtimetoken/oauth2/token`,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic OTI4OWRmZDg4MjUzM2YyMDExNzcyN2I0NTEzNDA1YWI6ZGNjNmNjYTAzYjJhMDVjNjBlZWZmNmIxNWJjMzc3YWQ='
      }
    }
    let result
    try {
      result = await axios(axiosObj);
      if (result?.data) {
        data = result.data;
        console.log("getToken הצליח");
        const resConfirmationNumber = await refreshToken(result.data?.refresh_token)
        res.send({ confirmationNumber: resConfirmationNumber });
      }
    } catch (error) {
      console.log(error?.response?.data?.error_description ?? error?.response?.data?.moreInformation ?? 'faild in get token api');
    }
  } catch (error) {
    console.log('error in axios command', error.message);
    // throw error;
  }
}






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


export const getTokenA = async (code) => {
  try {
    let data
    const requestBody = {
      grant_type: 'authorization_code',
      code: 'AAOwhQQ9U836JTcvzcB2ntESeY4uJTT2OjiT-ypc6Nrq-6BjKq755L3w9xH2TkJdrWNwUZeGD2A2RlNWLgqdhlQB-7R2c_v40MaBQ09GcvVJSA', //code,
      scope: 'scope',
    };
    try {
      let axiosObj = {
        method: 'POST',
        url: 'https://openapi.taxes.gov.il/shaam/tsandbox/longtimetoken/oauth2/token',
        data: requestBody

      }
      // if (config.ssl.rejectUnauthorized == false) {
      //   axiosObj.httpsAgent = new https.Agent({ rejectUnauthorized: false })
      // }
      let result
      try {
        result = await axios(axiosObj)
      } catch (error) {
        console.log("axiosObj : ", axiosObj);
        console.log('error in axios:  ', error.message);
      }
      // if (result && result.data) data = result.data
      if (result) {
        console.log("result", result);
        data = result
      }
    } catch (error) {
      console.log('error in axios command', error.message);
      throw error;
    }
  } catch (error) {
    throw error;
  }

}
