export const setUserPermission = (state, permission) => {
    let _state = {...state}
    for (const perm of Object.keys(permission)){
        _state[perm] = permission[perm]
    }

    return {
        type: 'SET_PERMISSION',
        payload: permission
    }
}