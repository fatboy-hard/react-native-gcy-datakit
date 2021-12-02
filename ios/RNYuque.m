
#import "RNYuque.h"
#import <FTMobileSDK/FTMobileAgent.h>
@implementation RNYuque

RCT_EXPORT_MODULE()
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_REMAP_METHOD(initFTSDK,withMetricsUrl:(NSString *)url
                  appID:(NSString *)appid
                  trackId:(NSString *)trackId
                  isDebug:(BOOL)isDebug
                  env:(int)env){
    
        FTMobileConfig *config = [[FTMobileConfig alloc]initWithMetricsUrl:url];
        config.enableSDKDebugLog = isDebug;
        config.env = env;
        //启动 SDK
        [FTMobileAgent startWithConfigOptions:config];
        
        //开启 rum
        FTRumConfig *rumConfig = [[FTRumConfig alloc]init];
        rumConfig.appid = appid;
        rumConfig.enableTrackAppCrash = YES;
        rumConfig.enableTrackAppANR = YES;
        rumConfig.enableTrackAppFreeze = YES;
        rumConfig.enableTraceUserAction = YES;
        [[FTMobileAgent sharedInstance] startRumWithConfigOptions:rumConfig];
        
        //开启 logger
        FTLoggerConfig *loggerConfig = [[FTLoggerConfig alloc]init];
        loggerConfig.enableCustomLog = YES;
        loggerConfig.enableLinkRumData = YES;
        loggerConfig.enableConsoleLog = YES;
        [[FTMobileAgent sharedInstance] startLoggerWithConfigOptions:loggerConfig];
        
        //开启 trace
        FTTraceConfig *traceConfig = [[FTTraceConfig alloc]init];
        traceConfig.enableLinkRumData = YES;
        traceConfig.networkTraceType = FTNetworkTraceTypeDDtrace;
        [[FTMobileAgent sharedInstance] startTraceWithConfigOptions:traceConfig];
    
}

///配置 FTMobileConfig 启动 SDK
/**
 *@method 指定初始化方法,设置 metricsUrl配置
 *@param metricsUrl 数据上报地址
 *env 0 线上环境,1 灰度环境 2 预发布环境,3 日常环境,4 本地环境
 */

RCT_REMAP_METHOD(init,withMetricsUrl:(NSString *)url
                                    env:(NSInteger)env
                                    enableSDKDebugLog:(BOOL)isEnable){
    FTMobileConfig *config = [[FTMobileConfig alloc] initWithMetricsUrl:url];
    config.env = env;
    ///在debug环境下,设置为YES
    config.enableSDKDebugLog = isEnable;
    [FTMobileAgent startWithConfigOptions:config];
}
///开启rum
/**
 *@param
 *  appid:开发平台获取,指定才能 启动
 *。enableTrackAppANR:设置是否需要采集卡顿无响应事件
 *。 enableTrackAppCrash:设置是否需要采集奔溃日志
 *。 enableTrackAppFreeze:设置是否需要采集卡顿
 *     enableTraceUserAction:设置是否追踪用户操作
 */
RCT_REMAP_METHOD(startRum,withAppID:(NSString *)appid
                   enableTrackAppANR:(BOOL)isANR
                   enableTrackAppCrash:(BOOL)isCrash
                   enableTrackAppFreeze:(BOOL)isFreeze
                   enableTraceUserAction:(BOOL)isAction){
    FTRumConfig *rumConfig = [[FTRumConfig alloc] init];
    rumConfig.appid = appid;
    ///是否设置需要采集卡顿无响应事件
    rumConfig.enableTrackAppANR = isANR;
    ///是否设置需要采集奔溃日志
    rumConfig.enableTrackAppCrash = isCrash;
    ///是否需要采集卡顿
    rumConfig.enableTrackAppFreeze = isFreeze;
    ///是否追踪用户操作
    rumConfig.enableTraceUserAction = isAction;
    [[FTMobileAgent sharedInstance] startRumWithConfigOptions:rumConfig];
}
///开启logger
/**
 *@param
 *  enableLinkRumData 是否将 logger 数据与 rum 关联
 *  enableCustomLog 是否允许上传自定义 log
 *  enableConsoleLog:设置是否需要采集控制台日志 默认为NO
 *
 */
RCT_REMAP_METHOD(startLogger,withCustomLog:(BOOL)isCustom
                  enableLinkRumData:(BOOL)isRum
                  enableConsoleLog:(BOOL)isConsole ){
    FTLoggerConfig *loggerConfig = [[FTLoggerConfig alloc]init];
    /**
     * 是否允许上传自定义 log
     */
    loggerConfig.enableCustomLog = YES;
    /**
     * 是否将 logger 数据与 rum 关联
     */
    loggerConfig.enableLinkRumData = YES;
    /**
     *设置是否需要采集控制台日志 默认为NO
     */
    loggerConfig.enableConsoleLog = YES;
    [[FTMobileAgent sharedInstance] startLoggerWithConfigOptions:loggerConfig];
}
//开启 trace
/**
 *@param
 *networkTraceType: Zipkin:0  Jaeger:1 DDtrace:2
 */
RCT_REMAP_METHOD(startTrace,withTraceType:(FTNetworkTraceType)type
                  enableLinkRumData:(BOOL)isRum){
    FTTraceConfig *traceConfig = [[FTTraceConfig alloc]init];
    /**
     是否将 Trace 数据与 rum 关联
     */
    traceConfig.enableLinkRumData = isRum;
    /**
     设置网络请求信息采集时 使用链路追踪类型 type 默认为 Zipkin
     */
    traceConfig.networkTraceType = type;
    [[FTMobileAgent sharedInstance] startTraceWithConfigOptions:traceConfig];
}
@end
  
