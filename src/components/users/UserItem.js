import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const UserItem = ({ user: { login, avatar_url } }) => {
    return (
        <div className='card text-center'>
            <img className='round-img' style={styleImg} src={avatar_url} alt='user_avatar' />
            <h3>{login}</h3>
            <Link to={`/userDetails/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
        </div >
    )
}
const styleImg = { width: '60px' };

UserItem.propTypes = {
    user: PropTypes.object.isRequired,

}
export default UserItem
