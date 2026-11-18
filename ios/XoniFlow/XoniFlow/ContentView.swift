import SwiftUI
import WebKit
import UIKit

struct ContentView: View {
    var body: some View {
        ZStack {
            Color(red: 15/255, green: 13/255, blue: 19/255)
                .ignoresSafeArea()
            XoniWebViewContainer()
                .ignoresSafeArea(edges: .bottom)
        }
    }
}

struct XoniWebViewContainer: UIViewRepresentable {
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let contentController = WKUserContentController()
        contentController.add(context.coordinator, name: "iosBridge")

        let bridgeScript = """
        window.XoniNative = {
            haptic: function(ms) {
                window.webkit.messageHandlers.iosBridge.postMessage({action: 'haptic', ms: ms || 15});
            },
            syncThemeColors: function(primary, bg, surface) {
                window.webkit.messageHandlers.iosBridge.postMessage({action: 'syncTheme', primary: primary, bg: bg, surface: surface});
            },
            openNativeColorPicker: function(initialHex, targetKey) {
                if (window.openInAppRgbModal) window.openInAppRgbModal(initialHex, targetKey);
            },
            shareExportFile: function(filename, content, mimeType) {
                window.webkit.messageHandlers.iosBridge.postMessage({action: 'share', filename: filename, content: content});
            },
            copyToClipboard: function(label, text) {
                window.webkit.messageHandlers.iosBridge.postMessage({action: 'copy', text: text});
            },
            toast: function(msg) {
                window.webkit.messageHandlers.iosBridge.postMessage({action: 'toast', message: msg});
            }
        };
        """
        let userScript = WKUserScript(source: bridgeScript, injectionTime: .atDocumentStart, forMainFrameOnly: false)
        contentController.addUserScript(userScript)

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.allowsInlineMediaPlayback = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 15/255, green: 13/255, blue: 19/255, alpha: 1.0)
        webView.scrollView.backgroundColor = UIColor(red: 15/255, green: 13/255, blue: 19/255, alpha: 1.0)
        webView.scrollView.bounces = false

        if let indexURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www") {
            webView.loadFileURL(indexURL, allowingReadAccessTo: indexURL.deletingLastPathComponent())
        }
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    class Coordinator: NSObject, WKScriptMessageHandler {
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any],
                  let action = body["action"] as? String else { return }

            switch action {
            case "haptic":
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
            case "copy":
                if let text = body["text"] as? String {
                    UIPasteboard.general.string = text
                }
            case "share":
                if let filename = body["filename"] as? String,
                   let content = body["content"] as? String {
                    let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent(filename)
                    try? content.write(to: tempURL, atomically: true, encoding: .utf8)
                    DispatchQueue.main.async {
                        if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                           let rootVC = scene.windows.first?.rootViewController {
                            let activityVC = UIActivityViewController(activityItems: [tempURL], applicationActivities: nil)
                            rootVC.present(activityVC, animated: true)
                        }
                    }
                }
            default:
                break
            }
        }
    }
}
