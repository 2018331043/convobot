package com.arcane.convobot.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class WebCrawlerService {
    public String getAllTextDataFromAWebPage(String websiteURL){
        String pageContent = "";
        try {
            Document document = Jsoup.connect(websiteURL)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")
                    .header("Accept-Language", "*")
                    .get();
            pageContent = document.text(); // Extract all text from the HTML
            System.out.println(pageContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pageContent;
    }
}
