import { useState } from "react";
import { UserData } from "../types/userdata";

const HomePage = () => {
  const [newUser, setNewUser] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);
  const newuser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(e.target.value);
  };

  function getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return `${formattedDate} ${formattedTime}`;
  }
  
  const addUser = () => {
    if (newUser.trim() === "") return;
    const newUserData: UserData = {
      id: getFormattedDateTime(),
      name: newUser,
    };

    setUserData((prevUsers) => [...prevUsers, newUserData]);
    setNewUser("");
  };
  const deleteUser = (id: string) => {
    setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const editUser = (id: string) => {
    console.log(id);
  };

  return (
    <div className="m-8">
      <div className="text-center m-6">
        <input
          id="text"
          value={newUser}
          type="text"
          onChange={newuser}
          placeholder="Add item..."
          className="border p-2"
        />
        <button
          onClick={addUser}
          className="bg-blue-800 text-white px-4 py-2 ml-2"
        >
          Add
        </button>
      </div>
      <table className="table-auto w-full border-collapse mt-4">
        {userData.length > 0 && (
          <thead>
            <tr className="text-center font-bold text-xl">
              <th className="w-1/6">Sr. No.</th>
              <th className="w-1/2">Todo List</th>
              <th className="w-1/6">CreateAt</th>
              <th className="w-1/6">Action</th>
            </tr>
          </thead>
        )}
        <tbody>
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={user.id} className="border border-slate-400">
                <td className="text-center font-bold p-2 border border-slate-400">
                  {index + 1}.
                </td>{" "}
                <td className="text-center p-2 border border-slate-400">
                  {user.name}
                </td>
                <td className="text-center p-2 border border-slate-400">
                  {user.id}
                </td>
                <td className=" flex justify-center gap-3 items-center text-center ">
                  <div>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-transparent bg-red-600 text-white px-2 py-1"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => editUser(user.id)}
                      className="bg-transparent bg-green-900 text-white px-5 py-1"
                      title="Edit"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No data available. Add a data!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
