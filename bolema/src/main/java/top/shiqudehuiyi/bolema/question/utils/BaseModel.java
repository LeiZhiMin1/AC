package top.shiqudehuiyi.bolema.question.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @Author 雷智民
 * @Date 2019-11-30 2:06
 * @Version 1.0
 */
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Accessors
public class BaseModel implements Serializable {

    /**
     *状态码
     */
    private Integer code;
    /**
     * 消息
     */
    private String message;
    /**
     * 内容
     */
    private Object data;
}
