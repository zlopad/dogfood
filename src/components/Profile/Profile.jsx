/* eslint-disable react/jsx-one-expression-per-line */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { withQuery } from '../HOCs/withQuery'
import ProfileStyles from './Profile.module.css'

function ProfileInner({ user, isLoading }) {
  const { token, setToken } = useQueryContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  const logoutHandler = () => {
    // console.log('Logging out')
    setToken('')
    dogFoodApi.setToken('')
    setTimeout(navigate('/'))
  }
  if (user) {
    return (
      <div className={ProfileStyles.Profile}>
        <h1>Личный кабинет</h1>
        <div className={ProfileStyles.container}>
          <p>
            <img
              src={user.avatar}
              alt="аватар"
              width="200"
            />
          </p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-action"
            onClick={logoutHandler}
          >
            Выйти
          </button>
        </div>
      </div>
    )
  }
}

const ProfileInnerWithQuery = withQuery(ProfileInner)

function Profile() {
  const { token } = useQueryContext()
  const {
    data: user,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => dogFoodApi.getUser(),
  })

  return (
    <ProfileInnerWithQuery
      user={user}
      refetch={refetch}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default Profile
