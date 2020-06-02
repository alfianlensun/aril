let initialStatePermission =  {
    location: false,
    camera: false
}

export default function(state = initialStatePermission, action){
    switch (action.type) {
        case "SET_PERMISSION":
            return action.payload;
            break;
    }
    return state
} 