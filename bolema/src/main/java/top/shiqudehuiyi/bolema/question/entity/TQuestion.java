package top.shiqudehuiyi.bolema.question.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author 雷智民
 * @since 2019-11-30
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "q_id", type = IdType.AUTO)
    private Integer qId;

    private String qTitle;

    private String qOption;

    private String qAnswer;


}
