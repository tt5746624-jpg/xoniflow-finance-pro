@rem Gradle startup script for Windows
@echo off
set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set WRAPPER_JAR=%DIRNAME%gradle\wrapper\gradle-wrapper.jar
if exist "%WRAPPER_JAR%" (
    java.exe -Xmx64m -Xms64m -classpath "%WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
) else (
    gradle %*
)
