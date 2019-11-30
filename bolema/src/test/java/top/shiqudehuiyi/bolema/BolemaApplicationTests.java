package top.shiqudehuiyi.bolema;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.shiqudehuiyi.bolema.question.entity.TQuestion;
import top.shiqudehuiyi.bolema.question.mapper.TQuestionMapper;
import top.shiqudehuiyi.bolema.question.utils.BaseModel;
import top.shiqudehuiyi.bolema.question.utils.BaseModelFactory;

@SpringBootTest
class BolemaApplicationTests {

    @Autowired
    TQuestionMapper tQuestionMapper;
    @Test
    void contextLoads() {
        String title = "调用 router.push(…)时，参数可以是";
        String option = "A、命名路由B、字符串C、对象D、都不正确";
        QueryWrapper<TQuestion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("q_title", title).eq("q_option", option);
        TQuestion one = tQuestionMapper.selectOne(queryWrapper);
        BaseModel baseModel = null;
        if (one != null){
            baseModel = BaseModelFactory.installModel(one, 0);
        } else {
            baseModel = BaseModelFactory.installModel(one, 1);
        }
        System.out.println(baseModel);
    }

}
