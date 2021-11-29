import {
    NativeModules
} from "react-native";
const {
    RNYuque
} = NativeModules
export function initFTSDK(url, appid, trackId, isDebug = true) {
    RNYuque.initFTSDK(url, appid, trackId, isDebug)
}
export function initWithWithUrl(url, env = 3, isEnable = true) {
    RNYuque.init(url, env, isEnable)
}
export function startRum(appid, isANR = true, isCrash = true, isFreeze = true, isAction = true) {

    RNYuque.startRum(appid, isANR, isCrash, isFreeze, isAction)

}
export function startLogger(isCustom = true, isRum = true, isConsole = true) {
    RNYuque.startLogger(isCustom, isRum, isConsole)

}
export function startTrace(type = 2, isRum = true) {
    RNYuque.startTrace(type, isRum)

}