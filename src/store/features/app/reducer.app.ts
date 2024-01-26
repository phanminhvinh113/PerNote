import { THEME_MODE } from "../../../utils/constant.app";
import { AppSliceType } from "./appSlice";

//
class AppReducer {
  public toggleTheme(state: AppSliceType) {
    state.theme = state.theme === THEME_MODE.Dark ? THEME_MODE.Light : THEME_MODE.Dark;
  }
  public toggleHiddenBanner(state: AppSliceType) {
    state.isHiddenBanner = !state.isHiddenBanner;
  }
}
export default new AppReducer();
