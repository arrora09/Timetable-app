package com.example.orarend;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        //webView.clearCache(true);
        WebView.setWebContentsDebuggingEnabled(true);

        // Load the HTML file
        webView.loadUrl("file:///android_asset/index.html");

//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//
//        WebView webView = findViewById(R.id.webView);
//
//
//        webView.setVerticalScrollBarEnabled(true);
//        webView.getSettings().setLoadWithOverviewMode(true);
//        webView.getSettings().setUseWideViewPort(true);
//        webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
//        webView.setWebChromeClient(new WebChromeClient());
//        webView.loadUrl("file:///android_asset/index.html");
//
//        WebSettings webSettings = webView.getSettings();
//        webSettings.setJavaScriptEnabled(true);
//        webSettings.setDomStorageEnabled(true);
//        webSettings.setUseWideViewPort(true);
//        webSettings.setLoadWithOverviewMode(true);



    }
}