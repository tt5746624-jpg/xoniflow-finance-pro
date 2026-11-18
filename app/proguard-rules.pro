-keep class com.xoni.flow.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
