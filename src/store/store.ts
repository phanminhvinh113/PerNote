import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listReducer, { listPersistConfig } from "./features/list/listSlice";
import appReducer, { appPersistConfig } from "./features/app/appSlice";
import boardReducer from "./features/board/boardSlice";
import columnReducer from "./features/column/columnSlice";
import cardReducer from "./features/card/cardSlice";

//
const rootReducer = combineReducers({
  listBoard: persistReducer(listPersistConfig, listReducer),
  app: persistReducer(appPersistConfig, appReducer),
  board: boardReducer,
  column: columnReducer,
  card: cardReducer,
});
//
//const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
//
export const store = configureStore({
  reducer: rootReducer,
});
//
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
