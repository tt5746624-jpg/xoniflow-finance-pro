package com.xoni.flow;

import android.annotation.SuppressLint;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import com.google.android.material.card.MaterialCardView;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    private WebView mainWebView;
    private SharedPreferences prefs;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        prefs = getSharedPreferences("xoni_flow_native_prefs", Context.MODE_PRIVATE);
        mainWebView = findViewById(R.id.mainWebView);

        String savedBg = prefs.getString("surface_bg", "#0F0D13");
        applySystemBarsColor(savedBg, "#141218");

        WebSettings settings = mainWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setTextZoom(100);
        settings.setMediaPlaybackRequiresUserGesture(false);

        mainWebView.addJavascriptInterface(new XoniNativeBridge(), "XoniNative");
        mainWebView.setWebChromeClient(new WebChromeClient());
        mainWebView.setWebViewClient(new WebViewClient());

        mainWebView.loadUrl("file:///android_asset/www/index.html");

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (mainWebView != null) {
                    mainWebView.evaluateJavascript(
                        "(function(){ if(window.handleAndroidBack && window.handleAndroidBack()) return 'handled'; return 'exit'; })()",
                        result -> {
                            if (result == null || result.contains("exit")) {
                                showExitConfirmationDialog();
                            }
                        }
                    );
                } else {
                    finish();
                }
            }
        });
    }

    private void showExitConfirmationDialog() {
        new MaterialAlertDialogBuilder(this)
            .setTitle("Exit XoniFlow Pro?")
            .setMessage("Your transactions, budgets, and custom color themes are automatically saved on device.")
            .setPositiveButton("Exit App", (d, w) -> finish())
            .setNegativeButton("Stay", null)
            .show();
    }

    private void applySystemBarsColor(String statusHex, String navHex) {
        runOnUiThread(() -> {
            try {
                Window window = getWindow();
                window.setStatusBarColor(Color.parseColor(statusHex));
                window.setNavigationBarColor(Color.parseColor(navHex));
            } catch (Exception ignored) {
            }
        });
    }

    public class XoniNativeBridge {

        @JavascriptInterface
        public void haptic(int ms) {
            try {
                Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(VibrationEffect.createOneShot(Math.max(10, ms), VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        v.vibrate(Math.max(10, ms));
                    }
                }
            } catch (Exception ignored) {
            }
        }

        @JavascriptInterface
        public void syncThemeColors(String primaryHex, String bgHex, String surfaceHex) {
            prefs.edit()
                .putString("primary_hex", primaryHex)
                .putString("surface_bg", bgHex)
                .putString("surface_card", surfaceHex)
                .apply();
            applySystemBarsColor(bgHex, surfaceHex);
        }

        @JavascriptInterface
        public void openNativeColorPicker(String initialHex, String targetKey) {
            runOnUiThread(() -> {
                View dialogView = LayoutInflater.from(MainActivity.this)
                    .inflate(R.layout.dialog_native_color_picker, null, false);

                MaterialCardView cardSwatch = dialogView.findViewById(R.id.cardPreviewSwatch);
                TextView txtHex = dialogView.findViewById(R.id.txtHexPreview);
                SeekBar seekR = dialogView.findViewById(R.id.seekRed);
                SeekBar seekG = dialogView.findViewById(R.id.seekGreen);
                SeekBar seekB = dialogView.findViewById(R.id.seekBlue);

                int parsed = Color.parseColor("#00E676");
                try {
                    parsed = Color.parseColor(initialHex);
                } catch (Exception ignored) {}

                final int[] rgb = { Color.red(parsed), Color.green(parsed), Color.blue(parsed) };
                seekR.setProgress(rgb[0]);
                seekG.setProgress(rgb[1]);
                seekB.setProgress(rgb[2]);

                Runnable updatePreview = () -> {
                    int c = Color.rgb(rgb[0], rgb[1], rgb[2]);
                    String hex = String.format("#%02X%02X%02X", rgb[0], rgb[1], rgb[2]);
                    cardSwatch.setCardBackgroundColor(c);
                    txtHex.setText(hex);
                    double lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255.0;
                    txtHex.setTextColor(lum > 0.55 ? Color.parseColor("#0F0D13") : Color.WHITE);
                };
                updatePreview.run();

                SeekBar.OnSeekBarChangeListener listener = new SeekBar.OnSeekBarChangeListener() {
                    @Override
                    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                        rgb[0] = seekR.getProgress();
                        rgb[1] = seekG.getProgress();
                        rgb[2] = seekB.getProgress();
                        updatePreview.run();
                    }
                    @Override public void onStartTrackingTouch(SeekBar seekBar) {}
                    @Override public void onStopTrackingTouch(SeekBar seekBar) {}
                };
                seekR.setOnSeekBarChangeListener(listener);
                seekG.setOnSeekBarChangeListener(listener);
                seekB.setOnSeekBarChangeListener(listener);

                new MaterialAlertDialogBuilder(MainActivity.this)
                    .setTitle("Native M3 RGB Color Studio")
                    .setView(dialogView)
                    .setPositiveButton("Apply Color", (d, w) -> {
                        String hex = String.format("#%02X%02X%02X", rgb[0], rgb[1], rgb[2]);
                        mainWebView.evaluateJavascript(
                            "window.onNativeColorPicked && window.onNativeColorPicked('" + targetKey + "', '" + hex + "');",
                            null
                        );
                    })
                    .setNegativeButton("Cancel", null)
                    .show();
            });
        }

        @JavascriptInterface
        public void shareExportFile(String filename, String content, String mimeType) {
            runOnUiThread(() -> {
                try {
                    File outFile = new File(getCacheDir(), filename);
                    try (FileOutputStream fos = new FileOutputStream(outFile)) {
                        fos.write(content.getBytes(StandardCharsets.UTF_8));
                    }
                    Uri uri = FileProvider.getUriForFile(
                        MainActivity.this,
                        getPackageName() + ".fileprovider",
                        outFile
                    );
                    Intent shareIntent = new Intent(Intent.ACTION_SEND);
                    shareIntent.setType(mimeType != null ? mimeType : "text/plain");
                    shareIntent.putExtra(Intent.EXTRA_STREAM, uri);
                    shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(shareIntent, "Export " + filename));
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this, "Export saved: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        }

        @JavascriptInterface
        public void copyToClipboard(String label, String text) {
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                if (cm != null) {
                    cm.setPrimaryClip(ClipData.newPlainText(label, text));
                    Toast.makeText(MainActivity.this, "Copied to clipboard", Toast.LENGTH_SHORT).show();
                }
            });
        }

        @JavascriptInterface
        public void toast(String message) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show());
        }
    }
}
