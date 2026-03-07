//
//  AudioEngineModule.mm
//  TSA Audio App
//
//  React Native bridge implementation
//

#import "AudioEngineModule.h"
#import "RealtimeAudioProcessor.h"
#import <React/RCTLog.h>

@implementation AudioEngineModule {
    RealtimeAudioProcessor *processor;
}

RCT_EXPORT_MODULE(AudioEngine);

RCT_EXPORT_METHOD(start:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (processor == nil) {
            processor = [[RealtimeAudioProcessor alloc] init];
        }
        [processor start];
        resolve(@YES);
        RCTLogInfo(@"Audio engine started");
    } @catch (NSException *exception) {
        reject(@"START_ERROR", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(stop:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [processor stop];
        resolve(@YES);
        RCTLogInfo(@"Audio engine stopped");
    } @catch (NSException *exception) {
        reject(@"STOP_ERROR", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(setMode:(NSString *)mode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [processor setMode:mode];
        resolve(@YES);
        RCTLogInfo(@"Mode set to: %@", mode);
    } @catch (NSException *exception) {
        reject(@"SET_MODE_ERROR", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getTelemetry:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSDictionary *telemetry = [processor getTelemetry];
        resolve(telemetry);
    } @catch (NSException *exception) {
        reject(@"GET_TELEMETRY_ERROR", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(isCalibrated:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        BOOL calibrated = [processor isCalibrated];
        resolve(@(calibrated));
    } @catch (NSException *exception) {
        reject(@"IS_CALIBRATED_ERROR", exception.reason, nil);
    }
}

- (void)dealloc
{
    [processor cleanup];
    processor = nil;
}

@end
