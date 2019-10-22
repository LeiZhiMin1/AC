package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import util.BaseDao;
import util.BaseModel;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "AddOptionServlet", urlPatterns = "/addOptions")
public class AddOptionServlet extends HttpServlet {
    BaseDao baseDao = new BaseDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setHeader("Accept-*", "*");
        String data = req.getParameter("data");//获取json
        System.out.println(data);
        ArrayList<String[]> strings = deWeight(data);
//        JSONArray jsonArray = JSONArray.parseArray(data);//第一层数组
        int jsonlenght = strings.size();//第一层数组大小
        Object[] obj = new Object[strings.size() * 3];
        for (int i = 0; i < jsonlenght; i++) {
//            JSONArray jsonArray1 = JSONArray.parseArray(jsonArray.getString(i));//第二层数组
            String[] sum = strings.get(i);
            int jsonArray1length = sum.length;
            for (int j = 0; j < jsonArray1length; j++) {
                obj[i * jsonArray1length + j] = sum[j];
            }
        }
        System.out.println(jsonlenght);
        BaseModel baseModel = new BaseModel();
        if (jsonlenght > 0) {
            String sql = "INSERT INTO `t_question`(q_title,q_option,q_answer)VALUES";
            for (int i = 0; i < jsonlenght; i++) {
                if (i == 0) {
                    sql += "(?,?,?)";
                } else {
                    sql += ",(?,?,?)";
                }
            }
            System.out.println(sql);
            if (baseDao.update(sql, obj) > 0) {
                baseModel.setCode(1);
                baseModel.setMessage("添加成功");
            } else {
                baseModel.setCode(0);
                baseModel.setMessage("添加失败");
            }
        }else {
            baseModel.setCode(0);
            baseModel.setMessage("添加失败");
        }
        String list = JSON.toJSONString(baseModel);
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        resp.getWriter().write(list);
        resp.getWriter().flush();
        resp.getWriter().close();
    }

    //查重
    public ArrayList<String[]> deWeight(String s) {
        ArrayList<String[]> list = new ArrayList<>();
        JSONArray jsonArray = JSONArray.parseArray(s);//第一层数组
        int jsonArraylength = jsonArray.size();
        for (int i = 0; i < jsonArraylength; i++) {
            JSONArray jsonArray1 = JSONArray.parseArray(jsonArray.getString(i));
//            Object[] selectObj = new Object[2];
//            selectObj[0] = jsonArray1.get(0);
//            selectObj[1] = jsonArray1.get(1);
//            BaseModel baseModel = OptionService.getBaseModel(selectObj);
//            if (baseModel.getData().size() == 0) {
            String[] sumber = new String[3];
            sumber[0] = jsonArray1.getString(0);
            sumber[1] = jsonArray1.getString(1);
            sumber[2] = jsonArray1.getString(2);
            System.out.println(sumber[0] + " " + sumber[1] + " " + sumber[2]);
            list.add(sumber);
//            }
        }
        return list;
    }
}

