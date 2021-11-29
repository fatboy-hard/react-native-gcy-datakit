
declare module 'react-native-yuque' {
    export function initFTSDK(initFTSDK): void;
    export function init(init): void;
    export function startRum(rum): void;
    export function startLogger(logger): void;
    export function startTrace(trace): void;
    export interface initFTSDK {
        url: string
        appid: string
        trackId: string
        isDebug?: boolean | true
    }
    export interface init {
        url: string
        env?: number | 1
        isEnable?: boolean | true
    }

    export interface rum {
        appid: string
        isANR?: boolean | true
        isCrash?: boolean | true
        isFreeze?: boolean | true
        isAction?: boolean | true
    }
    export interface logger {
        isCustom?: boolean | true
        isRum?: boolean | true
        isConsole?: boolean | true
    }
    export interface trace {
        type?: number | 2
        isRum?: boolean | true
    }

}