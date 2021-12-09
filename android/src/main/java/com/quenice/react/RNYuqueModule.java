package com.quenice.react;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ft.sdk.EnvType;
import com.ft.sdk.FTLoggerConfig;
import com.ft.sdk.FTRUMConfig;
import com.ft.sdk.FTSDKConfig;
import com.ft.sdk.FTSdk;
import com.ft.sdk.FTTraceConfig;
import com.ft.sdk.MonitorType;
import com.ft.sdk.TraceType;
import com.ft.sdk.FTRUMGlobalManager;

public class RNYuqueModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNYuqueModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNYuque";
    }

    /**
     * 此方法用于绑定用户
     * @param ID 绑定用户ID
     */
    @ReactMethod
    public  void  bindUser(String ID){
        FTSdk.bindRumUserData(ID);
    }

    /**
     * 退出登录使用此方法
     */
    @ReactMethod
    public  void  logout(){
        FTSdk.unbindRumUserData();
    }
    /**
     * 用户界面停留追踪
     * @param pageName 停留页面名称
     * @param referrer 父页面
     */

    @ReactMethod
    public void  onResume(String pageName,String referrer){
        FTRUMGlobalManager.get().startView(pageName,referrer);


    }

    /**
     * 停止追踪用户
     */
    @ReactMethod
    public  void  onPause(){
        FTRUMGlobalManager.get().stopView();
    }
    /**
     * SDK配置与调用
     *
     * @param metricsUrl 数据上报地址
     * @param env        默认 EnvType.PROD ,PROD :0 线上环境 ,GRAY :1灰度环境 ,PRE :2预发布环境 ,COMMON: 3日常环境 ,LOCAL: 4本地环境
     * @param isDebug    ///在debug环境下,设置为YES
     */

    @ReactMethod
    public void init(String metricsUrl, int env, boolean isDebug) {
        //基础参数配置
        FTSDKConfig ftSDKConfig = FTSDKConfig.builder(metricsUrl)////Datakit 安装地址
                .setXDataKitUUID("ft-dataKit-uuid-001")
                //.setUseOAID(true)//设置 OAID 是否可用
                .setDebug(isDebug)//设置是否是 debug
                .setEnv(EnvType.values()[env]);

        FTSdk.install(ftSDKConfig);
    }

    /**
     * 开启rum
     *
     * @param appid    开发平台获取,指定才能 启动
     * @param isANR    设置是否需要采集卡顿无响应事件
     * @param isCrash  设置是否需要采集奔溃日志
     * @param isFreeze 设置是否需要采集奔溃日志
     * @param isAction 设置是否追踪用户操作
     */

    @ReactMethod
    public void startRum(String appid, boolean isANR, boolean isCrash, boolean isFreeze, boolean isAction) {
        //RUM 配置
        FTSdk.initRUMWithConfig(new FTRUMConfig()
                .setSamplingRate(1f)
                .setRumAppId(appid)
                ///是否设置需要采集卡顿无响应事件
                .setEnableTrackAppANR(isANR)
                ///是否设置需要采集奔溃日志
                .setEnableTrackAppCrash(isCrash)
                ///是否需要采集卡顿
                .setEnableTrackAppUIBlock(isFreeze)
                ///是否追踪用户操作
                .setEnableTraceUserAction(isAction)

                //.addGlobalContext("track_id", AccountUtils.getProperty(this, AccountUtils.TRACK_ID))
                .addGlobalContext("custom_tag", "any tags")
                .setExtraMonitorTypeWithError(MonitorType.ALL));

    }

    /**
     * Log 配置
     *
     * @param isCustom  是否允许上传自定义 log
     * @param isRum     是否将 logger 数据与 rum 关联
     * @param isConsole 是否允许上传自定义 log
     */
    @ReactMethod
    public void startLogger(boolean isCustom, boolean isRum, boolean isConsole) {
        //Log配置
        FTSdk.initLogWithConfig(new FTLoggerConfig()
                .setSamplingRate(1f)
                .setEnableLinkRumData(isRum)
                .setEnableCustomLog(isCustom)
                .setEnableConsoleLog(isConsole)
        );
    }

    /**
     * Trace配置
     *
     * @param type  默认为 DDTrace，目前支持 Zipkin :1, Jaeger:2, DDTrace :0
     * @param isRum 是否将 Trace 数据与 rum 关联
     */
    @ReactMethod
    public void startTrace(int type, boolean isRum) {
        //Trace配置
        FTSdk.initTraceWithConfig(new FTTraceConfig()
                .setSamplingRate(1f)
                .setEnableLinkRUMData(isRum)
                .setTraceType(TraceType.DDTRACE));
    }


    //SDK 初始化 默认配置
    @ReactMethod
    public void initFTSDK(String serverUrl, String AppId, String trackId, boolean isDebug,int env) {

        //基础参数配置
        FTSDKConfig ftSDKConfig = FTSDKConfig.builder(serverUrl)////Datakit 安装地址
                .setXDataKitUUID("ft-dataKit-uuid-001")
                .setUseOAID(false)//设置 OAID 是否可用
                .setDebug(isDebug)//设置是否是 debug
                .setEnv(EnvType.values()[env]);
        FTSdk.install(ftSDKConfig);

        //Log配置
        FTSdk.initLogWithConfig(new FTLoggerConfig()
                .setSamplingRate(1f)
                .setEnableLinkRumData(true)
                .setEnableCustomLog(true)
                .setEnableConsoleLog(true)
                .setEnableLinkRumData(true)
        );

        //RUM 配置
        FTSdk.initRUMWithConfig(new FTRUMConfig()
                .setSamplingRate(1f)
                .setRumAppId(AppId)
                .setEnableTraceUserAction(true)
                .setEnableTrackAppANR(true)
                .setEnableTrackAppCrash(true)
                .setEnableTrackAppUIBlock(true)
                .setEnableTraceUserView(false)
                .addGlobalContext("track_id", trackId)
                .addGlobalContext("custom_tag", "any tags")
                .setExtraMonitorTypeWithError(MonitorType.ALL));


        //Trace配置
        FTSdk.initTraceWithConfig(new FTTraceConfig()
                .setSamplingRate(1f)
                .setEnableLinkRUMData(true)
                .setTraceType(TraceType.DDTRACE));
    }
}