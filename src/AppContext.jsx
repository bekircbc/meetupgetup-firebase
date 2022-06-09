import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const firebaseUrl =
  "https://meetupgetup-default-rtdb.firebaseio.com/meetups.json";

// const firebaseAccountsUrl =
//   "https://meetupgetup-default-rtdb.firebaseio.com/accounts.json";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      const _firebaseObj = (await axios.get(firebaseUrl)).data;
      const _loadedMeetups = Object.entries(_firebaseObj).map(
        (entry) => entry[1]
      );
      setLoadedMeetups(_loadedMeetups);
      // setLoadedMeetups(await axios.get(firebaseUrl).data);

      setIsLoading(false);
    })();
  }, []);

  function toggleFavoriteStatusHandler(meetup) {
    meetup.isFavorite = !meetup.isFavorite;
    setLoadedMeetups([...loadedMeetups]);
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loadedMeetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
