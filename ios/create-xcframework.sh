#!/bin/bash
# create-xcframework.sh
set -e

FFTW_DIR="$HOME/Desktop/setup/fftw-ios"
OUTPUT_DIR="$(pwd)"

echo "Creating XCFramework..."

# Clean previous
rm -rf "${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}"

# Extract arm64 simulator slice separately
mkdir -p "${OUTPUT_DIR}/sim-arm64"
mkdir -p "${OUTPUT_DIR}/sim-x86_64"

lipo "${FFTW_DIR}/universal-simulator/lib/libfftw3f.a" \
  -extract arm64 \
  -output "${OUTPUT_DIR}/sim-arm64/libfftw3f.a"

lipo "${FFTW_DIR}/universal-simulator/lib/libfftw3f.a" \
  -extract x86_64 \
  -output "${OUTPUT_DIR}/sim-x86_64/libfftw3f.a"

# Create XCFramework using libraries directly
xcodebuild -create-xcframework \
  -library "${FFTW_DIR}/universal-device/lib/libfftw3f.a" \
  -headers "${FFTW_DIR}/include" \
  -library "${OUTPUT_DIR}/sim-x86_64/libfftw3f.a" \
  -headers "${FFTW_DIR}/include" \
  -output "${OUTPUT_DIR}/fftw3.xcframework"

echo "XCFramework created at: ${OUTPUT_DIR}/fftw3.xcframework"
