import axios from 'axios';

export const AUTH_USER = 'AUTH_USER';
export const CREATE_USER = 'CREATE_USER';

/* DATA FLOW
Dispatch Call => Action Generator (This file) => Reducer
*/

export const authUser = () => ({
  type: AUTH_USER
});

export const createUser = ({ _id, username }) => ({
  type: CREATE_USER,
  _id,
  username
});

export const fetchAuth = () => {
  return dispatch => {
    axios.get('/auth/current_user')
      .then(req => {
        if (req.data) {
          dispatch(authUser());

          const user = req.data;

          axios.get(`/api/users/${user}`)
            .then(res => {
              const user = res.data;
              dispatch(createUser(user))
            });

        }

      })
  }
}

/*
- Redux should dipsatch an action every time the redirect component mounts, that way we can have isAuth state updates
- Post component & Story component will have these updates ONLY if the state has not already been updated
*/


/*
- User can only visit Post component IF they are authenticated, otherwise they will be redirected to the
  login page
- Story pages will have a state check (if user isAuth then render this view, if isAuth is false then
  render this view)
*/