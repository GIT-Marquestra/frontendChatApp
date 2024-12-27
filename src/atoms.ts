import { atom } from "recoil";

export const formDataState = atom({
    key: "formDataState",
    default: {
        title: "",
        description: "",
        imgURL: "",
    }
});

export const imageState = atom({
    key: "imageState",
    default: null
})

export const isUploadingState = atom({
    key: "isUploadingState",
    default: false
})

export const isSignedUpState = atom({
    key: "isSignedUpState",
    default: false
})

export const signUpFormDataState = atom({
    key: "signUpFormDataState",
    default: {
        username: "",
        email: "",
        password: ""
    }
})

export const signInFormDataState = atom({
    key: "signInFormDataState",
    default: {
        username: "",
        email: "",
        password: ""
    }
})
export const isSignedInState = atom({ 
    key: "isSignedInState",
    default: false
})
export const tokenState = atom({
    key: "tokenState",
    default: ''
})
export const imgURLstate = atom({
    key: "imgURLstate",
    default: ''
})
export const checkVarState = atom({
    key: "checkVarState",
    default: ''
})
export const blogState = atom({
    key: "blogState",
    default: [],
})
export const myBlogState = atom({
    key: "myBlogState",
    default: [],
})
export const loadingState = atom({
    key: "loadingState",
    default: true,
})
export const nameOfUserState = atom({
    key: "nameOfUserState",
    default: "",
})
export const inUpState = atom({
    key: "inUpState",
    default: false,
})
export const toggleState = atom({
    key: "toggleState",
    default: false,
})
export const bcImgState = atom({
    key: "bcImgState",
    default: "",
})
export const upimageState = atom({
    key: "upimageState",
    default: "",
})
export const upformState = atom({
    key: "upformState",
    default: {
        username: "",
        email: "",
        password: "",
        userpfp: ""
    },
})
export const profileState = atom({
    key: "profileState",
    default: "",
})
export const expandInfoState = atom({
    key: "expandInfoState",
    default: ({
        imgURL: "",
        title: "",
        description: "",
    }),
})
export const placeholderUsernameState = atom({
    key: "placeholderUsernameState",
    default: ""
})
export const placeholderEmailState = atom({
    key: "placeholderEmailState",
    default: ""
})
export const placeholderPasswordState = atom({
    key: "placeholderPasswordState",
    default: ""
})
export const userpfpState = atom({
    key: "userpfpState",
    default: ""
})

export const checkpassState = atom({
    key: "checkpassState",
    default: false
})
export const loggedInState = atom({
    key: "loggedInState",
    default: false
})
export const inPassState = atom({
    key: "inPassState",
    default: {
        inPass: ""
    }
})
export const targetSectionState = atom({
    key: 'targetSectionState',
    default: null,
});
export const showNavState = atom({
    key: 'showNavState',
    default: true,
});
export const myChatsState = atom({
    key: 'myChatsState',
    default: [],
});
export const searchRecState = atom({
    key: 'searchRecState',
    default: [],
});
export const noChatsOverlayState = atom({
    key: 'noChatsOverlayState',
    default: true,
});
export const webSocketState = atom<WebSocket | null>({
    key: 'webSocketState',
    default: null,
});
export const roomIDstate = atom({
    key: 'roomIDstate',
    default: null,
});
export const showNewChatNoteState = atom({
    key: 'showNewChatNoteState',
    default: false,
});
export const inputValueState = atom({
    key: 'inputValueState',
    default: "",
});
export const roomForMessagesState = atom({
    key: 'roomForMessagesState',
    default: "",
});
export const messToSendState = atom({
    key: 'messToSendState',
    default: "",
});
export const callGetFuncState = atom({
    key: 'callGetFuncState',
    default: false,
});
export const roomMessState = atom({
    key: 'roomMessState',
    default: [],
});
export const sendReRenderState = atom({
    key: 'sendReRenderState',
    default: false,
});
export const tempChatState = atom({
    key: 'tempChatState',
    default: {
        username: null,
        roomID: null,
        message: null
    },
});
export const noMessage = atom({
    key: 'noMessage',
    default: false,
});
export const createRoomDyn = atom({
    key: 'createRoomDyn',
    default: false,
});
export const reRender2State = atom({
    key: 'reRender2State',
    default: false,
});

