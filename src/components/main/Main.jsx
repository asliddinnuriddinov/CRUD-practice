import React, { useEffect, useState } from "react";
import "./Main.scss";
import Container from "../../utils/Utils";
import instance from "../../api/";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedData, setSelectedData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [dateUsed, setDateUsed] = useState(false);
  const roleFilter = [...new Set(data?.map((x) => x.roleName))];

  useEffect(() => {
    setIsLoading(true);
    instance
      .get("/users")
      .then((responce) => {
        setData(responce.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`/users?name=${search}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, [search]);

  function deleteUser(id) {
    setIsLoading(true);
    instance
      .delete(`/users/${id}`)
      .then((response) => {
        let updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
        let updatedSearchData = searchData.filter((user) => user.id !== id);
        setSearchData(updatedSearchData);
        setSelectedData(selectedData.filter((x) => x.id !== id));
        setDateData(selectedData.filter((x) => x.id !== id));

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }

  function filterUsers(filter) {
    setSelectedFilter(filter);
    setSelectedData(data.filter((x) => x.roleName == filter));
  }

  function dateFilter(time) {
    const endOfDayTimestamp = new Date(
      new Date(time).setHours(23, 59, 59, 999)
    ).getTime();

    setDateData(
      data.filter(
        (x) => new Date(x.createdAt * 1000).getTime() <= endOfDayTimestamp
      )
    );
    setDateUsed(true);
  }

  const renderRow = (x, i) => (
    <tr onClick={(e) => navigate(`/view/${x.id}`)} key={i}>
      <td>{x.name}</td>
      <td>{x.username}</td>
      <td>{x.email}</td>
      <td>{x.roleName}</td>
      <td>{x.address}</td>
      <td>{x.contact}</td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteUser(x.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );


  // console.log(new Date(data?.at(data.length-1)?.createdAt*1000),new Date().getTime());
  return (
    <Container>
      <nav>
        <button onClick={(e) => navigate("/create")}>Create User</button>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search by name"
          />
          <button>Search</button>
        </form>
        <select onChange={(e) => filterUsers(e.target.value)}>
          <option value="all">All</option>
          {roleFilter?.map((x, i) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </select>
        <input
          onChange={(e) => dateFilter(new Date(e.target.value).getTime())}
          type="date"
        />
      </nav>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {(dateUsed && dateData.length === 0) || (!dateUsed && data.length === 0) ? (
            <div className="no-user">
              <h1>Users do not exist</h1>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role name</th>
                  <th>Address</th>
                  <th>Phone number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                        { 
                            (dateUsed && dateData.length > 0) ? 
                            dateData.map((x, i) => renderRow(x, i)) :
                            (
                                (search.length > 0 && data.length > 0) ? 
                                data.map((x, i) => renderRow(x, i)) :
                                (
                                    (selectedFilter !== 'all' && selectedData.length > 0) ? 
                                    selectedData.map((x, i) => renderRow(x, i)) :
                                    data.map((x, i) => renderRow(x, i))
                                )
                            )
                        }
                    </tbody>
            </table>
          )}
        </>
      )}
    </Container>
  );
};


export default Main;
