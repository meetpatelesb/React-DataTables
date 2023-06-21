import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Checkbox from "@material-ui/core/Checkbox";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

// A super simple expandable component.
// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify({data:data?.capital}, null, 15)}</pre>;

function CountryTable() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/all`);
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Country Flag",
      selector: (row) => (
        <img height={50} width={50} src={row.flags.png} alt="" />
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            alert("Area:" + row.area);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  // countries?.data?.map((country, i) => {
  //   console.log(country.name, i);
  // });
  return (
    <DataTable
      title="Countries"
      columns={columns}
      data={filteredCountries}
      selectableRows
      selectableRowsComponent={Checkbox}
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      dense
      // direction="auto"
      fixedHeader
      fixedHeaderScrollHeight="500px"
      highlightOnHover
      pagination
      // progressPending
      // responsive
      selectableRowsHighlight
      // selectableRowsNoSelectAll
      // selectableRowsRadio="radio"
      // striped
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search "
          className="form-control w-25"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      }
      subHeaderAlign="right"
      subHeaderWrap
      actions={<button className="btn btn-md btn-info">Export</button>}
    />
  );
}

export default CountryTable;
