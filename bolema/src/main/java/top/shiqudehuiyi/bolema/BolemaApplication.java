package top.shiqudehuiyi.bolema;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("top.shiqudehuiyi.bolema.question.mapper")
public class BolemaApplication {

    public static void main(String[] args) {
        SpringApplication.run(BolemaApplication.class, args);
    }

}
