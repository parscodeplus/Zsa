"use client"
import React, { useState } from "react";
type items = {
 name:string;
 mobile:string;
}
const AddService: React.FC = () => {
 
  const [row, setRow] = useState<items[]>( [])

  const handleChange = (idx:  number) => (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    const updatedRows = [...row];
    updatedRows[idx] = { ...updatedRows[idx], [name]: value };
    setRow(updatedRows);
  };
  const handleAddRow = () => {
    const newItem = {
      name: "",
      mobile: ""
    };
    setRow([...row, newItem]);
  };
  const handleRemoveRow = () => {
    setRow(row.slice(0, -1));
  };
  const handleRemoveSpecificRow = (idx:number) => () => {
    const updatedRows = [...row];
    updatedRows.splice(idx, 1);
    setRow(updatedRows);
  }
  return (
    
          <div>
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 column">
                  <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                  >
                    <thead>
                      <tr>
                        <th className="text-center"> # </th>
                        <th className="text-center"> Name </th>
                        <th className="text-center"> Mobile </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {row.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="name"
                              value={row[idx].name}
                              onChange={handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="mobile"
                              value={row[idx].mobile}
                              onChange={handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={handleRemoveSpecificRow(idx)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={handleAddRow} className="btn btn-primary">
                    Add Row
                  </button>
                  <button
                    onClick={handleRemoveRow}
                    className="btn btn-danger float-right"
                  >
                    Delete Last Row
                  </button>
                </div>
              </div>
            </div>
          </div>
        
  );
};

export default AddService;
