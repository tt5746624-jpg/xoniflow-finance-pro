# XoniFlow Pro v3.5 — Income & Expense Suite (Android Studio + iOS Xcode + GitHub Actions CI/CD)

Complete cross-platform **Android & iOS** Income & Expense Tracker application featuring **Material 3 Dark Tonal UI (`#0F0D13`, `#141218`, `#1D1B20`)**, a **Live Custom Color Picker Studio (2D HSV Color Wheel + Native Android M3 RGB Dialog + 24 Theme Presets)**, and **112+ Built-in Financial Features**.

---

## 🚀 1-Click GitHub Cloud Build (Android `.apk`/`.aab` + iOS `.ipa`)

1. Create a new repository on GitHub.
2. Extract this ZIP and push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: XoniFlow Pro Android & iOS"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. Open the **Actions** tab on your GitHub repository:
   - **`Build Android (APK & AAB)`** runs on `ubuntu-latest` and produces `XoniFlow-Android-Debug-APK` and `XoniFlow-Android-Release-Bundle`.
   - **`Build iOS (Xcode App & Unsigned IPA)`** runs on `macos-14` and produces `XoniFlow-iOS-Unsigned.ipa` (installable via AltStore, Sideloadly, Scarlet, or TrollStore) plus Simulator build artifacts.

---

## 🛠️ Local Build Instructions

### Android Studio (Koala / Ladybug or newer)
1. Open **Android Studio** → **Open** → Select this project root folder.
2. Let Gradle sync automatically (uses JDK 17 & Android Gradle Plugin 8.5.2).
3. Click **Run ▶** or run:
   ```bash
   ./gradlew assembleDebug
   ```

### iOS (macOS + Xcode 15/16)
1. Open `ios/XoniFlow/XoniFlow.xcodeproj` in **Xcode**.
2. Select an iPhone Simulator or connected iOS device and press **Cmd + R**.

---

## 🎨 Custom Color Picker Studio Highlights
- **Interactive 2D HSV Color Wheel** with Brightness/Value control.
- **6 Independent Color Tokens**: Primary Accent (`--primary`), Secondary Accent (`--secondary`), Income Positive (`--income`), Expense Negative (`--expense`), App Background (`--bg-main`), and Card Surface (`--bg-card`).
- **Native Android Material 3 RGB Color Picker Dialog** (`dialog_native_color_picker.xml` with `MaterialCardView` inside a `ScrollView` root `ViewGroup`).
- **24 One-Tap Designer Theme Presets** + Corner Radius, Neon Glow, and Font Scale sliders.
