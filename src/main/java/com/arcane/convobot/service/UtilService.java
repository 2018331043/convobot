package com.arcane.convobot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UtilService {
    public static String generateStringFromAListOfDoubles(List<Double> doubleList){
        return doubleList
                .stream()
                .map(Object::toString)
                .collect(Collectors.joining(", "));
    }
    public static List<Double> generateAListOfDoublesFromString(String doubleListAsString){
        return Arrays
                .stream(doubleListAsString.split(", "))
                .map(Double::parseDouble)
                .collect(Collectors.toList());
    }
    public static List<String> generateStringsFromText(String inputText){
        String[] sentences = inputText.split("\\.");

        // Convert the array to a List if needed
        List<String> sentenceList = Arrays.asList(sentences);

        //Trimming them
        sentenceList = sentenceList.stream()
                .map(String::trim)
                .collect(Collectors.toList());

        return  sentenceList;
    }
}
