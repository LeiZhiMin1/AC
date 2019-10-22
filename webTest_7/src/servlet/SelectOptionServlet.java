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
import java.util.Arrays;
import java.util.List;

/**
 * @author LZM
 */

@WebServlet(name = "SelectOptionServlet", urlPatterns = {"/selectOption"})
public class SelectOptionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        resp.setHeader("Access-Control*","*");
        req.setCharacterEncoding("utf-8");
        String title = req.getParameter("title");
        System.out.println(title);
        List<BaseModel> list = new ArrayList<>();
        if (title != null) {
            JSONArray jsonArray = JSONArray.parseArray(title);
            int jsonArrayLength = jsonArray.size();//第一层数组长度
            for (int i = 0; i < jsonArrayLength; i++) {
                JSONArray jsonArray1 = JSONArray.parseArray(jsonArray.getString(i));
                int jsonArray1Length = jsonArray1.size();//第二层数组长度
                Object[] obj = new Object[jsonArray1Length];
                for (int j = 0; j < jsonArray1Length; j++) {
                    obj[j] = jsonArray1.get(j);
                }
//            System.out.println(obj[0]+" "+obj[1]);
                list.add(OptionService.getBaseModel(obj));

            }
        } else {
            BaseModel baseModel = new BaseModel();
            baseModel.setCode(0);
            baseModel.setMessage("没有接到数据");
            list.add(baseModel);
        }
//        System.out.println(list);
        String baseModelStr = JSON.toJSONString(list);
        System.out.println(baseModelStr);
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        resp.getWriter().write(baseModelStr);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
}
