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

/**
 * @author LZM
 *
 */

@WebServlet(name = "DeleteUserServlet",urlPatterns = {"/deleteUser"})
public class DeleteUserServlet extends HttpServlet {
    BaseDao baseDao = new BaseDao();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Integer id = Integer.valueOf(req.getParameter("id"));
        String sql = "delete from t_notice where id="+id;
        int result = baseDao.update(sql);
        BaseModel baseModel = new BaseModel();
        if(result>0){
            baseModel.setCode(1);
            baseModel.setMessage("删除用户信息成功");
        }else{
            baseModel.setCode(0);
            baseModel.setMessage("删除用户信息成功");
        }
        String baseModelStr = JSON.toJSONString(baseModel);
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");
        resp.getWriter().write(baseModelStr);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
}
