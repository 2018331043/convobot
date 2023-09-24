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
}
