#!/bin/sh
# Gradle startup script for Linux/macOS and GitHub Actions
APP_HOME=$( cd "${0%/*}" && pwd -P ) || exit
WRAPPER_JAR="$APP_HOME/gradle/wrapper/gradle-wrapper.jar"
if [ ! -f "$WRAPPER_JAR" ]; then
    mkdir -p "$APP_HOME/gradle/wrapper"
    curl -sL "https://raw.githubusercontent.com/gradle/gradle/v8.7.0/gradle/wrapper/gradle-wrapper.jar" -o "$WRAPPER_JAR" || true
fi
if [ -f "$WRAPPER_JAR" ]; then
    exec java -Xmx64m -Xms64m -classpath "$WRAPPER_JAR" org.gradle.wrapper.GradleWrapperMain "$@"
else
    exec gradle "$@"
fi
