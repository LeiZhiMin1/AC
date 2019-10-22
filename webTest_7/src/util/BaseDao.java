package util;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseDao {
    //连接数据库，连接的数据库连接池，连接数据库的地址，
    // 连接数据库账号，密码
    public static final String DRIVERNAME="com.mysql.jdbc.Driver";
    public static final String URL="jdbc:mysql://localhost:3306/exercise";
    public static final String USERNAME="root";
    public static final String PASSWORD="815011LZM";

    //添加连接参数
    public Connection conn=null;//连接数据库对象

    public Statement st=null;//增删改对象

    public PreparedStatement ppst=null;//执行查询对象

    public ResultSet rs=null;//查询结果集对象


    //加载驱动；
    static {
        try{
            Class.forName(DRIVERNAME).newInstance();
        }catch (Exception e){
            System.out.println("驱动加载失败！");
            e.printStackTrace();

        }
    }
    //创建连接数据库的行数
     public Connection getConn() throws SQLException {
         conn= DataSoruceUtils.getConnection();
         return conn;
     }
     //获取结果集 无参--无防止sql注入
     public ResultSet getRs(String sql){

         try{
             //conn-st-rs
             //连接数据库
             conn =this.getConn();
             st=conn.createStatement();
             rs=st.executeQuery(sql);
         }catch (SQLException e){
             System.out.println("查询操作（无参），执行失败。");
             e.printStackTrace();
         }
        return rs;
    }
    //获取结果集对象，有参--防止sql注入
    public ResultSet getRs(String sql, Object[] params){
            try{
                //conn-ppst-rs
                conn=this.getConn();
                ppst=conn.prepareStatement(sql);
                if(params!=null){
                    for(int i=0;i<params.length;i++){
                        ppst.setObject(i+1,params[i]);
                    }
                }
                rs=ppst.executeQuery();
            }catch (SQLException e){
                System.out.println("查询【有参】执行失败");
                e.printStackTrace();
            }

        return rs;
    }
    //封装增删改函数-无参
    public int update(String sql){
        int result=0;
        try{
            conn=this.getConn();
            st=conn.createStatement();
          result =st.executeUpdate(sql);
        }catch (Exception e){
            System.out.println("执行【无参】增删改操作失败！");
            e.printStackTrace();
        }finally {
            this.closeConn();
        }
        return result;
    }
    //封装增删改函数-有参
    public int update(String sql,Object[] params){
        int result=0;
            try{
               conn=this.getConn();
               ppst=conn.prepareStatement(sql);
               if(params!=null){
                   for(int i=0;i<params.length;i++){
                       ppst.setObject(i+1,params[i]);
                   }
               }
               result=ppst.executeUpdate();
            }catch (Exception e){
                System.out.println("增删改【有参】失败");
                e.printStackTrace();
            }finally {
                this.closeConn();
            }
            return result;
    }
    public void closeConn(){
        try{
            if(rs!=null){
                rs.close();
            }
            if(ppst!=null){
                ppst.close();
            }
            if(st!=null){
                st.close();
            }
            if(conn!=null){
                conn.close();
            }

        }catch (Exception e){
            System.out.println("关闭连接出现异常");
            e.printStackTrace();
        }

    }

    public List<Map<String,Object>> query(String sql,Object[]params){
            List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
               ResultSet rs=null;
                if(params ==null){
                  rs = getRs(sql);
                }else{
                   rs = getRs(sql,params);
                }
                ResultSetMetaData rsmd=null;
                int columCount=0;
                //rs-rsmd
                 try{
                     //获取列名
                     rsmd = rs.getMetaData();
                     while(rs.next()){
                       // 遍历每一行的记录
                         Map<String,Object> obj=new HashMap<String,Object>();
                        //将一行的记录set到我们的map中
                         //获取列数 rsmd
                         columCount =rsmd.getColumnCount();
                         for(int i=1;i<=columCount;i++){
                             //smd.getColumnLabel(i)根据索引获取列名
                             obj.put(rsmd.getColumnLabel(i),rs.getObject(i));
                         }
                         list.add(obj);
                     }
                }catch (Exception e){
                     System.out.println("执行结果集封装失败");
                     e.printStackTrace();
                 }finally {
                     closeConn();
                 }
        return  list;
    }

}

