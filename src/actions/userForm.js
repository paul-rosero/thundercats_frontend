//synchronous action creators
export const updateUserForm = (name, value) => {
    const formData = { name, value }
    return {
        type: "UPDATE_USER_FORM",
        formData
    }
}

export const setFormDataForEdit = currentUser => {
    const userFormData = {
      name: currentUser.attributes.name,
      email: currentUser.attributes.email,
      username: currentUser.attributes.username
    }
    return {
      type: "SET_FORM_DATA_FOR_EDIT",
      userFormData
    }
  }

export const resetUserForm = () => {
    return {
        type: "RESET_USER_FORM"
    }
}

export const resetPasswordForm = (formData) => {
  return {
      type: "RESET_PASSWORD_FORM",
      formData
  }
}