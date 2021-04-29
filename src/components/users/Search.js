import React, { useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const [text, setText] = React.useState('');
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext
    //not using arrow function 
    const onChange = e => setText(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        if (text.trim() === '') {
            setAlert('Please enter something', 'light');
        }
        else {
            githubContext.searchUsers(text);
            setText('');
        }
    }


    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input
                    type='text'
                    name='text'
                    placeholder='Search users'
                    value={text}
                    onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    )
}


export default Search
