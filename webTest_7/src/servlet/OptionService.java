package servlet;

import util.BaseDao;
import util.BaseModel;

import java.util.Timer;
import java.util.TimerTask;

public class OptionService {
    private static BaseDao baseDao = new BaseDao();

    public static BaseModel getBaseModel(Object[] obj) {
        String sql = "select q_title,q_answer from `t_question` where q_title=? and q_option=?";
        BaseModel baseModel = new BaseModel();
//        try {
//            Thread.sleep(3000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        baseModel.setData(baseDao.query(sql, obj));
        if (baseModel.getData().size() != 0) {
            baseModel.setCode(1);
            baseModel.setMessage("查询题目信息成功");
        } else {
            baseModel.setCode(0);
            baseModel.setMessage("查询题目信息失败");
        }
        return baseModel;
    }

    public static void main(String[] args) {
        Object[] obj = {"作用域插槽的内容和样式都由父组件决定", "A、正确B、错误"};
        System.out.println(OptionService.getBaseModel(obj));
        System.out.println(OptionService.getBaseModel(obj));
    }
}
