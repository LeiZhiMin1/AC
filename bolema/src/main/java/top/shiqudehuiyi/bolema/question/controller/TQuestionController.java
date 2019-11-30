package top.shiqudehuiyi.bolema.question.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import top.shiqudehuiyi.bolema.question.entity.TQuestion;
import top.shiqudehuiyi.bolema.question.service.ITQuestionService;
import top.shiqudehuiyi.bolema.question.utils.BaseModel;
import top.shiqudehuiyi.bolema.question.utils.BaseModelFactory;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 雷智民
 * @since 2019-11-30
 */
@RestController
public class TQuestionController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    ITQuestionService itQuestionService;

    @RequestMapping(value = "selectOption", method = RequestMethod.POST)
    public BaseModel selectQeuestion(String title, String option) {
        logger.debug(title+ "\t" +option);
        QueryWrapper<TQuestion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("q_title", title).eq("q_option", option);
        TQuestion one = itQuestionService.getOne(queryWrapper, false);
        BaseModel baseModel = null;
        if (one != null){
            baseModel = BaseModelFactory.installModel(one, 0);
        } else {
            baseModel = BaseModelFactory.installModel(one, 1);
        }
        return baseModel;
    }

    @RequestMapping(value = "addOption", method = RequestMethod.POST)
    public BaseModel addQuestion(TQuestion tQuestion) {
        System.out.println(tQuestion);
        boolean save = itQuestionService.saveOrUpdate(tQuestion);
        BaseModel baseModel = null;
        if (save) {
            baseModel = BaseModelFactory.installModel(save, 0);
        } else {
            baseModel = BaseModelFactory.installModel(save, 1);
        }
        return baseModel;
    }
}
