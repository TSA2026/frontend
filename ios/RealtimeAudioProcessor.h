//
//  RealtimeAudioProcessor.h
//  TSA Audio App
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RealtimeAudioProcessor : NSObject

- (instancetype)init;
- (void)start;
- (void)stop;
- (void)setMode:(NSString *)mode;
- (NSDictionary *)getTelemetry;
- (BOOL)isCalibrated;
- (void)cleanup;
- (void)applyCustomParamsWithNoiseThreshold:(float)noiseThresholdDb
                                  gateFloor:(float)gateFloorDb
                              gateSmoothing:(float)gateSmoothing
                                 hfEmphasis:(float)hfEmphasisDb
                                bandTargets:(nullable float *)bandTargets
                               bandMaxGains:(nullable float *)bandMaxGains;

@end

NS_ASSUME_NONNULL_END