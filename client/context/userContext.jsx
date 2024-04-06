import axios from "axios";
import { createContext , useState , useEffect} from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user , setUser] = useState(null);

    useEffect(() =>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                console.log("data:",data)
                setUser(data);
            })
        }
    },[]);
    const logoutUser = () => {
        // Clear user data when logging out
        setUser(null);
        // Perform any additional logout tasks, such as clearing cookies or redirecting
    };

    return (
        <UserContext.Provider value={ {user, setUser , logoutUser} }>
            {children}
        </UserContext.Provider>
    );
}
