package top.shiqudehuiyi.bolema.question.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author 雷智民
 * @Date 2019-11-30 2:11
 * @Version 1.0
 */
public class BaseModelFactory {

    static Map<Integer,String> map = new HashMap<>();
    static {
        map.put(0,"执行成功");
        map.put(1, "执行失败");
    }

    public static BaseModel installModel(Object object, Integer code) {
        return new BaseModel(code, map.get(code), object);
    }
}
