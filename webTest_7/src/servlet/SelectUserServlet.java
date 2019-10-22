package servlet;

import com.alibaba.fastjson.JSON;
import util.BaseDao;
import util.BaseModel;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author LZM
 *
 */

@WebServlet(name = "SelectUserServlet",urlPatterns = {"/selectUser"})
public class SelectUserServlet extends HttpServlet {
    BaseDao baseDao = new BaseDao();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String sql = "select * from t_notice";
        List list = baseDao.query(sql,null);
        BaseModel baseModel = new BaseModel();
        baseModel.setCode(1);
        baseModel.setData(list);
        baseModel.setMessage("查询用户信息成功");
        String baseModelStr = JSON.toJSONString(baseModel);
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        resp.getWriter().write(baseModelStr);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
}
