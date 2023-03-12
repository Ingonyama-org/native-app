import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    takenPhotos: [],
    submittedPhotos: [],
  },
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload;
    },
    takePhoto: (state, actions) => {
      state.takenPhotos.unshift(actions.payload);
    },
    submittedPhoto: (state, actions) => {
      state.submittedPhotos.unshift(actions.payload);
    },
    removeTakenPhoto: (state, actions) => {
      state.takenPhotos.map(({ img }, index) => {
        img === actions.payload && state.takenPhotos.splice(index, 1);
      });
    },
    removeSubmittedPhoto: (state, actions) => {
      state.submittedPhotos.map(({ img }, index) => {
        img === actions.payload && state.submittedPhotos.splice(index, 1);
      });
    },
    deleteAll: (state) => {
      state.takenPhotos = [];
    },
    logout: (state) => {
      state.user = null;
      state.takenPhotos = [];
      state.submittedPhotos = [];
    },
  },
});

export const {
  takePhoto,
  deleteAll,
  submittedPhoto,
  removeTakenPhoto,
  removeSubmittedPhoto,
  login,
  logout,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectTakenPhotos = (state) => state.takenPhotos;
export const selectSubmittedPhotos = (state) => state.submittedPhotos;
export const selectRemoveTakenPhoto = (state) => state.takenPhotos;
export const selectRemoveSubmittedPhoto = (state) => state.takenPhotos;

export default userSlice.reducer;
