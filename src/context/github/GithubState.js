import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING
} from "../types";

let githubClientId;
let githubClientSecret;

//for deployment check whether the app is in production mode or not
if (process.env.NODE_ENV !== 'production') {
    //in development mode you use this client id and secret
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    //in production mode we use this Client Id and secret 
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search user
    const searchUsers = async (text) => {
        setLoading();

        const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}&client_secret=
        ${githubClientSecret}`);
        const data = await res.json();
        //console.log revealed that search returns an object 
        //which contains items which will contain users
        const users = data.items;

        dispatch({
            type: SEARCH_USERS,
            payload: users
        });
    }

    //Get single Github User details
    const getUser = async (username) => {
        setLoading();

        const res = await fetch(`https://api.github.com/users/${username}?client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);
        const data = await res.json();
        const user = data;

        dispatch({
            type: GET_USER,
            payload: user
        })
    }

    //get user repos
    const getUserRepos = async (username) => {
        setLoading();

        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);
        const repos = await res.json();

        dispatch({
            type: GET_REPOS,
            payload: repos,
        })

    }


    //clear users
    const clearUsers = () => dispatch({
        type: CLEAR_USERS
    })


    //set loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;