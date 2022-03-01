package com.polypoli.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {

    private static SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");

    public static String dateToString(Date date) {
        return transFormat.format(date);
    }
}
