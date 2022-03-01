import org.junit.jupiter.api.Test;

import java.util.Calendar;
import java.util.Date;

public class test {

    @Test
    public void test() {
        Calendar c = Calendar.getInstance();
        Date d = new Date();
        d.setTime(1646492409000L);
        c.setTime(d);

        String week = String.valueOf(c.get(Calendar.WEEK_OF_MONTH));
        System.out.println(c.get(Calendar.MONTH));

        System.out.println(week);
    }
}
