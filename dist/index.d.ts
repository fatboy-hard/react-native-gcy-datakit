/**
 *
 * @param url : Datakit 安装地址
 * @param appid 应用地址
 * @param trackId : // 添加标签数据，用于用户监测数据源区分，如果需要使用追踪功能，则参数 key 为 track_id ,value 为任意数值
 * @param isDebug : 是否为debug
 */
export declare function initFTSDK(url: string, appid: string, trackValue?: string, isDebug?: boolean, env?: number): void;
/**
 * SDK配置与调用
 *
 * @param metricsUrl 数据上报地址
 * @param env        默认 EnvType.PROD ,PROD :0 线上环境 ,GRAY :1灰度环境 ,PRE :2预发布环境 ,COMMON: 3日常环境 ,LOCAL: 4本地环境
 * @param isDebug    ///在debug环境下,设置为YES
*/
export declare function init(metricsUrl: string, env?: number, isDebug?: boolean): void;
/**
 * 开启rum
 *
 * @param appid    开发平台获取,指定才能 启动
 * @param isANR    设置是否需要采集卡顿无响应事件
 * @param isCrash  设置是否需要采集奔溃日志
 * @param isFreeze 设置是否需要采集卡顿
 * @param isAction 设置是否追踪用户操作
 */
export declare function startRum(appid: string, isANR?: boolean, isCrash?: boolean, isFreeze?: boolean, isAction?: boolean): void;
/**
 * Log 配置
 *
 * @param isCustom  是否允许上传自定义 log
 * @param isRum     是否将 logger 数据与 rum 关联
 * @param isConsole 是否允许上传自定义 log
 */
export declare function startLogger(isCustom?: boolean, isRum?: boolean, isConsole?: boolean): void;
/**
* Trace配置
*
* @param type  默认为 DDTrace，目前支持 Zipkin :1, Jaeger:2, DDTrace :0
* @param isRum 是否将 Trace 数据与 rum 关联
*/
export declare function startTrace(type?: number, isRum?: boolean): void;
//# sourceMappingURL=index.d.ts.map