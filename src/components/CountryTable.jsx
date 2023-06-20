import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function CountryTable() {
  const [countries, setCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/all`);
      setCountries(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => <img height={50} width={50} src={row.flags} alt="" />,
    },
  ];

  // countries?.data?.map((country, i) => {
  //   console.log(country.name, i);
  // });
  return(<DataTable columns={columns} data={countries}/>);

}

export default CountryTable;
