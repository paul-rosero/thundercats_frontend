import { resetLoginForm } from './loginForm.js';
import { getMyChars } from './characters'
import { resetPasswordForm, resetUserForm, setFormDataForEdit } from './userForm.js';

//synchronous action creators
export const setCurrentUser = user => {
    delete user.relationships.characters
    user.relationships = {
        characters: []
    }
    return {
        type: 'SET_CURRENT_USER',
        user
    }
}

export const updatedCurrentUser = currentUser => {
    delete currentUser.relationships.characters
    currentUser.relationships = {
        characters: []
    }
    return {
        type: 'UPDATED_CURRENT_USER',
        currentUser
    }
}

export const clearCurrentUser = () => {
    return {
        type: "CLEAR_CURRENT_USER",
    }
}

export const deletedUser = currentUser => {
    return {
      type: "DELETE_CURRENT_USER",
      currentUser
    }
  }

//asynchronous action creators
export const signup = (signupData, history) => {
    return async dispatch => {
        const userData ={
            user: signupData
        }
        const res = await fetch("http://localhost:3001/api/v1/signup", {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const user = await res.json()
        if (user.error) {
            alert(user.error)
        }
        else {
            dispatch(setCurrentUser(user.data))
            dispatch(getMyChars())
            dispatch(resetPasswordForm(signupData))
            history.push(`/users/${user.data.attributes.name}`)
        }
    }
}

export const currentUserLogin = (loginData, history) => {
    return async dispatch => {
        const res = await fetch("http://localhost:3001/api/v1/login", {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const user = await res.json()
        if (user.error) {
            alert(user.error)
        }
        else {
            dispatch(setCurrentUser(user.data))
            dispatch(setFormDataForEdit(user.data));
            dispatch(getMyChars())
            dispatch(resetLoginForm())
            history.push(`/users/${user.data.attributes.name}`)
        }
    }
}

export const getCurrentUser = () => {
    return  async dispatch => {
        const res = await fetch("http://localhost:3001/api/v1/get_current_user", {
            credentials: "include",
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        const user = await res.json();
        if (user.notice) {
            alert(user.notice);
        }
        else {
            dispatch(setCurrentUser(user.data));
            dispatch(setFormDataForEdit(user.data));
            dispatch(getMyChars());
        }
    }
}

export const editCurrentUser = (userData, history) => {
    return async dispatch => {
        const userDataId = userData.currentUser.id
        const res = await fetch(`http://localhost:3001/api/v1/users/${userDataId}`, {
            credentials: "include",
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        const user = await res.json()
        if (user.error) {
            alert(user.error)
        }
        else {
            dispatch(updatedCurrentUser(user.data))
            dispatch(getMyChars());
            history.push(`/users/${user.data.attributes.name}`)
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(clearCurrentUser())
        dispatch(resetUserForm())
        await fetch('http://localhost:3001/api/v1/logout', {
            credentials: "include",
            method: "DELETE"
        });
    }
}

export const deleteCurrentUser = (currentUser, history) => {
    return async dispatch => {
      const r = await fetch(`http://localhost:3001/api/v1/users/${currentUser.id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resp = await r.json();
        if (resp.error) {
            alert(resp.error);
        }
        else {
            dispatch(deletedUser(currentUser));
            dispatch(clearCurrentUser());
            dispatch(resetUserForm());
            alert(resp.data);
            history.push(`/`);
        }
    }
}