import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a = 378423478;
        switch(a){
            case 1:
                System.out.println(1);
                break;
            case 2:
                System.out.println(2);
                break;
            default :
                System.out.println("null");
                break;
        }
        in.close();
    }
}